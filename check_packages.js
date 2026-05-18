const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Try loading both .env and .env.local
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log('--- Packages in Supabase Database ---');
    const { data, error } = await supabase.from('packages').select('*');
    if (error) {
        console.error('Error fetching packages:', error);
    } else {
        data.forEach(pkg => {
            console.log(`ID: ${pkg.id}`);
            console.log(`Name: ${pkg.name}`);
            console.log(`Tag: ${pkg.tag}`);
            console.log(`Features: ${JSON.stringify(pkg.features)}`);
            console.log('---------------------------------------------');
        });
    }
}

check();
