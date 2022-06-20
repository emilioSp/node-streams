import jwt from 'jwt-simple';

export const generateJWTToken = (user_id) => {
  const payload = {
    user_id,
    iat: Date.now(),
  };

  const token = jwt.encode(payload, process.env.JWT_SECRET);

  return token;
};
