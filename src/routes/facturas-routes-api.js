const express = require('express');
const facturaController = require('../controllers/categorias-controller-api');
const router = express.Router();

router.get('/api/facturas',facturaController.getTodasFacturas);
router.get('/api/facturas/:id',facturaController.getFacturaPorId);
router.delete('/api/facturas/:id', facturaController.deleteFacturaPorId);
router.post('/api/facturas', facturaController.postFactura);
router.put('/api/facturas/:id', facturaController.putFacturaaPorId);

module.exports=router;