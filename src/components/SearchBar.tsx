import React from 'react';
import { Input } from 'react-native-elements';

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

const SearchBar: React.FC<Props> = ({ value, onChange, placeholder }) => {
  return (
    <Input
      value={value}
      onChangeText={onChange}
      placeholder={placeholder || 'Buscar por título ou autor...'}
      leftIcon={{ type: 'material', name: 'search' }}
      autoCapitalize="none"
      autoCorrect={false}
      containerStyle={{ paddingHorizontal: 0 }}
      inputContainerStyle={{ borderBottomWidth: 0 }}
      style={{ backgroundColor: '#f3f4f6', padding: 12, borderRadius: 8 }}
    />
  );
};

export default SearchBar;
