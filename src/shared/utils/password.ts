import bcrypt from "bcryptjs";

export const verifyPassword = async (
  enteredPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};
