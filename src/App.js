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
import { ROUTES, URL } from "./constans/constans";
import { contextApi } from "./contextApi";
import Profile from "./comps/profile/Profile";
import ViewPurchases from "./comps/profile/comps/ViewPurchases";
import DeleteAccount from "./comps/profile/comps/DeleteAccount";
import Rings from "./comps/products/comps/Rings";
import Earrings from "./comps/products/comps/Earrings";
import Bracelets from "./comps/products/comps/Bracelets";
import Necklaces from "./comps/products/comps/Necklaces";
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
        const resRing = await axios.get("/allProductsOfRing");
        const dataRing = await resRing.data;
        setRingProducts(dataRing);
        const resBracelet = await axios.get("/allProductsOfBracelet");
        const dataBracelet = await resBracelet.data;
        setBraceletProducts(dataBracelet);
        const resNecklace = await axios.get("/allProductsOfNecklace");
        const dataNecklace = await resNecklace.data;
        setNecklaceProducts(dataNecklace);
        const resEarring = await axios.get("/allProductsOfEarring");
        const dataEarring = await resEarring.data;
        setEarringProducts(dataEarring);

        setTypeProductImg([
          {
            link: ROUTES.RINGS,
            src: "https://static.wixstatic.com/media/c77c68_f7328ff35fa04b51b29e3a7edc785734~mv2.png/v1/crop/x_343,y_0,w_1362,h_2048/fill/w_213,h_320,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/IMG-1226_edited.png",
            alt: "ring",
            button: "Rings",
          },
          {
            link: ROUTES.BRACELETS,
            src: "https://static.wixstatic.com/media/c77c68_5ec1285841c843ef8f6c68ae1bbb9bfd~mv2.png/v1/crop/x_171,y_0,w_1707,h_2048/fill/w_234,h_281,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/IMG-1228_edited.png",
            alt: "bracelets",
            button: "Bracelets",
          },
          {
            link: ROUTES.NECKLACES,
            src: "https://static.wixstatic.com/media/c77c68_f42e68e7482e4424bd8060ea33cb9d77~mv2.png/v1/crop/x_343,y_0,w_1362,h_2048/fill/w_213,h_320,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/IMG-1227_edited.png",
            alt: "necklaces",
            button: "Necklaces",
          },
          {
            link: ROUTES.EARRINGS,
            src: "https://static.wixstatic.com/media/c77c68_5ac03aa4931446e68292fd520a47d94e~mv2.png/v1/crop/x_0,y_29,w_2048,h_1990/fill/w_254,h_254,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/IMG-1225_edited.png",
            alt: "earrings",
            button: "Earrings",
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

  const paymentCart = (valIteam) => {
    let itemIndex = userData.cart.findIndex((val) => valIteam._id === val._id);
    userData.historyOfCart.unshift(valIteam);
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
        deleteProductFromSelectedIteamUi(indexProduct);
      } else {
        alert(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProductFromSelectedIteamUi = (indexProduct) => {
    if (indexProduct !== undefined) {
      debugger
      selectedIteamToPay.splice(indexProduct, 1);
      setSelectedIteamToPay([...selectedIteamToPay]);
      setUserData({ ...userData });
    }

  };
  return (
    <div className="App">
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
            deleteProductFromSelectedIteamUi,
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
              element={<Products ringProducts={ringProducts} />}
            />
            <Route path={ROUTES.RINGS} element={<Rings />} />
            <Route path={ROUTES.EARRINGS} element={<Earrings />} />
            <Route path={ROUTES.BRACELETS} element={<Bracelets />} />
            <Route path={ROUTES.NECKLACES} element={<Necklaces />} />

            <Route path={ROUTES.SEARCH} element={<Search url={"getPlus"} />} />
            <Route path={ROUTES.CART} element={<Cart />} />

            <Route path={ROUTES.PROFILE} element={<Profile />}>
              <Route path={ROUTES.EDIT} element={<SignUp url={URL.EDIT} />} />
              <Route path={ROUTES.DELETEACCOUNT} element={<DeleteAccount />} />
              <Route path={ROUTES.VIEWPURCHASES} element={<ViewPurchases />} />
            </Route>
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
