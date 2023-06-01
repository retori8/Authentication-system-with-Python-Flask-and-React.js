import React, { useContext, useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Acceso = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();


    useEffect(() => {
        
        if (store.currentUser !== null) {
            navigate('/')
            console.log(store)
        }
    }, [])

  return (
    <div className="formulario card w-50">
      <div className="card-body">
        <div className="row">
          <img
            src="https://i.pinimg.com/564x/5f/96/82/5f96823913284617b541a9ce2bf2e3fa.jpg"
            className="imagen col-md-6"
            alt=""
          />
          <form className="col" onSubmit={(e) => actions.Login(e, navigate)}>
            <div className="input mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name={"email"}
                onChange={actions.handleChange}
                value={store.email}
              />
            </div>
            <div className="input mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name={"password"}
                onChange={actions.handleChange}
                value={store.password}
              />
            </div>
            <button
              type="submit"
              className="input btn bg-dark text-light p-2 px-3"
            >
              Acceder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
