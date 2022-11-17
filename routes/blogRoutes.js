const express = require('express')
const {getBlogs, getBlogsById, createBlog} = require('../controllers/blogController.js')
const {protect} = require('../middleware/authMiddleware.js')


const router = express.Router()

router.route('/').get(getBlogs)
router.route('/:id').get(getBlogsById)
router.route('/create').post(protect, createBlog)

module.exports = router