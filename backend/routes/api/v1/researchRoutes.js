const express = require('express');
const router = express.Router();
const researchController = require('../../../controllers/research/researchController');

// Define routes for research-related operations
router.post('/', researchController.createResearch);
router.get('/', researchController.getAllResearch);
router.get('/:id', researchController.getResearchById);
router.put('/:id', researchController.updateResearch);
router.delete('/:id', researchController.deleteResearch);

module.exports = router;