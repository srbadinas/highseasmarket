const bcryptjs = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");

export default async function encryptPassword(password: string) {
    try {
        let salt = await bcryptjs.genSalt(10);
        let hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.log(error);
    }
}