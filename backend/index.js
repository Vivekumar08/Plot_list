const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const  productRouter  = require('./routes/product');
const  userRouter   = require('./routes/user');

const app = express();

dotenv.config({ path: './config.env' })
require('./db/conn')
app.use(express.json());
app.use(bodyParser.urlencoded(
  { extended: true }
))

app.use(cors());
app.use(express.json());
// app.set("view engine", "ejs")


app.get("/", async (req, res) => {
  res.json("Congratulations Plot Listing App Deployed successfully")
})
app.use("/auth", userRouter);
app.use("/recipes", productRouter);

const port = process.env.PORT || 50000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});