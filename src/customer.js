const pool = require('./config/db');

async function clientIdExists(id) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute('SELECT 1 FROM customers WHERE id = ?', [id]);
        return rows.length > 0;
    } finally {
        connection.release();
    }
}

async function createClient(client) {
    const connection = await pool.getConnection();
    try {
        const query = 'INSERT INTO customers (customer_name, adress, email, phone) VALUES (?, ?, ?, ?)';
        const [result] = await connection.execute(query, [client.customer_name, client.adress, client.email, client.phone]);
        console.log(`Client ajouté avec succès.`);
        return result.insertId;
    } catch (error) {
        console.log("Erreur lors de l'insertion du client :", error.message);
    } finally {
        connection.release();
    }
}

async function updateClient(id, client) {
    const connection = await pool.getConnection();
    try {
        const query = 'UPDATE customers SET customer_name = ?, adress = ?, email = ?, phone = ? WHERE id = ?';
        await connection.execute(query, [client.customer_name, client.adress, client.email, client.phone, id]);
        console.log(`Client avec id: ${id} modifié avec succès.`);
    } catch (error) {
        console.log("Erreur lors de la modification du client :", error.message);
    } finally {
        connection.release();
    }
}

async function deleteClient(id) {
    const connection = await pool.getConnection();
    try {
        const query = 'DELETE FROM customers WHERE id = ?';
        await connection.execute(query, [id]);
        console.log(`Client avec id: ${id} supprimé.`);
    } catch (error) {
        if (error.code === "ER_ROW_IS_REFERENCED_2") {
            console.log("Impossible de supprimer le client car il est lié à des commandes existantes.");
        } else {
            console.error("Erreur lors de la suppression du client :", error.message);
        }
    } finally {
        connection.release();
    }
}

async function listClients() {
    const connection = await pool.getConnection();
    try {
        const query = 'SELECT * FROM customers';
        const [rows] = await connection.execute(query);
        return rows;
    } catch (error) {
        console.log(error.message);
    } finally {
        connection.release();
    }
}

module.exports = {
    createClient,
    updateClient,
    deleteClient,
    listClients,
    clientIdExists
};
