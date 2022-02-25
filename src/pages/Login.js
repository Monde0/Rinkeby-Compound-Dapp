import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import metamaskIcon from "../assets/ic-metamask.png";
import Web3 from "web3";

const Login = () => {
 const [user, setUser] = useState("");
  
  const navigate = useNavigate();

  function loginWithMetamask() {
    let provider = window.ethereum;
    if (typeof provider !== "undefined") {
      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          setUser(accounts);
          navigate('/supply');
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const web3 = new Web3(provider);
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-title">
          Simple Compound ETH dapp
          <br />
          Rinkeby Network
        </div>
        <div className="login-desc">Start earning now</div>
        <div className="login-btn" onClick={() => loginWithMetamask()}>
          <img src={metamaskIcon} className="mm-icon" />
          <div>Sign in with Metamask</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
