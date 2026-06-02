const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { supabase } = require('./supabaseClient.js');
const createAuthRouter = require('./routes/auth');

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- LOCAL AUTH FALLBACK ---
const authDbPath = path.join(__dirname, 'auth.db');
const authDb = new sqlite3.Database(authDbPath, (err) => {
  if (err) console.error('Failed to open auth DB:', err.message);
});

authDb.serialize(() => {
  authDb.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      phone TEXT,
      password TEXT,
      role TEXT
    )
  `, (err) => {
    if (err) console.error('Could not create users table:', err.message);
  });
});

app.use('/api/auth', createAuthRouter(authDb));

// --- API ROUTES ---
// 1. GET SINGLE PROVIDER PROFILE
app.get('/api/providers/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: 'Provider profile not found' });
  }
});

// 2. UPDATE PROVIDER PROFILE
app.put('/api/providers/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cnic, address, timings, about, experience, phone } = req.body;

    const { data, error } = await supabase
      .from('user')
      .update({
        name,
        cnic,
        address,
        timings,
        about,
        experience,
        phone
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json({ message: 'Profile Updated Successfully!', user: data[0] });
  } catch (err) {
    console.error('Update Error:', err.message);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

// 3. FETCH ALL PROVIDERS
app.get('/api/providers/nearby', async (req, res) => {
  try {
    const { data, error } = await supabase.from('user').select('*').eq('role', 'provider');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch providers' });
  }
});

// 4. HEALTH CHECK
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', source: 'backend', authFallback: true });
});

// --- SERVER START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 KHIDMAT BACKEND ONLINE: http://localhost:${PORT}`);
});

module.exports = app;
