import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@navigation/stacks/AuthStack';
import { useAuth } from '@contexts/AuthContext';
import ErrorText from '@components/ErrorText';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const onSubmit = async () => {
    try {
      setLoading(true);
      setError(undefined);
      await login(email.trim(), password);
    } catch (e: any) {
      setError(e.message || 'Falha ao entrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text h3>Bem-vindo</Text>
      <Input placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <Input placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Entrar" onPress={onSubmit} loading={loading} />
      <ErrorText error={error} />
      <Button type="clear" title="Criar conta" onPress={() => navigation.navigate('Register')} />
      <Button type="clear" title="Esqueci minha senha" onPress={() => navigation.navigate('ResetPassword')} />
    </View>
  );
};

export default LoginScreen;
