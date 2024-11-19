const Car = require('../models/Car');
const User = require('../models/User');
const cloudinary = require('../config/cloudinaryConfig');
const fs = require('fs');

// Create a new car

// Upload images to Cloudinary
const uploadImages = async (files) => {
    const uploadPromises = files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'car-management'
      });
      
      // Remove local file after upload
      fs.unlinkSync(file.path);
      
      return result.secure_url;
    });
  
    return Promise.all(uploadPromises);
  };
  
  exports.createCar = async (req, res) => {
    try {
      const { title, description, tags, car_type, company, dealer } = req.body;
      
      // Upload images if present
      const images = req.files ? await uploadImages(req.files) : [];
  
      const newCar = new Car({
        title,
        description,
        images,
        tags: tags ? tags.split(',') : [],
        car_type,
        company,
        dealer,
        user: req.user._id
      });
  
      const car = await newCar.save();
  
      // Add car to user's cars
      await User.findByIdAndUpdate(req.user._id, 
        { $push: { cars: car._id } },
        { new: true }
      );
  
      res.status(201).json(car);
    } catch (error) {
      res.status(500).json({ message: 'Error creating car', error: error.message });
    }
  };
  
  // Update car with image upload
  exports.updateCar = async (req, res) => {
    try {
      const { title, description, tags, car_type, company, dealer } = req.body;
      
      // Find existing car
      const existingCar = await Car.findOne({ 
        _id: req.params.id, 
        user: req.user._id 
      });
  
      if (!existingCar) {
        return res.status(404).json({ message: 'Car not found' });
      }
  
      // Upload new images if present
      let images = existingCar.images;
      if (req.files && req.files.length > 0) {
        const newImages = await uploadImages(req.files);
        images = [...images, ...newImages];
      }
  
      const car = await Car.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        { 
          title, 
          description, 
          images, 
          tags: tags ? tags.split(',') : [], 
          car_type, 
          company, 
          dealer 
        },
        { new: true }
      );
  
      res.json(car);
    } catch (error) {
      res.status(500).json({ message: 'Error updating car', error: error.message });
    }
  };

// Get all cars for a user
exports.getUserCars = async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user._id });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cars', error: error.message });
  }
};

// Search cars
exports.searchCars = async (req, res) => {
  try {
    const { keyword } = req.query;
    const cars = await Car.find({
      user: req.user._id,
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { tags: { $regex: keyword, $options: 'i' } }
      ]
    });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Error searching cars', error: error.message });
  }
};

// Get single car details
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    });

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching car', error: error.message });
  }
};



// Delete car
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user._id 
    });

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Remove car from user's cars array
    await User.findByIdAndUpdate(req.user._id, 
      { $pull: { cars: car._id } },
      { new: true }
    );

    res.json({ message: 'Car removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting car', error: error.message });
  }
};