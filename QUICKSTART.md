# Quick Start Guide

Get your ASC (Amine Shariyat Committee) Web Application running in 3 simple steps!

## Step 1: Install Dependencies

Open your terminal in the `asc-web-frontend` folder and run:

```bash
npm install
```

This will install all required packages (React, Firebase, TailwindCSS, etc.)

## Step 2: Start Development Server

```bash
npm run dev
```

The application will automatically open at `http://localhost:3000`

## Step 3: Login or Register

1. Click "Register here" to create a new account
2. Enter your email and password
3. Start using the application!

---

## What You Can Do

### 📋 Dashboard
- View quick statistics
- Access all features from one place

### 👥 Manage Beneficiaries
- Add new beneficiaries with their details
- Edit or delete existing records
- Search by name, contact, or address

### 📦 Manage Equipment
- Add medical equipment with serial numbers
- Track availability and condition
- Edit or delete equipment

### 🛒 Add Rentals
- Assign equipment to beneficiaries
- Track rental dates and conditions
- Automatically updates equipment status

### 🔄 Process Returns
- Return rented equipment
- Update equipment condition
- Maintains return history

### 📊 View Reports
- See real-time statistics
- Export data to CSV
- Track active rentals

---

## Deploying to GitHub

### 1. Create a new repository on GitHub

### 2. Initialize git in your project folder:
```bash
cd asc-web-frontend
git init
git add .
git commit -m "Initial commit: ASC Web Application"
```

### 3. Connect to GitHub and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/asc-web-frontend.git
git branch -M main
git push -u origin main
```

### 4. Deploy to Firebase Hosting (Free):
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

Your website will be live at: `https://flutterfirebaseapp-4908e.web.app`

---

## Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `firebase deploy` | Deploy to Firebase Hosting |

---

## Need Help?

- Check the full [README.md](./README.md) for detailed documentation
- Verify Firebase configuration in `src/config/firebase.js`
- Ensure your Firebase project has Authentication and Firestore enabled

---

## Firebase Setup Checklist

Make sure these are enabled in your Firebase Console:

- ✅ Authentication → Email/Password provider
- ✅ Firestore Database → Create database
- ✅ Storage → Get started
- ✅ Hosting (optional, for deployment)

**Firebase Console**: https://console.firebase.google.com/project/flutterfirebaseapp-4908e

---

## Project Features

✨ **Modern UI** - Built with TailwindCSS and Lucide icons  
🔐 **Secure** - Firebase Authentication  
📱 **Responsive** - Works on all devices  
⚡ **Fast** - Powered by Vite  
🔄 **Real-time** - Live data updates from Firestore  
📊 **Analytics** - Built-in reporting and CSV export  

---

Happy coding! 🚀
