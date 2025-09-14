import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { useAuth } from '@contexts/AuthContext';

const RegisterScreen: React.FC = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const onSubmit = async () => {
    try {
      setLoading(true);
      setError(undefined);
      if (!email || !password || password !== confirm) {
        throw new Error('Verifique email e senhas.');
      }
      await register(email.trim(), password);
    } catch (e: any) {
      setError(e.message || 'Falha ao registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text h3>Criar conta</Text>
      <Input placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <Input placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
      <Input placeholder="Confirmar senha" secureTextEntry value={confirm} onChangeText={setConfirm} />
      <Button title="Registrar" onPress={onSubmit} loading={loading} />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
    </View>
  );
};

export default RegisterScreen;
