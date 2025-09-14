import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
    <Icon name="inbox" size={48} />
    <Text style={{ marginTop: 12, textAlign: 'center' }}>{message}</Text>
  </View>
);

export default EmptyState;
