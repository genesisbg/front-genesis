import fetch from "node-fetch";
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
  export const userController = {
    render,
    perfilPrestamos
};
