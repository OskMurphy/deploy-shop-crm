const express = require('express');

const router = express.Router();
const productService = require('../service/product');
const Role = require('../helpers/role');

const authorize = require('../helpers/authorize');

function getProductsByPage(req, res, next) {
  console.log('here');
  productService
    .getProductsByPage(req.query)
    .then(products => res.json(products))
    .catch(err => next(err));
}

function getCategoriesOptions(req, res, next) {
  productService
    .getCategoriesOptions()
    .then(options => res.json(options))
    .catch(err => next(err));
}

function fetchUserLikeIds(req, res, next) {
  productService
    .fetchUserLikeIds(req.params.userId)
    .then(options => res.json(options))
    .catch(err => next(err));
}

function toggleLike(req, res, next) {
  const currentUserId = req.user?.sub;
  productService
    .toggleLike(req.body.productId, currentUserId)
    .then(options => res.json(options))
    .catch(err => next(err));
}

function getFavorites(req, res, next) {
  const currentUserId = req.user?.sub;
  productService
    .getFavorites(currentUserId)
    .then(options => res.json(options))
    .catch(err => next(err));
}

function deleteProduct(req, res, next) {
  productService
    .deleteProduct(req.body.id)
    .then(() => res.json({ok: 'ok'}))
    .catch(err => next(err));
}

router.get('/', getProductsByPage);
router.get('/categoriesOptions', getCategoriesOptions);
router.post('/like', authorize(), toggleLike);
router.get('/likes/:userId', fetchUserLikeIds);
router.get('/favorites', authorize(), getFavorites);
router.delete('/', authorize(Role.Admin), deleteProduct);
module.exports = router;
