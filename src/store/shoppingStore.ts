import React from "react";
import { makeAutoObservable } from "mobx";

export interface ShoppingListItem {
  id: string;
  title: string;
  price: string;
  quantity: string;
  picked: boolean;
}

class ShoppingListStore {
  shoppingList: ShoppingListItem[] = [];
  
  constructor() {
    makeAutoObservable(this);
  }

  setShoppingList = (shoppingList: ShoppingListItem[]) => {
    this.shoppingList = shoppingList;
  };

  addToShoppingList = async (shoppingItem: ShoppingListItem) => {
    if (this.shoppingList.length <= 0) {
      return this.setShoppingList([shoppingItem]);
    } else {
      let itemExists = false;
      const updatedList = this.shoppingList.map((item) => {
        if (item.title.toLowerCase() === shoppingItem.title.toLowerCase()) {
          itemExists = true;
          if (item.price !== shoppingItem.price) {
            item.price = shoppingItem.price;
          }
          item.quantity = `${+item.quantity + +shoppingItem.quantity}`;
        }
        return item;
      });

      if (!itemExists) {
        updatedList.push(shoppingItem);
      }
      this.setShoppingList(updatedList);
    }
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
