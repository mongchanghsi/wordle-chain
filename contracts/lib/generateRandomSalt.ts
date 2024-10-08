import crypto from "crypto";

const generateRandomSalt = (length = 16) => {
  return crypto.randomBytes(length).toString("hex"); // Generate a random salt
};
