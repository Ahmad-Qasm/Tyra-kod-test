import React from "react";
import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";

export interface ShoppingListItem {
  id: string;
  title: string;
  price: number;
  quantity: string;
  picked: boolean;
}

class ShoppingListStore {
  shoppingList: ShoppingListItem[] = [
    {
      id: uuidv4(),
      title: "Tomater",
      price: 12,
      quantity: "2",
      picked: false,
    },
    {
      id: uuidv4(),
      title: "Bananer",
      price: 12,
      quantity: "3",
      picked: true,
    },
    {
      id: uuidv4(),
      title: "Kycklingfile fryst",
      price: 79,
      quantity: "1",
      picked: false,
    },
  ];
  
  constructor() {
    makeAutoObservable(this);
  }

  setShoppingList = (shoppingList: ShoppingListItem[]) => {
    this.shoppingList = shoppingList;
  };

  addToShoppingList = async (shoppingItem: ShoppingListItem) => {
    this.setShoppingList([...this.shoppingList, shoppingItem]);
  };

  updateShoppingList = async (shoppingItemId: string) => {
    const updatedList = this.shoppingList.map((shoppingItem) => {
      if (shoppingItem.id === shoppingItemId) {
        return { ...shoppingItem, picked: !shoppingItem.picked };
      }
      return shoppingItem;
    });

    this.setShoppingList([...updatedList]);
  };

  removeFromShoppingList = async (id: string) => {
    this.setShoppingList([...this.shoppingList.filter(item => item.id !== id)]);
  };
}

export const shoppingListStore = (() => {
  return new ShoppingListStore();
})();
export const ShoppingListStoreContext: React.Context<ShoppingListStore> =
  React.createContext(shoppingListStore);
