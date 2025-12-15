const mongoose = require("mongoose")

const lightconeSchema = mongoose.Schema({
  name: String,
  path: String,
  rarity: Number,
  flavorText: String,
  effectName: String,
  effect: String,
  superImpositions: [[Number]],
  stats: {
    hp: Number,
    atk: Number,
    def: Number
  }
})

lightconeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id;
    delete returnedObject.__v;
  },
})

const Lightcone = mongoose.model("Lightcone", lightconeSchema)

module.exports = Lightcone