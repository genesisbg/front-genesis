import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import PDFDocument from "pdfkit";
import 'pdfkit-table';
import XLSX from "xlsx";


const dash = (req, res) => {
  res.render("dash.ejs");
}

const actualizar = (req, res) => {
  res.render("actualizarusuario.ejs");
}
const actualizarLibro = (req, res) => {
  res.render("actualizarLibro.ejs");
}
const devolucion = (req, res) => {
  res.render("devolucion.ejs");
}

const dashUsuarios = async (req, res) => {
  const alertCase = req.query.alert

  try {
    const url = `http://localhost:3000/api/user`;
    const option = { method: "GET" };
    let datosUsuarios = {};

    await fetch(url, option)
      .then((response) => response.json())
      .then((datosU) => {
        datosUsuarios = datosU;
        // console.log(datosUsuarios);

      })
    if (alertCase) {
      switch (alertCase) {
        // sin datos en el formulario
        case "0":
          res.render("dashusuarios", { alertCase: alertCase, usuarios: datosUsuarios });
          // res.render("login")
          break;

        // Usuario añadido
        case "1":
          res.render("dashusuarios", { alertCase: alertCase, usuarios: datosUsuarios })
          break;

        // dni ya registrado  
        case "2":
          res.render("dashusuarios", { alertCase: alertCase, usuarios: datosUsuarios })
          break;

        default:
          res.render("dashusuarios", { alertCase: alertCase, usuarios: datosUsuarios })
          break;
      }
    } else {
      res.render("dashusuarios.ejs", { alertCase: alertCase, usuarios: datosUsuarios })
    }
  } catch (error) {
    console.error(error);
  }

}

const insertarUsuario = async (req, res) => {
  if (req.body.COD_USUARIO) {

    let datosUsuario = {
      "DNI_USUARIO": req.body.COD_USUARIO,
      "NOM_USUARIO": req.body.NOM_USUARIO,
      "APELL_USUARIO": req.body.APELL_USUARIO,
      "CORREO": req.body.CORREO_USUARIO,
      "CONTRASENA": req.body.PASSWORD,
      "FECHA_NAC": req.body.FECHA_NACIMIENTO,
      "SEXO": req.body.sexo,
      "ESTADO": "ACTIVO",
      "COD_ROL": req.body.rol
    }
    if (datosUsuario.DNI_USUARIO && datosUsuario.NOM_USUARIO && datosUsuario.APELL_USUARIO && datosUsuario.CORREO && datosUsuario.CONTRASENA && datosUsuario.FECHA_NAC && datosUsuario.SEXO && datosUsuario.ESTADO && datosUsuario.COD_ROL) {
      try {
        const url = 'http://localhost:3000/api/user';
        const option = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(datosUsuario)
        }

        await fetch(url, option)
          .then(response => response.json())
          .then(resRegistro => {

            if (resRegistro.message === "Usuario añadido") { // El usuario se registrò correctamente
              return res.redirect("/admin/usuarios?alert=1")
            } else if (resRegistro.message === "El DNI ingresado ya existe") { // El usuario ingreso un documento que ya se encuentro registrado
              return res.redirect("/admin/usuarios?alert=2")
            }
          })
      } catch (error) {
        console.log(error);
      }
      // res.send(datosUsuario)
    } else {
      return res.redirect("/admin/usuarios?alert=0")
    }
  }

}

const banUsuario = async (req, res) => {
  const id = req.query.id;
  const state = req.query.state;
  let banData = {}


  if (state && id) {

    switch (state) {

      case "ACTIVO":
        banData = {
          "ESTADO": "INACTIVO"
        }
        break;

      case "INACTIVO":
        banData = {
          "ESTADO": "ACTIVO"
        }
        break;

      default:
        banData = {
          "ESTADO": "INACTIVO"
        }
        break;
    }

    try {

      const url = `http://localhost:3000/api/user/${id}`;
      const option = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(banData)
      }

        await fetch(url, option)
        .then(response => response.json())
        .then(resBan => {

          console.log(resBan)

          if (resBan.message === 'Estado del usuario actualizado') {
            res.redirect('usuarios')
          } else {
            res.redirect('usuarios')
          }

        })

    } catch (error) {
      console.error(error)
    }
  } else {
    res.redirect('usuarios')
  }

}


