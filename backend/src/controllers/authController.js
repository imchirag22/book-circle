import Users from "../model/Users.js";
import { ApiError } from "../utils/api-Error.js";
import { ApiResponse } from "../utils/api-Response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

const signup = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists
  const existingUser = await Users.findOne({
    $or: [{ userName }, { email }]
  });

  if (existingUser) {
    throw new ApiError(
      409, 
      existingUser.email === email 
        ? "Email already registered" 
        : "Username already taken"
    );
  }

  // Generate dynamic avatar using username as seed
  const profilePicture = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(userName)}`;

  // Hash password with 12 salt rounds (industry standard)
  const hashedPassword = await bcrypt.hash(password, 12);

  // Store hashed password instead of plain text
  const user = await Users.create({
    userName,
    email,
    password: hashedPassword, 
    profilePicture
  });

  // Remove password from response
  const createdUser = await Users.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // Generate tokens
  const accessToken = generateAccessToken(createdUser._id);
  const refreshToken = generateRefreshToken(createdUser._id);

  // Save refresh token to database
  await Users.findByIdAndUpdate(
    createdUser._id,
    { refreshToken },
    { new: true }
  );

  // Set cookies
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  };

  return res
    .status(201)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        201, 
        { user: createdUser, accessToken }, 
        "User registered successfully"
      )
    );
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // Find user by email
  const user = await Users.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  // Compare plain password with stored hash
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Remove password from response
  const loggedInUser = await Users.findById(user._id).select("-password");

  // Generate tokens
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Save refresh token to database
  await Users.findByIdAndUpdate(
    user._id,
    { refreshToken },
    { new: true }
  );

  // Set cookies
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200, 
        { user: loggedInUser, accessToken }, 
        "User logged in successfully"
      )
    );
});

const logout = asyncHandler(async (req, res) => {
  await Users.findByIdAndUpdate(
    req.user._id,
    { refreshToken: null },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await Users.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    };

    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    await Users.findByIdAndUpdate(
      user._id,
      { refreshToken: newRefreshToken },
      { new: true }
    );

    return res
      .status(200)
      .cookie("accessToken", newAccessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken: newAccessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

export { signup, login, logout, refreshAccessToken };
