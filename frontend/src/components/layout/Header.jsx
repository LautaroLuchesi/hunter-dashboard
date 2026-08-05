import { Link } from "react-router-dom";

import logoGout from "../../assets/Logo_gout.png";
import logoHunter from "../../assets/Logo_hunter.png";

import "../../styles/layout/Header.css";

function Header({
    title,
    date,
    buttonText,
    buttonLink
}) {

    return (

        <header className="app-header">

            <div className="app-header-left">

                <div className="app-header-logos">

                    <img
                        src={logoGout}
                        alt="GOUT"
                        className="dashboard-logo"
                    />

                    <img
                        src={logoHunter}
                        alt="Hunter"
                        className="dashboard-logo"
                    />

                </div>

                <div>

                    <span className="app-company">
                        GOUT ARGENTINA
                    </span>

                    <h1 className="app-title">
                        {title}
                    </h1>

                </div>

            </div>

            <div className="app-header-right">

                {date && (
                    <div className="header-date">
                        📅 {date}
                    </div>
                )}

                {buttonText && buttonLink && (

                    <Link
                        to={buttonLink}
                        className="header-button"
                    >
                        {buttonText}
                    </Link>

                )}

            </div>

        </header>

    );

}

export default Header;