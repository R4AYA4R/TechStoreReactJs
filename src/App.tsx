import Header from "./components/Header";
import SectionTop from "./components/SectionTop";


function App() {
  return (
    <div className="App">
      <Header/>
      <main className="main">
        <div className="container">
          <SectionTop/>
        </div>
      </main>
    </div>
  );
}

export default App;
