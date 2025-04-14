const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const {
  getStores,
  rateStore,
  addStore
} = require('../controllers/storeController');

const router = express.Router();

// Get all stores (user/admin access)
router.get('/', authenticate(['user', 'admin']), getStores);

// Rate a store (user access)
router.post('/rate', authenticate(['user']), rateStore);

// Add a new store (store owner access)
router.post('/', authenticate(['store_owner']), addStore);

module.exports = router;
