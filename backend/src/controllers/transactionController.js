const transactionService = require('../services/transactionService');

exports.getTransactions = async (req, res, next) => {
  try {
    const result = await transactionService.getFilteredTransactions(req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.getFilters = async (req, res, next) => {
  try {
    const result = await transactionService.getUniqueFilters();
    res.json(result);
  } catch (error) {
    next(error);
  }
};
