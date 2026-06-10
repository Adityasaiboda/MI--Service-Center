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
app.use("/api/customers", customerRoutes);

app.get("/", (req,res)=>{
    res.send("MI Service Center Running");
});

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});
app.use(
    "/api/customers",
    customerRoutes
);
