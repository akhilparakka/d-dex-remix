import { Link, NavLink, Outlet } from "@remix-run/react";
import homeCssRef from "../styles/home.css?url";
import MinidenticonImg from "../components/minidenticon";
import { useEffect, useState } from "react";

export const links = () => [{ rel: "stylesheet", href: homeCssRef }];

const homeNavbar = [
  { name: "Markets", route: "/home/markets" },
  { name: "Swap", route: "/home/swap" },
  { name: "AMM", route: "/home/amm" },
  { name: "Wallet", route: "/home/wallet" },
];

export default function Home() {
  const [storedPublicKey, setStoredPublicKey] = useState("");

  useEffect(() => {
    setStoredPublicKey(
      JSON.parse(localStorage.getItem("diam_publicKeys"))[0].diamPublicKey
    );
  }, []);

  return (
    <div className="home">
      <header className="header">
        <div className="header_left">
          <div className="svg_container">
            <Link to="/home/markets">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="123"
                height="24"
                viewBox="0 0 123 24"
              >
                <path d="M22.071 0v5.733h2.34v3.889h-2.34v13.805H16.8V9.622h-2.24V5.733h2.24V0h5.272zm11.786 5.206c5.634 0 9.489 4.053 9.489 10.643v.56H30.001c.462 1.878 1.812 2.866 4.086 2.866 1.054 0 1.911-.296 2.702-.988h5.733c-1.714 3.69-4.646 5.568-8.6 5.568-2.702 0-4.876-.922-6.689-2.833-1.713-1.813-2.602-4.053-2.602-6.557 0-2.471.955-4.745 2.701-6.491 1.78-1.78 4.119-2.768 6.525-2.768zm-4.02 7.513h8.27c-.627-1.813-2.109-2.801-4.185-2.801-2.175 0-3.723 1.12-4.086 2.8zm15.685 10.708V0h5.173v23.427h-5.173zm8.507 0V0H59.2v23.427h-5.17zM75.125 7.71V5.734h5.206v17.693h-5.04v-1.976c-1.55 1.515-3.13 2.075-5.24 2.075-2.141 0-3.986-.692-5.536-2.075-2.042-1.813-3.097-4.186-3.097-6.953 0-2.538.989-4.811 2.834-6.59C65.9 6.293 67.91 5.47 70.15 5.47c2.142 0 3.79.724 4.975 2.24zm-3.92 11.104c2.24 0 4.118-1.845 4.118-4.283 0-2.537-1.878-4.449-4.316-4.449-2.471 0-4.383 2.01-4.383 4.383 0 2.47 1.912 4.35 4.58 4.35zm12.274 4.613V5.734h5.272v17.693h-5.272zM93.914 5.47a3.503 3.503 0 110 7.006 3.503 3.503 0 010-7.006zm15.855 9.169l-6.17-8.906h6.36l3.031 4.319 1.257-1.791 1.775-2.528h6.358l-1.751 2.528-1.24 1.79h-6.399l.517.738 1.775 2.527 7.098 10.111h-6.522l-2.868-4.14-1.117 1.612-1.751 2.528h-6.523l1.775-2.528 4.395-6.26zM8.402 12.455c3.624.989 5.436 2.372 5.436 5.305 0 3.558-2.8 6.128-7.084 6.128C2.8 23.888.362 21.747 0 18.155h4.91v.165c0 .988.79 1.68 1.91 1.68 1.121 0 1.78-.56 1.78-1.548 0-1.45-1.417-1.384-3.625-2.076C1.911 15.42.428 13.773.428 11.104c0-3.46 2.537-5.898 6.755-5.898 3.657 0 5.996 2.076 6.195 5.437H8.666c-.198-1.154-.627-1.648-1.549-1.648-1.022 0-1.614.593-1.614 1.45 0 1.22 1.087 1.515 2.899 2.01z"></path>
              </svg>
            </Link>
          </div>
          <div className="home_nav">
            <ul>
              {homeNavbar.map((nav, index) => (
                <li key={index}>
                  <NavLink
                    to={nav.route}
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active" : ""
                    }
                  >
                    {nav.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="header_right">
          <div className="address_box">
            <div className="identicon">
              <MinidenticonImg username={storedPublicKey} saturation="90" />
            </div>
            <span>{`${storedPublicKey.slice(0, 6)}...${storedPublicKey.slice(
              -6
            )}`}</span>
          </div>
          <div className="button_box">
            <button className="money_button">Deposit</button>
            <button className="money_button">Withdraw</button>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
