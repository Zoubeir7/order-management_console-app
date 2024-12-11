const pool = require('./config/db')

async function comandeIdExists(id) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute('SELECT 1 FROM purchase_orders WHERE id = ?', [id]);
        return rows.length > 0;
    } finally {
        connection.release();
    }
}

async function createPurchaseDetails(order, productDetails) {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.execute(
            'INSERT INTO purchase_orders (date, delivery_address, customer_id, track_number, status) VALUES (?, ?, ?, ?, ?)',
            [order.date, order.deliveryAddress, order.customerId, order.trackNumber, order.status]
        );

        const purchaseId = result.insertId;

        for (const detail of productDetails) {
            await connection.execute(
                'INSERT INTO order_details (quantity, price, purchase_order_id, product_id) VALUES (?, ?, ?, ?)',
                [detail.quantity, detail.price, purchaseId, detail.productId]
            );
        }

        console.log('Commande et détails créés avec succès.');
    } catch (error) {
        console.log('Erreur lors de la création de la commande et des détails : ', error.message);
    } finally {
        connection.release();
    }
}

async function listPurchaseDetails(purchaseId) {
    const connection = await pool.getConnection();
    try {
        const purchaseQuery = 'SELECT * FROM purchase_orders WHERE id = ?';
        const [purchaseRows] = await connection.execute(purchaseQuery, [purchaseId]);
        const purchase = purchaseRows[0];

        if (!purchase) {
            throw new Error(`Commande avec l'ID ${purchaseId} n'existe pas.`);
        }
        const detailsQuery = 'SELECT quantity, price, product_id FROM order_details WHERE purchase_order_id = ?';
        const [detailsRows] = await connection.execute(detailsQuery, [purchaseId]);
        const details = detailsRows;

        return {
            purchase,
            details
        };
    } catch (error) {
        console.log('Erreur lors de la récupération de la commande et des détails :', error.message);
        throw error;
    } finally {
        connection.release();
    }
}


async function deletePurchaseDetails(purchaseId) {
    const connection = await pool.getConnection();
    try {

        await connection.execute(
            'DELETE FROM purchase_orders WHERE id = ?',
            [purchaseId]
        );

        console.log('Commande et détails supprimés avec succès.');
    } catch (error) {
        console.log('Erreur lors de la suppression de la commande et des détails ', error.message);
    } finally {
        connection.release();
    }
}

async function updatePurchaseDetails(purchaseId, order, details) {
    const connection = await pool.getConnection();
    try {
        await connection.execute(
            'UPDATE purchase_orders SET date = ?, delivery_address = ?, customer_id = ?, track_number = ?, status = ? WHERE id = ?',
            [order.date, order.deliveryAddress, order.customerId, order.trackNumber, order.status, purchaseId]
        );

        for (const detail of details) {
            await connection.execute(
                'UPDATE order_details SET quantity = ?, price = ? WHERE purchase_order_id = ? AND product_id = ?',
                [detail.quantity, detail.price, purchaseId, detail.productId]
            );
        }
    } catch (error) {
        console.log('Erreur lors de la mise à jour de la commande et des détails :', error.message);
    } finally {
        connection.release();
    }
}


module.exports = {
    createPurchaseDetails,
    listPurchaseDetails,
    deletePurchaseDetails,
    comandeIdExists,
    updatePurchaseDetails
}