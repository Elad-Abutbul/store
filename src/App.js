import "./App.css";
import axios from "./axiosConfig";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./comps/LogIn";
import SignUp from "./comps/SignUp";
import Products from "./comps/products/Products";
import Search from "./comps/Search";
import Nav from "./comps/Nav";
import Cart from "./comps/Cart";
import { ROUTES } from "./constans/Routes";
import { URL } from "./constans/Url";
import { contextApi } from "./contextApi";
import Profile from "./comps/profile/Profile";
import ViewPurchases from "./comps/profile/comps/ViewPurchases";
import DeleteAccount from "./comps/profile/comps/DeleteAccount";
import Rings from "./comps/products/comps/Rings";
import Earrings from "./comps/products/comps/Earrings";
import Bracelets from "./comps/products/comps/Bracelets";
import Necklaces from "./comps/products/comps/Necklaces";
import { AXIOS } from "./constans/AxiosGetOnStart";
import { TYPEIMG } from "./constans/TypeproductImg";
import { NOTFOUND } from "./constans/NotFound";
import { LOADING } from "./constans/Loading";

function App() {
  const [ringProducts, setRingProducts] = useState([]);
  const [braceletProducts, setBraceletProducts] = useState([]);
  const [necklaceProducts, setNecklaceProducts] = useState([]);
  const [earringProducts, setEarringProducts] = useState([]);
  const [userData, setUserData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIteamToPay, setSelectedIteamToPay] = useState([]);
  const [typeProductImg, setTypeProductImg] = useState([]);
  useEffect(() => {
    const getAllProducts = async () => {
      setLoading(true);
      try {
        const resRing = await axios.get(AXIOS.ALLRINGS);
        const dataRing = await resRing.data;
        setRingProducts(dataRing);
        const resBracelet = await axios.get(AXIOS.ALLBRACELETS);
        const dataBracelet = await resBracelet.data;
        setBraceletProducts(dataBracelet);
        const resNecklace = await axios.get(AXIOS.ALLNECKLACES);
        const dataNecklace = await resNecklace.data;
        setNecklaceProducts(dataNecklace);
        const resEarring = await axios.get(AXIOS.ALLEARIINGS);
        const dataEarring = await resEarring.data;
        setEarringProducts(dataEarring);
        setTypeProductImg([
          {
            link: ROUTES.RINGS,
            src: TYPEIMG.RINGS.SRC,
            alt: TYPEIMG.RINGS.ALT,
            button: TYPEIMG.RINGS.BUTTON,
          },
          {
            link: ROUTES.BRACELETS,
            src: TYPEIMG.BRACELETS.SRC,
            alt: TYPEIMG.BRACELETS.ALT,
            button: TYPEIMG.BRACELETS.BUTTON,
          },
          {
            link: ROUTES.NECKLACES,
            src: TYPEIMG.NECKLACES.SRC,
            alt: TYPEIMG.NECKLACES.ALT,
            button: TYPEIMG.NECKLACES.BUTTON,
          },
          {
            link: ROUTES.EARRINGS,
            src: TYPEIMG.ERRINGS.SRC,
            alt: TYPEIMG.ERRINGS.ALT,
            button: TYPEIMG.ERRINGS.BUTTON,
          },
        ]);
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

  const paymentCart = (valProduct) => {
    let indexProduct = userData.cart.findIndex(
      (val) => valProduct._id === val._id
    );
    userData.historyOfCart.unshift(valProduct);
    payProductFromSelectedIteamToPayUi();
    userData.cart.splice(indexProduct, 1);
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
        selectedIteamToPay.splice(indexProduct, 1);
        setSelectedIteamToPay([...selectedIteamToPay]);
      } else {
        alert(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const payProductFromSelectedIteamToPayUi = () => {
    setSelectedIteamToPay([]);
  };
  const deleteProductFromSelectedIteamToPayUi = (inedxProductSelected) => {
    selectedIteamToPay.splice(inedxProductSelected, 1);
    setSelectedIteamToPay([...selectedIteamToPay]);
  };
  return (
    <div>
      <BrowserRouter>
        <contextApi.Provider
          value={{
            userData,
            setUserData,
            ringProducts,
            earringProducts,
            braceletProducts,
            necklaceProducts,
            typeProductImg,
            userConnect,
            userDisconnect,
            addToCart,
            deleteFromCart,
            paymentCart,
            selectedIteamToPay,
            setSelectedIteamToPay,
            addProductToSelectedIteamToPay,
            deleteProductFromSelectedIteamToPay,
            payProductFromSelectedIteamToPayUi,
            deleteProductFromSelectedIteamToPayUi,
          }}
        >
          {userData && <Nav />}
          <Routes>
            <Route
              path={ROUTES.ENTRY}
              element={loading ? <h1>{LOADING.LOADING}</h1> : <LogIn />}
            />
            <Route path={ROUTES.SIGNUP} element={<SignUp />} />
            <Route
              path={ROUTES.PRODUCTS}
              element={<Products />}
            />
            <Route path={ROUTES.RINGS} element={<Rings />} />
            <Route path={ROUTES.EARRINGS} element={<Earrings />} />
            <Route path={ROUTES.BRACELETS} element={<Bracelets />} />
            <Route path={ROUTES.NECKLACES} element={<Necklaces />} />

            <Route path={ROUTES.SEARCH} element={<Search />} />
            <Route path={ROUTES.CART} element={<Cart />} />

            <Route path={ROUTES.PROFILE} element={<Profile />}>
              <Route path={ROUTES.EDIT} element={<SignUp url={URL.EDIT} />} />
              <Route path={ROUTES.DELETEACCOUNT} element={<DeleteAccount />} />
              <Route path={ROUTES.VIEWPURCHASES} element={<ViewPurchases />} />
            </Route>
            <Route
              path={ROUTES.PAGENOTFOUND}
              element={<h2>{NOTFOUND.NOTFOUND}</h2>}
            />
          </Routes>
        </contextApi.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
