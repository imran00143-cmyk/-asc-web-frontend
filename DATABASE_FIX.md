# Database Collection Name Fix

## ✅ Issue Fixed: Collection Name Mismatch

### Problem:
- Android app uses: **`equipments`** (with 's')
- Web app was using: **`equipment`** (without 's')
- This created two separate collections in Firebase

### Solution:
Changed all web app references from `equipment` to `equipments` to match Android app.

---

## Files Updated

### 1. ✅ `src/pages/Welcome.jsx`
**Changed:**
```javascript
// OLD
const equipmentSnap = await getDocs(collection(db, 'equipment'));

// NEW
const equipmentSnap = await getDocs(collection(db, 'equipments'));
```

### 2. ✅ `src/pages/Reports.jsx`
**Changed:**
```javascript
// OLD
const equipmentSnap = await getDocs(collection(db, 'equipment'));

// NEW
const equipmentSnap = await getDocs(collection(db, 'equipments'));
```

### 3. ✅ `src/pages/RentForm.jsx`
**Changed:**
```javascript
// OLD
const equipmentQuery = query(collection(db, 'equipment'), where('status', '==', 'Available'));
await updateDoc(doc(db, 'equipment', formData.equipmentId), {...});

// NEW
const equipmentQuery = query(collection(db, 'equipments'), where('status', '==', 'Available'));
await updateDoc(doc(db, 'equipments', formData.equipmentId), {...});
```

### 4. ✅ `src/pages/ReturnForm.jsx`
**Changed:**
```javascript
// OLD
await updateDoc(doc(db, 'equipment', selectedRent.equipmentId), {...});

// NEW
await updateDoc(doc(db, 'equipments', selectedRent.equipmentId), {...});
```

### 5. ✅ `src/pages/EquipmentList.jsx`
**Changed:**
```javascript
// OLD
const querySnapshot = await getDocs(collection(db, 'equipment'));
await deleteDoc(doc(db, 'equipment', id));

// NEW
const querySnapshot = await getDocs(collection(db, 'equipments'));
await deleteDoc(doc(db, 'equipments', id));
```

### 6. ✅ `src/pages/EquipmentForm.jsx`
**Changed:**
```javascript
// OLD
const docRef = doc(db, 'equipment', id);
await updateDoc(doc(db, 'equipment', id), data);
await addDoc(collection(db, 'equipment'), data);

// NEW
const docRef = doc(db, 'equipments', id);
await updateDoc(doc(db, 'equipments', id), data);
await addDoc(collection(db, 'equipments'), data);
```

---

## Firebase Collections Now Used

The web app now uses these collection names (matching Android app):

1. ✅ **`beneficiaries`** - Beneficiary records
2. ✅ **`equipments`** - Equipment inventory (with 's')
3. ✅ **`rents`** - Active rental records
4. ✅ **`returns`** - Completed return records

---

## What to Do Next

### 1. Delete the Wrong Collection in Firebase:
1. Go to Firebase Console: https://console.firebase.google.com
2. Select your project: `flutterfirebaseapp-4908e`
3. Go to Firestore Database
4. Find the collection named **`equipment`** (without 's')
5. Delete it (it should be empty or have only test data)

### 2. Verify the Correct Collection:
1. Check that **`equipments`** (with 's') exists
2. Verify it has your Android app data
3. The web app will now read/write to this collection

### 3. Test the Web App:
```bash
cd asc-web-frontend
npm run dev
```

**Test these features:**
- [ ] Welcome page shows equipment statistics
- [ ] Equipment list displays your Android app data
- [ ] Can add new equipment (saves to `equipments`)
- [ ] Can edit existing equipment
- [ ] Can delete equipment
- [ ] Rent form shows available equipment
- [ ] Return form updates equipment status

---

## Updated Firestore Security Rules

Use these rules for all collections:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Beneficiaries - allow public read and write for registration
    match /beneficiaries/{document} {
      allow read: if true;
      allow write: if true; // For public registration
    }
    
    // Equipments (with 's') - matching Android app
    match /equipments/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Rents
    match /rents/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Returns
    match /returns/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## Verification Checklist

After the fix, verify:

- [ ] Web app connects to `equipments` collection
- [ ] Android app data is visible in web app
- [ ] New equipment added via web saves to `equipments`
- [ ] Statistics on welcome page show correct counts
- [ ] Equipment list displays all items from Android app
- [ ] Rent/Return operations work correctly
- [ ] No duplicate data in Firebase

---

## Summary

✅ **All references changed from `equipment` to `equipments`**  
✅ **Web app now uses same database as Android app**  
✅ **6 files updated**  
✅ **No more duplicate collections**

**Status:** Ready to test and deploy!

---

**Important:** After verifying everything works, delete the empty `equipment` collection from Firebase Console to avoid confusion.

---

**Date:** January 7, 2025  
**Version:** 1.2.1 - Database Fix
