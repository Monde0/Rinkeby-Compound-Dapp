import React, { useEffect, useState } from "react";
import "./Mainpage.css";
import ethIcon from "../assets/ic-eth.png";
import PriceWidget from "../components/PriceWidget";
import Web3 from "web3";
import Modal from "react-modal";
import {
  getSupplyAPY,
  getTotalSupply,
  mintTokens,
  getExchangeRate,
  getMySupply,
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

const Supply = () => {
  const [user, setUser] = useState();

  const [balance, setBalance] = useState(0);
  const [weiBalance, setWeiBalance] = useState(0);

  const [supply, setSupply] = useState(0);
  const [receiving, setReceiving] = useState(0);

  const [mySupply, setMySupply] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [supplyAPY, setSupplyAPY] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);

  const [showErr, setShowErr] = useState(false);
  const [modalisOpen, setIsopen] = useState(false);

  let provider = window.ethereum;
  const web3 = new Web3(provider);

  async function getAccount() {
    try {
      const data = await web3.eth.getAccounts();
      setUser(data[0]);
      web3.eth.getBalance(data[0]).then((balance) => {
        setWeiBalance(balance);
        setBalance(parseFloat(web3.utils.fromWei(balance, "ether")));
        getMySupply(data[0]).then((supp) => setMySupply(supp));
      });
    } catch (err) {
      console.log(err);
    }
  }

  function mint() {
    if (supply > balance || supply == 0) {
      setShowErr(true);
    } else {
      setShowErr(false);
      mintTokens(user, supply).then(setIsopen(true));
      setSupply(0);
      setReceiving(0);
    }
  }

  useEffect(() => {
    getAccount();
    getSupplyAPY().then((apy) => setSupplyAPY(apy));
    getExchangeRate().then((ex) => {
      setExchangeRate(ex);
      getTotalSupply().then((total) => setTotalSupply(total * ex));
    });
  }, [mint]);

  return (
    <>
      <div className="status-container">
        <div className="status-box left">
          <div className="status-title">Your Supply</div>
          {mySupply.toFixed(4)} ETH
        </div>
        <div className="status-box left">
          <div className="status-title">Total Supplied</div>
          {totalSupply.toFixed(2)} ETH
        </div>
        <div className="status-box">
          <div className="status-title">APY</div>
          100.{parseInt(supplyAPY)}%
        </div>
      </div>
      <div className="input-container supply">
        <div className="input-title">Supply</div>
        <div className="balance">Balance: {balance} ETH</div>
        <div className="input-row">
          <div className="input-box coin">
            <img alt="ethLogo" src={ethIcon} className="coinicon" />
            ETH
          </div>
          <div className="input-box value">
            <div
              className="maxbtn"
              onClick={() => {
                setSupply(balance);
                setReceiving(balance / exchangeRate);
              }}
            >
              MAX
            </div>
            <input
              type="number"
              className="valuebox"
              onChange={(e) => {
                setSupply(e.target.value);
                setReceiving(e.target.value / exchangeRate);
              }}
              value={supply}
            />
            <div className="currency">ETH</div>
          </div>
        </div>
        <div className="receiving">
          Receiving
          <div>{receiving.toFixed(2)} cETH</div>
        </div>
        <div className="submit-btn" onClick={() => mint()}>
          Supply
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

export default Supply;
