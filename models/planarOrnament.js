const mongoose = require("mongoose")

const planarOrnamentSchema = mongoose.Schema({
  name: String,
  effect: String,
  sphere: {
    name: String,
    description: String,
    story: String
  },
  rope: {
    name: String,
    description: String,
    story: String
  }
})

planarOrnamentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id;
    delete returnedObject.__v;
  },
})

const PlanarOrnament = mongoose.model("PlanarOrnament", planarOrnamentSchema)

module.exports = PlanarOrnament