const express = require('express');
const categoriaController = require('../controllers/categorias-controller-api');
const router = express.Router();

router.get('/categorias',categoriaController.getTodasCategorias);
router.get('/categorias/:id',categoriaController.getCategoriaPorId);
router.delete('/categorias/:id', categoriaController.deleteCategoriaPorId);
router.post('/categorias', categoriaController.postCategoria);
router.put('/categorias/:id', categoriaController.putCategoriaPorId);

module.exports=router;