import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpsStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { envVariables } from "../../config/env";

const createUserService = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  const ifUserExist = await User.findOne({ email });

  if (ifUserExist) {
    throw new AppError(httpsStatus.BAD_REQUEST, "User already exist");
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(envVariables.BCRYPT_SALT_ROUND)
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });
  return user;
};

const getAllUsersService = async () => {
  const users = await User.find({});
  const totalUsers = await User.countDocuments();
  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

export const UserServices = {
  createUserService,
  getAllUsersService,
};
