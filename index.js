const mongoose = require("mongoose");
const StudentModel = require("./models/student.model.js")

// los archivos de json automaticamente son exportados
const studentsArr = require("./students.json")

mongoose.connect("mongodb://localhost:27017/students-db")
.then((response) => {
  console.log("Logramos contactar la DB! Yay!")
  // aqui modificaremos la DB a nuestro gusto...

  return StudentModel.deleteMany() // esto limpia la colleccion para trabajar en entorno de prueba
})
.then((response) => {

  // METODOS DE CREATE
  return StudentModel.create({
    name: "Iñigo",
    age: 22,
    likesPokemon: true,
    pizzaToppings: ["Piña", "Queso"]
  })

})
.then((response) => {
  console.log("Iñigo ha sido añadido a la colección")
  // despues de agregar a iñigo

  return StudentModel.insertMany(studentsArr)

})
.then((response) => {
  console.log("agregados todos los estudiantes")

  // aqui vamos a hacer busquedas en nuestra DB
  // METODOS DE LEER (READ)
  // return StudentModel.find() // .find() busca todos los elementos
  // return StudentModel.find({ name: "Maria" })
  return StudentModel.find( { age: {$lt: 21} }).select("name").limit().sort()
  // lt < . lte <=

})
.then((response) => {
  console.log(response)
  // ya hicimos queries

  // METODOS DE ACTUALIZAR (UPDATE)
  // el primer argumento es la busqueda y el segundo que vamos a actualizar
  return StudentModel.findOneAndUpdate({ name: "Juan" }, { age: 17, likesPokemon: false }, {new: true})
  // ! como comportamiento predeterminado, mongoose envia de vuelta el element antes de la actualizacion
  // ! para contrarrestar este comportamiento, se agrega: {new: true}

})
.then((response) => {
  console.log("en teoria se ha actualizado", response)

  // METODOS DE BORRAR (DELETE)
  return StudentModel.findOneAndDelete({name: "Iñigo"})

})
.then((response) => {
  console.log("Iñigo ha sido borrado")

  return StudentModel.findOneAndUpdate({name: "Javi"},{ $push: { pizzaToppings: "Piña" } })
  // return StudentModel.findOneAndUpdate({name: "Javi"},{ $pull: { pizzaToppings: "Vegetales" } })
  // adicional a $push para agregar tenemos $pull para remover de un array

})
.then((response) => {
  console.log("elementos actualizados. A Javi le gusta la pizza con piña")
})
.catch((err) => {
  console.log(err)
})
