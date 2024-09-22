const connPool = require("./config/db");

function validateName(customer_name) {
    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(customer_name)) {
        throw new Error(
            "Le nom ne doit pas contenir de chiffres ou de caractères spéciaux."
        );
    }
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        throw new Error("Format d'email invalide.");
    }
}

function addCustomer(customer_name, address, email, phone) {
    try {
        validateName(customer_name);
        validateEmail(email);

        const query =
            "INSERT INTO customers (customer_name, address, email, phone) VALUES (?, ?, ?, ?)";
        connPool.query(query, [customer_name, address, email, phone], (err, result) => {
            if (err) {
                console.error("Erreur lors de l'ajout du client:", err.message);
                return;
            }
            console.log("Client ajouté avec succès! ID:", result.insertId);
        });
    } catch (error) {
        console.error("Erreur inattendue:", error.message);
    }
}

function listCustomer() {
    try {
        const query = "SELECT * FROM customers";
        connPool.query(query, (err, results) => {
            if (err) {
                console.error(
                    "Erreur lors de la récupération des clients:",
                    err.message
                );
                return;
            }
            console.log("Liste des clients:", results);
        });
    } catch (error) {
        console.error("Erreur inattendue:", error.message);
    }
}

function updateCustomer(id, customer_name, address, email, phone) {
    try {
        validateName(customer_name);
        validateEmail(email);

        const query =
            "UPDATE customers SET customer_name = ?, address = ?, email = ?, phone = ? WHERE id = ?";
        connPool.query(query, [customer_name, address, email, phone, id], (err, result) => {
            if (err) {
                console.error("Erreur lors de la mise à jour du client:", err.message);
                return;
            }
            if (result.affectedRows === 0) {
                console.log("Aucun client trouvé avec cet ID.");
            } else {
                console.log("Client mis à jour avec succès!");
            }
        });
    } catch (error) {
        console.error("Erreur inattendue:", error.message);
    }
}

function deleteCustomer(id) {
    try {
        const query = "DELETE FROM customers WHERE id = ?";
        connPool.query(query, [id], (err, result) => {
            if (err) {
                console.error("Erreur lors de la suppression du client:", err.message);
                return;
            }
            if (result.affectedRows === 0) {
                console.log("Aucun client trouvé avec cet ID.");
            } else {
                console.log("Client supprimé avec succès!");
            }
        });
    } catch (error) {
        console.error("Erreur inattendue:", error.message);
    }
}
module.exports = {
    addCustomer,
    listCustomer,
    updateCustomer,
    deleteCustomer
};
