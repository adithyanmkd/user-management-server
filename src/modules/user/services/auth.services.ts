import { generateToken, Payload } from "../../../shared/utils/jwt";
import UserModel from "../../../shared/models/user.model";
import bcrypt from "bcryptjs";

type LoginType = {
  email: string;
  password: string;
};

type RegisterType = LoginType & {
  name: string;
};

const authServices = {
  // register service
  register: async (data: RegisterType) => {
    try {
      let user = await UserModel.findOne({ email: data.email });
      if (user) {
        throw new Error("User already exists please login.");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);

      user = await UserModel.create({
        email: data.email,
        password: hashedPassword,
        name: data.name,
      });

      const payload = {
        userId: user._id,
        role: user.role,
      };
      const token = generateToken(payload);

      return { user, token };
    } catch (error) {
      throw error;
    }
  },

  // user login service
  login: async (data: LoginType) => {
    try {
      const user = await UserModel.findOne({ email: data.email });
      if (!user) throw new Error("User not found.");

      const { password } = data; // user entered password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid username or password.");

      const payload: Payload = {
        userId: user._id,
        role: user.role,
      };
      const token = generateToken(payload);
      return { user, token };
    } catch (error) {
      throw error;
    }
  },
};

export default authServices;
