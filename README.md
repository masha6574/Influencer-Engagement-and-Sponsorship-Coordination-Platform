# Influencer–Sponsor Platform

🔗 **Live Demo (Vercel App):** [https://influencer-sponsor.vercel.app/](https://influencer-sponsor.vercel.app/)

---

## 📌 Overview
The **Influencer–Sponsor Platform** is a full-stack web application that connects influencers with sponsors. It provides dedicated dashboards for both influencers and sponsors, along with seamless campaign and ad management.

Built with **React, Node.js, Express, and MySQL**, the platform emphasizes a clean UI/UX using **Tailwind CSS** and smooth transitions in multi-step signup flows.

---

## 🚀 Features

### 🔹 General
- Modern and responsive UI with **React + Tailwind CSS**
- Secure authentication system with multi-step signup
- Clear separation between Influencer and Sponsor roles

### 🔹 Sponsor Features
- **Dashboard** to manage campaigns
- Full **CRUD operations** on campaigns (Create, Read, Update, Delete)
- **Nested structure**: Clicking on a campaign reveals all ads under it
- Ability to create, edit, and delete ads for each campaign

### 🔹 Influencer Features
- Professional **dashboard view** for managing profile and opportunities
- Multi-step **signup flow** with:
  - First & last name inputs
  - Spending habits
  - Common spending categories (selectable boxes with green tick highlights)
- Smooth auto-transition between signup steps

### 🔹 UI/UX Highlights
- **Lottie animations** on Login and SignUp pages
- Matching gradient backgrounds for cohesive branding
- Responsive and mobile-friendly layout

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- React Router
- Tailwind CSS
- Lottie Animations

**Backend:**
- Node.js
- Express.js
- MySQL (with Sequelize / raw queries)

**Deployment:**
- Vercel (Frontend)
- [Optional: Mention backend deployment if applicable]

---

## 📂 Project Structure
project-root/
│── client/ # React frontend
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Page-level components
│ │ ├── routes/ # Routing setup
│ │ └── assets/ # Static assets (images, Lottie JSON, etc.)
│ └── package.json
│── server/ # Node.js backend
│ ├── controllers/ # Request handlers
│ ├── models/ # MySQL models (Sequelize or raw queries)
│ ├── routes/ # API routes
│ ├── config/ # Database config and environment setup
│ └── package.json
│── README.md


---


## ⚡ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/influencer-sponsor-platform.git
cd influencer-sponsor-platform

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

# Set up environment variables in server/.env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=influencer_sponsor_db
PORT=5000

# Run the backend
cd server
npm run dev

# Run the frontend
cd client
npm run dev

# Open the app in browser
http://localhost:5173
