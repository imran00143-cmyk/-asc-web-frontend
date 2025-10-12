# ASC - Amine Shariyat Committee Web Application

A modern web application for managing medical equipment rentals, beneficiaries, and inventory tracking. Built with React, Vite, TailwindCSS, and Firebase.

## Features

- 🔐 **Authentication** - Secure login and registration with Firebase Auth
- 👥 **Beneficiary Management** - Add, edit, and track beneficiaries
- 📦 **Equipment Management** - Manage medical equipment inventory
- 🛒 **Rental System** - Track equipment rentals to beneficiaries
- 🔄 **Return Processing** - Process equipment returns and update inventory
- 📊 **Reports & Analytics** - View statistics and export data
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- Git

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd asc-web-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Configuration**
   
   The Firebase configuration is already set up in `src/config/firebase.js` and connected to your existing Firebase project:
   - Project ID: `flutterfirebaseapp-4908e`
   - Uses the same Firebase backend as your Flutter app
   
   **Important**: Make sure your Firebase project has the following enabled:
   - Firebase Authentication (Email/Password)
   - Cloud Firestore
   - Firebase Storage

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The app will open at `http://localhost:3000`

## Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```
   
   This creates an optimized production build in the `dist` folder.

2. **Preview the production build**
   ```bash
   npm run preview
   ```

## Deployment Options

### Option 1: Firebase Hosting (Recommended)

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase Hosting**
   ```bash
   firebase init hosting
   ```
   
   When prompted:
   - Select your existing Firebase project
   - Set public directory to: `dist`
   - Configure as single-page app: `Yes`
   - Set up automatic builds with GitHub: `No` (or Yes if you want)

4. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

   Your app will be live at: `https://flutterfirebaseapp-4908e.web.app`

### Option 2: Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   npm run build
   vercel --prod
   ```

### Option 3: Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

### Option 4: GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/asc-web-frontend",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

## Project Structure

```
asc-web-frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Layout.jsx
│   │   └── PrivateRoute.jsx
│   ├── config/          # Configuration files
│   │   └── firebase.js
│   ├── contexts/        # React contexts
│   │   └── AuthContext.jsx
│   ├── pages/           # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── BeneficiaryList.jsx
│   │   ├── BeneficiaryForm.jsx
│   │   ├── EquipmentList.jsx
│   │   ├── EquipmentForm.jsx
│   │   ├── RentForm.jsx
│   │   ├── ReturnForm.jsx
│   │   └── Reports.jsx
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Firebase Collections Structure

The app uses the following Firestore collections:

### beneficiaries
```javascript
{
  name: string,
  fatherName: string,
  gender: string,
  dateOfBirth: Timestamp,
  age: number,
  address: string,
  contact: string,
  notes: string,
  createdBy: string,
  createdOn: Timestamp
}
```

### equipment
```javascript
{
  equipmentName: string,
  serialNumber: string,
  manufacturingDate: Timestamp,
  expiryDate: Timestamp,
  status: string, // "Available" or "Rented"
  source: string, // "Purchased" or "Donated"
  condition: string, // "Ok" or "UnOk"
  createdBy: string,
  createdOn: Timestamp
}
```

### rents
```javascript
{
  beneficiaryId: string,
  beneficiaryName: string,
  equipmentId: string,
  equipmentName: string,
  serialNumber: string,
  conditionOnGiven: string,
  rentDate: Timestamp,
  createdBy: string,
  createdOn: Timestamp
}
```

### returns
```javascript
{
  rentId: string,
  beneficiaryId: string,
  beneficiaryName: string,
  equipmentId: string,
  equipmentName: string,
  serialNumber: string,
  rentDate: Timestamp,
  returnDate: Timestamp,
  conditionOnGiven: string,
  conditionOnReturn: string,
  notes: string,
  createdBy: string,
  createdOn: Timestamp
}
```

## Usage

1. **Login/Register**: Create an account or login with existing credentials
2. **Dashboard**: View overview and quick access to all features
3. **Beneficiaries**: Add and manage beneficiary information
4. **Equipment**: Track medical equipment inventory
5. **Add Rent**: Assign equipment to beneficiaries
6. **Return**: Process equipment returns
7. **Reports**: View statistics and export data to CSV

## Features in Detail

### Authentication
- Email/password authentication via Firebase
- Protected routes requiring login
- Automatic redirect to dashboard after login

### Beneficiary Management
- Add new beneficiaries with personal details
- Edit existing beneficiary information
- Delete beneficiaries
- Search functionality
- Auto-calculate age from date of birth

### Equipment Management
- Add equipment with serial numbers and dates
- Track equipment status (Available/Rented)
- Track equipment condition (Ok/UnOk)
- Record source (Purchased/Donated)
- Edit and delete equipment

### Rental System
- Rent available equipment to beneficiaries
- Automatically updates equipment status
- Records condition when given
- Date tracking

### Return Processing
- Process equipment returns
- Update equipment status and condition
- Move rent records to returns history
- Add notes about returns

### Reports & Analytics
- Real-time statistics dashboard
- Active rentals overview
- Export data to CSV
- Equipment availability tracking

## Environment Variables

If you need to use different Firebase projects for development and production, create `.env` files:

**.env.development**
```
VITE_FIREBASE_API_KEY=your_dev_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_dev_auth_domain
VITE_FIREBASE_PROJECT_ID=your_dev_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_dev_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_dev_sender_id
VITE_FIREBASE_APP_ID=your_dev_app_id
```

Then update `src/config/firebase.js` to use these variables.

## Troubleshooting

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

### Firebase Errors
- Check Firebase console for proper configuration
- Ensure Authentication is enabled
- Verify Firestore rules allow read/write for authenticated users

### Deployment Issues
- Ensure `dist` folder is built before deploying
- Check hosting platform logs for specific errors
- Verify Firebase configuration is correct

## Security Considerations

1. **Firebase Rules**: Update Firestore security rules in Firebase Console:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

2. **API Keys**: Firebase web API keys are safe to expose in client-side code, but ensure proper security rules are set up.

3. **Authentication**: All routes except login/register require authentication.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues or questions, please open an issue on GitHub or contact the development team.

## Acknowledgments

- Built with React and Vite
- Styled with TailwindCSS
- Icons by Lucide
- Backend powered by Firebase

---

**Note**: This web application shares the same Firebase backend with the Flutter mobile app, ensuring data consistency across platforms.
