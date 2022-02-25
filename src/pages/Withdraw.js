import React, { useState, useEffect } from "react";
import "./Mainpage.css";
import ethIcon from "../assets/ic-eth.png";
import Modal from "react-modal";
import Web3 from "web3";
import {
  getCTokenBalance,
  getExchangeRate,
  withdrawToken,
} from "../api/Compound";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const WithDraw = () => {
  const [user, setUser] = useState();

  const [withdraw, setWithdraw] = useState(0);
  const [balance, setBalance] = useState(0);
  const [received, setReceived] = useState(0);

  const [showErr, setShowErr] = useState(false);
  const [modalisOpen, setIsopen] = useState(false);

  const [exchangeRate, setExchangeRate] = useState(0);

  let provider = window.ethereum;
  const web3 = new Web3(provider);

  async function getAccount() {
    try {
      const data = await web3.eth.getAccounts();
      setUser(data[0]);
      getCTokenBalance(data[0]).then((dep) => setBalance(dep));
    } catch (err) {
      console.log(err);
    }
  }

  function withdrawCompound() {
    if (withdraw > balance || withdraw == 0) {
      setShowErr(true);
    } else {
      setShowErr(false);
      withdrawToken(user, withdraw).then(setIsopen(true));
      setWithdraw(0);
      setReceived(0);
    }
  }

  useEffect(() => {
    getAccount();
    getExchangeRate().then((ex) => setExchangeRate(ex));
  }, [withdrawCompound]);

  return (
    <>
      <div className="input-container withdraw">
        <div className="input-title">Withdraw</div>
        <div className="balance">Depositted: {balance} cETH</div>
        <div className="input-row">
          <div className="input-box coin">
            <img alt="ethLogo" src={ethIcon} className="coinicon" />
            ETH
          </div>
          <div className="input-box value">
            <div
              className="maxbtn"
              onClick={() => {
                setWithdraw(balance);
                setReceived((balance * exchangeRate).toFixed(4));
              }}
            >
              MAX
            </div>
            <input
              type="number"
              className="valuebox"
              onChange={(e) => {
                setWithdraw(e.target.value);
                setReceived((e.target.value * exchangeRate).toFixed(4));
              }}
              value={withdraw}
            />
            <div className="currency">cETH</div>
          </div>
        </div>
        <div className="receiving">
          Receiving Estimated
          <div>{received} ETH</div>
        </div>
        <div className="submit-btn" onClick={() => withdrawCompound()}>
          Withdraw
        </div>
        {showErr && <div className="erroramount">Not enough balance</div>}
      </div>
      <Modal
        isOpen={modalisOpen}
        style={modalStyles}
        onRequestClose={() => setIsopen(false)}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <h2>Transaction Submitted</h2>
        <div className="modal-view">
          Please confirm in Metamask
          <br />
          View on{" "}
          <a
            href="https://rinkeby.etherscan.io/address/0xd6801a1DfFCd0a410336Ef88DeF4320D6DF1883e"
            target="_blank"
          >
            Etherscan
          </a>
        </div>
        <div className="modal-btn" onClick={() => setIsopen(false)}>
          Done
        </div>
      </Modal>
    </>
  );
};

export default WithDraw;
