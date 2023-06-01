const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      email: "",
      password: "",
      newUser: { email: "", password: "" },
      url: "https://3001-retori8-authentications-447bevuowdu.ws-us98.gitpod.io",
      currentUser: null,
      books:[]
    },

    actions: {
      comprobarLogin(navigate) {
        console.log(getStore().currentUser);
        if (getStore().currentUser !== null) {
          getActions().logout();
        }
        navigate("/acceso");
      },

      Register: async (navigate) => {
        try {
          const { url, newUser } = getStore();
          const response = await fetch(`${url}/api/registro`, {
            method: "POST",
            body: JSON.stringify({ ...newUser }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();
          console.log(data);

          navigate("/acceso");
        } catch (error) {
          console.log(error);
        }
      },

      handleSubmitRegister: (e, navitgate) => {
        e.preventDefault();
        getActions().Register(navitgate);
      },
      handleChangeInput(e) {
        const { newUser } = getStore();
        e.preventDefault();
        newUser[e.target.name] = e.target.value;
        setStore({ newUser });
        console.log(getStore().newUser[e.target.name]);
      },

      Login: async (e, navigate) => {
        e.preventDefault();
        try {
          const { url, email, password, currentUser } = getStore();
          let info = { email, password };
          const response = await fetch(`${url}/api/login`, {
            method: "POST",
            body: JSON.stringify(info),
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(response);
          const data = await response.json();
          console.log(data);

          if (data.token) {
            setStore({ currentUser:data });
            sessionStorage.setItem("currentUser", JSON.stringify(data));

            navigate("/galeria");
          } else {
            setStore({
              alert: {
                text: "Usuario no registrado",
                show: true,
                textbtn: "Registrarme",
              },
            });
          }
        } catch (error) {
          console.log(error);
          console.log("hay un error en el login");
        }
      },

      handleChange: (e) => {
        setStore({
          [e.target.name]: e.target.value,
        });
      },

      checkUser: () => {
        if (sessionStorage.getItem("currentUser")) {
          setStore({
            currentUser: JSON.parse(sessionStorage.getItem("currentUser")),
          });
        }
      },

      logout: () => {
        if (sessionStorage.getItem("currentUser")) {
          setStore({
            currentUser: null,
          });
          sessionStorage.removeItem("currentUser");
        }
      },

      //Books---------------------------------------------------------

      getBooks: async () => {
				const { url } = getStore()
				try {
					const response = await fetch(`${url}/api/libros`, {
						metod: "GET",
						headers: {
							"Content-Type": "application/json",
              'Authorization': `Bearer ${currentUser?.access_token}`
						},
					});
					if (response.status === 404) throw Error("Page not found");
					const books_info = await response.json();

					setStore({
						books: books_info,
					});
					console.log(books);
				} catch (error) {
					console.log(error.message);
				}
			},

      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
