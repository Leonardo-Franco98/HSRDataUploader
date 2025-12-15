const mongoose = require("mongoose")

const relicSchema = mongoose.Schema({
  name: String,
  effect2: String,
  effect4: String,
  head: {
    name: String,
    description: String,
    story: String
  },
  hand: {
    name: String,
    description: String,
    story: String
  },
  body: {
    name: String,
    description: String,
    story: String
  },
  feet: {
    name: String,
    description: String,
    story: String
  }
})

relicSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id;
    delete returnedObject.__v;
  },
})

const Relic = mongoose.model("Relic", relicSchema)

module.exports = Relic