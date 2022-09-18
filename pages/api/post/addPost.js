import connectdb from "../../../utils/connectDB";
import Post from "../../../models/Post";

export default async function handler(req, res) {
  if (req.method === "POST") {
    function convertToSlug(Text) {
      return Text.toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    }
    const { title, content, authorId, topic, imageURI, shortDescription } =
      req.body;
    try {
      await connectdb();
      const post = await Post.create({
        title,
        content,
        slug: convertToSlug(title),
        author: authorId,
        image: imageURI,
        topic: topic || "Web Development",
        shortDescription: shortDescription,
      });
      res.status(200).json({ success: true, post });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  }
}
