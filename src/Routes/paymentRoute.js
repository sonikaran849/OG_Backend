const express = require("express");
const authenticate = require("../middleware/authenticate");
const paymentController = require("../controllers/paymentController");
const router = express.Router();

router.post("/:id", authenticate.authenticate , paymentController.createPaymentLink);
router.get("/", authenticate.authenticate , paymentController.updatePaymentInformation);


module.exports = router;
