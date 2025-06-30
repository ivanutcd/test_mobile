import React from 'react';
import SortableList, { SortableItem } from 'react-easy-sort';
import { arrayMoveImmutable } from 'array-move';
import './sortList.scss';

const SortableListComponent = ({
  items,
  setItems,
  renderItem,
}: {
  items: any[];
  setItems: (items: any[]) => void;
  renderItem: (item: any, index: number) => React.ReactElement;
}) => {
  const onSortEnd = (oldIndex: number, newIndex: number) => {
    const updatedItems = arrayMoveImmutable(items, oldIndex, newIndex);
    setItems(updatedItems);
  };

  return (
    <SortableList
      onSortEnd={onSortEnd}
      className="sortable-list"
      draggedItemClassName="dragged-item"
    >
      {items.map((item, index) => (
        <SortableItem key={item.id || index}>
          {renderItem(item, index) as React.ReactElement}
        </SortableItem>
      ))}
    </SortableList>
  );
};

export default SortableListComponent;
