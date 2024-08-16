// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Signup } from "./components/Signup.js";
import { Signin } from "./components/Signin.js";
import { Dashboard } from "./components/Dashboard.js";
import { Sellpost } from "./components/Sellpost.js";
import { Userprofile } from "./components/Userprofile.js";
import { Waitingarea } from "./components/Waitingarea.js";
import { Landpage } from "./components/Landpage.js";
import { ThemeProvider } from "./ThemeContext";
import { Fullpost } from "./components/Fullpost.js";
import { Requestedposts } from "./components/Requestedposts.js";
import { Payment } from "./components/Payment.js";
import { Footer } from "./components/Footer.js";
import { Forgot } from "./components/Forgot.js";
import { Testing } from "./components/Testing.js";
import { Setprofile } from "./components/Setprofile.js";

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Landpage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/mail-confirm" element={<Waitingarea />} />
        <Route path="/setprofile" element={<Setprofile />} />

        <Route path="/change/password" element={<Forgot />} />
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/post_view" element={<Fullpost />} />
        <Route path="/user/profile" element={<Userprofile />} />
        <Route path="/user/sell-post" element={<Sellpost />} />
        <Route path="/requested" element={<Requestedposts />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/foot" element={<Testing />} />
      </Routes>
    </ThemeProvider>
  );
};
export default App;
