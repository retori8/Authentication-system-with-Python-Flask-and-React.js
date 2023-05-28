import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Card } from "../component/card";

export const Galeria = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="galeria row row-cols-1 row-cols-md-3 g-5 m-5">
      <Card
        titulo=" Sputnik, mi amor"
        año=" 1999"
        img="https://i.pinimg.com/564x/b6/2c/f5/b62cf5d21f7c47fb3e32c0ea4f3e1824.jpg"
      />
      <Card
        titulo=" Kafka en la orilla"
        año=" 2002"
        img="https://i.pinimg.com/564x/69/da/04/69da04ed8d9a9be03024d885db4f4bcf.jpg"
      />
      <Card
        titulo=" Crónica del pájaro que da cuerda al mundo"
        año=" 1995"
        img="https://i.pinimg.com/564x/8a/23/fc/8a23fc35d26bd9785a493552af64b7e3.jpg"
      />
      <Card
        titulo=" La muerte del comendador"
        año=" 2017"
        img="https://i.pinimg.com/564x/d1/71/ca/d171cae80d2aedd51a808bfcc30598cf.jpg"
      />
      <Card
        titulo=" Tokio blues"
        año=" 1987"
        img="https://i.pinimg.com/564x/76/ac/3f/76ac3f7f7d7a22898e700c4d9062782c.jpg"
      />
      <Card
        titulo=" Hombres sin mujeres"
        año=" 2014"
        img="https://i.pinimg.com/564x/1e/69/67/1e6967508112d7c6810d46f631f1ae92.jpg"
      />
    </div>
  );
};
