const express = require('express');
const router = express.Router();
const developerAdminController = require('../../../controllers/developerAdmin/developerAdminController');

// Define routes for developer admin-related operations
router.get('/', developerAdminController.getDeveloperAdmins);
router.get('/:id', developerAdminController.getDeveloperAdminById);
router.post('/', developerAdminController.createDeveloperAdmin);
router.put('/:id', developerAdminController.updateDeveloperAdmin);
router.delete('/:id', developerAdminController.deleteDeveloperAdmin);

module.exports = router;
