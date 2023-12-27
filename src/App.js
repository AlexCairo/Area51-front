import { BrowserRouter, Route, Routes } from "react-router-dom" ;
import './styles/App.css';

//Pages
import Index from "./pages/Index";
import ProductsPage from "./pages/Products";

//Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index /> }/>
        <Route path="/:gender/:category/:subCategory" element = {<ProductsPage />} />
      </Routes>    
      <Footer />
    </BrowserRouter>
  );
}

export default App;
