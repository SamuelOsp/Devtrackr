async function testFlow() {
  const baseURL = 'http://localhost:3000';
  const ts = Date.now();
  const email = `testuser_${ts}@example.com`;
  const password = 'password123';
  let token = '';

  const request = async (method, path, body = null) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);
    const res = await fetch(`${baseURL}${path}`, options);
    const data = await res.json();
    if (!res.ok) throw new Error(JSON.stringify(data));
    return data;
  };
  
  try {
    console.log('1. Registering user...');
    await request('POST', '/auth/register', { email, password, name: 'Test User' });
    
    console.log('2. Logging in...');
    const loginRes = await request('POST', '/auth/login', { email, password });
    token = loginRes.data.access_token;
    
    console.log('3. Creating income...');
    await request('POST', '/income', { amount: 1000, description: 'Salary', date: new Date().toISOString() });
    
    console.log('4. Fetching categories...');
    const catRes = await request('GET', '/categories');
    const categories = catRes.data;
    if (!categories || categories.length === 0) throw new Error('No categories found!');
    
    console.log('5. Creating expense...');
    await request('POST', '/expenses', { 
      amount: 200, 
      description: 'Groceries', 
      date: new Date().toISOString(),
      categoryId: categories[0].id
    });
    
    console.log('6. Viewing summary...');
    const summaryRes = await request('GET', '/summary');
    const summary = summaryRes.data;
    
    console.log('Summary:', summary);
    if (summary.totalIncome === 1000 && summary.totalExpenses === 200 && summary.balance === 800) {
      console.log('7. Confirm data is correct: SUCCESS');
    } else {
      console.log('7. Confirm data is correct: FAILED');
    }
  } catch (error) {
    console.error('Test flow failed:', error.message || error);
  }
}

testFlow();
