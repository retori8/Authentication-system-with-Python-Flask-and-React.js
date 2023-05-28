import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { FiCommand } from "react-icons/fi";

export const Card = (props) => {
  const { store, actions } = useContext(Context);

  return (
    <div className="col text-center">
      <div className="fondo card h-100">
        <img src={props.img} className="card-img-top p-3" alt="..." />
        <div className="card-body">
          <h6 className="card-title">Titulo:{props.titulo}</h6>
          <p className="card-text">Año:{props.año}</p>
          <h6>
            <FiCommand />
          </h6>
        </div>
      </div>
    </div>
  );
};
