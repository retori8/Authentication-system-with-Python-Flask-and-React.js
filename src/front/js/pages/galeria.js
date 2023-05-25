import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Card } from "../component/card";

export const Galeria = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4 m-3">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};