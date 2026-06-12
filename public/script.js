console.log("script.js loaded");

document
.getElementById("customerForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    console.log("Form Submitted");

    const customerData = {
        customer_name:
            document.getElementById("customer_name").value,

        phone1:
            document.getElementById("phone1").value,

        phone2:
            document.getElementById("phone2").value,

        email:
            document.getElementById("email").value,

        address:
            document.getElementById("address").value,

        imei:
            document.getElementById("imei").value,

        model:
            document.getElementById("model").value,

        problem:
            document.getElementById("problem").value,

        estimated_cost:
            document.getElementById("estimated_cost").value,

        entry_date:
            document.getElementById("entry_date").value,
        advance_received:
            document.getElementById("advance_received").value,
        advance_payment_mode:
            document.getElementById("advance_payment_mode").value,
        remaining_amount:
            document.getElementById("remaining_amount").value,
    };

    console.log(customerData);

    fetch("/api/customers/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(customerData)

    })
    .then(response => response.json())
    .then(data => {

        document.getElementById("message").innerHTML =
            data.message;

        document.getElementById("customerForm").reset();

    })
    .catch(error => {

        console.error(error);

        document.getElementById("message").innerHTML =
            "Error Saving Customer";

    });
});
document
.getElementById("advance_received")
.addEventListener("input", calculateBalance);

document
.getElementById("estimated_cost")
.addEventListener("input", calculateBalance);

function calculateBalance(){

    const estimated =
    Number(
        document.getElementById(
            "estimated_cost"
        ).value
    ) || 0;

    const advance =
    Number(
        document.getElementById(
            "advance_received"
        ).value
    ) || 0;

    document.getElementById(
        "remaining_amount"
    ).value = estimated - advance;
}
function searchCustomer() {

    const value =
    document.getElementById(
        "searchValue"
    ).value;

    fetch(`/api/customers/search/${value}`)

    .then(response => response.json())

    .then(data => {

        const customerDetails =
        document.getElementById(
            "customerDetails"
        );

        customerDetails.innerHTML = "";

        data.forEach(customer => {

            customerDetails.innerHTML += `

            <div class="customer-card">

                <h2>${customer.customer_name}</h2>

                <p><b>Phone:</b> ${customer.phone1}</p>

                <p><b>IMEI:</b> ${customer.imei}</p>

                <p><b>Model:</b> ${customer.model}</p>

                <p><b>Problem:</b> ${customer.problem}</p>

                <p><b>Estimated Cost:</b> ₹${customer.estimated_cost}</p>

                <p><b>Advance Paid:</b> ₹${customer.advance_received}</p>

                <p><b>Balance Amount:</b> ₹${customer.remaining_amount}</p>

                <br>

                <label><b>Repair Status</b></label>

                <select onchange="updateStatus(${customer.id},this.value)">
                    <option value="Pending">Pending</option>
                    <option value="Repairing">Repairing</option>
                    <option value="Ready">Ready</option>
                    <option value="Delivered">Delivered</option>
                </select>

                <br><br>

                <label><b>Payment Status</b></label>

                <select id="paymentStatus_${customer.id}">
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                </select>

                <br><br>

                <input
                    type="number"
                    id="paidAmount_${customer.id}"
                    placeholder="Remaining Amount Paid">

                <br><br>

                <select id="paymentMode_${customer.id}">
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="Card">Card</option>
                </select>

                <br><br>

                <button onclick="savePayment(${customer.id})">
                    Save Payment
                </button>

                <button onclick="markDelivered(${customer.id})">
                    Deliver Device
                </button>

            </div>

            <br>
            `;
        });

    })

    .catch(error => {

        console.error(
            "Search Error:",
            error
        );

    });

}
function savePayment(id){

    const amount =
    document.getElementById(
        `paidAmount_${id}`
    ).value;

    const paymentMode =
    document.getElementById(
        `paymentMode_${id}`
    ).value;

    fetch("/api/customers/payment/1",
    {

        method:"PUT",

        headers:{
            "Content-Type":
            "application/json"
        },

        body:JSON.stringify({

            payment_status:"Paid",

            remaining_paid_amount:amount,

            remaining_payment_mode:paymentMode

        })

    })

    .then(response =>
        response.json()
    )

    .then(data => {

    alert("Payment Updated");

    const searchBox =
    document.getElementById(
        "searchValue"
    );

    if(searchBox.value){
        searchCustomer();
    }

})

    .catch(error => {

        console.log(error);

    });

}
function markDelivered(id){

    const paymentStatus =
    document.getElementById(
        `paymentStatus_${id}`
    ).value;

    if(paymentStatus !== "Paid"){

        alert(
        "Payment must be completed before delivery."
        );

        return;
    }

    fetch("/api/customers/deliver/1",
    {
        method:"PUT"
    })

    .then(response =>
        response.json()
    )

    .then(data => {

        alert(
        "Device Delivered"
        );

        searchCustomer();

    })

    .catch(error => {

        console.log(error);

    });

}

