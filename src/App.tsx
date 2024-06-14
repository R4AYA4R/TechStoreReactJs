import Footer from "./components/Footer";
import Header from "./components/Header";
import SectionCompanies from "./components/SectionCompanies";
import SectionCustom from "./components/SectionCustom";
import SectionLaptops from "./components/SectionLaptops";
import SectionMonitors from "./components/SectionMonitors";
import SectionSupport from "./components/SectionSupport";
import SectionSwiper from "./components/SectionSwiper";
import SectionTop from "./components/SectionTop";


function App() {
  return (
    <div className="App">
      <Header/>
      <main className="main">
        <div className="container">
          <SectionTop/>
          <SectionCustom/>
          <SectionLaptops/>
          <SectionMonitors/>
          <SectionCompanies/>
          <SectionSwiper/>
          <SectionSupport/>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
