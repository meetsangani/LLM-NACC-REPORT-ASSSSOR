const express = require('express');
const router = express.Router();
const placementController = require('../../../controllers/placement/placementController');
// Fix import to destructure the authMiddleware function
const { authMiddleware } = require('../../../middleware/authMiddleware');

// Define routes for placement-related operations
router.post('/', authMiddleware, placementController.createPlacement);
router.get('/', authMiddleware, placementController.getAllPlacements);
router.get('/:id', authMiddleware, placementController.getPlacementById);
router.put('/:id', authMiddleware, placementController.updatePlacement);
router.delete('/:id', authMiddleware, placementController.deletePlacement);

module.exports = router;