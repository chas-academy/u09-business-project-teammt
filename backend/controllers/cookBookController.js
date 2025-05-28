const CookBook = require('../model/cookBook');

const getCookBooks = async (req, res) => {
  const allCooKbooks = await CookBook.find();
  res.status(200).json({
    message: 'get all cook books called',
    cookbooks: allCooKbooks,
  });
};

const createCookBook = async (req, res) => {
  console.log(req.body);
  const savedResponse = await CookBook.create(req.body);
  res.status(200).json({
    message: 'create cook boot called',
    saved: savedResponse,
  });
};





const updateCookBook = async (req, res) => {
  console.log(req.body);
// first we check if cookbook exists
  const cookBookToUpdate = await CookBook.findById(req.params.id);
  if (!cookBookToUpdate) {
    res.status(400).json({
      error: 'unable to find cookbook, confirm id',
    });
  }

  // if operation is ok
  if(req.body.operation == 'add'){
   const recipeExist=cookBookToUpdate.recipes.some(r=>r.id == req.body.recipe.id);
   if(recipeExist){
    res.status(400).json({
      error: 'recipe is already in the cookbook',
    });
   }
    cookBookToUpdate.recipes.push(req.body.recipe);

    const savedCookBook = await cookBookToUpdate.save();

    res.status(200).json({
        message: 'Recipe added successfully',
        cookbook: savedCookBook
      });




  }else if (req.body.operation == 'remove'){

    // check if in this conatins.. if not error
    //if cookBookToUpdate.recipts filter..return all except id in request = new list without this item 
    // cookBookToUpdate.recipts = new list
    // cookBookToUpdate.save


  }else{
  res.status(400).json({
      error: 'operation should be add or remove',
    });
  }





  res.status(200).json({
    message: 'update cook book called',
  });
};








const deleteCookBook = async (req, res) => {
  res.status(200).json({
    message: 'delete cook book called',
  });
};








const getOneCookBook = async (req, res) => {
  console.log(req.params.id);

  try {
    const oneCookBook = await CookBook.findById(req.params.id);
    res.status(200).json({
      message: 'get one cook books called',
      cookbooks: oneCookBook,
    });
  } catch (err) {
    res.status(400).json({
      error: 'unable to find cookbook, confirm id',
    });
  }
};

module.exports = { getCookBooks, createCookBook, updateCookBook, deleteCookBook, getOneCookBook };
