import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import Account from "./pages/Account";
import UpdatePassword from "./pages/UpdatePassword";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/updatePassword" element={<UpdatePassword />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
