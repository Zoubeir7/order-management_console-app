const connPool = require("./config/db");

function addProduct(
    product_name,
    product_description,
    price,
    stock,
    category,
    barcode,
    status
) {
    try {
        // Vérifier si le code-barres existe déjà
        const checkBarcodeQuery = "SELECT COUNT(*) AS count FROM products WHERE barcode = ?";
        connPool.query(checkBarcodeQuery, [barcode], (err, results) => {
            if (err) {
                console.error("Erreur lors de la vérification du code-barres:", err.message);
                return;
            }

            if (results[0].count > 0) {
                console.log("Le code-barres existe déjà. Veuillez utiliser un code-barres unique.");
                return;
            }

            const query =
                "INSERT INTO products (product_name, product_description, price, stock, category, barcode, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
            connPool.query(
                query,
                [product_name, product_description, price, stock, category, barcode, status],
                (err, result) => {
                    if (err) {
                        console.error("Erreur lors de l'ajout du produit:", err.message);
                        return;
                    }
                    console.log("Produit ajouté avec succès! ID:", result.insertId);
                }
            );
        });
    } catch (error) {
        console.error("Erreur inattendue:", error.message);
    }
}

function listProduct() {
    try {
        const query = "SELECT * FROM products";
        connPool.query(query, (err, results) => {
            if (err) {
                console.error("Erreur lors de la récupération des produits:", err.message);
                return;
            }
            console.log("Liste des produits:", results);
        });
    } catch (error) {
        console.error("Erreur inattendue:", error.message);
    }
}

function updateProduct(
    id,
    product_name,
    product_description,
    price,
    stock,
    category,
    barcode,
    status
) {
    try {
        const query =
            "UPDATE products SET product_name = ?, product_description = ?, price = ?, stock = ?, category = ?, barcode = ?, status = ? WHERE id = ?";
        connPool.query(
            query,
            [product_name, product_description, price, stock, category, barcode, status, id],
            (err, result) => {
                if (err) {
                    console.error("Erreur lors de la mise à jour du produit:", err.message);
                    return;
                }
                if (result.affectedRows === 0) {
                    console.log("Aucun produit trouvé avec cet ID.");
                } else {
                    console.log("Produit mis à jour avec succès!");
                }
            }
        );
    } catch (error) {
        console.error("Erreur inattendue:", error.message);
    }
}

function deleteProduct(id) {
    try {
        const query = "DELETE FROM products WHERE id = ?";
        connPool.query(query, [id], (err, result) => {
            if (err) {
                console.error("Erreur lors de la suppression du produit:", err.message);
                return;
            }
            if (result.affectedRows === 0) {
                console.log("Aucun produit trouvé avec cet ID.");
            } else {
                console.log("Produit supprimé avec succès");
            }
        });
    } catch (error) {
        console.error("Erreur inattendue:", error.message);
    }
}

module.exports = {
    addProduct,
    listProduct,
    updateProduct,
    deleteProduct
};
