const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

// database connection
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
    console.log(`Database connection is successful`);
})


const app = require("./app");




// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});


