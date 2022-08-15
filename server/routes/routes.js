const express = require('express');
const router = express.Router();

// load render service
const services = require('../services/render');
const controller = require('../controller/controller');

/**
 * @description Root Route
 * @method GET /
 */
router.get('/', services.homeRoute);

/**
 * @description add user
 * @method GET /add-user
 */
router.get('/add-user', services.add_user);

/**
 * @description update existing user
 * @method GET /update-user
 */
router.get('/update-user', services.update_user);


// API
router.post('/api/users', controller.create);
router.get('/api/users', controller.find);
router.put('/api/users/:id', controller.update);
router.delete('/api/users/:id', controller.delete);

module.exports = router;