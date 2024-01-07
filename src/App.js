import { BrowserRouter, Route, Routes } from "react-router-dom" ;
import './styles/App.css';

//Pages
import Index from "./pages/Index";
import ProductsPage from "./pages/Products";
import DetallePage from "./pages/DetallePage";
import CarritoPage from "./pages/CarritoPage";

//Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//Context
import { CarritoProvider } from "./context/CarritoContext";

function App() {
  return (
    <BrowserRouter>
      <CarritoProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index /> }/>
          <Route path="/:gender/:category/:subCategory" element = {<ProductsPage />} />
          <Route path="/:producto/:idProducto/variante/:idVariant" element = {<DetallePage />}/>
          <Route path="/carrito" element = {<CarritoPage />} />
        </Routes>    
        <Footer />
      </CarritoProvider>
    </BrowserRouter>
  );
}

export default App;
