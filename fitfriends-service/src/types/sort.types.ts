export enum SortType {
  Date = 'createdAt',
  Price = 'price',
  Quantity = 'totalSoldQuantity',
  AmountOfMoney = 'totalSoldAmountOfMoney'
}

export enum SortOrder {
  Down = -1,
  Up = 1
}

export enum ClientSortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export const SortOrderMap = {
  [ClientSortOrder.Asc]: SortOrder.Up,
  [ClientSortOrder.Desc]: SortOrder.Down
};
