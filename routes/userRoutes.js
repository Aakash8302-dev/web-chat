const express = require('express')
const {authUser, getUserProfile, registerUser} = require('../controllers/userController.js')
const router = express.Router();
const {protect} = require('../middleware/authMiddleware.js')


// import express from 'express'
// import { authUser, getUserProfile, registerUser } from '../controllers/userController.js'
// const router = express.Router()
// import {protect} from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserProfile)

module.exports = router