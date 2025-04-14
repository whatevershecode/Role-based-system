const db = require('./db');

// Get all stores with average rating
exports.getStores = async () => {
  const stores = await db.query('SELECT * FROM stores');
  for (const store of stores.rows) {
    const averageRatingResult = await db.query(
      'SELECT AVG(rating) FROM ratings WHERE store_id = $1',
      [store.id]
    );
    store.averageRating = averageRatingResult.rows[0].avg || 0; // Ensure fallback to 0 if no ratings
  }
  return stores.rows;
};

// Get average rating for a store
exports.getStoreAverageRating = (storeId) => {
  return db.query('SELECT AVG(rating) FROM ratings WHERE store_id = $1', [storeId])
    .then(result => result.rows[0].avg || 0); // Return 0 if no ratings are present
};

// Add a new store
exports.addStore = (name, email, address, ownerId) => {
  return db.query(
    'SELECT * FROM stores WHERE owner_id = $1 AND name = $2', 
    [ownerId, name]
  ).then(result => {
    if (result.rows.length > 0) {
      throw new Error('Store already exists for this owner.');
    }
    return db.query(
      'INSERT INTO stores (name, email, address, owner_id) VALUES ($1, $2, $3, $4)',
      [name, email, address, ownerId]
    );
  });
};
