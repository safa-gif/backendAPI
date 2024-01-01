const express = require('express')
const router = express.Router()
const querySchema = require('../models/Questions')


// Create a question
router.post('/add-question', (req, res, next) => {
  const newQuestion = new querySchema ({
    titre : req.body.titre,
    contenu: req.body.contenu,
    categorie: req.body.categorie
  })
  newQuestion.save()
  .then((data)=> {
   res.status(200).json(
    {msg: "Question has been added succesfully to the database.",
    data: data}
    )
  })
  .catch((error)=>{
    console.log("Error in creating the question",error)
  })
// querySchema.create()

})

// Get All Questions
router.route('/').get((req, res, next) => {
 querySchema.find().then((data)=> {
    res.status(200).json(data)
  })
  .catch((error)=> {
    console.log('Error in getting questions', error)
  })
})


// Get Question By Id
router.route('/get-question/:id').get((req, res, next) => {

querySchema.findById({_id: req.params.id})
.then((data)=>{
  return res.status(200).json({msg: data });
})
.catch((error)=> {
  console.log('Error in getting the question by its Id : ',error)
})

})

//Get Question By Category:
router.get('/:categorie', async (req, res) => {
  try {
    console.log("Here into get match by Category", req.params.categorie);
    const categorie = req.params.categorie;
    // Assume Question is your mongoose model
    const data = await querySchema.find({ categorie: categorie });
    res.status(200).json({msg: data});
  } catch (error) {
    res.status(500).json({msg: error.message}); // Send only the error message
    console.error('Error in getting the question by its Category:', error);
  }
});

// Update Question
router.route('/update-question/:id').put((req, res, next) => {
 querySchema.findByIdAndUpdate({_id: req.params.id}, {$set: req.body})
  .then((data)=> {
     res.status(200).json({
      msg: "Question has been successfully updated ",
      data: data
     })
  })
  .catch((err)=> {
    console.log("Error in updating the question", err);
  })
})


// Delete Question
router.route('/delete-question/:id').delete((req, res, next) => {
 querySchema.deleteOne({_id: req.params.id})
  .then((data)=>{
    res.status(200).json({
      msg: 'This Question has been deleted successfuly',
      data : data
    })
  })
  .catch((error)=> {
    console.log('Error in deleting the question : ', error);
  })

})

module.exports = router
