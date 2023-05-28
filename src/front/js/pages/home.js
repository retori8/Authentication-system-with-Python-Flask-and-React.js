import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <div className="home card w-50 text-center">
        <div className="card-body"></div>
        <div className="boton-registro">
          <Link
            className="registrate nav-link text-dark"
            aria-current="page"
            to="/registro"
          >
            <button type="submit" className="registrate btn btn-block p-2 ">
              <strong>Registrarme</strong>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
