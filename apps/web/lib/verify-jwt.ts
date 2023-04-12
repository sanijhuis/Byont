import * as jose from "jose";

export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length === 0) {
    return;
  }

  return secret;
};

export const verifyAuth = async (token: any) => {
  try {
    const verified = await jose.jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return verified.payload;
  } catch (error) {
    return error;
  }
};
