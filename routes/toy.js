const express = require('express')
const router = express.Router()
const ToyModel = require('../models/toygame')

// View all toys
// URL: localhost:3000/toy
router.get('/', async (req, res) => {
   let toys = await ToyModel.find({}).sort({"_id" : -1})
   res.render('toy/toys', { toys })
})

router.get('/list', async (req, res) => {
   // Get all toy data from database
   // Latest toys => oldest toys: sort by _id descending
   let toys = await ToyModel.find({}).sort({ "_id": -1 })
   // Show toy data
   res.render('toy/toy_list', { toys })
})

// Delete toy
// URL: localhost:3000/toy/delete/toy_id
router.get('/delete/:id', async (req, res) => {
   // Get toy id from URL
   let id = req.params.id
   // Find toy id in DB to delete
   await ToyModel.findByIdAndDelete(id)
   // Redirect to toy list page after deletion
   res.redirect("/toy/list")
})

// Add new toy (1) => render add form
// URL: localhost:3000/toy/add
router.get('/add', (req, res) => {
   res.render("toy/toy_add")
})

// Add new toy (2) => process data from add form
router.post('/add', async (req, res) => {
   // Save data from form to variable
   let toy = req.body
   // Add data to database
   await ToyModel.create(toy)
   // Redirect to toy list page after adding
   res.redirect("/toy/list")
})

// Edit toy (1) => render edit form
// URL: localhost:3000/toy/edit/toy_id
router.get('/edit/:id', async (req, res) => {
   let id = req.params.id
   let toy = await ToyModel.findById(id)
   res.render('toy/toy_edit', { toy })
})

// Edit toy (2) => process edit form
router.post('/edit/:id', async (req, res) => {
   let id = req.params.id
   let toy = req.body
   await ToyModel.findByIdAndUpdate(id, toy)
   res.redirect("/toy/list")
})

module.exports = router
