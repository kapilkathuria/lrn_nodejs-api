const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

// this is middleware to check if tour id exists
// same thing can be done with simple functin as well in tourController
//  but this is more effective as middleware is checked before it has gone in any route
router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
