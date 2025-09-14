import React from 'react';
import { Text } from 'react-native';

const ErrorText: React.FC<{ error?: string }> = ({ error }) => {
  if (!error) return null;
  return <Text style={{ color: 'red', marginTop: 8 }}>{error}</Text>;
};

export default ErrorText;
