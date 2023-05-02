import "./App.css";
import axios from "./axiosConfig";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./comps/LogIn";
import SignUp from "./comps/SignUp";
import Prodacts from "./comps/Products";
import Search from "./comps/Search";
import Nav from "./comps/Nav";
import Cart from "./comps/Cart";
import { ROUTES } from "./constans/constans";
import { contextApi } from "./contextApi";
function App() {
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3001/allProducts");
        const data = await res.data;
        setProducts(data);
        setLoading(false);
<<<<<<< HEAD
      });
    axios.get("/allProducts").then((res) => {
      setProducts(res.data);
    });
=======
      } catch (error) {
        console.log(error);
      }
    };
    getAllProducts()
>>>>>>> addAndDeleteQiCart
  }, []);
  const userDisconnect = () => {
    setUserData(false);
  };
  const userConnect = (user) => {
    setUserData(user);
  };
  const addToCart = (valProduct) => {
    userData.cart.unshift(valProduct);
    setUserData([...userData]);
  };
  const deleteFromCart = (indexProduct) => {
    userData.cart.splice(indexProduct, 1);
    setUserData([...userData]);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <contextApi.Provider
          value={{
            userData,
            products,
            userConnect,
            userDisconnect,
            addToCart,
            deleteFromCart,
          }}
        >
          {userData && <Nav />}
          <Routes>
            <Route
              path={ROUTES.ENTRY}
              element={loading ? <h1>loading...</h1> : <LogIn />}
            />
            <Route path={ROUTES.SIGNUP} element={<SignUp />} />
            <Route
              path={ROUTES.PRODUCTS}
              element={<Prodacts products={products} />}
            />
            <Route path={ROUTES.SEARCH} element={<Search url={"getPlus"} />} />
            <Route path={ROUTES.CART} element={<Cart />} />
            <Route
              path={ROUTES.PAGENOTFOUND}
              element={<h2>page not found..</h2>}
            />
          </Routes>
        </contextApi.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
