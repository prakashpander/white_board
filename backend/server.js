const express = require("express");
const tokenRoute = require("./routes/genrate_token.route.js");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 4000;

app.use("/api", tokenRoute);

app.get("/", (req, res) => {
    res.send("hlo bhai")
});

app.listen(PORT, () => {
    console.log(`server run on port http://localhost:${PORT}`);
});