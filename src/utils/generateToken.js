import jwt from "jsonwebtoken";

const generateToken = (payload) => {
  return jwt.sign(
    {id : user._id},
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn: "3d"
    }
  );
};

export default generateToken;