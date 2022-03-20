import { initializeApp, cert } from "firebase-admin/app";

const CREDENTIALS = process.env.FIREBASE_ADMIN_CREDENTIALS;

const serviceAccount = JSON.parse(CREDENTIALS);
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

const app = initializeApp({
  credential: cert(serviceAccount),
  databaseURL:
    "https://eboos-fc2c7-default-rtdb.europe-west1.firebasedatabase.app",
});

export default app;
