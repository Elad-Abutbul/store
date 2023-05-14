import "./App.css";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { contextApi } from "./contextApi";
import useProductData from "./outSideFunction/functionApp/GetAllProducts";
import usePaymentCart from "./outSideFunction/functionApp/PaymentCart";
import AppRoutes from "./outSideFunction/functionApp/AppRoutes";
import useAddProductToPay from "./outSideFunction/functionApp/AddProductToSelectedPay";
import useDeleteProductFromPay from "./outSideFunction/functionApp/DeleteProductFromSelectedPay";
function App() {
  const { pay, userData, setUserData } = usePaymentCart();
  const { deleteProduct } = useDeleteProductFromPay();
  const { selectedIteamToPay, setSelectedIteamToPay, addProduct } =
    useAddProductToPay();
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
    addProduct(valProduct, indexProduct, userData);
  };
  const deleteProductFromSelectedIteamToPay = (valProduct,indexProduct,userData,selectedIteamToPay,setSelectedIteamToPay) => {
    deleteProduct(
      valProduct,
      indexProduct,
      userData,
      selectedIteamToPay,
      setSelectedIteamToPay
    );
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
            setSelectedIteamToPay,
            addProductToSelectedIteamToPay,
            deleteProductFromSelectedIteamToPay,
            payProductFromSelectedIteamToPayUi,
            deleteProductFromSelectedIteamToPayUi,
          }}
        >
          <AppRoutes />
        </contextApi.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
