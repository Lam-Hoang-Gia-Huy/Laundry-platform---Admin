import React from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/SideBar/Sidebar";
import Order from "./components/OrderList/Order";
import Store from "./components/StoreList/Store";
import User from "./components/UserList/User";
import Home from "./components/AdminHome/Home";
import StoreManager from "./components/StoreList/StoreManager";
import UserProfile from "./components/UserList/UserProfile/UserProfile";
import StoreProfile from "./components/StoreList/StoreProfile";
import OrderDetails from "./components/OrderList/OrderDetail";
import StoreBio from "./components/StoreList/StoreBio";
import StoreService from "./components/StoreList/StoreService";
import { AppProvider } from "./ContextProvider";

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <AppProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<Order />} />
            <Route path="/store" element={<Store />} />
            <Route path="/user" element={<User />} />
            <Route path="/storemanager" element={<StoreManager />} />
            <Route path="/userDetails/:id" element={<UserProfile />} />
            <Route
              path="/storeDetails/:id/bio"
              element={
                <>
                  <StoreProfile />
                  <StoreBio />
                </>
              }
            />
            <Route
              path="/storeDetails/:id/service"
              element={
                <>
                  <StoreProfile />
                  <StoreService />
                </>
              }
            />

            <Route path="/OrderDetails/:id" element={<OrderDetails />} />
          </Routes>
        </AppProvider>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
