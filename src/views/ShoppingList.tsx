import { observer } from "mobx-react";
import { ShoppingListStoreContext } from "../store/shoppingStore";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ShoppingList = observer(({}: {}) => {
  const { removeFromShoppingList, addToShoppingList, shoppingList } =
    useContext(ShoppingListStoreContext);
  const { t } = useTranslation();
  const [item, setItem] = useState<any>();

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
              setItem({ ...item, title: e.target.value });
            }}
          />
          <input
            placeholder={t("item.price")}
            onChange={(e) => {
              setItem({ ...item, price: e.target.value });
            }}
          />
          <input
            placeholder={t("item.quantity")}
            onChange={(e) => {
              setItem({ ...item, quantety: e.target.value });
            }}
          />
          <button
            onClick={() =>
              addToShoppingList({
                id: 1,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                picked: false,
              }).finally(() => {
                alert("Item added to shopping list");
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
                <th>{t("item.quantity")}</th>
                <th>{t("item.picked")}</th>
                <th>{t("Remove")}</th>
              </tr>
            </thead>
            <tbody>
              {shoppingList?.map((list: any) => {
                return (
                  <tr>
                    <td>{list.title}</td>
                    <td>{list.price}</td>
                    <td>{Math.round(list.quantity)}</td>
                    <td>
                      <input type="checkbox" value={list.picked} />
                    </td>
                    <td>
                      <div
                        onClick={() => {
                          removeFromShoppingList(list.id).finally(() => {
                            alert("Item has been removed from shopping list");
                          });
                        }}
                      >
                        X
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
