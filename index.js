 const express = require("express");
 const dotenv = require("dotenv").config();
 const errorHandler = require("./middleware/errorHandler")
 const connectDB = require("./config/dbConnection")

 connectDB();
 const app=express();

app.use(express.json());
app.use(errorHandler);
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));


const port = process.env.PORT;
app.listen(port ,() => {
   console.log(`Server running on port ${port}`);
});
