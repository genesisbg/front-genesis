import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const authentication = async (req, res) => {
  let COD_USUARIO = req.query.COD_USUARIO; // 1020402543
  let CONTRASEÑA = req.query.PASSWORD; // 962012d09b8170d912f0669f6d7d9d07

  if (COD_USUARIO && CONTRASEÑA) {
    try {
      let url = `http://localhost:3000/api/user/${COD_USUARIO}`;
      let options = { method: "GET" };
      let payload = {};

      // Con la variable COD_USUARIO realizamos uan busqueda en la api para obtener los datos del usuario
      // En caso de no existir, se redirecciona al login nuevamente
      await fetch(url, options)
        .then((response) => response.json())
        .then((datosUsuario) =>
          !datosUsuario.message
            ? (payload = datosUsuario[0])
            : res.redirect("/login")
        );

      // creamos una variable token donde mandamos como primer parametro los datos a encriptar y luego la secret key con la cual se desencriptará
      if (CONTRASEÑA === payload.CONTRASEÑA) {
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: process.env.EXPIRE_TOKEN,
        });

        res.cookie("cookieBG", token);
        res.redirect("/user/perfil");
      } else {
        res.redirect("/login");
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    res.redirect("/login");
  }
};

export const loginController = {
  authentication,
};
