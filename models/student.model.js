const mongoose = require("mongoose")

// aqui creamos el Schema
let studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // required significa que la propiedad es obligatoria
    unique: true // unique significa que la propiedad de no se puede repetir
  },
  age: {
    type: Number,
    required: true
  },
  likesPokemon: {
    type: Boolean,
    default: true // default es que valor predeterminado tendra la propiedad de no ser definida
  },
  // para definir propiedades como array iniciamos con corchetes y dentro definimos cada elemento de ese array
  pizzaToppings: [
    {
      type: String,
      enum: ["Piña", "Jamon", "Vegetales", "Queso"] // esto indica que solo puede ser uno de estos valores
    }
  ]
})

// aqui creamos el Model
// El modelo es la herramienta que me permite acceder a la DB

let StudentModel = mongoose.model("student", studentSchema)

module.exports = StudentModel