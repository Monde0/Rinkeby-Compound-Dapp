import { React, useEffect, useState } from "react";
import "./Layout.css";
import { getMyAccount } from "../api/Compound";

const Header = () => {
  const [account, setAccount] = useState("");

  useEffect(() => {
    getMyAccount().then((acc) => setAccount(acc));
  }, []);

  return <div className="header">Signed in as {account}</div>;
};

export default Header;
