const express = require('express');
const router = express.Router();
const governanceController = require('../../../controllers/governance/governanceController');

// Fixed to match controller method names
router.get('/', governanceController.getAllGovernance);
router.get('/:id', governanceController.getGovernanceById);
router.post('/', governanceController.createGovernance);
router.put('/:id', governanceController.updateGovernance);
router.delete('/:id', governanceController.deleteGovernance);

module.exports = router;