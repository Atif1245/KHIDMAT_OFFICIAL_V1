# Khidmat App: Mobile Deployment Guide

Congratulations! The major updates to the **Khidmat App** (Splash Screen, Pakistan-wide database, and Tracking Map) are already successfully implemented in your codebase. 

Now, let's get this app running on your physical mobile phone!

## Phase 1: Test on Your Phone Today (Local Network)
This is the fastest way to see the app on your phone right now without installing any complex software.

### Prerequisites
1. Your computer and your mobile phone **MUST** be connected to the exact same Wi-Fi network.

### Step 1: Find your Computer's Local IP Address
1. On your Windows computer, open the **Command Prompt** (press `Win + R`, type `cmd`, hit Enter).
2. Type `ipconfig` and press Enter.
3. Look for the line that says **IPv4 Address**. It will look something like `192.168.1.5` or `10.0.0.15`. Write this down.

### Step 2: Start the Development Server for Network Access
By default, Vite only runs on `localhost` (your computer). We need to expose it to your Wi-Fi network.
1. Open your VS Code terminal in the `KHIDMAT_APP` folder.
2. Run this command:
   ```bash
   npm run dev -- --host
   ```
3. The terminal will now show two URLs:
   - `Local: http://localhost:5173/`
   - `Network: http://192.168.x.x:5173/`

### Step 3: Open on your Phone
1. Open the web browser (Chrome or Safari) on your mobile phone.
2. Type in the **Network URL** exactly as it appears in your terminal (e.g., `http://192.168.1.5:5173`).
3. **Success!** You should now see the Khidmat App splash screen running beautifully on your mobile device.

---

## Phase 2: Convert to a Native Android/iOS App (Google Play Store)
When you are ready to publish the app to the Google Play Store or Apple App Store, we will wrap your React web app into a native mobile app using **Capacitor**.

### Step 1: Build your Web App
First, we need to create the production-ready files for your app.
Run this in your VS Code terminal:
```bash
npm run build
```
*(This will create a `dist` folder containing the optimized app).*

### Step 2: Install Capacitor
Next, add Capacitor to your project:
```bash
npm install @capacitor/core @capacitor/cli
npx cap init
```
*(When prompted, enter your App Name: `Khidmat App` and App ID: `com.khidmat.app`)*

### Step 3: Add Android/iOS Platforms
Install the platform packages:
```bash
npm install @capacitor/android @capacitor/ios
npx cap add android
npx cap add ios
```

### Step 4: Sync your Code
Every time you make changes to your React app and run `npm run build`, you must sync those changes to the mobile platforms:
```bash
npx cap sync
```

### Step 5: Open in Android Studio / Xcode
To actually compile the app into an `.apk` (for Android) or test it on an emulator, you will need the official developer tools.
- **For Android:** Install [Android Studio](https://developer.android.com/studio). Then run:
  ```bash
  npx cap open android
  ```
- **For iOS (Requires a Mac):** Install Xcode. Then run:
  ```bash
  npx cap open ios
  ```

> **Note:** For the backend database (SQLite), since SQLite runs locally on the Node.js server, you will eventually need to host your Node.js server online (using services like Render, Heroku, or DigitalOcean) and update the API URLs in your React app from `localhost:5000` to your new live server URL before launching on the Play Store.
