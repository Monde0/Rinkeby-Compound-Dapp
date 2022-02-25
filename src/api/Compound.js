import Web3 from "web3";
import Compound from "@compound-finance/compound-js";
import { abiJson } from "./AbiJson.js";

let provider = window.ethereum;
const web3 = new Web3(provider);
var compound = new Compound(window.ethereum);

const contractAddress = "0xd6801a1DfFCd0a410336Ef88DeF4320D6DF1883e";
const cEthContract = new web3.eth.Contract(abiJson, contractAddress);

export async function getMyAccount() {
  const data = await web3.eth.getAccounts();
  return data[0];
}

export async function getSupplyAPY() {
  const supplyRate = await cEthContract.methods.supplyRatePerBlock().call();
  const blockperday = 4 * 60 * 24;
  return (((supplyRate / 10 ** 18) * blockperday + 1) ** 365 - 1) * 100;
}

export async function getTotalSupply() {
  const tokens = await cEthContract.methods.totalSupply().call();
  return tokens / 10 ** 8;
}

export async function getExchangeRate() {
  const exchangeRate = await cEthContract.methods.exchangeRateCurrent().call();
  return exchangeRate / Math.pow(10, 18 + 18 - 8);
}

export async function getMySupply(acc) {
  const balanceOfUnderlying =
    web3.utils.toBN(
      await cEthContract.methods.balanceOfUnderlying(acc).call()
    ) /
    10 ** 18;
  return balanceOfUnderlying;
}

export async function getCTokenBalance(acc) {
  const cTokenBalance = await cEthContract.methods.balanceOf(acc).call();
  return cTokenBalance / 10 ** 8;
}

export async function mintTokens(account, eth) {
  const mint = await cEthContract.methods.mint().send({
    from: account,
    value: web3.utils.toHex(web3.utils.toWei(eth, "ether")),
  });
  return mint;
}

export async function withdrawToken(account, ceth) {
  const withdraw = await cEthContract.methods.redeem(ceth * 10 ** 8).send({
    from: account,
  });
  return withdraw;
}
