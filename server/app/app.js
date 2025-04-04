import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer'; 
import fs from 'fs';
import path from 'path';


// Create uploads folder
dotenv.config();
const uploadDir = './uploads/';
fs.mkdirSync(path.resolve(uploadDir), { recursive: true });

// Multer configuration
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Upload middleware
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
      }
  }),
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024, // limit files to 1MB
  },
});

// Express configuration
const initialize = (app) => {
    app.use(cors());
    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ limit: '1mb', extended: true }));

    app.use(express.static('public'));// serve static files from public folder

    //MONGODB CONNECTION
    // using .env file for better security. No pushing of usernames and password to git
    mongoose.connect(process.env.MONGODB_URI);
}

export { initialize, upload };