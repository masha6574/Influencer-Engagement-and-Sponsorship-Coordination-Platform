// Server/server.js
const express = require('express');
const bodyParser = require('body-parser'); // Prefer express.json() / express.urlencoded()
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models'); // Adjust path if models are elsewhere in Server/
const authRoutes = require('./routes/authRoutes'); // Adjust path if routes are elsewhere in Server/
const adminRoutes = require('./routes/adminRoutes'); // Adjust path if routes are elsewhere in Server/
const sponsorRoutes = require('./routes/sponsorRoutes');
const campaignRoutes = require('./routes/campaignRoutes');


const app = express();

// --- Middleware Setup ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Serve Static Files ---
// Serve files from the 'uploads' directory located at the project root
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'))); // <--- CORRECTED PATH
//                                            ^^ Go up one level from Server/

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/sponsors', sponsorRoutes);
app.use('/api/campaign', campaignRoutes);

const PORT = process.env.PORT || 2020;

console.log("Starting server...");
// --- Database Connection and Server Start ---
sequelize.authenticate()
  .then(() => {
    console.log("✅ Database connected successfully");
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('✅ Database synced');
    app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ Error starting server:', err);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.send('Influencer Sponsorship Platform API is running!');
});