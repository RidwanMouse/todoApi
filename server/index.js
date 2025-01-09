import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT_NUMBER || 3000;
app.use(express.json());

import todoRoute from "../routes/todoRoute.js";
import userRoute from '../routes/userRoute.js'

app.use("/api/todo", todoRoute);
app.use('/api/users',userRoute);

app.listen(port, () => {

  console.log(`http://localhost:${port}`);
});