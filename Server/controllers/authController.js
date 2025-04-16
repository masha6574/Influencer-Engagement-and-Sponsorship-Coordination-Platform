const { User, Sponsor, Influencer } = require('../models'); // adjust path as needed
const sequelize = require('../config/database'); // ensure this is the Sequelize instance, NOT class
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { name, email, password, role, company, industry, category, niche, reach } = req.body;

  // Start transaction
  const t = await sequelize.transaction();

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email }, transaction: t });
    if (existingUser) {
      await t.rollback();
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    }, { transaction: t });

    // Role-based creation
    if (role === 'sponsor') {
      await Sponsor.create({
        userId: newUser.id,
        companyName: company,
        industry,
      }, { transaction: t });

    } else if (role === 'influencer') {
      await Influencer.create({
        userId: newUser.id,
        category,
        niche,
        reach,
      }, { transaction: t });
    }

    // Everything went fine
    await t.commit();
    return res.status(201).json({ message: "User registered successfully", user: newUser });

  } catch (error) {
    // Rollback on error
    await t.rollback();
    console.error("Transaction error during registration:", error);
    return res.status(500).json({ message: "Server error, registration failed" });
  }
};


// Login route
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password with the hashed one in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id, role: user.role }, "your_jwt_secret", {
      expiresIn: "1h" // Token expiration time (1 hour in this example)
    });

    // Return the token
    return res.status(200).json({
      message: "Login successful",
      token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Middleware to verify JWT token
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Expecting format 'Bearer <token>'

  if (!token) {
    return res.status(403).json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = decoded; // Attach user info to request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = { register, login, authenticateJWT };
