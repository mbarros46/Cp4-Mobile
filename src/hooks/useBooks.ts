import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { collection, query, where, orderBy, limit, getDocs, startAfter, addDoc, updateDoc, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@services/firebase';
import { Book } from '@types/index';

type Filters = {
  text?: string;
  genre?: string;
  status?: string;
  favoritesOnly?: boolean;
};

const PAGE_SIZE = 12;

export function useBooks(userId?: string) {
  const [items, setItems] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState(true);
  const lastDocRef = useRef<any>(null);
  const [filters, setFilters] = useState<Filters>({});

  const baseQuery = useMemo(() => {
    let q: any[] = [where('userId', '==', userId)];
    if (filters.favoritesOnly) q.push(where('favorite', '==', true));
    return q;
  }, [userId, filters.favoritesOnly]);

  const fetchPage = useCallback(async (reset = false) => {
    if (!userId) return;
    try {
      setLoading(true);
      setError(undefined);

      const col = collection(db, 'books');
      let q = query(col, ...baseQuery, orderBy('createdAt', 'desc'), limit(PAGE_SIZE));
      if (!reset && lastDocRef.current) {
        q = query(col, ...baseQuery, orderBy('createdAt', 'desc'), startAfter(lastDocRef.current), limit(PAGE_SIZE));
      }
      const snap = await getDocs(q);
      const docs = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as Book[];
      if (reset) setItems(docs);
      else setItems(prev => [...prev, ...docs]);
      setHasMore(docs.length === PAGE_SIZE);
      lastDocRef.current = snap.docs[snap.docs.length - 1] || null;
    } catch (e: any) {
      setError(e.message || 'Erro ao carregar livros');
    } finally {
      setLoading(false);
    }
  }, [userId, baseQuery]);

  useEffect(() => {
    lastDocRef.current = null;
    fetchPage(true);
  }, [fetchPage]);

  const create = useCallback(async (book: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>) => {
    const data = { ...book, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
    const col = collection(db, 'books');
    await addDoc(col, data);
    lastDocRef.current = null;
    await fetchPage(true);
  }, [fetchPage]);

  const update = useCallback(async (id: string, book: Partial<Book>) => {
    const ref = doc(db, 'books', id);
    await updateDoc(ref, { ...book, updatedAt: serverTimestamp() });
    await fetchPage(true);
  }, [fetchPage]);

  const remove = useCallback(async (id: string) => {
    const ref = doc(db, 'books', id);
    await deleteDoc(ref);
    await fetchPage(true);
  }, [fetchPage]);

  const setText = useCallback((text?: string) => setFilters(f => ({ ...f, text })), []);
  const setGenre = useCallback((genre?: string) => setFilters(f => ({ ...f, genre })), []);
  const setStatus = useCallback((status?: string) => setFilters(f => ({ ...f, status })), []);
  const setFavoritesOnly = useCallback((v: boolean) => setFilters(f => ({ ...f, favoritesOnly: v })), []);

  const filtered = useMemo(() => {
    const t = (filters.text || '').toLowerCase();
    return items.filter(b => {
      const matchesText = !t || (b.title?.toLowerCase().includes(t) || (b.author || '').toLowerCase().includes(t));
      const matchesGenre = !filters.genre || b.genre === filters.genre;
      const matchesStatus = !filters.status || b.status === filters.status;
      return matchesText && matchesGenre && matchesStatus;
    });
  }, [items, filters]);

  return {
    items: filtered,
    loading,
    error,
    hasMore,
    fetchMore: () => fetchPage(false),
    create,
    update,
    remove,
    setText,
    setGenre,
    setStatus,
    setFavoritesOnly,
    filters
  };
}
