import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl, Alert } from 'react-native';
import { Button, CheckBox, Text } from 'react-native-elements';
import { useAuth } from '@contexts/AuthContext';
import { useBooks } from '@hooks/useBooks';
import BookCard from '@components/BookCard';
import EmptyState from '@components/EmptyState';
import SearchBar from '@components/SearchBar';
import FilterChips from '@components/FilterChips';

const genres = [
  { label: 'Ficção', value: 'Ficção' },
  { label: 'Não Ficção', value: 'Não Ficção' },
  { label: 'Técnico', value: 'Técnico' }
];

const statuses = [
  { label: 'Lido', value: 'lido' },
  { label: 'Lendo', value: 'lendo' },
  { label: 'Quero ler', value: 'quero_ler' }
];

const BookListScreen: React.FC = () => {
  const { user } = useAuth();
  const { items, loading, error, hasMore, fetchMore, update, remove, setText, setGenre, setStatus, setFavoritesOnly, filters } = useBooks(user?.uid);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setText('');
  }, [setText]);

  const handleDelete = (id: string) => {
    Alert.alert(
      'Excluir livro',
      'Tem certeza que deseja excluir este livro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => remove(id) },
      ]
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <SearchBar value={filters.text || ''} onChange={setText} />
      <View style={{ marginVertical: 8 }}>
        <Text style={{ marginBottom: 8 }}>Gênero</Text>
        <FilterChips options={genres} value={filters.genre} onChange={setGenre} />
      </View>
      <View style={{ marginVertical: 8 }}>
        <Text style={{ marginBottom: 8 }}>Status</Text>
        <FilterChips options={statuses} value={filters.status} onChange={setStatus} />
      </View>
      <CheckBox
        title="Somente favoritos"
        checked={!!filters.favoritesOnly}
        onPress={() => setFavoritesOnly(!filters.favoritesOnly)}
      />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id!}
        refreshControl={<RefreshControl refreshing={refreshing && loading} onRefresh={() => { setRefreshing(true); fetchMore(); setRefreshing(false); }} />}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onEdit={() => {}}
            onDelete={() => handleDelete(item.id!)}
            onToggleFavorite={() => update(item.id!, { favorite: !item.favorite })}
          />
        )}
        ListEmptyComponent={!loading ? <EmptyState message="Nenhum livro encontrado." /> : null}
        onEndReached={() => { if (hasMore && !loading) fetchMore(); }}
        onEndReachedThreshold={0.3}
      />
      {error ? <Text style={{ color: 'red', marginTop: 8 }}>{error}</Text> : null}
    </View>
  );
};

export default BookListScreen;
