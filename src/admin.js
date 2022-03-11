import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS);
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL:
        "https://eboos-fc2c7-default-rtdb.europe-west1.firebasedatabase.app",
    });
  } catch (error) {
    console.log("Firebase admin initialization error", error.stack);
  }
}

export default admin;
