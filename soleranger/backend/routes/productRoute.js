const express = require('express');
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const { isAuthenticatedUser, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/product/new").post(isAuthenticatedUser, isAdmin("admin"),createProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser, isAdmin("admin"), updateProduct).delete(isAuthenticatedUser, isAdmin("admin"), deleteProduct);
router.route("/product/:id").get(getProductDetails);
module.exports = router