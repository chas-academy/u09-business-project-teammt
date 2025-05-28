const express = require('express');
const {
  getCookBooks,createCookBook,updateCookBook,deleteCookBook,getOneCookBook
} = require('../controllers/cookBookController');



const router = express.Router();

router
  .route('/')
  .get(getCookBooks)
   .post(createCookBook);


 router
 .route('/:id')
   .get(getOneCookBook)
   .put(updateCookBook)
  .delete(deleteCookBook);



module.exports = router;