function updatePaymentStatus(
id,
paymentStatus
){

    fetch(
    `/api/customers/payment/1`,
    {

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            payment_status: paymentStatus
        })

    })

    .then(response =>
        response.json()
    )

    .then(data => {

        alert(
            "Payment Status Updated"
        );

    })

    .catch(error => {

        console.error(
            "Payment Update Error:",
            error
        );

    });

}

function loadCustomers() {

    fetch("/api/customers/all")

    .then(response =>
        response.json()
    )

    .then(data => {

        const table =
        document.getElementById(
            "allCustomersBody"
        );

        table.innerHTML = "";

        data.forEach(customer => {

            table.innerHTML += `

            <tr>

                <td>${customer.id}</td>

                <td>${customer.customer_name}</td>

                <td>${customer.phone1}</td>

                <td>${customer.imei}</td>

                <td>${customer.model}</td>

                <td>

                    <select
                    onchange=
                    "updateStatus(
                        ${customer.id},
                        this.value
                    )">

                        <option>
                        ${customer.status}
                        </option>

                        <option>
                        Received
                        </option>

                        <option>
                        Repairing
                        </option>

                        <option>
                        RWR
                        </option>

                        <option>
                        Ready
                        </option>

                        <option>
                        Delivered
                        </option>

                    </select>

                </td>

                <td>

                    <button
                    onclick=
                    "deleteCustomer(
                        ${customer.id}
                    )">

                    Delete

                    </button>

                </td>

            </tr>

            `;
        });
    });
}
function updateStatus(id, status){

    console.log("Updating:", id, status);

    fetch(
    `/api/customers/status/${id}`,
    {
        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            status
        })
    })

    .then(response => response.json())

    .then(data => {

        console.log(data);

        alert("Status Updated");

    })

    .catch(err => console.log(err));
}
function filterByDate(){

    const date =
    document.getElementById(
        "filterDate"
    ).value;

    // Load customers
    fetch(
    `/api/customers/date/${date}`
    )

    .then(response =>
        response.json()
    )

    .then(data => {

        const table =
        document.getElementById(
            "allCustomersBody"
        );

        table.innerHTML = "";

        data.forEach(customer => {

            table.innerHTML += `
            <tr>

                <td>${customer.id}</td>

                <td>${customer.customer_name}</td>

                <td>${customer.phone1}</td>

                <td>${customer.entry_date}</td>

                <td>${customer.status}</td>

            </tr>
            `;

        });

    });

    // Load collection summary
    console.log(date);
   fetch(
`/api/customers/collection/${date}`
)

.then(response => response.json())

.then(data => {

    console.log("Collection Data:", data);

    document.getElementById("cashTotal").innerHTML =
    data[0].total_cash || 0;

    document.getElementById("onlineTotal").innerHTML =
    data[0].total_online || 0;

    document.getElementById("grandTotal").innerHTML =
    Number(data[0].total_cash || 0) +
    Number(data[0].total_online || 0);

});

}
function deleteCustomer(id){

    if(
        !confirm(
            "Delete Record?"
        )
    ){
        return;
    }

    fetch(
    `/api/customers/${id}`,
    {
        method:"DELETE"
    })

    .then(response =>
        response.json()
    )

    .then(data => {

        alert(
            "Deleted"
        );

        loadCustomers();

    });
}
