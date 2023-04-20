import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import LogIn from "./comps/LogIn";
import SignUp from "./comps/SignUp";
import Prodacts from "./comps/Products";
import Search from "./comps/Search";
import Nav from "./comps/Nav";
import Cart from "./comps/Cart";
import { ROUTES } from "./constans/constans";
function App() {
  const [products, setProducts] = useState([]);
  const [isLogIn, setIsLogIn] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:3001/allProducts").then((response) => {
      setProducts(response.data);
    });
  }, []);
  const logOut = () => {
    setIsLogIn(false);
  };
  const logIn = () => {
    setIsLogIn(true);
  };
  return (
    <div className="App">
      <BrowserRouter>
        {isLogIn && <Nav />}

        <Routes>
          <Route path="/" element={<LogIn logIn={logIn} />} />
          <Route path={ROUTES.SIGNUP} element={<SignUp />} />
          <Route
            path={ROUTES.PRODUCTS}
            element={<Prodacts products={products} />}
          />
          <Route path={ROUTES.SEARCH} element={<Search />} />
          <Route path={ROUTES.CART} element={<Cart />} />
        </Routes>
        {isLogIn && (
          <Link to={"/"}>
            <button onClick={logOut}>LogOut</button>
          </Link>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
