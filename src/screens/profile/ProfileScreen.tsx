
import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useAuth } from '@contexts/AuthContext';

import type { Book } from '../../types';
import { useBooks } from '@hooks/useBooks';


const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const { items } = useBooks(user?.uid);

  const total = items.length;
  const lidos = items.filter((b: Book) => b.status === 'lido').length;
  const lendo = items.filter((b: Book) => b.status === 'lendo').length;
  const queroLer = items.filter((b: Book) => b.status === 'quero_ler').length;

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text h4>Perfil</Text>
      <Text>Email: {user?.email}</Text>
      <Text style={{ marginTop: 16, fontWeight: 'bold' }}>Estatísticas de leitura</Text>
      <Text>Total de livros: {total}</Text>
      <Text>Lidos: {lidos}</Text>
      <Text>Lendo: {lendo}</Text>
      <Text>Quero ler: {queroLer}</Text>
      <Button title="Sair" onPress={logout} containerStyle={{ marginTop: 24 }} />
    </View>
  );
};

export default ProfileScreen;
