import React, {useEffect, useState} from "react";
import './Widget.css';
import ethIcon from "../assets/ic-eth.png";
import { getETHPrice } from "../api/Exchange";

const PriceWidget = () => {
    const [price, setPrice] = useState("Loading");

    useEffect(() => {
        getETHPrice().then((data) => setPrice(data));
    }, [])

    return (
        <div className="exchange-box">
            <div className="exchange-title">Exchange rate</div>
            <div className="exchange-row">
                <div>
                    <img alt="ethLogo" src={ethIcon} className="coinicon"/>
                    ETH
                </div>
                <div>$ {price}</div>
            </div>
        </div>
    );

}

export default PriceWidget;