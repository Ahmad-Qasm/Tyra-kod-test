import { observer } from "mobx-react";
import { ShoppingListItem, ShoppingListStoreContext } from "../store/shoppingStore";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import RemoveIcon from "../components/RemoveIcon";
import { Checkbox } from "@mui/material";

export const ShoppingList = observer(() => {
  const {
    removeFromShoppingList,
    addToShoppingList,
    updateShoppingList, shoppingList,
  } = useContext(ShoppingListStoreContext);
  const { t } = useTranslation();
  const [item, setItem] = useState<ShoppingListItem>({
    id: "",
    title: "",
    price: 0,
    quantity: "",
    picked: false,
  });

  return (
    <div className="flex justify-center p-5">
      <div className="max-w-3xl">
        <h1 className=" font-bold text-2xl">
          {t("shoppingStore.addItemsToList")}
        </h1>
        <div>
          <input
            placeholder={t("item.title")}
            onChange={(e) => {
              setItem((prevItem) => ({
                ...prevItem,
                title: e.target.value,
              }));
            }}
          />
          <input
            placeholder={t("item.price")}
            onChange={(e) => {
              setItem((prevItem) => ({
                ...prevItem,
                price: parseFloat(e.target.value),
              }));
            }}
          />
          <input
            placeholder={t("item.quantity")}
            onChange={(e) => {
              setItem((prevItem) => ({
                ...prevItem,
                quantity: e.target.value,
              }));
            }}
          />
          <button
            onClick={() =>
              addToShoppingList({
                id: uuidv4(),
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                picked: false,
              }).finally(() => {
                Swal.fire("Item added to shopping list");
              })
            }
          >
            {t("general.save")}
          </button>
        </div>
        <h1 className=" font-bold text-2xl">
          {t("shoppingStore.shoppingList")}
        </h1>
        <div className="w-full">
          <table className="table-fixed w-full">
            <thead>
              <tr>
                <th>{t("item.title")}</th>
                <th>{t("item.price")}</th>
                {/*<th>{t("item.quantity")}</th>*/}
                <th>{t("item.picked")}</th>
                <th>{t("item.remove")}</th>
              </tr>
            </thead>
            <tbody>
              {shoppingList?.map((listItem: ShoppingListItem) => {
                return (
                  <tr key={listItem.id}>
                    <td
                      className={
                        listItem.picked === true
                          ? "line-through decoration-[#7EB5F4] decoration-2"
                          : ""
                      }
                    >
                      {listItem.title} x{" "}
                      {Math.round(parseInt(listItem.quantity))}
                    </td>
                    <td>{listItem.price} Kr</td>
                    {/* <td>{Math.round(parseInt(listItem.quantity))}</td> */}
                    <td>
                      <Checkbox
                        checked={listItem.picked}
                        onChange={() => updateShoppingList(listItem.id)}
                      />
                    </td>
                    <td>
                      <div
                        onClick={() => {
                          removeFromShoppingList(listItem.id).finally(() => {
                            Swal.fire(
                              `Item with id ${listItem.id.slice(
                                0,
                                6
                              )} has been removed from shopping list`
                            );
                          });
                        }}
                      >
                        <RemoveIcon />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});
