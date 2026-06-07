const {nanoid} =require("nanoid");
const generateNanoId = (length) =>{
  return nanoid(length);
}

module.exports = {generateNanoId};