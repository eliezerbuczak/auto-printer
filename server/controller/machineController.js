import db from "~/server/utils/index.js";
export const searchMachine = async () => {
    return await new Promise((resolve, reject) => {
        db.all("SELECT * FROM machines", (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    })
};
export const saveMachine = async (event) => {
    const request = await readBody(event);
    const { ip, name, location } = request;
    return await new Promise((resolve, reject) => {
        db.run(`INSERT INTO machines (ip, name, location) VALUES (?, ?, ?)`, [ip, name, location], (err) => {
            if (err) reject(err);
            resolve({ id: this.lastID });
        });
    })
};