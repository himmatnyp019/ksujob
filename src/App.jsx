import React from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar/Navbar.jsx"
import Home from "./pages/Home/Home"
import JobDetail from "../components/JobDetail/JobDetail"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Login from "./pages/Login/Login.jsx";

const App = () => {
  return (
    <div id="app">
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        draggable
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="colored"
      ></ToastContainer>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/detail" element={<JobDetail />} />
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/login" element={<Login/>} ></Route>
      </Routes>

      <Footer />

    </div>
  );
};

export default App;
