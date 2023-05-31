import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Registro = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="formulario card w-50">
      <div className="card-body">
        <div className="row">
          <img
            src="https://i.pinimg.com/564x/13/37/e0/1337e0fb209ed343dfa22de8bd90a6c5.jpg"
            className="imagen col-md-6"
            alt=""
          />
          <form
            className="col col-md-6"
            onSubmit={(e) => actions.handleSubmitRegister(e, navigate)}
          >
            <div className="input mb-3">
              <label  className="form-label">
                Email
              </label>
              <input
                required
                type="email"
                className="form-control"
                id="regitro_email"
                placeholder="ingresa tu email"
                onChange={actions.handleChangeInput}
                value={store.newUser.email}
                name={"email"}
              />
            </div>
            <div className="input mb-3">
              <label  className="form-label">
                Contraseña
              </label>
              <input
                required
                minLength="5"
                maxLength="8"
                type="password"
                label="Constraseña"
                placeholder="Ingresa tu constraseña"
                className="form-control item"
                id="regitro_constraseña"
                onChange={actions.handleChangeInput}
                value={store.newUser.password}
                name={"password"}
              />
              <div id="passwordHelp" className="form-text">
                Debe tener entre 5 y 8 caracteres.
              </div>
            </div>
            <button
              type="submit"
              className="input btnSubmit btn btn-block create-account bg-dark text-light p-2 px-3"
            >
              Registrarme
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
