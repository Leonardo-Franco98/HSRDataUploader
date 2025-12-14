require('dotenv').config()
const mongoose = require('mongoose')
const axios = require('axios')
const fs = require('fs')

const Character = require('./models/character')
const Lightcone = require('./models/lightcone')
const Relic = require('./models/relic')
const PlanarOrnament = require('./models/planarOrnament')

const { characters, lightcones, relics, planarOrnaments } = require('./data.json')

const uploadData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_INSTANCE)
    console.log('Connected to database successfully!')
  } catch (e) {
    console.log('An error occurred when trying to connect to MongoDB database', e)
    return
  }

  await createRelics()
  await createPlanarOrnaments()
  await createLightcones()
  await createCharacters()
  return
}

const createRelics = async () => {
  try {
    await Relic.deleteMany({})
    console.log('\n\nRelic collection reset!')
  } catch (e) {
    console.log('\n\nAn error occurred while trying to reset relic collection', e)
    return
  }

  let success = 0
  let fail = 0

  for (let i = 0; i < relics.length; i++) {
    try {
      await saveImage(relics[i].name, relics[i].image, 'relics')
      await saveImage(relics[i].head.name + ' - Head', relics[i].head.image, 'relics')
      await saveImage(relics[i].hand.name + ' - Hand', relics[i].hand.image, 'relics')
      await saveImage(relics[i].body.name + ' - Body', relics[i].body.image, 'relics')
      await saveImage(relics[i].feet.name + ' - Feet', relics[i].feet.image, 'relics')

      delete relics[i].image
      delete relics[i].head.image
      delete relics[i].hand.image
      delete relics[i].body.image
      delete relics[i].feet.image

      let newRelic = new Relic(relics[i])
      await newRelic.save()

      success++
    } catch (e) {
      fail++
    }
  }

  console.log('\n--------------------')
  console.log('RELICS:')
  console.log(`\nSuccesses: ${success}`)
  console.log(`Failures: ${fail}`)
  console.log('--------------------')
}

const createPlanarOrnaments = async () => {
  try {
    await PlanarOrnament.deleteMany({})
    console.log('\n\nPlanar ornament collection reset!')
  } catch (e) {
    console.log('\n\nAn error occurred while trying to reset planar ornament collection', e)
    return
  }

  let success = 0
  let fail = 0

  for (let i = 0; i < planarOrnaments.length; i++) {
    try {
      await saveImage(planarOrnaments[i].name.replace(':', ' +'), planarOrnaments[i].image, 'planarOrnaments')
      await saveImage(planarOrnaments[i].sphere.name + ' - Sphere', planarOrnaments[i].sphere.image, 'planarOrnaments')
      await saveImage(planarOrnaments[i].rope.name + ' - Rope', planarOrnaments[i].rope.image, 'planarOrnaments')

      delete planarOrnaments[i].image
      delete planarOrnaments[i].sphere.image
      delete planarOrnaments[i].rope.image

      let newPlanarOrnament = new PlanarOrnament(planarOrnaments[i])
      await newPlanarOrnament.save()

      success++
    } catch (e) {
      fail++
    }
  }

  console.log('\n--------------------')
  console.log('PLANAR ORNAMENTS:')
  console.log(`\nSuccesses: ${success}`)
  console.log(`Failures: ${fail}`)
  console.log('--------------------')
}

const createLightcones = async () => {
  try {
    await Lightcone.deleteMany({})
    console.log('\n\nLightcone collection reset!')
  } catch (e) {
    console.log('\n\nAn error occurred while trying to reset lightcones collection', e)
    return
  }

  let success = 0
  let fail = 0

  for (let i = 0; i < lightcones.length; i++) {
    try {
      await saveImage(lightcones[i].name.replace(':', ' +').replace('?', '~'), lightcones[i].image, 'lightcones')

      delete lightcones[i].image

      let newLightcone = new Lightcone(lightcones[i])
      await newLightcone.save()

      success++
    } catch (e) {
      fail++
    }
  }

  console.log('\n--------------------')
  console.log('LIGHTCONES:')
  console.log(`\nSuccesses: ${success}`)
  console.log(`Failures: ${fail}`)
  console.log('--------------------')
}

const createCharacters = async () => {
  try {
    await Character.deleteMany({})
    console.log('\n\nCharacter collection reset!')
  } catch (e) {
    console.log('\n\nAn error occurred while trying to reset character collection', e)
    return
  }

  let success = 0
  let fail = 0

  for (let i = 0; i < characters.length; i++) {
    try {
      await saveImage(characters[i].name, characters[i].image, 'characters')

      delete characters[i].image

      for (let j = 0; j < characters[i].eidolons.length; j++) {
        await saveImage(`${characters[i].name} - Eidolon ${j + 1} Image`, characters[i].eidolons[j].image, 'characters')
        await saveImage(`${characters[i].name} - Eidolon ${j + 1} Icon`, characters[i].eidolons[j].icon, 'characters')

        delete characters[i].eidolons[j].image
        delete characters[i].eidolons[j].icon
      }

      for (let j = 0; j < characters[i].traces.large.length; j++) {
        await saveImage(`${characters[i].name} - Trace Large ${j + 1}`, characters[i].traces.large[j].image, 'characters')

        delete characters[i].traces.large[j].image
      }

      await saveImage(`${characters[i].name} - Technique`, characters[i].traces.core.technique.image, 'characters')

      delete characters[i].traces.core.technique.image

      for (let j = 0; j < characters[i].traces.core.basic.length; j++) {
        await saveImage(`${characters[i].name} - Basic ${j + 1}`, characters[i].traces.core.basic[j].image, 'characters')

        delete characters[i].traces.core.basic[j].image
      }

      for (let j = 0; j < characters[i].traces.core.skill.length; j++) {
        await saveImage(`${characters[i].name} - Skill ${j + 1}`, characters[i].traces.core.skill[j].image, 'characters')

        delete characters[i].traces.core.skill[j].image
      }

      for (let j = 0; j < characters[i].traces.core.ultimate.length; j++) {
        await saveImage(`${characters[i].name} - Ultimate ${j + 1}`, characters[i].traces.core.ultimate[j].image, 'characters')

        delete characters[i].traces.core.ultimate[j].image
      }

      for (let j = 0; j < characters[i].traces.core.talent.length; j++) {
        await saveImage(`${characters[i].name} - Talent ${j + 1}`, characters[i].traces.core.talent[j].image, 'characters')

        delete characters[i].traces.core.talent[j].image
      }

      let newCharacter = new Character(characters[i])
      await newCharacter.save()

      success++
    } catch (e) {
      console.log(e, characters[i])
      fail++
    }
  }

  console.log('\n--------------------')
  console.log('CHARACTERS:')
  console.log(`\nSuccesses: ${success}`)
  console.log(`Failures: ${fail}`)
  console.log('--------------------')
}

const saveImage = async (name, url, folder) => {
  fs.rm(`../images/${folder}/${name}.png`, () => { })

  const response = await axios({
    url: url,
    method: 'GET',
    responseType: 'stream'
  })

  const writer = fs.createWriteStream(`../images/${folder}/${name}.png`)

  response.data.pipe(writer)
}

uploadData()