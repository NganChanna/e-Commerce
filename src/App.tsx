import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "./components/themeProvider";

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-provider">
      <Navbar />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
