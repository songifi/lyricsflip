const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Admin", // Default role for admin
    enum: ["Admin", "Moderator", "Content Manager"], // Future-proof for role-based control
  },
  permissions: {
    canManageUsers: { type: Boolean, default: true }, // Manage user accounts
    canModifyGameSettings: { type: Boolean, default: true }, // Adjust game settings
    canViewReports: { type: Boolean, default: true }, // View analytics or reports
    canManageContent: { type: Boolean, default: true }, // Handle content like lyrics, etc.
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to update the `updatedAt` field
adminSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Method to check if admin has specific permission
adminSchema.methods.hasPermission = function (permission) {
  return this.permissions[permission] || false;
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
