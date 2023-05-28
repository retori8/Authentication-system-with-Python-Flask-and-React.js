import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navitgate = useNavigate();
  return (
    <nav className="navbar">
      <div className=" container">
        <Link className="logo" to="/">
          <h1> Murakami</h1>
        </Link>
        <div className="ml-auto">
          <button
            type="button"
            className="btnNavbar btn px-3"
            aria-current="page"
            onClick={(e) => actions.comprobarLogin(navitgate)}
          >
            <strong>{store.currentUser ? "Cerrar Sesión" : "Ingresar"}</strong>
          </button>
        </div>
      </div>
    </nav>
  );
};
