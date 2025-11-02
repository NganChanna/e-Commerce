import { Navbar, Footer } from "./components/index.ts";
import { ThemeProvider } from "./components/themeProvider";
import { Routes, Route } from "react-router-dom";

import {
  Home,
  About,
  Contact,
  Accessories,
  AccessoryDetails,
  Products,
  ProductDetails,
  Categories,
  Cart,
} from "./pages/index.ts";

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-provider">
      <header>
        <Navbar />
      </header>
      <main className="mt-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/accessories/:id" element={<AccessoryDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </ThemeProvider>
  );
};

export default App;
