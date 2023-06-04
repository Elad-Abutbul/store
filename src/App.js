import "./App.css";
import { useEffect, useState } from "react";
import { contextApi } from "./contextApi";
import useProductData from "./outSideFunction/functionApp/GetAllProducts";
import usePaymentCart from "./outSideFunction/functionApp/PaymentCart";
import AppRoutes from "./outSideFunction/functionApp/AppRoutes";
import useAddProductToPay from "./outSideFunction/functionApp/AddProductToSelectedPay";
import useDeleteProductFromPay from "./outSideFunction/functionApp/DeleteProductFromSelectedPay";
import useRankUser from "./outSideFunction/functionMng/GetUserRank";
import useSumPurchases from "./outSideFunction/functionApp/getSumPurchases";
import axios from "./axiosConfig";
function App() {
  const [selectedIteamToPay, setSelectedIteamToPay] = useState([]);
  const { pay, userData, setUserData } = usePaymentCart();
  const { deleteProduct } = useDeleteProductFromPay();
  const { addProduct } = useAddProductToPay();
  const { getAllUserRank, rankUser, setRankUser } = useRankUser();
  const { getSumPurchases } = useSumPurchases();
  const [sumAllPurchases, setSumAllPurchases] = useState(0);
  const {
    ringProducts,
    braceletProducts,
    necklaceProducts,
    earringProducts,
    typeProductImg,
    loading,
    getAllProducts,
    allProducts,
    setAllProducts,
  } = useProductData();
  useEffect(() => {
    getAllProducts(); // Call the getAllProducts function
    getAllUserRank();
    getSumPurchases(setSumAllPurchases);
  }, []);
  const userDisconnect = () => {
    setSelectedIteamToPay([]);
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
    pay(valProduct);
    payProductFromSelectedIteamToPayUi();
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
        deleteProductFromSelectedIteamUi(indexProduct, valProduct);
      } else {
        alert(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addProductToSelectedIteamToPay = (valProduct, indexProduct) => {
    addProduct(
      valProduct,
      indexProduct,
      userData,
      selectedIteamToPay,
      setSelectedIteamToPay
    );
  };
  const deleteProductFromSelectedIteamUi = async (indexProduct, valProduct) => {
    if (indexProduct !== undefined) {
      await deleteProduct(
        valProduct,
        indexProduct,
        userData,
        selectedIteamToPay,
        setSelectedIteamToPay
      );
    }
    deleteProductFromSelectedIteamToPayUi();
  };
  const payProductFromSelectedIteamToPayUi = () => {
    setSelectedIteamToPay([]);
  };
  const deleteProductFromSelectedIteamToPayUi = () => {
    let filterArr = selectedIteamToPay.filter(
      (product) => product.choose === true
    );
    setSelectedIteamToPay([...filterArr]);
  };
  const deleteFromRankUser = (userName) => {
    const indexUser = rankUser.findIndex((val) => val.userName === userName);
    rankUser.splice(indexUser, 1);
    setRankUser([...rankUser]);
  };
  const city = (city) => {
    userData.city.push(city);
    setUserData({ ...userData });
  };
  return (
    <div>
      <contextApi.Provider
        value={{
          userData,
          setUserData,
          loading,
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
          payProductFromSelectedIteamToPayUi,
          setSelectedIteamToPay,
          addProductToSelectedIteamToPay,
          deleteProductFromSelectedIteamToPay,
          deleteProductFromSelectedIteamToPayUi,
          rankUser,
          setRankUser,
          getAllUserRank,
          deleteFromRankUser,
          allProducts,
          setAllProducts,
          city,
          sumAllPurchases,
          getSumPurchases,
        }}
      >
        <AppRoutes />
      </contextApi.Provider>
    </div>
  );
}

export default App;
