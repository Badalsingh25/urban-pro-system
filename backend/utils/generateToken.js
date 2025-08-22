import jwt from "jsonwebtoken";

/* Generates a signed JWT for the given user */
const generateToken = (user) => {
  const secret = process.env.JWT_SECRET || (process.env.NODE_ENV !== "production" ? "dev-secret" : null);
  if (!secret) {
    throw new Error("JWT Secret is not defined.");
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    secret,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  return token;
};

export default generateToken;
