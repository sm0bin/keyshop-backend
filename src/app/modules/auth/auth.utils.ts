import jwt from "jsonwebtoken";
export const createToken = (
  jwtPayload: { id: string; role: string },
  secret: string,
  expiresIn: number
) => {
  const token = jwt.sign(jwtPayload, secret, { expiresIn });
  return token;
};

export const verifyToken = (token: string, secret: string) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};
