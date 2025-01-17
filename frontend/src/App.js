import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./Components/Product/Product";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import NavBar from "./Components/Nav/NavBar";
import New from './Components/New/New';
import StatusPage from "./Components/Status/Status";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/products' element={<Product />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/news" element={<New />} />
        <Route path='/status' element={<StatusPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
