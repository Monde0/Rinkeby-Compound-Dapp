import { Routes, Route, Navigate } from "react-router-dom";
import Supply from "./pages/Supply";
import Withdraw from "./pages/Withdraw";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import { useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Routes>
      <Route path="*" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/supply"
        element={
          <Layout>
            <Supply />
          </Layout>
        }
      />
      <Route
        path="/withdraw"
        element={
          <Layout>
            <Withdraw />{" "}
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
