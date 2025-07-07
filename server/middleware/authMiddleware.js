import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    // Get token from Authorization header "Bearer <token>"

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ success: false, message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];

    // Verify token with your secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded user:",decoded)
    // Use decoded.id or decoded.userId depending on your token payload
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.json({ success: false, message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "User not found" });
  }
};
