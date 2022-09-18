import connectdb from "../../../../utils/connectDB";
import User from "../../../../models/User";
import CryptoJS from "crypto-js";
import rateLimit from "../../../../utils/rateLimit";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default async function handler(req, res) {
  try {
    // await limiter.check(res, 5, "CACHE_TOKEN");
    if (req.method == "POST") {
      if (validateEmail(req.body.email)) {
        await connectdb();
        const checkUser = await User.findOne({ email: req.body.email });
        if (checkUser) {
          const bytes = CryptoJS.AES.decrypt(
            checkUser.password,
            process.env.CRYPTO_JS_SECRET_KEY
          );
          const decryptPass = bytes.toString(CryptoJS.enc.Utf8);
          if (decryptPass == req.body.password) {
            res.json({
              success: true,
              _id: checkUser?._id,
              name: checkUser?.username,
              email: checkUser?.email,
              image: checkUser?.avatar,
            });
          } else {
            res.json({ success: false, error: "Invalid Request" });
          }
        } else {
          res.json({ success: false, error: "Invalid Request" });
        }
      } else {
        res.json({ success: false, error: "Invalid Email" });
      }
    } else {
      res.json({ success: false, error: "This method is not allowed" });
    }
  } catch {
    res.json({ success: false, error: "Limit exceeded" });
  }
}
