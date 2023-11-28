import jwt from "jsonwebtoken";

export const authAdmin = async (req, res, next) => {
  try {
    const token = req.headers.token.split(" ")[1];
    if (token === "") {
      return res.status(401).json({
        message: "Session Expired.... Please Log In again.",
        success: false,
        tokenExpired: true,
      });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY_ADMIN, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).json({
          message: "Authentication failed. Invalid token.",
          success: false,
          tokenExpired: true,
        });
      }
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Session Expired.... Please Log In again.",
      tokenExpired: true,
      success: false,
    });
  }
};
