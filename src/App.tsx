import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "./components/themeProvider";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  About,
  Contact,
  Accessories,
  Product,
  Categaries,
} from "./pages/index.ts";

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-provider">
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/categaries" element={<Categaries />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </ThemeProvider>
  );
};

export default App;
