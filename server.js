const mongoose = require("mongoose");
const dotenv = require("dotenv").config();


const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zwiso.mongodb.net/job-portal?retryWrites=true&w=majority`;
// const connectionString = process.env.DATABASE_LOCAL;


// database connection
mongoose.connect(connectionString).then(() => {
    console.log(`Database connection is successful`);
},
    err => { console.log(`Failed to connect`, err); }
)

const app = require("./app");

// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});


