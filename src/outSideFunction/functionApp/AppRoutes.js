import React, { useContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Profile from "../../comps/profile/Profile";
import ViewPurchases from "../../comps/profile/comps/ViewPurchases";
import DeleteAccount from "../../comps/profile/comps/DeleteAccount";
import Rings from "../../comps/products/comps/Rings";
import Earrings from "../../comps/products/comps/Earrings";
import Bracelets from "../../comps/products/comps/Bracelets";
import Necklaces from "../../comps/products/comps/Necklaces";
import Nav from "../../comps/Nav";
import Products from "../../comps/products/Products";
import Search from "../../comps/Search";
import Cart from "../../comps/Cart";
import SignUp from "../../comps/SignUp";
import LogIn from "../../comps/LogIn";
import { ROUTES } from "../../constans/Routes";
import { URL } from "../../constans/Url";
import { contextApi } from "../../contextApi";
import Users from "../../comps/management/comps/usersMng/Users";
import Data from "../../comps/management/comps/profileMng/Data";
import { RANKSUSER } from "../../constans/RanksUser";
import Cookies from "js-cookie";
import { JWT } from "../../constans/jwtToken";
import ListOfAllUsers from "../../comps/management/comps/usersMng/comps/ListOfAllUsers";
import ListOfAllDeletingUsers from "../../comps/management/comps/usersMng/comps/ListOfAllDeletingUsers";
import Loading from "../../comps/Loading";
import ProductsCEO from "../../comps/management/comps/productsMng/ProductsCEO";
import AddProducts from "../../comps/management/comps/productsMng/comps/addProductsCeo/AddProducts";
import ListOfDeletingProducts from "../../comps/management/comps/productsMng/comps/ListOfDeletingProducts";
import EditProduct from "../../comps/management/comps/productsMng/EditProduct.jsx/EditProduct";
export default function AppRoutes() {
  const valContext = useContext(contextApi);
  const token = Cookies.get(JWT.TOKEN);
  return (
    <BrowserRouter>
      <Routes>
        {token && (
          <Route path={ROUTES.ELADJEWELRY} element={<Nav />}>
            <Route path={ROUTES.PRODUCTS} element={<Products />} />
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
              <Route path={ROUTES.DATA} element={<Data />} />
            </Route>

            {valContext.userData?.rank === RANKSUSER.CEO && (
              <>
                <Route path={ROUTES.USERSCEO} element={<Users />}>
                  <Route
                    path={ROUTES.LIST_OF_ALL_USERS}
                    element={<ListOfAllUsers />}
                  />
                  <Route
                    path={ROUTES.LIST_OF_DELETING_USERS}
                    element={<ListOfAllDeletingUsers />}
                  />
                </Route>
                <Route path={ROUTES.PRODUCTSCEO} element={<ProductsCEO />}>
                  <Route path={ROUTES.ADDPRODUCTS} element={<AddProducts />} />
                  <Route
                    path={ROUTES.LIST_OF_DELETING_PRODUCTS}
                    element={<ListOfDeletingProducts />}
                  />
                </Route>
                {valContext.allProducts.map((product) => {
                  return (
                    <Route
                      path={`${ROUTES.ELADJEWELRY}${ROUTES.EDITPRODUCT}/${product.type}`}
                      element={<EditProduct />}
                    />
                  );
                })}
              </>
            )}
          </Route>
        )}
        <Route
          path={ROUTES.ENTRY}
          element={valContext.loading ? <Loading /> : <LogIn />}
        />
        <Route path={ROUTES.SIGNUP} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
