const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    console.log('Updating activities colors...');
    
    // 1. Ceylon Tea -> var(--neon-purple)
    const { error: e1 } = await supabase.from('activities').update({ color: 'var(--neon-purple)' }).eq('id', '03e02756-c963-4bec-b8a6-c4bebed7396b');
    if (e1) console.error('E1:', e1);
    
    // 2. Surfing -> var(--neon-blue)
    const { error: e2 } = await supabase.from('activities').update({ color: 'var(--neon-blue)' }).eq('id', 'a17b04c1-9656-4182-95ff-68a0b44e59f2');
    if (e2) console.error('E2:', e2);
    
    // 3. Spot leopards -> #a855f7
    const { error: e3 } = await supabase.from('activities').update({ color: '#a855f7' }).eq('id', '7fb7ab41-e6a9-420f-8379-b88f81d12a99');
    if (e3) console.error('E3:', e3);
    
    // 4. Train Journey -> #3b82f6
    const { error: e4 } = await supabase.from('activities').update({ color: '#3b82f6' }).eq('id', 'bae0ce27-5b70-453b-9eb4-d2dd1880e80d');
    if (e4) console.error('E4:', e4);
    
    console.log('Update complete!');
}

run();
