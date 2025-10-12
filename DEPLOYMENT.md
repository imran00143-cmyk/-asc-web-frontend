# Deployment Guide

Complete guide to deploy your ASC (Amine Shariyat Committee) Web Application to various hosting platforms.

## Prerequisites

Before deploying, ensure:
- ✅ Application builds successfully: `npm run build`
- ✅ Firebase configuration is correct
- ✅ All features work in development mode
- ✅ Git repository is initialized

---

## Option 1: Firebase Hosting (Recommended) ⭐

**Pros**: Free, fast CDN, automatic SSL, easy rollbacks  
**Best for**: Production deployment with Firebase backend

### Steps:

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize (Already configured, but if needed)**
   ```bash
   firebase init hosting
   ```
   - Select existing project: `flutterfirebaseapp-4908e`
   - Public directory: `dist`
   - Single-page app: `Yes`
   - Overwrite index.html: `No`

4. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

5. **Your site is live!**
   ```
   https://flutterfirebaseapp-4908e.web.app
   https://flutterfirebaseapp-4908e.firebaseapp.com
   ```

### Custom Domain (Optional)
```bash
firebase hosting:channel:deploy production
```
Then add your custom domain in Firebase Console → Hosting

---

## Option 2: Vercel

**Pros**: Automatic deployments from Git, preview URLs, zero config  
**Best for**: Quick deployments with GitHub integration

### Steps:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy via Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
   - Click "Deploy"

3. **Or use Vercel CLI**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

---

## Option 3: Netlify

**Pros**: Drag-and-drop deployment, form handling, serverless functions  
**Best for**: Simple deployments with additional features

### Method A: Drag and Drop

1. Build your project:
   ```bash
   npm run build
   ```

2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist` folder to the deployment area
4. Done!

### Method B: CLI

```bash
npm install -g netlify-cli
netlify login
npm run build
netlify deploy --prod --dir=dist
```

### Method C: GitHub Integration

1. Push to GitHub
2. Connect repository in Netlify dashboard
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

---

## Option 4: GitHub Pages

**Pros**: Free hosting for public repos  
**Best for**: Open source projects

### Steps:

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   Add these lines:
   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/asc-web-frontend",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js**
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/asc-web-frontend/',  // Add this line
     server: {
       port: 3000,
       open: true
     }
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: `gh-pages`
   - Save

---

## Option 5: Render

**Pros**: Free tier, automatic SSL, easy setup  
**Best for**: Full-stack apps with backend

### Steps:

1. Push to GitHub

2. Go to [render.com](https://render.com)

3. Create new Static Site

4. Connect your repository

5. Settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

6. Deploy!

---

## Option 6: AWS Amplify

**Pros**: AWS integration, CI/CD, custom domains  
**Best for**: Enterprise applications

### Steps:

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)

2. Click "New app" → "Host web app"

3. Connect your Git provider

4. Build settings (auto-detected):
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

5. Save and deploy

---

## Post-Deployment Checklist

After deploying, verify:

- [ ] Login/Register works
- [ ] Firebase connection is successful
- [ ] All pages load correctly
- [ ] CRUD operations work (Create, Read, Update, Delete)
- [ ] Images and assets load
- [ ] Mobile responsiveness
- [ ] SSL certificate is active (https://)

---

## Continuous Deployment

### Automatic Deployments from Git

Most platforms support automatic deployments:

**Vercel/Netlify/Render**:
- Push to `main` branch → Auto deploy to production
- Push to other branches → Auto deploy to preview URL

**Firebase Hosting with GitHub Actions**:

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: flutterfirebaseapp-4908e
```

---

## Environment Variables

If using different Firebase configs for dev/prod:

### Vercel/Netlify
Add in dashboard under Environment Variables:
```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Update firebase.js to use env vars:
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist .vite
npm install
npm run build
```

### 404 on Refresh
Ensure your hosting platform is configured for SPA:
- Firebase: Already configured in `firebase.json`
- Netlify: Add `_redirects` file in `public/`:
  ```
  /*    /index.html   200
  ```
- Vercel: Add `vercel.json`:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```

### Firebase Connection Issues
- Check Firebase console for correct configuration
- Verify API keys are correct
- Check browser console for specific errors

---

## Performance Optimization

### Before Deploying:

1. **Optimize Images**
   - Use WebP format
   - Compress images
   - Use lazy loading

2. **Code Splitting**
   - Already handled by Vite
   - Check bundle size: `npm run build`

3. **Enable Caching**
   - Firebase Hosting: Automatic
   - Others: Configure cache headers

4. **Compress Assets**
   - Enable gzip/brotli compression
   - Most platforms do this automatically

---

## Monitoring

### Firebase Hosting Analytics
```bash
firebase hosting:channel:list
```

### Custom Domain Setup
1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow DNS configuration steps
4. Wait for SSL provisioning (24-48 hours)

---

## Rollback

### Firebase Hosting
```bash
# View deployment history
firebase hosting:channel:list

# Rollback to previous version
firebase hosting:rollback
```

### Vercel/Netlify
- Go to deployments dashboard
- Click on previous deployment
- Click "Promote to Production"

---

## Cost Estimates

| Platform | Free Tier | Paid Plans |
|----------|-----------|------------|
| Firebase Hosting | 10 GB storage, 360 MB/day transfer | $0.026/GB storage, $0.15/GB transfer |
| Vercel | 100 GB bandwidth | $20/month Pro |
| Netlify | 100 GB bandwidth | $19/month Pro |
| GitHub Pages | Unlimited (public repos) | N/A |
| Render | 100 GB bandwidth | $7/month |

**Recommendation**: Start with Firebase Hosting free tier - more than enough for most applications.

---

## Security Best Practices

1. **Firebase Security Rules**
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

2. **Enable CORS** (if needed)
3. **Use HTTPS** (automatic on all platforms)
4. **Regular Updates**
   ```bash
   npm audit
   npm update
   ```

---

## Support

- **Firebase**: https://firebase.google.com/support
- **Vercel**: https://vercel.com/support
- **Netlify**: https://www.netlify.com/support

---

**Ready to deploy? Start with Firebase Hosting - it's the easiest!** 🚀

```bash
npm run build && firebase deploy
```
