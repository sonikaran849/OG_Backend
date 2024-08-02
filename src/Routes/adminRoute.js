const express = require("express");
const router = express.Router();
const orderController = require("../controllers/adminOrderController");
const {authenticate} = require("../middleware/authenticate");


router.get("/", authenticate, orderController.getAllOrders);
router.put("/:orderId/confirmed", authenticate, orderController.confirmedOrders);
router.put("/:orderId/ship", authenticate, orderController.shipOrders);
router.put("/:orderId/deliver", authenticate, orderController.deliveredOrders);
router.put("/:orderId/place", authenticate, orderController.placeOrder);
router.put("/:orderId/delete", authenticate, orderController.deleteOrders);
router.put("/:orderId/cancel", authenticate, orderController.cancelledOrders);


module.exports = router;