import "./App.css";
import { useEffect, useState } from "react";
import { contextApi } from "./contextApi";
import useProductData from "./outSideFunction/functionApp/GetAllProducts";
import usePaymentCart from "./outSideFunction/functionApp/PaymentCart";
import AppRoutes from "./outSideFunction/functionApp/AppRoutes";
import useAddProductToPay from "./outSideFunction/functionApp/AddProductToSelectedPay";
import useDeleteProductFromPay from "./outSideFunction/functionApp/DeleteProductFromSelectedPay";
import useRankUser from "./outSideFunction/functionMng/GetUserRank";
function App() {
  const [selectedIteamToPay, setSelectedIteamToPay] = useState([]);
  const { pay, userData, setUserData } = usePaymentCart();
  const { deleteProduct } = useDeleteProductFromPay();
  const { addProduct } = useAddProductToPay();
  const { getAllUserRank, rankUser, setRankUser } = useRankUser();
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
  const addProductToSelectedIteamToPay = (valProduct, indexProduct) => {
    addProduct(
      valProduct,
      indexProduct,
      userData,
      selectedIteamToPay,
      setSelectedIteamToPay
    );
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
        }}
      >
        <AppRoutes />
      </contextApi.Provider>
    </div>
  );
}

export default App;
