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
import useProductChooseToFalse from "./outSideFunction/functionApp/ProductChooseToFalse";
function App() {
  const [selectedIteamToPay, setSelectedIteamToPay] = useState([]);
  const { pay, userData, setUserData } = usePaymentCart();
  const { deleteProduct } = useDeleteProductFromPay();
  const { addProduct } = useAddProductToPay();
  const { getAllUserRank, rankUser, setRankUser } = useRankUser();
  const { getSumPurchases } = useSumPurchases();
  const { productChooseToFalse } = useProductChooseToFalse();
  const [sumAllPurchases, setSumAllPurchases] = useState(0);
  const [selectCity, setSelectCity] = useState("");
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
    setRingProducts,
    setBraceletProducts,
    setNecklaceProducts,
    setEarringProducts,
  } = useProductData();
  useEffect(() => {
    getAllProducts(); // Call the getAllProducts function
    getSumPurchases(setSumAllPurchases);
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
    setSelectedIteamToPay([]);
  };
  const deleteProductFromSelectedIteamToPay = async (
    valProduct,
    indexProduct
  ) => {
    productChooseToFalse(
      valProduct,
      indexProduct,
      deleteProductFromSelectedIteamUi,
      userData
    );
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
  const addToRankUser = (name, lastName, userName, password, rank) => {
    const userObj = { name, lastName, userName, password, rank };
    rankUser.unshift(userObj);
    setRankUser([...rankUser]);
  };
  const pushCityToUserData = (city) => {
    userData.city.push(city);
    setUserData({ ...userData });
  };
  const addToListOfDeletingUsersMng = (valUser) => {
    userData.deleteUsers.unshift(valUser);
    setUserData({ ...userData });
  };

  const deleteFromListOfDeletingUsersMng = (userName) => {
    const userIndex = userData.deleteUsers.findIndex(
      (val) => val.userName === userName
    );
    userData.deleteUsers.splice(userIndex, 1);
    setUserData({ ...userData });
  };
  const removeFromDeleteProductListCEO = (nameProduct) => {
    const indexProduct = userData.deleteProducts.findIndex(
      (product) => nameProduct === product.name
    );
    userData.deleteProducts.splice(indexProduct, 1);
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
          setRingProducts,
          setBraceletProducts,
          setNecklaceProducts,
          setEarringProducts,
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
          deleteProductFromSelectedIteamToPayUi,
          rankUser,
          setRankUser,
          getAllUserRank,
          deleteFromRankUser,
          addToRankUser,
          allProducts,
          setAllProducts,
          pushCityToUserData,
          sumAllPurchases,
          getSumPurchases,
          addToListOfDeletingUsersMng,
          deleteFromListOfDeletingUsersMng,
          setSelectCity,
          selectCity,
          removeFromDeleteProductListCEO,
        }}
      >
        <AppRoutes />
      </contextApi.Provider>
    </div>
  );
}

export default App;
