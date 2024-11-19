const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { 
  createCar, 
  getUserCars, 
  searchCars, 
  getCarById, 
  updateCar, 
  deleteCar 
} = require('../controllers/carController');

// @route   POST /api/cars
// @desc    Create a new car
router.post('/', authMiddleware, upload.array('images', 10), createCar);

// @route   GET /api/cars
// @desc    Get all cars for a user
router.get('/', authMiddleware, getUserCars);

// @route   GET /api/cars/search
// @desc    Search cars
router.get('/search', authMiddleware, searchCars);

// @route   GET /api/cars/:id
// @desc    Get car by ID
router.get('/:id', authMiddleware, getCarById);

// @route   PUT /api/cars/:id
// @desc    Update a car
router.put('/:id', authMiddleware, updateCar);

// @route   DELETE /api/cars/:id
// @desc    Delete a car
router.delete('/:id', authMiddleware, upload.array('images', 10), deleteCar);

module.exports = router;