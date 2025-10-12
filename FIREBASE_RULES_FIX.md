# Firebase Security Rules Fix

## Problem
Your GitHub Pages site shows 0 records because Firebase Firestore security rules are blocking access.

## Solution

### Step 1: Go to Firebase Console
1. Visit: https://console.firebase.google.com/
2. Select your project: **flutterfirebaseapp-4908e**
3. Click on **Firestore Database** in the left menu
4. Click on the **Rules** tab

### Step 2: Check Current Rules
Your current rules might look like this (blocking all access):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;  // ❌ This blocks everything!
    }
  }
}
```

### Step 3: Update to Production Rules

Replace with these rules (choose based on your security needs):

#### Option A: Authenticated Users Only (Recommended)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Beneficiaries - authenticated users can read/write
    match /beneficiaries/{beneficiaryId} {
      allow read, write: if request.auth != null;
    }
    
    // Equipment - authenticated users can read/write
    match /equipment/{equipmentId} {
      allow read, write: if request.auth != null;
    }
    
    // Rentals - authenticated users can read/write
    match /rentals/{rentalId} {
      allow read, write: if request.auth != null;
    }
    
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

#### Option B: Public Read, Authenticated Write
If you want public beneficiary registration form to work:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Beneficiaries - public read, authenticated write
    match /beneficiaries/{beneficiaryId} {
      allow read: if true;  // Anyone can read
      allow create: if true;  // Anyone can create (for public form)
      allow update, delete: if request.auth != null;  // Only authenticated can update/delete
    }
    
    // Equipment - authenticated only
    match /equipment/{equipmentId} {
      allow read, write: if request.auth != null;
    }
    
    // Rentals - authenticated only
    match /rentals/{rentalId} {
      allow read, write: if request.auth != null;
    }
    
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Step 4: Publish Rules
1. Click the **Publish** button
2. Wait a few seconds for rules to propagate

### Step 5: Test Your Site
1. Visit: https://imran00143-cmyk.github.io/-asc-web-frontend/
2. Try logging in
3. Check if data loads correctly

## Important Notes

- **Never use `allow read, write: if true;` for everything** - this makes your database completely public and anyone can delete all your data!
- The rules above are starting points - adjust based on your specific security requirements
- Test thoroughly after changing rules
- Monitor your Firebase Console for any unauthorized access attempts

## Debugging

If you still see 0 records after updating rules:

1. **Open Browser Console (F12)**
   - Look for Firebase errors
   - Check for CORS or authentication errors

2. **Check Firebase Authentication**
   - Make sure users are properly authenticated
   - Verify auth tokens are valid

3. **Test with Firebase Emulator locally**
   ```bash
   firebase emulators:start
   ```

## Contact
If you need help with specific security rules for your use case, please provide more details about:
- Who should access what data?
- Should the public registration form work without login?
- What operations should admins vs regular users be able to perform?
