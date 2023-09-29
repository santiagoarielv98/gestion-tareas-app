import React from 'react';

import ColumnItem from './Column';

import type { Column } from '../../types/tasks';

export interface InnerColumnListProps {
  columns: Column[];
}

const InnerColumnList = ({ columns = [] }: InnerColumnListProps): JSX.Element[] => {
  return columns.map((column, index) => <ColumnItem key={column._id} column={column} index={index} />);
};

export default InnerColumnList;
