const express = require('express');
const router = express.Router();
const manualEntryController = require('../../../controllers/manualEntry/manualEntryController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Define routes for manual entry operations
router.post('/', authMiddleware, manualEntryController.createManualEntry);
router.get('/', authMiddleware, manualEntryController.getAllManualEntries);
router.get('/:id', authMiddleware, manualEntryController.getManualEntryById);
router.put('/:id', authMiddleware, manualEntryController.updateManualEntry);
router.delete('/:id', authMiddleware, manualEntryController.deleteManualEntry);

module.exports = router;
