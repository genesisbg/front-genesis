import fetch from "node-fetch";
import jwt from "jsonwebtoken";

const infoLibro = async (req, res) => {
  if (req.query.COD_LIBRO) {
    let COD_LIBRO = req.query.COD_LIBRO;
    let session = false;

    let url = `http://localhost:3000/api/books/${COD_LIBRO}`;
    let options = { method: "GET" };
    let infoLibro = {};

    await fetch(url, options)
      .then((respuesta) => respuesta.json())
      .then((data) => {
        if (!data.message) {
          infoLibro = data[0];
        } else {
          res.redirect("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    if (req.cookies.cookieBG) {
      session = true
    }


    res.render("pagina.ejs", { infoLibro: infoLibro, session: session });
  } else {
    res.redirect("/");
  }
};

const prestamoLibro = async (req, res) => {

  let COD_LIBRO = req.query.COD_LIBRO || false;

  const token = jwt.verify(req.cookies.cookieBG, process.env.SECRET_KEY)

  let datosPrestamo = {
    "FECHA_PRESTAMO": req.body.FECHA_PRESTAMO,
    "FECHA_DEVOLUCION": req.body.FECHA_DEVOLUCION,
    "ESTADO": 1,
    "DNI_USUARIO": token.DNI_USUARIO
  }

  // Valida si los datos necesarios para el prestamo  si existen
  if (datosPrestamo.FECHA_PRESTAMO && datosPrestamo.FECHA_DEVOLUCION) {

    try {
      const url = 'http://localhost:3000/api/loan-header';
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datosPrestamo)
      }

      await fetch(url, option)
        .then(response => response.json())
        .then(resPrestamo => {
          if (resPrestamo.message === "Prestamo  Realizado") { // El Prestamo se registrò correctamente
            res.redirect(`/libro/pagina`)
          } else {
            res.redirect("/libro/pagina");
          }
        })

    } catch (error) {
      console.log(error);
    }

  }
}

const detalle = (req, res) => {
  res.send(req.query)
};

const authPrestamo = async (req, res) => {

  let COD_LIBRO = req.query.COD_LIBRO
  let FECHA_PRESTAMO = req.query.FECHA_PRESTAMO
  let FECHA_DEVOLUCION = req.query.FECHA_DEVOLUCION

  if (COD_LIBRO && FECHA_PRESTAMO && FECHA_DEVOLUCION) {
    try {
      let url = "http://localhost:3000/api/loan-header/"
      let options = {
        method: "GET"
      }
      let dataHeader = {}

      await fetch(url, options)
        .then(response => response.json())
        .then(loanHeader => dataHeader = loanHeader)

     
     
    } catch (error) {

    }
  } else {
    res.redirect('/')
  }
};

const confirmPrestamo = (req, res) => {
  let session = false;

  if (req.cookies.cookieBG) {
    session = true
  }

  res.render("confirm.ejs", { session: session });
};

const prestamo = (req, res) => {
  let COD_LIBRO = req.query.COD_LIBRO || false;

  let session = false;

  if (req.cookies.cookieBG) {
    session = true
  }

  res.render("prestamo.ejs", { session: session, COD_LIBRO: COD_LIBRO });
};

export const bookController = {
  infoLibro,
  authPrestamo,
  confirmPrestamo,
  prestamo,
  prestamoLibro,
  detalle
};
