import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import SectionSupport from "./components/SectionSupport";
import ProductIdPage from "./pages/ProductIdPage";
import ScrollToTop from "./utils/ScrollToTop";
import Cart from "./pages/Cart";
import { createContext, useState } from "react";
import { IProduct } from "./types/types";
import { apiBasket } from "./store/apiBasket";


export const BasketContext = createContext<any>(null); // createContext- функция,которая создает контекст для хука useContext,это сейчас не используем,так как реализовали другим образом

function App() {
  // описываем состояния для BasketContext
  // const [inputValue,setInputValue] = useState<number>();
  // const [priceValue,setPriceValue] = useState<number>();
  // const [product,setProduct] = useState({});
  // const [changedValue,setChangedValue] = useState(false);


  // функция для нашего Basket Context,с параметрами,которые потом будем передавать в ProductItemBasket
  // const updateBasket=(inputValue2:number,priceValue:number,product2:IProduct)=>{
  //   setInputValue(inputValue2);
  //   setPriceValue(priceValue);
  //   setProduct(product2);

  // }

  return (
    // используем BasketContext.Provider,чтобы подключить наш BasketContext к всему сайту и указываем в value,какие поля есть у этого BasketContext 
    <BasketContext.Provider value={{
      // inputValue:inputValue,
      // priceValue:priceValue,
      // product:product,
      // changedValue:changedValue,
      // setChangedValue:setChangedValue,
      // updateBasket:updateBasket
    }}>
      <BrowserRouter>
        <ScrollToTop/>
        <div className="wrapper">
          <Header/>
          <main className="main">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/catalog" element={<Catalog/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/catalog/:id" element={<ProductIdPage/>}/> {/* указываем после /catalog/ :id,для динамического id,чтобы потом открывалась отдельная страница товара по конкретному id  */}
            </Routes>
          </main>
          <SectionSupport/>
          <Footer/>
        </div>
      </BrowserRouter>
    </BasketContext.Provider>
  );
}

export default App;
