import "./App.css";
import "./svg.scss";
import Hero from "./components/sections/hero/Hero";
import Header from "./components/layout/header/Header";
import Calculator from "./components/sections/calculator/Calculator";
import Services from "./components/sections/services/Services";
import About from "./components/sections/about/About";
import Solution from "./components/sections/solution/Solution";
import Contacts from "./components/sections/contacts/Contacts";
import HeroBackground from "./components/layout/HeroBackground";
import Counters from "./components/sections/counters/Counters";
import Steps from "./components/sections/steps/Steps";
import Advantages from "./components/sections/advantages/Advantages";
import Cta from "./components/sections/cta/Cta";
import Footer from "./components/layout/footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <div className="bg">
          <Hero />
          <Calculator />
          <HeroBackground />
        </div>
        <Services />
        <Counters />
        <Solution />
        <Cta />
        <About />
        <Steps />
        <Advantages />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}

export default App;
