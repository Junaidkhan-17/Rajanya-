const bcrypt = require("bcryptjs");

async function generateHash() {
  const password = "Admin@123"; // Change this if you want

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("Hashed Password:");
  console.log(hashedPassword);
}

generateHash();