import { useState } from "react";
import "./NavbarStyle.css";
import { MenuItems } from "./MenuItems";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

    const handleStartChat = () => {
        navigate(isLoggedIn ? '/chat' : '/signup');
    };

    return (
        <nav className="NavbarItems">
            <h1 className="Navbar-logo">InnerBloom</h1>

            <div className="menu-icons" onClick={() => setClicked(!clicked)}>
                <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>

            <ul className={clicked ? "Nav-menu active" : "Nav-menu"}>
                {MenuItems.map((item, index) => (
                    <li key={index}>
                        <Link className={item.cName} to={item.url}>
                            <i className={item.icon}></i>{item.title}
                        </Link>
                    </li>
                ))}
                <button onClick={handleStartChat}>
                    {isLoggedIn ? 'Go to Dashboard' : 'Start Chat'}
                </button>
            </ul>
        </nav>
    );
};

export default Navbar;