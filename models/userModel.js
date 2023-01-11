const mongoose = require('mongoose')
const bcrypt = require('bcrypt') // hay que instalar bcrypt npm i bcrypt
const validator = require('validator') // npm install validator

const Schema = mongoose.Schema

const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    
})

// static signup method
userSchema.statics.signup = async function(email, password) {

    //validation
    if(!email || !password){
        throw Error('Todos los campos son obligatorios')
    }
    if(!validator.isEmail(email)){
        throw Error('No es un Email')
    }/* 
    if(!validator.isStrongPassword(password)){
        throw Error('Paswword not stron enough')
    } */

    const exists = await this.findOne({ email })
  
    if (exists) {
      throw Error('Email ya registrado')
    }
  
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
  
    const user = await this.create({ email, password: hash })
  
    return user
  }

  //static login metod
  userSchema.statics.login = async function(email, password ){

    if(!email || !password){
        throw Error('Llena todos los campos')
    }
    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Email incorrecto')
    }
    
    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Contraseña incorrecta')
    }

    return user
  }

module.exports = mongoose.model('User', userSchema)