import Header from "./components/Header";
import SectionCustom from "./components/SectionCustom";
import SectionLaptops from "./components/SectionLaptops";
import SectionMonitors from "./components/SectionMonitors";
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
        </div>
      </main>
    </div>
  );
}

export default App;
