const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/transactions', transactionController.getTransactions);
router.get('/filters', transactionController.getFilters);

module.exports = router;
