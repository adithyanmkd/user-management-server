import UserModel from "../../../shared/models/user.model";

import { verifyPassword } from "../../../shared/utils/password";
import { generateToken, type Payload } from "../../../shared/utils/jwt";

interface Login {
  username: string;
  password: string;
}

const authServices = {
  // admin login service
  login: async ({ username, password }: Login) => {
    try {
      const admin = await UserModel.findOne({ name: username });
      if (!admin) {
        throw Error("Invalid username or password.");
      }

      const isMatch = await verifyPassword(password, admin.password);
      console.log(isMatch);
      if (!isMatch) {
        throw Error("Invalid username or password.");
      }

      const payload: Payload = {
        userId: admin._id,
        role: "admin",
      };

      const token = generateToken(payload);
      return {
        user: {
          _id: admin._id,
          name: admin.name,
          role: admin.role,
          email: admin.email,
        },
        token,
      };
    } catch (error) {
      throw error;
    }
  },
};

export default authServices;
