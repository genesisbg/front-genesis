import fetch from "node-fetch";
import PDFDocument from "pdfkit";
import 'pdfkit-table';
import XLSX from "xlsx";
import fs from "fs";
import jwt from "jsonwebtoken";
const render = async(req, res) => {
    try {
        const url =`http://localhost:3000/api/loan-header`;
        const option ={method: "GET"};
        let dataPrestamo = {};
    
        await fetch(url, option)
        .then((response)=> response.json())
        .then((datosP)=>{
            dataPrestamo = datosP;
            console.log(dataPrestamo);      
            
        })
        res.render("perfil.ejs",{prestamosS: dataPrestamo}); 
    } catch (error) {
        console.log(error);
    }
    
};


const perfilPrestamos =async (req, res) => {
    
    // res.render("dashprestamos",{prestamos: dataPrestamo});
  }

  const getPrestamos = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/loan-header`);
      const presta = await response.json();
      return presta;
    } catch (error) {
      throw new Error("Error al obtener los datos de usuario: " + error.message);
    }
  };
  
  
   const pdfPrestamo = async (req, res) => {
    try {
      const prestam = await getPrestamos(); // Función para obtener los productos de la API
  
      // Crear un nuevo documento PDF
      const doc = new PDFDocument();
  
      // Establecer encabezado
      doc.font("Helvetica-Bold").fontSize(18).text("Reporte", { align: "center" });
  
      // Establecer la fecha actual
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();
      doc.fontSize(12).text(`Fecha de creación del reporte: ${currentDate}- ${currentTime}` ,{ align: "center", margin: [0, 20] });
  
      const token = jwt.verify(req.cookies.cookieBG, process.env.SECRET_KEY)
  
      doc.fontSize(12).text(token.NOM_USUARIO, { align: "center" });
      // Generar tabla de usuarios
      const prestamosUsuario = prestam.filter((prestamo) => prestamo.usuario === token.NOM_USUARIO);
      generatePDFTableP(doc, prestamosUsuario , token.NOM_USUARIO );
        
  
  
  
      // Establecer el nombre del archivo y el tipo de contenido de la respuesta
      res.setHeader("Content-Disposition", "attachment; filename=reporte_prestamo.pdf");
      res.setHeader("Content-Type", "application/pdf");
  
      // Envía el documento PDF como respuesta
      doc.pipe(res);
      doc.end();
    } catch (error) {
      res.status(500).send(error.message);
      console.log(error.message);
    }
  };
  
  
  const generatePDFTableP = (doc, prestam, usuario) => {
    const estadoText = {
      0: 'Devuelto',
      1: 'No devuelto'
    };
  
    const tableHeaders = ["Codigo Prestamo", "Fecha prestamo", "Fecha devolucion", "estado"];
  
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
  
      // Filtrar los préstamos del usuario correspondiente
      const prestamosUsuario = prestam.filter((prestamo) => prestamo.usuario === usuario);
  
      // Dibujar las filas de la tabla
      prestamosUsuario.forEach((prestamo, rowIndex) => {
        y += 20; // Aumentar la posición vertical para cada fila
  
        const rowData = [
          prestamo.COD_ENC_PRESTAMO,
          prestamo.FECHA_PRESTAMO,
          prestamo.FECHA_DEVOLUCION,
          estadoText[prestamo.ESTADO],
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
      const prestamos  = await getPrestamos(); // Función para obtener los productos de la API
  
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
  export const userController = {
    render,
    perfilPrestamos,
    excelP,
    pdfPrestamo
};
