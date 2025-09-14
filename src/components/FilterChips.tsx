import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

type Chip = {
  label: string;
  value: string;
};

type Props = {
  options: Chip[];
  value?: string;
  onChange: (v?: string) => void;
};

const FilterChips: React.FC<Props> = ({ options, value, onChange }) => {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      <Button
        type={value ? 'outline' : 'solid'}
        title="Todos"
        onPress={() => onChange(undefined)}
      />
      {options.map((o) => (
        <Button
          key={o.value}
          type={value === o.value ? 'solid' : 'outline'}
          title={o.label}
          onPress={() => onChange(o.value)}
          containerStyle={{ marginLeft: 8, marginTop: 8 }}
        />
      ))}
    </View>
  );
};

export default FilterChips;
