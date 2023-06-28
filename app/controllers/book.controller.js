import fetch from "node-fetch";

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

      if (req.cookies.cookieBG){
        session = true
      }

    res.render("pagina.ejs", { infoLibro: infoLibro, session:session });
  } else {
    res.redirect("/");
  }
};

// let datosPrestamo = {

//     "FECHA_PRESTAMO": "2011-11-12",
//     "ESTADO": 1,
//     "DNI_USUARIO": 100
// }

// // Valida si nos datos necesarios para el registro si existen
// if (datosPrestamo.DNI_USUARIO && datosPrestamo.ESTADO) {

// try {
//   const url = 'http://localhost:3000/api/book';
//       const option = {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(datosPrestamo)
//       }

//       await fetch(url, option)
//         .then(response => response.json())
//         .then(resPrestamo => {         })

// } catch (error) {
//   console.log(error);
// }

// }

const authPrestamo = (req, res) => {
  res.render("auth.ejs");
};

const confirmPrestamo = (req, res) => {
  res.render("confirm.ejs");
};

const prestamo = (req, res) => {
  res.render("prestamo.ejs");
};

export const bookController = {
  infoLibro,
  authPrestamo,
  confirmPrestamo,
  prestamo
};
