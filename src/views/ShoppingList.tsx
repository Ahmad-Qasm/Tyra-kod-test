import { observer } from "mobx-react";
import { ShoppingListItem, ShoppingListStoreContext } from "../store/shoppingStore";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
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
    price: "",
    quantity: "",
    picked: false,
  });

  
  return (
    <div className="flex flex-col justify-center p-5">
      <h1 className=" font-bold text-2xl text-left	">
        {t("shoppingStore.shoppingList")}
      </h1>
      <div className="max-w-3xl p-4  mt-6 bg-gray-50 shadow-xl ">
        <div className="w-full">
          <table className="table-fixed w-full">
            {shoppingList.length <= 0 ? (
              <>
                <thead></thead>
                <tbody>
                  <tr>
                    <td className="text-red text-center" colSpan={4}>
                      <FontAwesomeIcon icon={faMugHot} className="h-64 mt-8 " />
                      <h1 className="text-2xl mt-4">{t("general.toBuy")}</h1>
                    </td>
                  </tr>
                </tbody>
              </>
            ) : (
              <>
                {" "}
                <thead>
                  <tr>
                    <th>{t("item.title")}</th>
                    <th>{t("item.price")}</th>
                    <th>{t("item.total")}</th>
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
                          <Checkbox
                            checked={listItem.picked}
                            onChange={() => updateShoppingList(listItem.id)}
                          />
                          {listItem.title} x{" "}
                          {parseInt(listItem.quantity)}
                        </td>
                        <td>{listItem.price} Kr</td>
                        <td>{parseFloat(listItem.quantity) * parseFloat(listItem.price)} kr</td>
                        <td>
                          <div
                            onClick={() => {
                              removeFromShoppingList(listItem.id).finally(
                                () => {
                                  Swal.fire(
                                    `${listItem.title}` +
                                      ` ${t("general.removeItemNotification")}`
                                  );
                                }
                              );
                            }}
                          >
                            <RemoveIcon />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>
      <div className="max-w-3xl p-4  mt-6 bg-gray-50 shadow-xl ">
        <h1 className=" font-bold text-2xl text-left">
          {t("shoppingStore.addItemsToList")}
        </h1>
        <div className="flex justify-between max-w-3xl p-4 ">
          <input
            className="shadow border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none "
            placeholder={t("item.title")}
            value={item.title}
            onChange={(e) => {
              setItem((prevItem) => ({
                ...prevItem,
                title: e.target.value,
              }));
            }}
          />
          <input
            className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder={t("item.price")}
            value={item.price}
            onChange={(e) => {
              setItem((prevItem) => ({
                ...prevItem,
                price: e.target.value,
              }));
            }}
          />
          <input
            className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder={t("item.quantity")}
            value={item.quantity}
            onChange={(e) => {
              setItem((prevItem) => ({
                ...prevItem,
                quantity: e.target.value,
              }));
            }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-1/4 rounded"
            onClick={() => {
              if (
                item.title !== "" &&
                item.price !== "" &&
                item.quantity !== ""
              ) {
                addToShoppingList({
                  id: uuidv4(),
                  title: item.title,
                  price: item.price,
                  quantity: item.quantity,
                  picked: false,
                }).finally(() => {
                  Swal.fire("Item added to shopping list");
                  setItem({
                    id: "",
                    title: "",
                    price: "",
                    quantity: "",
                    picked: false,
                  });
                });
              }
            }}
          >
            {t("general.save")}
          </button>
        </div>
      </div>
    </div>
  );
});
