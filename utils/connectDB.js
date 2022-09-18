import mongoose from "mongoose";
const connectdb = async () => mongoose.connect(process.env.MONGO_URI);
require("../models/User");
export default connectdb;
