const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  images: [{
    type: String,
    validate: {
      validator: function(v) {
        return this.images.length <= 10;
      },
      message: 'Maximum 10 images allowed'
    }
  }],
  tags: [{
    type: String,
    trim: true
  }],
  car_type: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  dealer: {
    type: String,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Car', CarSchema);