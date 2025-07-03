// Simple test script to verify API endpoints
// Run with: node test-api.js (after starting the server)

const axios = require('axios');

const BASE_URL = 'http://localhost:8080';

async function testAPI() {
  console.log('🚀 Starting API Tests...\n');

  try {
    // Test 1: Check if server is running
    console.log('1. Testing server connection...');
    const response = await axios.get(BASE_URL);
    console.log('✅ Server is running:', response.data.message);

    // Test 2: Test public endpoint
    console.log('\n2. Testing public endpoint...');
    const publicResponse = await axios.get(`${BASE_URL}/api/test/all`);
    console.log('✅ Public endpoint:', publicResponse.data);

    // Test 3: Register a new user
    console.log('\n3. Testing user registration...');
    const signupData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword123',
      roles: ['user']
    };
    
    try {
      const signupResponse = await axios.post(`${BASE_URL}/api/auth/signup`, signupData);
      console.log('✅ User registration:', signupResponse.data.message);
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('ℹ️ User already exists (expected if running multiple times)');
      } else {
        throw error;
      }
    }

    // Test 4: Login user
    console.log('\n4. Testing user login...');
    const signinData = {
      username: 'testuser',
      password: 'testpassword123'
    };
    
    const signinResponse = await axios.post(`${BASE_URL}/api/auth/signin`, signinData);
    const token = signinResponse.data.accessToken;
    console.log('✅ User login successful');
    console.log('Token received:', token.substring(0, 20) + '...');

    // Test 5: Access protected endpoint
    console.log('\n5. Testing protected endpoint...');
    const protectedResponse = await axios.get(`${BASE_URL}/api/test/user`, {
      headers: {
        'x-access-token': token
      }
    });
    console.log('✅ Protected endpoint:', protectedResponse.data);

    console.log('\n🎉 All tests passed! API is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure the server is running: npm start');
    }
  }
}

// Run tests
testAPI();
