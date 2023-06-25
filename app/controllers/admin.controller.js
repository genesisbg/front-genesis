import { response } from "express";
import fetch from "node-fetch";

const dash = (req, res) => {
    res.render("dash.ejs");
}
const agregarLibros =(req, res) => {
    res.render("agregar-libros.ejs");
}
const devolucion= (req, res) => {
    res.render("devolucion.ejs");
}
const dashUsuarios = async(req, res) => {
    const alertCase = req.query.alert


    try {
        const url =`http://localhost:3000/api/user`;
        const option ={method: "GET"};
        let datosUsuarios = {};
    
        await fetch(url, option)
        .then((response)=> response.json())
        .then((datosU)=>{
            datosUsuarios = datosU;
            console.log(datosUsuarios);
            
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
const insertarUsuario = async(req, res) => {  
    if (req.body.COD_USUARIO){
   
    let datosUsuario = {
        "DNI_USUARIO": req.body.COD_USUARIO,
        "NOM_USUARIO": req.body.NOM_USUARIO,
        "APELL_USUARIO": req.body.APELL_USUARIO,
        "CORREO": req.body.CORREO_USUARIO,
        "CONTRASEÑA": req.body.PASSWORD,
        "FECHA_NAC": req.body.FECHA_NACIMIENTO,
        "SEXO": req.body.sexo,
        "ESTADO": "ACTIVO",
        "COD_ROL": req.body.rol
      }
      if (datosUsuario.DNI_USUARIO && datosUsuario.NOM_USUARIO && datosUsuario.APELL_USUARIO && datosUsuario.CORREO && datosUsuario.CONTRASEÑA && datosUsuario.FECHA_NAC && datosUsuario.SEXO && datosUsuario.ESTADO && datosUsuario.COD_ROL) {
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
const eliminarUsuario = async(req, res)=>{
  const id = req.query.id;
  const url = `http://localhost:3000/api/user/${id}`;
  const option ={
    method:"DELETE"
};
const result = await fetch(url, option)  
.then(response=>response.json())
.then(data=>{
    if(data.affectedRows==1){
        
        console.log("borrado");
    }else{
        console.log("NO BORRADO");
    }
   
})
res.redirect("/admin/usuarios");
}

const dashLibros =async (req, res) => {

    try {
        const url =`http://localhost:3000/api/books`;
        const option ={method: "GET"};
        let dataLibros = {};
    
        await fetch(url, option)
        .then((response)=> response.json())
        .then((datosL)=>{
            dataLibros = datosL;
            console.log(dataLibros);
        })
        res.render("dashlibros.ejs", { libros: dataLibros })
    } catch (error) {
        console.error(error);
    }
}
const eliminarLibros =async (req, res) =>{
  const id = req.query.id;
  const url = `http://localhost:3000/api/books/${id}`;
  const option ={
    method:"DELETE"
};
const result = await fetch(url, option)  
.then(response=>response.json())
.then(data=>{
    if(data.affectedRows==1){
        
        console.log("borrado");
    }else{
        console.log("NO BORRADO");
    }
   
})
res.redirect("/admin/libros");

}
const dashPrestamos =async (req, res) => {
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
        res.render("dashprestamos",{prestamos: dataPrestamo}); 
    } catch (error) {
        res.render("dashprestamos",{prestamos: dataPrestamo});
    }
    // res.render("dashprestamos",{prestamos: dataPrestamo});
}
const eliminarPrestamos =async (req, res) => {

    const id = req.query.id;
    const url = `http://localhost:3000/api/loan-header/${id}`;
    const option ={
        method:"DELETE"
      };
      const result = await fetch(url, option)  
      .then(response=>response.json())
      .then(data=>{
          if(data.affectedRows==1){
              
              console.log("borrado");
          }else{
              console.log("NO BORRADO");
          }
        })
      res.redirect("/admin/prestamos");
}

export const adminController = {
    dash,
    agregarLibros,
    devolucion,
    dashUsuarios,
    dashLibros,
    dashPrestamos,
    insertarUsuario,
    eliminarUsuario,
    eliminarLibros,
    eliminarPrestamos
}