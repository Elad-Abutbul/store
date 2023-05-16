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
import { LOADING } from "../../constans/hardCoded/appRoutes/Loading";
import { NOTFOUND } from "../../constans/hardCoded/appRoutes/NotFound";
import { contextApi } from "../../contextApi";
export default function AppRoutes() {
  const valContext = useContext(contextApi);
  return (
    <BrowserRouter>
      <Routes>
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
          </Route>
        </Route>
        <Route
          path={ROUTES.ENTRY}
          element={valContext.loading ? <h1>{LOADING.LOADING}</h1> : <LogIn />}
        />
        <Route path={ROUTES.SIGNUP} element={<SignUp />} />
        <Route
          path={ROUTES.PAGENOTFOUND}
          element={<h2>{NOTFOUND.NOTFOUND}</h2>}
        />
      </Routes>
    </BrowserRouter>
  );
}
