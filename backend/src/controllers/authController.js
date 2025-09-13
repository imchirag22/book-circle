import Users from "../model/Users.js";
import { ApiError } from "../utils/api-Error.js";
import { ApiResponse } from "../utils/api-Response.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

  // Create new user
  const user = await Users.create({
    userName,
    email,
    password, // Note: In a real app, password should be hashed
    profilePicture
  });

  // Remove password from response
  const createdUser = await Users.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
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

  // In a real app, we would compare hashed passwords
  // For now, direct comparison (not secure)
  if (user.password !== password) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Remove password from response
  const loggedInUser = await Users.findById(user._id).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
});

export { signup, login };
