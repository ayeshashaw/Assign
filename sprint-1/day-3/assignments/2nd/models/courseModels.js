const fs = require("fs");
const dbPath = "./db.json";

const readData = () => {
    try {
        const data = fs.readFileSync(dbPath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading db.json:", error);
        return null;
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
        console.error("Error writing to db.json:", error);
    }
};

module.exports = { readData, writeData };
