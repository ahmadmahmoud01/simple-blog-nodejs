const express = require('express');

const router = express.Router();
const blogController = require('../controllers/blogController');


//get all blogs
router.get('/', blogController.blog_index);


//create new blog
router.get('/create', blogController.blog_create_get);

//store new blog in db
router.post('/', blogController.blog_create_post);

//find blog by id
router.get('/:id', blogController.blog_details);

//delete blog
router.delete('/:id', blogController.blog_delete);

module.exports = router;