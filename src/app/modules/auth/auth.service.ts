/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { createNewAccessTokenWithRefreshToken } from "../../utils/userTokens";
import { JwtPayload } from "jsonwebtoken";
import { envVariables } from "../../config/env";
import { IAuthProvider } from "../user/user.interface";

const getNewAccessTokenService = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenWithRefreshToken(
    refreshToken
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePasswordServices = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload
) => {
  const user = await User.findById(decodedToken.userId);

  const isOldPasswordMatch = await bcryptjs.compare(
    oldPassword,
    user!.password as string
  );
  if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old Password does not match");
  }

  user!.password = await bcryptjs.hash(
    newPassword,
    Number(envVariables.BCRYPT_SALT_ROUND)
  );

  user!.save();
};

const resetPasswordServices = async (
  payload: Record<string, any>,
  decodedToken: JwtPayload
) => {
  if (payload.id != decodedToken.userId) {
    throw new AppError(401, "You can not reset your password");
  }

  const isUserExist = await User.findById(decodedToken.userId);
  if (!isUserExist) {
    throw new AppError(401, "User does not exist");
  }

  const hashedPassword = await bcryptjs.hash(
    payload.newPassword,
    Number(envVariables.BCRYPT_SALT_ROUND)
  );

  isUserExist.password = hashedPassword;

  await isUserExist.save();
};

const setPasswordServices = async (userId: string, plainPassword: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (
    user.password &&
    user.auths.some((providerObject) => providerObject.provider === "google")
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have already set you password. Now you can change the password from your profile password update"
    );
  }

  const hashedPassword = await bcryptjs.hash(
    plainPassword,
    Number(envVariables.BCRYPT_SALT_ROUND)
  );

  const credentialProvider: IAuthProvider = {
    provider: "credentials",
    providerId: user.email,
  };

  const auths: IAuthProvider[] = [...user.auths, credentialProvider];

  user.password = hashedPassword;

  user.auths = auths;

  await user.save();
};

export const AuthServices = {
  getNewAccessTokenService,
  resetPasswordServices,
  changePasswordServices,
  setPasswordServices,
};
