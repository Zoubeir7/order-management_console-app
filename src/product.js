const pool = require('./config/db');

async function productIdExists(id) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute('SELECT 1 FROM products WHERE id = ?', [id]);
        return rows.length > 0;
    } catch (error) {
        console.log(error.message);
    } finally {
        connection.release();
    }
}

async function createProduct(product) {
    const connection = await pool.getConnection();
    try {
        const query = `
            INSERT INTO products 
            (product_name, product_description, stock, price, category, barcode, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await connection.execute(query, [
            product.product_name, product.product_description, product.stock, product.price,
            product.category, product.barcode, product.status
        ]);
        console.log('Produit ajouté avec succès.');
        return result.insertId;
    } catch (error) {
        if (error.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
            console.log('Veuillez vérifier les valeurs saisies, vous avez entré une valeur invalide.');
        } else {
            console.error("Erreur lors de l'insertion du produit :", error.message);
        }
    } finally {
        connection.release();
    }
}

async function updateProduct(id, product) {
    const connection = await pool.getConnection();
    try {
        const query = `
            UPDATE products 
            SET product_name = ?, product_description = ?, stock = ?, price = ?, category = ?, barcode = ?, status = ?  
            WHERE id = ?
        `;
        await connection.execute(query, [
            product.product_name, product.product_description, product.stock, product.price,
            product.category, product.barcode, product.status, id
        ]);
        console.log(`Produit avec id: ${id} modifié avec succès.`);
    } catch (error) {
        if (error.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
            console.log('Veuillez vérifier les valeurs saisies, vous avez entré une valeur invalide.');
        } else {
            console.error("Erreur lors de la modification du produit :", error.message);
        }
    } finally {
        connection.release();
    }
}

async function deleteProduct(id) {
    const connection = await pool.getConnection();
    try {
        const query = 'DELETE FROM products WHERE id = ?';
        await connection.execute(query, [id]);
        console.log(`Produit avec id: ${id} supprimé.`);
    } catch (error) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            console.log("Impossible de supprimer le produit car il est lié à des commandes existantes.");
        } else {
            console.error("Erreur lors de la suppression du produit :", error.message);
        }
    } finally {
        connection.release();
    }
}

async function listProducts() {
    const connection = await pool.getConnection();
    try {
        const query = 'SELECT * FROM products';
        const [rows] = await connection.execute(query);
        return rows;
    } catch (error) {
        console.log(error.message);
    } finally {
        connection.release();
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    listProducts,
    productIdExists
};
