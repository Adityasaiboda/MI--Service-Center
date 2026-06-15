const Customer =
require("../models/customerModel");
exports.createCustomer = (req, res) => {

    console.log("Received:", req.body);

    Customer.addCustomer(req.body, (err, result) => {

        if (err) {
            console.log("SQL Error:", err);
            return res.status(500).json(err);
        }

        console.log("Insert Success:", result);

        res.json({
            message: "Customer Registered Successfully"
        });
    });
};
exports.searchCustomer = (req,res)=>{

    const value =
    req.params.value;

    Customer.searchCustomer(
        value,
        (err,result)=>{

            if(err){

                return res.status(500).json(err);

            }

            res.json(result);

        }

    );

};
exports.getAllCustomers = (req, res) => {

    Customer.getAllCustomers(
        (err, result) => {

            if(err){
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
};
exports.updateStatus = (req, res) => {

    console.log("PUT Request Received");
    console.log("ID:", req.params.id);
    console.log("BODY:", req.body);

    const id = req.params.id;
    const status = req.body.status;

    Customer.updateStatus(
        id,
        status,
        (err, result) => {

            if (err) {
                console.log("UPDATE ERROR:", err);

                return res.status(500).json({
                    error: err.message
                });
            }

            console.log("UPDATE RESULT:", result);

            res.json({
                message: "Status Updated"
            });
        }
    );
};
exports.deleteCustomer = (req, res) => {

    const id = req.params.id;

    Customer.deleteCustomer(
        id,
        (err, result) => {

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message: "Customer Deleted"
            });
        }
    );
};
exports.updatePaymentStatus =
(req,res)=>{

    const id =
    req.params.id;

    const {
        payment_status,
        remaining_paid_amount,
        remaining_payment_mode
    } = req.body;

    Customer.updatePaymentStatus(
        id,
        payment_status,
        remaining_paid_amount,
        remaining_payment_mode,
        (err,result)=>{

            if(err){
                return res
                .status(500)
                .json(err);
            }

            res.json({
                message:
                "Payment Updated"
            });

        }
    );

};
exports.deliverCustomer = (req,res)=>{

    const id = req.params.id;

    Customer.deliverCustomer(
        id,
        (err,result)=>{

            if(err){
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                message:"Delivered Successfully"
            });
        }
    );
};
exports.getCustomersByDate = (req,res)=>{

    const date = req.params.date;

    Customer.getCustomersByDate(
        date,
        (err,result)=>{

            if(err){
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

};
exports.login = (req,res)=>{

    console.log("LOGIN REQUEST RECEIVED");

    console.log(req.body);

    const { username, password } = req.body;

    Customer.login(
        username,
        password,
        (err,result)=>{

            if(err){
                return res.status(500).json(err);
            }

            if(result.length > 0){

                res.json({
                    success:true,
                    role:result[0].role
                });

            } else {

                res.json({
                    success:false
                });

            }

        }
    );
};
exports.dailyCollection =
(req,res)=>{

    const date =
    req.params.date;

    Customer.dailyCollection(
        date,
        (err,result)=>{

            if(err){

                return res
                .status(500)
                .json(err);

            }

            res.json(result);

        }
    );
};