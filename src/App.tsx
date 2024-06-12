import Header from "./components/Header";
import SectionCustom from "./components/SectionCustom";
import SectionTop from "./components/SectionTop";


function App() {
  return (
    <div className="App">
      <Header/>
      <main className="main">
        <div className="container">
          <SectionTop/>
          <SectionCustom/>
        </div>
      </main>
    </div>
  );
}

export default App;
