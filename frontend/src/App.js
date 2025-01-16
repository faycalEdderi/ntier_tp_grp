import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./Components/Product/Product";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import NavBar from "./Components/Nav/NavBar";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/products' element={<Product />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
