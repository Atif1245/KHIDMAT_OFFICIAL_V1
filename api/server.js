const express = require('express');
const cors = require('cors');
const path = require('path');
const { supabase } = require('./supabaseClient.js'); 

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- API ROUTES ---

// 1. REGISTER
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    const { data: existingUser, error: checkError } = await supabase
      .from('user') 
      .select('email')
      .eq('email', email);

    if (checkError) throw checkError;

    if (existingUser && existingUser.length > 0) {
      return res.status(400).json({ message: 'This email is already registered.' });
    }

    const { data, error: insertError } = await supabase
      .from('user') 
      .insert([{ 
        name, 
        email, 
        password, 
        role: role || 'customer', 
        phone: phone || null 
      }])
      .select();

    if (insertError) throw insertError;

    res.status(201).json({ message: 'User Registered Successfully!', user: data[0] });

  } catch (err) {
    res.status(500).json({ message: 'Registration Failed: ' + err.message });
  }
});

// 2. LOGIN
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data: user, error } = await supabase
      .from('user')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (!user || error) return res.status(401).json({ message: 'Invalid credentials' });
    
    res.json({ message: 'Welcome Back!', user });
  } catch (err) {
    res.status(500).json({ message: 'Login Error' });
  }
});

// 3. GET SINGLE PROVIDER PROFILE (Ye missing tha)
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

// 4. UPDATE PROVIDER PROFILE (Ye bhi missing tha)
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
    console.error("Update Error:", err.message);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

// 5. FETCH ALL PROVIDERS
app.get('/api/providers/nearby', async (req, res) => {
  try {
    const { data, error } = await supabase.from('user').select('*').eq('role', 'provider');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch providers' });
  }
});

// --- SERVER START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 KHIDMAT SUPABASE BACKEND: Online at http://localhost:${PORT}`);
});

module.exports = app;