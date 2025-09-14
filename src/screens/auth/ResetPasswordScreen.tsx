import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { useAuth } from '@contexts/AuthContext';

const ResetPasswordScreen: React.FC = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | undefined>();
  const [err, setErr] = useState<string | undefined>();

  const onSubmit = async () => {
    try {
      setLoading(true);
      setErr(undefined);
      setMsg(undefined);
      await resetPassword(email.trim());
      setMsg('E-mail de recuperação enviado.');
    } catch (e: any) {
      setErr(e.message || 'Falha ao enviar e-mail.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text h3>Recuperar senha</Text>
      <Input placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <Button title="Enviar" onPress={onSubmit} loading={loading} />
      {msg ? <Text>{msg}</Text> : null}
      {err ? <Text style={{ color: 'red' }}>{err}</Text> : null}
    </View>
  );
};

export default ResetPasswordScreen;
