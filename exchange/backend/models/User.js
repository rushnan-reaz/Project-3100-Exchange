
const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastname: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: {
      values: ['CSE', 'EEE', 'ETE', 'ECE'],
      message: 'Invalid department'
    }
  },
  studentId: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
    trim: true,
    validate: {
      validator: function(v) {
        const year = parseInt(v.substring(0, 2), 10);
        const idLength = v.length;
        if (year < 13 && idLength === 6) {
          return true;
        } else if (year >= 13 && idLength === 7) {
          return true;
        }
        return false;
      },
      message: 'Invalid student ID'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  }
}, {
  timestamps: true
});


const User = mongoose.model('User', UserSchema);

module.exports = User;