const dashLibros = async (req, res) => {
  const alertCase = req.query.alert

  try {
    const url = `http://localhost:3000/api/books`;
    const option = { method: "GET" };
    let datosLibros = {};

    await fetch(url, option)
      .then((response) => response.json())
      .then((datosL) => {
        datosLibros = datosL;
        console.log(datosLibros);

      })
    if (alertCase) {
      switch (alertCase) {
        // sin datos en el formulario
        case "0":
          res.render("dashlibros", { alertCase: alertCase, libros: datosLibros });
          // res.render("login")
          break;

        // Usuario añadido
        case "1":
          res.render("dashlibros", { alertCase: alertCase, libros: datosLibros });
          break;

        // dni ya registrado  
        case "2":
          res.render("dashlibros", { alertCase: alertCase, libros: datosLibros });
          break;

        default:
          res.render("dashlibros", { alertCase: alertCase, libros: datosLibros });
          break;
      }
    } else {
      res.render("dashlibros", { alertCase: alertCase, libros: datosLibros });
    }
  } catch (error) {
    console.error(error);
  }

}

const insertarLibros = async (req, res) => {
  if (req.body.COD_LIBRO) {

    let datosLibro = {
      "COD_LIBRO": req.body.COD_LIBRO,
      "SIPNOPSIS": req.body.SIPNOPSIS,
      "TITULO": req.body.TITULO,
      "FECHA_PUBLICACION": req.body.FECHA_PUBLICACION,
      "NUM_SERIE": req.body.NUM_SERIE,
      "EDITORIAL": req.body.EDITORIAL,
      "GENERO": req.body.COD_GENERO,
      "NOM_AUTOR": req.body.NOM_AUTOR,
      "IMAGEN": req.body.IMAGEN,
    }
    if (datosLibro.COD_LIBRO && datosLibro.SIPNOPSIS && datosLibro.TITULO && datosLibro.FECHA_PUBLICACION && datosLibro.NUM_SERIE && datosLibro.EDITORIAL && datosLibro.GENERO && datosLibro.NOM_AUTOR && datosLibro.IMAGEN) {
      try {
        const url = 'http://localhost:3000/api/books';
        const option = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(datosLibro)
        }

        await fetch(url, option)
          .then(response => response.json())
          .then(resRegistro => {
            res.redirect('hola')
            // if (resRegistro.message === "Usuario añadido") { // El usuario se registrò correctamente
            //   return res.redirect("/admin/usuarios?alert=1")
            // } else if (resRegistro.message === "El DNI ingresado ya existe") { // El usuario ingreso un documento que ya se encuentro registrado
            //   return res.redirect("/admin/usuarios?alert=2")
            // }
          })
      } catch (error) {
        console.log(error);
      }
      // res.send(datosUsuario)
    } else {
      return res.redirect("/admin/libros")
      console.log("No se")
    }
  }

}

