const express = require("express");
const request = require("request");

const app = express();

app.use(express.urlencoded({extended: true})); // Body parser

// To use static files like css files or images, we need to add this. 
// If we take them from a web url, we don't need this.
app.use(express.static("public")); // We put our static files to public folder.

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;

})

app.listen(3000, () => {
    console.log("Server is running.");
});