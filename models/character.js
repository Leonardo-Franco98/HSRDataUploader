const mongoose = require("mongoose")

const characterSchema = mongoose.Schema({
  name: String,
  path: String,
  element: String,
  rarity: Number,
  image: String,
  story: String,
  voice: {
    japanese: String,
    english: String
  },
  stats: {
    hp: Number,
    atk: Number,
    def: Number,
    spd: Number
  },
  eidolons: [
    {
      name: String,
      effect: String,
      icon: String,
      image: String
    }
  ],
  traces: {
    small: [
      {
        stat: String,
        value: String
      }
    ],
    large: [
      {
        name: String,
        effect: String,
        image: String
      }
    ],
    core: {
      technique: {
        name: String,
        effect: String,
        image: String,
        tag: String
      },
      basic: [
        {
          name: String,
          effect: String,
          image: String,
          scaling: [[Number]],
          generation: Number,
          tag: String
        }
      ],
      skill: [
        {
          name: String,
          effect: String,
          image: String,
          scaling: [[Number]],
          generation: Number,
          tag: String
        }
      ],
      ultimate: [
        {
          name: String,
          effect: String,
          image: String,
          scaling: [[Number]],
          generation: Number,
          tag: String,
          cost: {
            resource: String,
            value: Number
          }
        }
      ],
      talent: [
        {
          name: String,
          effect: String,
          image: String,
          scaling: [[Number]],
          generation: Number,
          tag: String
        }
      ],
    }
  }
})

characterSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id;
    delete returnedObject.__v;
  },
})

const Character = mongoose.model("Character", characterSchema)

module.exports = Character