const path = require("path");
const express = require("express");
const cors = require("cors");

require("./config/db");

const customerRoutes =
require("./routes/customerRoutes");

const app = express();

const PORT =
process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use(
    "/api/customers",
    customerRoutes
);


app.get("/", (req,res)=>{
    res.sendFile(
        path.join(__dirname, "public", "login.html")
    );
});

app.listen(PORT,()=>{

    console.log(
        `Server running on port ${PORT}`
    );

});