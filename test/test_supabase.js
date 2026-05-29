require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const url = process.env.REACT_APP_SUPABASE_URL;
const key = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.log('Missing env variables');
  process.exit(1);
}

const supabase = createClient(url, key);

async function test() {
  const { data, error } = await supabase.from('projects').select('*');
  if (error) {
    console.error('Error:', error);
  } else {
    console.log(`Fetched ${data.length} projects`);
    if (data.length > 0) {
      console.log('First project:', data[0].title);
    }
  }
}

test();