const editarLibros = async (req, res) => {
  if (req.body.COD_LIBRO) {
    let datosLibro = {
      "SIPNOPSIS": req.body.SIPNOPSIS,
      "TITULO": req.body.TITULO,
      "FECHA_PUBLICACION": req.body.FECHA_PUBLICACION,
      "NUM_SERIE": req.body.NUM_SERIE,
      "EDITORIAL": req.body.EDITORIAL,
      "GENERO": req.body.COD_GENERO,
      "NOM_AUTOR": req.body.NOM_AUTOR,
      "IMAGEN": req.body.IMAGEN,
    };

    if (
      datosLibro.SIPNOPSIS &&
      datosLibro.TITULO &&
      datosLibro.FECHA_PUBLICACION &&
      datosLibro.NUM_SERIE &&
      datosLibro.EDITORIAL &&
      datosLibro.GENERO &&
      datosLibro.NOM_AUTOR &&
      datosLibro.IMAGEN
    ) {
      try {
        const url = `http://localhost:3000/api/books/${COD_LIBRO}`;  // URL del libro específico a actualizar
        const option = {
          method: "PUT",  // Método HTTP PUT para actualizar el libro
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(datosLibro)
        };

        await fetch(url, option)
          .then(response => response.json())
          .then(resRegistro => {
            // Realizar acciones según la respuesta del servidor
            // Redirigir a una página específica después de la actualización
            res.redirect("holacion");
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.redirect("/admin/libros");
      console.log("No se");
    }
  }
};

const eliminarLibros = async (req, res) => {
  const id = req.query.id;
  const url = `http://localhost:3000/api/books/${id}`;
  const option = {
    method: "DELETE"
  };

  const result = await fetch(url, option)
    .then(response => response.json())
    .then(data => {
      if (data.affectedRows == 1) {

        console.log("borrado");
      } else {
        console.log("NO BORRADO");
      }

    })
  return res.redirect("/admin/libros");
}


const dashPrestamos = async (req, res) => {
  try {
    const url = `http://localhost:3000/api/loan-header`;
    const option = { method: "GET" };
    let dataPrestamo = {};

    await fetch(url, option)
      .then((response) => response.json())
      .then((datosP) => {
        dataPrestamo = datosP;
        console.log(dataPrestamo);

      })
    res.render("dashprestamos", { prestamos: dataPrestamo });
  } catch (error) {
    res.render("dashprestamos", { prestamos: dataPrestamo });
  }
  // res.render("dashprestamos",{prestamos: dataPrestamo});
}

const eliminarPrestamos = async (req, res) => {

  const id = req.query.id;
  const url = `http://localhost:3000/api/loan-header/${id}`;
  const option = {
    method: "DELETE"
  };
  const result = await fetch(url, option)
    .then(response => response.json())
    .then(data => {
      if (data.affectedRows == 1) {

        console.log("borrado");
      } else {
        console.log("NO BORRADO");
      }
    })
  return res.redirect("/admin/prestamos");
}

const getUser = async () => {


  try {
    const response = await fetch("http://localhost:3000/api/user");
    const user = await response.json();
    return user;
  } catch (error) {
    throw new Error("Error al obtener los datos de usuario: " + error.message);
  }
};


 const pdf = async (req, res) => {
  try {
    const users = await getUser(); // Función para obtener los productos de la API

    // Crear un nuevo documento PDF
    const doc = new PDFDocument();

    // Establecer encabezado
    doc.font("Helvetica-Bold").fontSize(18).text("Reporte de Usuarios", { align: "center" });

    // Establecer la fecha actual
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    doc.fontSize(12).text(`Fecha de creación del reporte: ${currentDate}- ${currentTime}` ,{ align: "center", margin: [0, 20] });

    const token = jwt.verify(req.cookies.cookieBG, process.env.SECRET_KEY)

    doc.fontSize(12).text(token.NOM_USUARIO, { align: "center" });
    // Generar tabla de usuarios
    generatePDFTable(doc, users );




    // Establecer el nombre del archivo y el tipo de contenido de la respuesta
    res.setHeader("Content-Disposition", "attachment; filename=reporte_usuarios.pdf");
    res.setHeader("Content-Type", "application/pdf");

    // Envía el documento PDF como respuesta
    doc.pipe(res);
    doc.end();
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};


const generatePDFTable = (doc, users) => {
  const rolText = {
    1: 'Usuario',
    2: 'Administrador'
  };


  const tableHeaders = ["ID", "Nombre", "Apellido", "estado", "Rol"];

  // Establecer posición inicial de la tabla
  let y = doc.y + 30;

  // Establecer estilos para los encabezados de la tabla
  doc.font("Helvetica-Bold").fontSize(10);
  doc.fillColor("black");

  // Dibujar los encabezados de la tabla
  tableHeaders.forEach((header, columnIndex) => {
    doc.text(header, columnIndex * 100 + 50, y);
  });
  if (users && Array.isArray(users)) {
  // Establecer estilos para las filas de la tabla
  doc.font("Helvetica").fontSize(10);

  // Dibujar las filas de la tabla
  users.forEach((user,  rowIndex) => { // Cambiar el nombre de la variable 'user' en el bucle
    y += 20; // Aumentar la posición vertical para cada fila

    const rowData = [
      user.DNI_USUARIO,
      user.NOM_USUARIO,
      user.APELL_USUARIO,
      user.ESTADO,
      rolText[user.COD_ROL],
    ];

    rowData.forEach((data, columnIndex) => {
      const cellWidth = 100;
      const cellHeight = 20;

      const textOptions = {
        width: cellWidth,
        height: cellHeight,
        lineBreak: false
      };

      doc.text(data, columnIndex * 100 + 50, y, textOptions);
    });
  });
}
};



/**
 * Genera un reporte en formato Excel de los productos obtenidos de la API.
 * El reporte se genera en un archivo de Excel y se descarga como adjunto en la respuesta HTTP.
 */
const excel = async (req, res) => {

  try {
    const user  = await getUser(); // Función para obtener los productos de la API

    // Crear una nueva hoja de cálculo
    const workbook = XLSX.utils.book_new();

    // Crear una nueva hoja dentro del libro de Excel
    const worksheet = XLSX.utils.json_to_sheet(user);

    // Agregar la hoja al libro de Excel
    XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");

    // Convertir el libro de Excel a un archivo de buffer
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    // Establecer el nombre del archivo y el tipo de contenido de la respuesta
    res.setHeader("Content-Disposition", "attachment; filename=reporte_usuarios.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

    // Envía el archivo de Excel como respuesta
    res.send(excelBuffer);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};
const getPrestamo = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/loan-header");
    const presta = await response.json();
    return presta;
  } catch (error) {
    throw new Error("Error al obtener los datos de usuario: " + error.message);
  }
};


 const pdfPrestamo = async (req, res) => {
  try {
    const prestam = await getPrestamo(); // Función para obtener los productos de la API

    // Crear un nuevo documento PDF
    const doc = new PDFDocument();

    // Establecer encabezado
    doc.font("Helvetica-Bold").fontSize(18).text("Reporte de Prestamos", { align: "center" });

    // Establecer la fecha actual
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    doc.fontSize(12).text(`Fecha de creación del reporte: ${currentDate}- ${currentTime}` ,{ align: "center", margin: [0, 20] });

    const token = jwt.verify(req.cookies.cookieBG, process.env.SECRET_KEY)

    doc.fontSize(12).text(token.NOM_USUARIO, { align: "center" });
    // Generar tabla de usuarios
    generatePDFTableP(doc, prestam );




    // Establecer el nombre del archivo y el tipo de contenido de la respuesta
    res.setHeader("Content-Disposition", "attachment; filename=reporte_prestamos.pdf");
    res.setHeader("Content-Type", "application/pdf");

    // Envía el documento PDF como respuesta
    doc.pipe(res);
    doc.end();
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};


const generatePDFTableP = (doc, prestam) => {
  const estadoText = {
    0: 'Devuelto',
    1: 'No devuelto'
  };

  const tableHeaders = ["Codigo Prestamo", "Fecha prestamo", "Fecha devolucion", "estado", "Usuario"];

  // Establecer posición inicial de la tabla
  let y = doc.y + 30;

  // Establecer estilos para los encabezados de la tabla
  doc.font("Helvetica-Bold").fontSize(10);
  doc.fillColor("black");

  // Dibujar los encabezados de la tabla
  tableHeaders.forEach((header, columnIndex) => {
    doc.text(header, columnIndex * 100 + 50, y);
  });
  if (prestam && Array.isArray(prestam)) {
  // Establecer estilos para las filas de la tabla
  doc.font("Helvetica").fontSize(10);

  // Dibujar las filas de la tabla
  prestam.forEach((prestamo,  rowIndex) => { // Cambiar el nombre de la variable 'user' en el bucle
    y += 20; // Aumentar la posición vertical para cada fila

    const rowData = [
      prestamo.COD_ENC_PRESTAMO,
      prestamo.FECHA_PRESTAMO,
      prestamo.FECHA_DEVOLUCION,
      prestamo.ESTADO,
      prestamo.DNI_USUARIO,
      estadoText[prestamo.ESTADO]
    ];

    rowData.forEach((data, columnIndex) => {
      const cellWidth = 100;
      const cellHeight = 20;

      const textOptions = {
        width: cellWidth,
        height: cellHeight,
        lineBreak: false
      };

      doc.text(data, columnIndex * 100 + 50, y, textOptions);
    });
  });
}
};

 const excelP = async (req, res) => {
  try {
    const prestamos  = await getPrestamo(); // Función para obtener los productos de la API

    // Crear una nueva hoja de cálculo
    const workbook = XLSX.utils.book_new();

    // Crear una nueva hoja dentro del libro de Excel
    const worksheet = XLSX.utils.json_to_sheet(prestamos);

    // Agregar la hoja al libro de Excel
    XLSX.utils.book_append_sheet(workbook, worksheet, "Prestamos");

    // Convertir el libro de Excel a un archivo de buffer
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    // Establecer el nombre del archivo y el tipo de contenido de la respuesta
    res.setHeader("Content-Disposition", "attachment; filename=reporte_Prestamos.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

    // Envía el archivo de Excel como respuesta
    res.send(excelBuffer);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};





export const adminController = {
  dash,
  actualizar,
  actualizarLibro,
  devolucion,
  dashUsuarios,
  dashLibros,
  dashPrestamos,
  insertarUsuario,
  banUsuario,
  eliminarLibros,
  eliminarPrestamos,
  insertarLibros,
  editarLibros,
  pdf,
  excel,
  pdfPrestamo,
  excelP
}