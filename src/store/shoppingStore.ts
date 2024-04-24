import React from "react";
import { makeAutoObservable } from "mobx";

class ShoppingListStore {
  shoppingList: any[] = [
    {
      id: 1,
      title: "Tomater",
      price: 12,
      quantity: "2kg",
      picked: false,
    },
    {
      id: 1,
      title: "Bananer",
      price: 12,
      quantity: "3",
      picked: true,
    },
    {
      id: 2,
      title: "Kycklingfile fryst",
      price: 79,
      quantity: "1",
      picked: false,
    },
  ];
  constructor() {
    makeAutoObservable(this);
  }

  setShoppingList = (shoppingList: any[]) => {
    this.shoppingList = shoppingList;
  };

  addToShoppingList = async (shoppingItem: any) => {
    this.setShoppingList(this.shoppingList);
  };

  removeFromShoppingList = async (id: any) => {};
}

export const shoppingListStore = (() => {
  return new ShoppingListStore();
})();
export const ShoppingListStoreContext: React.Context<ShoppingListStore> =
  React.createContext(shoppingListStore);
