import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import SectionSupport from "./components/SectionSupport";


function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header/>
        <main className="main">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/catalog" element={<Catalog/>}/>
            </Routes>
          </div>
        </main>
        <SectionSupport/>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
