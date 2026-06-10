const db = require("../config/db");

const addCustomer = (data, callback) => {
    const sql = `
        INSERT INTO service_calls
(
 customer_name,
 phone1,
 phone2,
 email,
 address,
 imei,
 model,
 problem,
 estimated_cost,
 advance_received,
 advance_payment_mode,
 remaining_amount,
 entry_date
)
VALUES
(?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    db.query(sql, [
        data.customer_name,
        data.phone1,
        data.phone2,
        data.email,
        data.address,
        data.imei,
        data.model,
        data.problem,
        data.estimated_cost,
        data.advance_received,
        data.advance_payment_mode,
        data.remaining_amount,
        data.entry_date
    ], callback);
};

const searchCustomer = (searchValue, callback) => {

    const sql = `
    SELECT *
    FROM service_calls
    WHERE phone1 = ?
    OR phone2 = ?
    OR imei = ?
    ORDER BY entry_date DESC
    `;

    db.query(
        sql,
        [
            searchValue,
            searchValue,
            searchValue
        ],
        callback
    );
};
const getAllCustomers = (callback) => {

    const sql = `
    SELECT *
    FROM service_calls
    ORDER BY id DESC
    `;

    db.query(sql, callback);
};
const updateStatus = (id, status, callback) => {

    const sql = `
    UPDATE service_calls
    SET status = ?
    WHERE id = ?
    `;

    db.query(
        sql,
        [status, id],
        callback
    );
};
const updatePaymentStatus =
(id, paymentStatus, amount, paymentMode, callback)=>{

    const sql = `
    UPDATE service_calls
    SET
        payment_status=?,
        remaining_paid_amount=?,
        remaining_payment_mode=?
    WHERE id=?
    `;

    db.query(
        sql,
        [
            paymentStatus,
            amount,
            paymentMode,
            id
        ],
        callback
    );
};
const deliverCustomer = (id,callback)=>{

    const sql = `
    UPDATE service_calls
    SET
        status='Delivered',
        delivery_date=CURDATE()
    WHERE id=?
    `;

    db.query(
        sql,
        [id],
        callback
    );
};
const getCustomersByDate = (date,callback)=>{

    const sql = `
    SELECT *
    FROM service_calls
    WHERE entry_date = ?
    ORDER BY id DESC
    `;

    db.query(
        sql,
        [date],
        callback
    );
};
const login =
(
username,
password,
callback
)=>{

    const sql = `
    SELECT *
    FROM users
    WHERE username=?
    AND password=?
    `;

    db.query(
        sql,
        [
            username,
            password
        ],
        callback
    );

};
const dailyCollection =
(date,callback)=>{

    const sql = `

    SELECT

    SUM(
        CASE
        WHEN advance_payment_mode='Cash'
        THEN advance_received
        ELSE 0
        END
    ) +

    SUM(
        CASE
        WHEN remaining_payment_mode='Cash'
        THEN remaining_paid_amount
        ELSE 0
        END
    )

    AS total_cash,

    SUM(
        CASE
        WHEN advance_payment_mode!='Cash'
        THEN advance_received
        ELSE 0
        END
    ) +

    SUM(
        CASE
        WHEN remaining_payment_mode!='Cash'
        THEN remaining_paid_amount
        ELSE 0
        END
    )

    AS total_online

    FROM service_calls

    WHERE entry_date = ?

    `;

    db.query(
        sql,
        [date],
        callback
    );

};
module.exports = {
    addCustomer,
    searchCustomer,
    getAllCustomers,
    updateStatus,
    updatePaymentStatus,
    deliverCustomer,
    getCustomersByDate,
    login,
    dailyCollection,
};
