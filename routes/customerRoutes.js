const express = require("express");
const router = express.Router();

const customerController =
require("../controllers/customerController");

router.post(
    "/register",
    customerController.createCustomer
);
router.get(
    "/search",
    customerController.searchCustomer
);
router.get(
    "/all",
    customerController.getAllCustomers
);
router.put(
    "/status/:id",
    customerController.updateStatus
);
router.delete(
    "/:id",
    customerController.deleteCustomer
);
router.put(
    "/payment/:id",
    customerController.updatePaymentStatus
);
router.put(
"/deliver/:id",
customerController.deliverCustomer
);
router.get(
"/date/:date",
customerController.getCustomersByDate
);
router.post(
"/login",
customerController.login
);
router.get("/test", (req, res) => {
    res.json({
        message: "Routes Working"
    });
});
router.get(
"/collection/:date",
customerController.dailyCollection
);
module.exports = router;