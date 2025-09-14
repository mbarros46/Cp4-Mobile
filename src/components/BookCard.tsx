import React from 'react';
import { ListItem, Icon, Button } from 'react-native-elements';
import { Book } from '@types/index';

type Props = {
  book: Book;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
};

const BookCard: React.FC<Props> = ({ book, onEdit, onDelete, onToggleFavorite }) => {
  return (
    <ListItem bottomDivider>
      <Icon name="book" />
      <ListItem.Content>
        <ListItem.Title>{book.title}</ListItem.Title>
        <ListItem.Subtitle>
          {book.author || 'Autor desconhecido'} • {book.genre || 'Sem gênero'} • {book.status || 'sem status'}
        </ListItem.Subtitle>
      </ListItem.Content>
      <Button
        type="clear"
        icon={<Icon name={book.favorite ? 'star' : 'star-border'} />}
        onPress={onToggleFavorite}
      />
      <Button type="clear" icon={<Icon name="edit" />} onPress={onEdit} />
      <Button type="clear" icon={<Icon name="delete" />} onPress={onDelete} />
    </ListItem>
  );
};

export default BookCard;
