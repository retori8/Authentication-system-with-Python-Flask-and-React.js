import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import "../../styles/home.css";

export const Registro = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="formulario card w-50">
      <div className="card-body">
        <div className="row">
          <div className="img col"></div>
          <form className="col" onSubmit={(e) => actions.handleSubmitRegister(e, navigate)}>
            <div className="input mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                required
                type="email"
                className="form-control"
                id="regitro_email"
                placeholder="ingresa tu email"
                onChange={actions.handleChangeUser}
                value={store.newUser.email}
                name="email"
              />
            </div>
            <div className="input mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Contraseña
              </label>
              <input
                required
                minlength="5"
                maxlength="8"
                type="password"
                label="Constraseña"
                placeholder="Ingresa tu constraseña"
                className="form-control item"
                id="regitro_constraseña"
                onChange={actions.handleChangeUser}
                value={store.newUser.password}
                name="password"
              />
              <div id="passwordHelp" className="form-text">
                Debe tener entre 5 y 8 caracteres.
              </div>
            </div>

            <button
              type="submit"
              className="input btnSubmit btn btn-block create-account bg-dark text-light"
            >
              Registrarme
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};
