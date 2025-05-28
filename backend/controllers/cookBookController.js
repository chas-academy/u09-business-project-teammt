const CookBook  = require("../model/cookBook")


const getCookBooks = async (req, res) => {
  res.status(200).json({
      "message": "get all cook books called",

    });  
}

const createCookBook = async (req, res) => {
  console.log(req.body);
  const savedResponse =await CookBook.create(req.body);
  res.status(200).json({
      "message": "create cook boot called",
      "saved": savedResponse

    });  
}

const updateCookBook = async (req, res) => {
  res.status(200).json({
      "message": "update cook book called",

    }); }
    
    const deleteCookBook = async (req, res) => {
  res.status(200).json({
      "message": "delete cook book called",

    });  
}


const getOneCookBook = async (req, res) => {
  res.status(200).json({
      "message": "getOne cook book called",

    });  
}

module.exports = {getCookBooks,createCookBook,updateCookBook,deleteCookBook, getOneCookBook};

