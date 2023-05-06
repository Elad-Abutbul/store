import "./App.css";
import axios from "./axiosConfig";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./comps/LogIn";
import SignUp from "./comps/SignUp";
import Products from "./comps/Products";
import Search from "./comps/Search";
import Nav from "./comps/Nav";
import Cart from "./comps/Cart";
import { ROUTES } from "./constans/constans";
import { contextApi } from "./contextApi";
import Profile from "./comps/profile/Profile";
import ViewPurchases from "./comps/profile/comps/ViewPurchases";
import DeleteAccount from "./comps/profile/comps/DeleteAccount";
function App() {
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIteamToPay, setSelectedIteamToPay] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/allProducts");
        const data = await res.data;
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getAllProducts();
  }, []);
  const userDisconnect = () => {
    setUserData(false);
  };
  const userConnect = (user) => {
    setUserData(user);
  };
  const addToCart = (valProduct) => {
    userData.cart.unshift(valProduct);
    setUserData({ ...userData });
  };
  const deleteFromCart = (indexProduct) => {
    userData.cart.splice(indexProduct, 1);
    setUserData({ ...userData });
  };

  const paymentCart = (valIteam) => {
    let itemIndex = userData.cart.findIndex((val) => valIteam._id === val._id);
    let item = userData.cart.find((val) => valIteam._id === val._id);
    userData.historyOfCart.push(item);
    userData.cart.splice(itemIndex, 1);
    setUserData({ ...userData });
  };

  const addProductToSelectedIteamToPay = async (valProduct, indexProduct) => {
    try {
      const res = await axios.post("/productChooseToTrue", {
        indexProduct: indexProduct,
        userId: userData._id,
      });
      const data = await res.data;
      if (data === "product choose switch to true") {
        valProduct.choose = true;
        selectedIteamToPay.push(valProduct);
        setSelectedIteamToPay([...selectedIteamToPay]);
        setUserData({ ...userData });
      } else {
        alert(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProductFromSelectedIteamToPay = async (
    valProduct,
    indexProduct
  ) => {
    try {
      const res = await axios.post("/productChooseToFalse", {
        indexProduct: indexProduct,
        userId: userData._id,
      });
      const data = await res.data;
      if ("product choose switch to false") {
        valProduct.choose = false;
        deleteProductFromSelectedIteamUi()
      } else {
        alert(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProductFromSelectedIteamUi = (indexProduct) => {
    selectedIteamToPay.splice(indexProduct, 1);
    setSelectedIteamToPay([...selectedIteamToPay]);
    setUserData({ ...userData });
  }
  return (
    <div className="App">
      <BrowserRouter>
        <contextApi.Provider
          value={{
            userData,
            setUserData,
            products,
            userConnect,
            userDisconnect,
            addToCart,
            deleteFromCart,
            paymentCart,
            selectedIteamToPay,
            setSelectedIteamToPay,
            addProductToSelectedIteamToPay,
            deleteProductFromSelectedIteamToPay,
            deleteProductFromSelectedIteamUi
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
              element={<Products products={products} />}
            />
            <Route path={ROUTES.SEARCH} element={<Search url={"getPlus"} />} />
            <Route path={ROUTES.CART} element={<Cart />} />
            <Route
              path={ROUTES.PAGENOTFOUND}
              element={<h2>page not found..</h2>}
            />
            <Route path={ROUTES.PROFILE} element={<Profile />}>
              <Route path="edit" element={<SignUp url="edit" />} />
              <Route path="deleteAccount" element={<DeleteAccount />} />
              <Route path="viewPurchases" element={<ViewPurchases />} />
            </Route>
          </Routes>
        </contextApi.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
