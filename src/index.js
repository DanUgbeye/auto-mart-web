import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "../src/assets/fontawesome/css/all.min.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import SecondaryLayout from "./layouts/secondaryLayout";
import Home from "./pages/home";
import Profile from "./pages/profile";
import MarketPlace from "./pages/marketPlace";
import CreateAdvert from "./pages/createAdvert";
import Buy from "./pages/buy";
import NotFound from "./pages/notFound";
import SignUp from "./pages/signup";
import Adverts from "./layouts/adverts";
import UserAdverts from "./pages/userAdverts";
import UserContextProvider from "./contexts/user.context";
import MarketPlaceLayout from "./layouts/marketPlaceLayout";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route element={<SecondaryLayout />}>
              <Route path="marketplace" element={<MarketPlaceLayout />}>
                <Route index element={<MarketPlace />} />
                <Route path="buy/:id" element={<Buy />} />
              </Route>
              <Route path="profile" element={<Profile />} />
              <Route path="advert" element={<Adverts />}>
                <Route index element={<UserAdverts />} />
                <Route path="create" element={<CreateAdvert />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
