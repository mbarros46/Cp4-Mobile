import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Button, Input, Text, ButtonGroup } from 'react-native-elements';
import { useAuth } from '@contexts/AuthContext';
import { useBooks } from '@hooks/useBooks';
import { Book } from '@types/index';

const BookFormScreen: React.FC = () => {
  const { user } = useAuth();
  const { create } = useBooks(user?.uid);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [statusIndex, setStatusIndex] = useState(2);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | undefined>();
  const [err, setErr] = useState<string | undefined>();

  const status: Book['status'][] = useMemo(() => ['lido', 'lendo', 'quero_ler'], []);

  const onSubmit = async () => {
    try {
      setLoading(true);
      setErr(undefined);
      setMsg(undefined);
      if (!title.trim()) throw new Error('Título é obrigatório.');
      const payload: Book = {
        title: title.trim(),
        author: author.trim(),
        genre: genre.trim(),
        status: status[statusIndex],
        favorite: false,
        userId: user!.uid,
      };
      await create(payload);
      setMsg('Livro cadastrado.');
      setTitle(''); setAuthor(''); setGenre(''); setStatusIndex(2);
    } catch (e: any) {
      setErr(e.message || 'Erro ao salvar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text h4>Novo livro</Text>
      <Input placeholder="Título *" value={title} onChangeText={setTitle} />
      <Input placeholder="Autor" value={author} onChangeText={setAuthor} />
      <Input placeholder="Gênero" value={genre} onChangeText={setGenre} />
      <Text>Status de leitura</Text>
      <ButtonGroup
        buttons={['Lido', 'Lendo', 'Quero ler']}
        selectedIndex={statusIndex}
        onPress={setStatusIndex}
      />
      <Button title="Salvar" onPress={onSubmit} loading={loading} />
      {msg ? <Text>{msg}</Text> : null}
      {err ? <Text style={{ color: 'red' }}>{err}</Text> : null}
    </View>
  );
};

export default BookFormScreen;
