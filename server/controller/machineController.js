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
    console.log(event);
    return await new Promise((resolve, reject) => {
        db.run("INSERT INTO machines (ip,name,location) VALUES (?,?,?)", ["test"], (err) => {
            if (err) reject(err);
            resolve();
        });
    })
};