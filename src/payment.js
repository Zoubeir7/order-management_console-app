const pool = require('./config/db')

async function paymentIdExists(id) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute('SELECT 1 FROM payments WHERE id = ?', [id]);
        return rows.length > 0;
    } finally {
        connection.release();
    }
}

async function createPayment(payments) {
    const connection = await pool.getConnection();
    try {
        const query = 'INSERT INTO payments (date, amount, payment_method, purchase_order_id) VALUES (?, ?, ?, ?)';
        const [result] = await connection.execute(query, [payments.date, payments.amount, payments.payment_method, payments.purchase_order_id]);
        console.log(`Payement a été ajouter avec succes.`);
        return result.insertId;
    } catch (error) {
        console.log("Erreur lors de la creation de payement : ", error.message);
    } finally {
        connection.release();
    }
}

async function updatePayment(id, payments) {
    const connection = await pool.getConnection();
    try {

        const query = 'UPDATE payments SET date = ?, amount = ?, payment_method = ?, purchase_order_id = ? WHERE id = ?';
        await connection.execute(query, [payments.date, payments.amount, payments.payment_method, payments.purchase_order_id, id]);
        console.log(`Payement avec id: ${id} à été modifier avec succes.`);

    } catch (error) {
        console.log("Erreur lors de la modification de payement : ", error.message);
    } finally {
        connection.release();
    }
}


async function deletePayment(id) {
    const connection = await pool.getConnection();
    try {

        const query = 'DELETE FROM payments WHERE id = ?';
        await connection.execute(query, [id]);
        console.log(`Payement avec id: ${id} à été supprumé.`)

    } catch (error) {
        console.log(error.message);
    } finally {
        connection.release();
    }
}
async function listPayments() {
    const connection = await pool.getConnection();
    try {
        const query = 'SELECT * FROM payments';
        const [rows] = await connection.execute(query);
        return rows;
    } catch (error) {
        console.log(error.message);
    } finally {
        connection.release();
    }
}

module.exports = {
    createPayment,
    updatePayment,
    deletePayment,
    listPayments,
    paymentIdExists
};