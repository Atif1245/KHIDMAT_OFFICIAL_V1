// Jab app Vercel par deploy hogi, to ye automatically usi link ka API use karega
const LIVE_BACKEND_URL = ''; 

// import.meta.env.PROD check karta hai ke app live hai ya local
export const API_BASE = import.meta.env.PROD 
  ? LIVE_BACKEND_URL 
  : 'http://localhost:5000';