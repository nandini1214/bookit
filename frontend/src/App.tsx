import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Checkout from "./pages/Checkout";
import Result from "./pages/Result";
import MainLayout from "./Layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All routes inside MainLayout will share the same Navbar */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="details/:id" element={<Details />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="result" element={<Result />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
