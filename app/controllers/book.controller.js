import fetch from "node-fetch";

const infoLibro = async (req, res) => {
  if (req.query.COD_LIBRO) {
    let COD_LIBRO = req.query.COD_LIBRO;

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

    console.log(infoLibro)
    res.render("pagina.ejs", { infoLibro: infoLibro });
  } else {
    res.redirect("/");
  }
};

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
