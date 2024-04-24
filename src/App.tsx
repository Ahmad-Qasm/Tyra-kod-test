import "./App.css";
import { ShoppingList } from "./views/ShoppingList";
import { changeLanguage } from "i18next";
import Flags from "country-flag-icons/react/3x2";

function App() {
  return (
    <div className="App">
      <div className="flex justify-between">
        <div>
          <img
            src="https://web-alfa.tyra.io/images/TYRA_logo.png"
            width={150}
            alt=""
          />
        </div>
        <div className={"flex space-x-2 items-center"}>
          <div className="w-[30px] rounded-full h-[30px] hover:scale-110 overflow-hidden text-center justify-center align-middle">
            <Flags.SE
              title="Svenska"
              onClick={() => changeLanguage("sv")}
              className={
                "w-[45px] h-[45px] mt-[-7.5px] ml-[-7.5px] cursor-pointer hover:scale-110 justify-center align-middle"
              }
            />
          </div>
          <div className="w-[30px] rounded-full h-[30px] hover:scale-110 overflow-hidden text-center justify-center align-middle">
            <Flags.GB
              title="English"
              onClick={() => changeLanguage("en")}
              className={
                "w-[45px] h-[45px] mt-[-7.5px] ml-[-7.5px] cursor-pointer hover:scale-110 justify-center align-middle"
              }
            />
          </div>
        </div>
      </div>
      <ShoppingList />
    </div>
  );
}

export default App;
