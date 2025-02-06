const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes")
connectDB();

const PORT = process.env.PORT;

app.use(express.json())
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
    res.status(200).send("Hello world !");
})

if (PORT) app.listen(PORT, () => console.log("Server is listening on port", PORT));
else {
    console.log("Dotenv is not configured");
    process.exit(1);
}
