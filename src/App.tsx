import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import SectionSupport from "./components/SectionSupport";
import ProductIdPage from "./pages/ProductIdPage";
import ScrollToTop from "./utils/ScrollToTop";


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <div className="wrapper">
        <Header/>
        <main className="main">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/catalog" element={<Catalog/>}/>
            <Route path="/catalog/:id" element={<ProductIdPage/>}/> {/* указываем после /catalog/ :id,для динамического id,чтобы потом открывалась отдельная страница товара по конкретному id  */}
          </Routes>
        </main>
        <SectionSupport/>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
