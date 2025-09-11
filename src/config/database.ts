import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import UserModel from "../modules/user/models/user.model";

const uri = process.env.MONGO_URI!;
if (!uri) {
  throw new Error("MONGO_URI variable is not defined.");
}

const connecDB = async () => {
  try {
    const conn = await mongoose.connect(uri);

    const email = process.env.ADMIN_EMAIL!;
    const password = process.env.ADMIN_PASS!;

    let user = await UserModel.findOne({ email });
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hassedPassword = await bcrypt.hash(password, salt);

      user = new UserModel({
        email,
        password: hassedPassword,
        role: "admin",
      });

      await user.save();
      console.log("Successfully created admin.");
    } else {
      console.log("Admin exists");
    }

    console.log(`MongoDB connected ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connecDB;
