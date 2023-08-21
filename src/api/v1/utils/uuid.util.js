const { v4: uuidv4 } = require("uuid");

async function createId() {
  const id = await uuidv4()
  return id
}

module.exports = createId