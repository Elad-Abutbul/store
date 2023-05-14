import "./App.css";
import { useEffect, useState } from "react";
import { contextApi } from "./contextApi";
import useProductData from "./outSideFunction/functionApp/GetAllProducts";
import usePaymentCart from "./outSideFunction/functionApp/PaymentCart";
import AppRoutes from "./outSideFunction/functionApp/AppRoutes";
import useAddProductToPay from "./outSideFunction/functionApp/AddProductToSelectedPay";
import useDeleteProductFromPay from "./outSideFunction/functionApp/DeleteProductFromSelectedPay";
function App() {
  const [selectedIteamToPay, setSelectedIteamToPay] = useState([]);
  const { pay, userData, setUserData } = usePaymentCart();
  const { deleteProduct } = useDeleteProductFromPay();
  const { addProduct } = useAddProductToPay();
  const {
    ringProducts,
    braceletProducts,
    necklaceProducts,
    earringProducts,
    typeProductImg,
    loading,
    getAllProducts,
  } = useProductData();
  useEffect(() => {
    getAllProducts(); // Call the getAllProducts function
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
          }}
        >
          <AppRoutes />
        </contextApi.Provider>
    </div>
  );
}

export default App;
