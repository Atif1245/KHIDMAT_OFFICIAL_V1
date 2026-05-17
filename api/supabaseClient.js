const { createClient } = require('@supabase/supabase-js');

// 1. URL
const supabaseUrl = 'https://cbgqfrlyszmrxboliwtv.supabase.co';

// 2. Anon Public Key (Aapne jo publishable key batai thi wo yahan add kar di hai)
const supabaseKey = 'sb_publishable_9GjoVh7z4yxbhfrmgvLIeg_4Q0Nr7UO'; 

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

module.exports = { supabase }; 