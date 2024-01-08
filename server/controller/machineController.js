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
    try {
        const request = await readBody(event);
        const { ip, name, location } = request;

        return await new Promise((resolve, reject) => {
            db.run(`INSERT INTO machines (ip, name, location) VALUES (?, ?, ?)`, [ip, name, location], function(err) {
                if (err) {
                    console.error('Erro ao inserir na base de dados:', err);
                    reject(err);
                } else {
                    console.log('Inserção bem-sucedida!');
                    resolve('ok');
                }
            });
        });
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        throw error;
    }
};
