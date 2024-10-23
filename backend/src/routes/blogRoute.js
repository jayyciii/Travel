const express = require('express');
const blog = express();
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

blog.use(bodyParser.urlencoded({ extended: true }));
blog.use(express.static(path.resolve(__dirname, '../../public')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const blogController = require('../controller/blogController');

// Route để import blog từ CSV
blog.post('/importBlog', upload.single('file'), blogController.importBlog);

// Route để export blog thành file CSV
blog.get('/exportBlog/export', blogController.exportBlog);

module.exports = blog;
