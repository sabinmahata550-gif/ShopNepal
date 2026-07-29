import generateToken from "../utils/generateToken.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else {
      token = req.cookies?.token;
    }

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const decoded = await generateToken.verifyToken(token);
    console.log(decoded)
    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      message: error.message || "Invalid or expired token",
    });
  }
};

export default authMiddleware;