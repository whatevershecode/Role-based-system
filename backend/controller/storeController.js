const storeModel = require('../models/store');
const ratingModel = require('../models/rating');

exports.getStores = async (req, res) => {
  try {
    const stores = await storeModel.getStores();
    
    // Get user ratings if user is logged in
    if (req.user) {
      for (const store of stores) {
        const userRating = await ratingModel.getUserRatingForStore(req.user.id, store.id);
        store.userRating = userRating.rows[0]?.rating || null;
      }
    }
    
    res.json(stores);
  } catch (error) {
    console.error('Error fetching stores:', error);
    res.status(500).json({ message: 'Error fetching stores' });
  }
};

exports.rateStore = async (req, res) => {
  const { storeId, rating } = req.body;
  try {
    await ratingModel.rateStore(req.user.id, storeId, rating);

    const avgResult = await ratingModel.getStoreAverageRating(storeId);
    const ratingCountResult = await ratingModel.getRatingCount(storeId);

    res.status(201).json({
      message: 'Store rated successfully',
      averageRating: parseFloat(avgResult.rows[0].avg) || 0,
      ratingCount: parseInt(ratingCountResult.rows[0].count) || 0
    });
  } catch (error) {
    console.error('Error rating store:', error.message); // <-- shows the DB error
    res.status(500).json({ message: 'Error rating store', error: error.message });
  }
};



// Add a new store (for store owners)
exports.addStore = async (req, res) => {
  const { name, email, address } = req.body;
  const ownerId = req.user.id; // The authenticated user is the store owner

  try {
    await storeModel.addStore(name, email, address, ownerId);
    res.status(201).json({ message: 'Store added successfully!' });
  } catch (error) {
    console.error('Error adding store:', error);
    res.status(500).json({ message: 'Error adding store' });
  }
};
