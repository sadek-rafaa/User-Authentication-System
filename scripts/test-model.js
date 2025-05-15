require('dotenv').config();
const { User } = require('../models');

(async () => {
  try {
    // Test user creation
    const testUser = {
      email: `test-${Date.now()}@example.com`,
      password: 'SecurePass123!',
      firstName: 'Test',
      lastName: 'User'
    };

    const createdUser = await User.create(testUser);
    console.log('✅ User created:', createdUser);

    // Test password verification
    const isValid = await User.verifyPassword('SecurePass123!', createdUser.passwordHash);
    console.log('✅ Password verification:', isValid ? 'PASSED' : 'FAILED');

    // Test find by email
    const foundUser = await User.findByEmail(testUser.email);
    console.log('✅ User lookup:', foundUser ? 'SUCCESS' : 'FAILED');
  } catch (err) {
    console.error('❌ Model test failed:', err);
  } finally {
    process.exit();
  }
})();