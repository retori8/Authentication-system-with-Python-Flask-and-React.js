import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";
import { FiCommand } from "react-icons/fi";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navitgate = useNavigate()
  return (
    <nav className="navbar">
      <div className=" container">
        <Link className="logo" to="/">
          <h1> Murakami</h1> 
        </Link>
        <div className="ml-auto">
          <button
            type="button"
            className="btnNavbar btn"
            aria-current="page"
            onClick={(e) => actions.comprobarLogin(navitgate)}
          >
            {store.currentUser ? "Cerrar Sesión" : "Ingresar"}
          </button>
        </div>
      </div>
    </nav>
  );
};
