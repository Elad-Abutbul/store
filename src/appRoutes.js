import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Profile from "./comps/profile/Profile";
import ViewPurchases from "./comps/profile/comps/ViewPurchases";
import DeleteAccount from "./comps/profile/comps/DeleteAccount";
import Rings from "./comps/products/comps/Rings";
import Earrings from "./comps/products/comps/Earrings";
import Bracelets from "./comps/products/comps/Bracelets";
import Necklaces from "./comps/products/comps/Necklaces";
import Nav from './comps/Nav'
import { ROUTES, URL } from "./constans/constans";

export default function appRoutes() {
     return (
          <BrowserRouter>
        
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
        </BrowserRouter>
     )
}