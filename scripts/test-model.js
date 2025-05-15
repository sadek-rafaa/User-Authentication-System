require('dotenv').config();
const { User } = require('../models');

(async () => {
  try {
    console.log("✅ Starting User model tests...");

    // Test user creation
    const testUser = {
      email: `test-${Date.now()}@example.com`,
      password: 'SecurePass123!',
      firstName: 'Test',
      lastName: 'User'
    };

    const createdUser = await User.create(testUser);
    console.log('✅ User created:', createdUser);

    // Find user by email (to get password_hash)
    const foundUser = await User.findByEmail(testUser.email);
    console.log("✅ Found user:", foundUser);

    if (!foundUser || !foundUser.password_hash) {
      throw new Error("❌ Password hash is missing, cannot verify password.");
    }

    // Test password verification
    const isValid = await User.verifyPassword('SecurePass123!', foundUser.password_hash);
    console.log('✅ Password verification:', isValid ? 'PASSED' : 'FAILED');

    console.log("✅ All tests completed successfully!");
  } catch (err) {
    console.error("❌ Model test failed:", err);
  } finally {
    process.exit();
  }
})();
