import fetch from "node-fetch";
import PDFDocument from "pdfkit";
import 'pdfkit-table';
import XLSX from "xlsx";
import fs from "fs";
import jwt from "jsonwebtoken";


const render = async (req, res) => {

    try {
        const token = jwt.verify(req.cookies.cookieBG, process.env.SECRET_KEY)
        const url = `http://localhost:3000/api/loan-header`;
        const option = { method: "GET" };
        let dataPrestamo = {};

        await fetch(url, option)
            .then((response) => response.json())
            .then((datosP) => {
                dataPrestamo = datosP;
            })

        let prestamosUsuario = dataPrestamo.map((data) => {
            if (token.DNI_USUARIO === data.DNI_USUARIO) {
                return data;
            }
        });

        let filtered = prestamosUsuario.filter(input =>{
            return input !== undefined;
        });

        res.render("perfil.ejs", { prestamosS: filtered });
    } catch (error) {
        console.log(error);
    }

};


const perfilPrestamos = async (req, res) => {

    
  }

export const userController = {

    render,
    perfilPrestamos,  
};
