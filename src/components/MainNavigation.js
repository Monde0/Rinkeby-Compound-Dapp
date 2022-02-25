import { Link, NavLink } from "react-router-dom";
import "./mainnav.css";

const MainNavigation = () => {
    return (
        <div className="nav-bar">
            <Link to="/supply"><div className="nav-box">Supply</div></Link>
            <Link to="/withdraw"><div className="nav-box">Withdraw</div></Link>
        </div>
    );
}

export default MainNavigation;