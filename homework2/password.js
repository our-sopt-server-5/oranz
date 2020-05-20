const fs = require('fs');
const crypto = require('crypto');

fs.readFile('./password.txt', (err, pw) => {
    if (err) return console.log(err.message);
    return crypto.pbkdf2(pw, "빌어먹을손톱", 23, 32, "sha512", (err, derivedHash) => {
        if (err) throw err;
        key = derivedHash.toString('hex');
        fs.writeFileSync("hashed.txt", key);
    });
});