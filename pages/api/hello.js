// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectdb from "../../utils/connectDB";
import User from "../../models/User";

export default async function handler(req, res) {
  console.log("BEFORE DB");
  await connectdb();
  console.log("ÄFTER DB");
  const user = await User.create({
    username: "pratham21",
    email: "pratham.sharma210521@gmail.com",
    password: "123456768",
  });
  res.status(200).json({ user });
}
