const mongoose = require('mongoose');
const { validate } = require('./Comment');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: {
      values: ['CSE', 'EEE', 'ETE', 'ECE'],
      message: 'Invalid department',
    },
  },
  studentId: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
    trim: true,
    validate: {
      validator: function (v) {
        const year = parseInt(v.substring(0, 2), 10);
        const idLength = v.length;
        if (year < 13 && idLength === 6) {
          return true;
        } else if (year >= 13 && idLength === 7) {
          return true;
        }
        return false;
      },
      message: 'Invalid student ID',
    },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  username: {
    type: String,
    // required: [true, 'Username is required'],
    unique: true,
    trim: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  emailToken: {
    type: String, // Stores the email verification token
  },
  emailTokenExpires: {
    type: Date, // Expiry for the email verification token
  },
  // role: {
  //   type: String,
  //   enum: ['user', 'admin'], // Define roles
  //   default: 'user', // Default role
  // },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // 5 minutes in seconds
  }
}, {
  timestamps: true, 
});

// naming convention
UserSchema.pre('save', function (next) {
  this.username = `${this.studentId}_${this.firstname}`.toLowerCase();
  next();
});


UserSchema.pre('save', async function(next) {
  console.log('Pre-save hook triggered for user:', this._id);
  
  // Set username
  this.username = `${this.studentId}_${this.firstname}`.toLowerCase();
  
  // If user is new and not verified, set TTL
  if (this.isNew && !this.isVerified) {
    console.log('Setting TTL for new unverified user:', this._id);
    this.createdAt = new Date();
  }
  
  // If user becomes verified, remove TTL
  if (this.isVerified) {
    console.log('User verified, removing TTL:', this._id);
    this.createdAt = undefined;
  }
  
  next();
});


UserSchema.index(
  { createdAt: 1 }, 
  { expireAfterSeconds: 300, partialFilterExpression: { isVerified: false } }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
