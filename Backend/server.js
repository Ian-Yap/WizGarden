require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const db = require("./routes/routes");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/signup", db.signUp);
app.post("/api/userlogin", db.loginUser);
app.post("/api/user_create_details", db.createDetailsUser);
app.get("/api/user_get_user_details", db.getDetailsUser);
app.post("/api/user_update_details", db.updateDetailsUser);
app.get("/api/getenglishlessons", db.getEnglishLessons);
app.get("/api/getchineselessons", db.getChineseLessons);
app.get("/api/getmathlessons", db.getMathLessons);
app.get("/api/getsciencelessons", db.getScienceLessons);

app.get("/api/admin_get_all_user_accounts", db.getAllUsersAccounts);
app.patch("/api/admin_update_user_account", db.updateUserAccount);
app.get("/api/admin_get_all_user_details", db.getAllUsersDetails);
app.post("/api/admin_get_user_details", db.getUsersDetails);

app.post("/api/admin-delete-user-account", db.deleteUser);

const PORT = process.env.PORT || 5001;

app.listen(PORT);
console.log("server started");
