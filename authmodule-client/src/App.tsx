import React from "react";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import SignUp from "./components/signup/SignUp";
import SignIn from "./components/signIn/SignIn";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
