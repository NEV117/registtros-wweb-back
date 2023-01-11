const Registro = require('../models/registrosModelo')
const mongoose = require('mongoose')
const router = require("express").Router();

//get todos los registros
const getRegistros = async(req, res) => {
    const user_id = req.user._id

    const registros = await Registro.find({user_id}).sort({createdAt: -1})
    res.status(200).json(registros)
}

const getResDate = async(req, res) => {
    res.status(200).json(mssg, "desde fechas")

    try{
        const registro = await Registro.find({createdAt: {
            $gte: req.body.Fromdate,
            $lte: req.body.Todate
        },
        leave: { $exists: false }})

        if(!registro){
            return res.status(404).json({error: 'No Existe ese registro'})
        }    
        res.status(200).json(registro)
    } catch(err){
        console.log(err)
        return res.status(404).json({error: 'no fuciona aca'})
    }
}


//get un registro
const getUnRegistro = async (req, res) => {

        try{
        const search = req.query.search || "";
        let sort = req.query.sort || "rating";

        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

        let sortBy ={};
        if(sort[1]){
            sortBy[sort[0]]=sort[1];
        } else{
            sortBy[sort[0]]="asc";
        }

        const registro = await Registro.find({ codigo: { $regex: search, $options: "i"}})
        .sort(sortBy)

        if(!registro){
            return res.status(404).json({error: 'No Existe ese registro'})
        }
    
        res.status(200).json(registro)

    } catch(err){
        console.log(err)
        return res.status(404).json({error: 'no fuciona aca'})
    }


/*     const {codigo} = req.params
    if(!mongoose.Types.ObjectId.isValid(codigo)){
        return res.status(404).json({error: 'No Existe ese registro'})
    }
    const registro = await Registro.findById(codigo)

    if(!registro){
        return res.status(404).json({error: 'No Existe ese registro'})
    }

    res.status(200).json(registro) */
}

const busqueda = async(req, res) =>{
    res.status(200).json(mssg, "desde busqueda")



/*     try{
        const search = req.query.search || "";
        let sort = req.query.sort || "rating";

        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

        let sortBy ={};
        if(sort[1]){
            sortBy[sort[0]]=sort[1];
        } else{
            sortBy[sort[0]]="asc";
        }

        const registro = await Registro.find({ codigo: { $regex: search, $options: "i"}})
        .sort(sortBy)

        if(!registro){
            return res.status(404).json({error: 'No Existe ese registro'})
        }
    
        res.status(200).json(registro)

    } catch(err){
        console.log(err)
        return res.status(404).json({error: 'no fuciona aca'})
    } */
}

//crear nuevo registro
const createRegistro = async(req, res) =>{

    const {codigo, estado_ingreso} = req.body

    let emptyFields = []
  
    if(!codigo) {
      emptyFields.push('codigo')
    }
    if(!estado_ingreso) {
      emptyFields.push('estado_ingreso')
    }
    if(emptyFields.length > 0) {
      return res.status(400).json({ error: 'Por favor completa todos los campos', emptyFields })
    }
  
    // add doc to db
    try {
      const user_id = req.user._id    
      const registro = await Registro.create({codigo, estado_ingreso, user_id})
      res.status(200).json(registro)
    } catch (error) {
      const errorString = error.toString();
      if (errorString.includes("E11000")) return res.status(400).json({ error: 'Codigo ya ingresado' });      
      res.status(400).json({error: error.message})
    }
}

//borrar registro
const borrarRegistro = async(req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Existe ese registro'})
    }

    const registro = await Registro.findOneAndDelete({_id: id})

    if(!registro){
        return res.status(404).json({error: 'No Existe ese registro'})
    }

    res.status(200).json(registro)

}

//update registro

const actualizarRegistro = async(req, res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Existe ese registro'})
    }

    const registro = await Registro.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!registro){
        return res.status(404).json({error: 'No Existe ese registro'})
    }

    res.status(200).json(registro)
}


module.exports = {
    createRegistro,
    getRegistros,
    getUnRegistro,
    borrarRegistro,
    actualizarRegistro,
    busqueda,
    getResDate
}