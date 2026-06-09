const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1];
const key = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1];

const supabase = createClient(url, key);

async function check() {
  const { data, error } = await supabase.from('user_subscriptions').insert({
    user_id: 'test',
    plan_type: '1_day',
    status: 'active',
    valid_until: new Date().toISOString(),
    apply_limit_per_day: 10
  });
  console.log("Insert Error:", error);
}

check();
