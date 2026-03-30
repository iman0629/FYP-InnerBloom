# InnerBloom - Mental Health Support System

InnerBloom is a professional mental health chat application and admin management system built with React, Node.js, and MySQL. It features specialized chat modules, an advanced admin dashboard, and secure user authentication.

## ✨ Key Features

- **Professional UI/UX**: Modern symmetric design with glassmorphism aesthetic and a premium dark-themed sidebar.
- **Smart Master Layout**: Persistent Sidebar and Header across all authenticated pages.
- **Mental Health Chat**: Specialized modules for Anxiety, Depression, and General support with a clean, toolbar-based navigation.
- **Admin Control Center**: Comprehensive dashboard for monitoring user activity, mood logs, and managing registrations.
- **Secure Authentication**: ROLE-based access control (Admin/User), JWT session management, and protected routes.
- **Profile Management**: Integrated user profile settings for updating information and changing passwords.
- **Advanced Recovery**: Full "Forgot Password" flow with secure time-limited tokens.

---

## 🚀 Setup & Installation

### 1. Database Setup
1.  Ensure you have **MySQL** installed and running.
2.  Import the database schema:
    ```bash
    mysql -u your_user -p < server/schema.sql
    ```
    *This creates the `innerbloom` database and all required tables.*

### 2. Environment Configuration
Create a `.env` file in the `server/` directory:
```env
PORT=5001
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=innerbloom
JWT_SECRET=your_super_secret_key
```

In the root directory, ensure `src/config.js` or `.env` points to the correct backend:
`VITE_API_BASE_URL=http://localhost:5001`

### 3. Installation
Install dependencies for both frontend and backend:
```bash
# Install root (frontend) dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 4. Running the Application
You will need two terminal windows open:

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

---

## 🛠️ Technology Stack
- **Frontend**: React 18, Vite, React Router 6, Vanilla CSS (Premium styling).
- **Backend**: Node.js, Express, MySQL (mysql2/promise).
- **Security**: JWT (JSON Web Tokens), Bcrypt.js (Password hashing).

## 📁 Project Structure
- `/src`: Frontend React application.
- `/server`: Node.js/Express backend server.
- `/server/schema.sql`: Database definition and dummy accounts.

---
*Created with ❤️ for Mental Health Support.*
