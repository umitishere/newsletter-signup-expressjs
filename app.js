const express = require("express");
const request = require("request");
const https = require("https");

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

    let data = {
        members : [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName 
                }
            }
        ]
    };

    let jsonData = JSON.stringify(data);

    const url = "https://us1.api.mailchimp.com/3.0/lists/YOURLISTID";

    const options = {
        method: "POST",
        auth: "YOURUSERNAME:YOURAPIKEY"
    }

    const request = https.request(url, options, (response) => {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();

})

app.post("/failure", (req, res) => {
    res.redirect("/");
})

app.listen(3000, () => {
    console.log("Server is running.");
});