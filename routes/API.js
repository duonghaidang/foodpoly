//import modules
const express = require('express');
const router = express.Router();

//import controllers
const API = require('../controllers/API');

//getAll
router.get('/api/foods', API.getAll);

router.get('/api/food/:id', API.getFood);

//edit
router.put('/api/food/edit/:id', API.editFood);

//delete
router.delete('/api/food/delete/:id', API.deleteFood);

router.get('/api/food/type/:id', API.getTheLoai);

//getAll
router.get('/api/types', API.getAllType);

module.exports = router;
