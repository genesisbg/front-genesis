import fetch from "node-fetch";

const genero = async (req, res) => {
    try {
      const url = `http://localhost:3000/api/genre`;
      const option = { method: "GET" };
      let dataGenero = {};
  
      await fetch(url, option)
        .then((response) => response.json())
        .then((datosG) => {
          dataGenero = datosG;
          console.log(dataGenero);
  
        })
      res.render("navbar", { generos: dataGenero });
    } catch (error) {
      res.render("navbar", { generos: dataGenero });
    }
    // res.render("dashprestamos",{prestamos: dataPrestamo});
  }
  export const generoController ={
    genero
  }