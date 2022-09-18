import connectdb from "../../../../utils/connectDB";
import User from "../../../../models/User";
import CryptoJS from "crypto-js";

export default async function handler(req, res) {
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  try {
    if (req.method == "POST") {
      if (validateEmail(req.body.email.trim())) {
        const { username, email, password } = req.body;

        await connectdb();
        const newUser = await User.create({
          username,
          email: email.trim().toLowerCase(),
          password: CryptoJS.AES.encrypt(
            password,
            process.env.CRYPTO_JS_SECRET_KEY
          ).toString(),
          avatar: `https://avatars.dicebear.com/api/adventurer/${username.trim()}.svg`,
        });
        res.status(200).json({ success: true });
      } else {
        res.json({ success: false, error: "Invalid email" });
      }
    } else {
      res.json({ success: false, error: "This method is not allowed" });
    }
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
}
