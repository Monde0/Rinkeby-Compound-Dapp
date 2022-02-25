import "./Layout.css";
import { Fragment } from "react";
import MainNavigation from "./MainNavigation";
import Header from "./Header";
import PriceWidget from "./PriceWidget";

const Layout = (props) => {
  return (
    <Fragment>
      <div className="layout-container">
        <div className="head-bg"></div>
        <Header />
        <MainNavigation />
        <main>{props.children}</main>
        <PriceWidget />
      </div>
    </Fragment>
  );
};

export default Layout;
