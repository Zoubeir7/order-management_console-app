CREATE DATABASE orders_management ;
USE orders_management ;

CREATE TABLE customers(
   id INT PRIMARY KEY AUTO_INCREMENT,
   customer_name VARCHAR(50) NOT NULL,
   adress VARCHAR(50) NOT NULL,
   email VARCHAR(50) NOT NULL UNIQUE,
   phone VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE products(
   id INT PRIMARY KEY AUTO_INCREMENT,
   product_name VARCHAR(50)NOT NULL,
   product_description VARCHAR(100) NOT NULL,
   price DECIMAL(10,2)NOT NULL,
   stock INT NOT NULL
);

CREATE TABLE purchase_orders(
   id INT PRIMARY KEY AUTO_INCREMENT,
   date DATE NOT NULL,
   delivery_address VARCHAR(50) NOT NULL,
   customer_id INT NOT NULL,
   FOREIGN KEY(customer_id) REFERENCES customers(id)
);


CREATE TABLE order_details(
   id INT PRIMARY KEY AUTO_INCREMENT,
   quantity INT NOT NULL,
   price DECIMAL(10,2) NOT NULL,
   product_id INT NOT NULL,
   purchase_order_id INT NOT NULL,
   FOREIGN KEY(product_id) REFERENCES products (id),
   FOREIGN KEY(purchase_order_id) REFERENCES purchase_orders(id)
);

/* les Mises à jour  */ 
CREATE TABLE payments(
     id INT PRIMARY KEY AUTO_INCREMENT,
     date DATETIME,
	 amount DECIMAL(10,2)NOT NULL,
     payment_method VARCHAR(50) NOT NULL,
     purchase_order_id INT NOT NULL,
	 FOREIGN KEY(purchase_order_id) REFERENCES PurchaseOrder(id)
);
/* Add new column  */ 
ALTER TABLE purchase_orders 
ADD track_number VARCHAR(100) NOT NULL,
ADD status VARCHAR(50) NOT NULL;


/* Add new column  */ 
ALTER TABLE products 
ADD category VARCHAR(100)NOT NULL,
ADD barcode VARCHAR(50)NOT NULL UNIQUE,
ADD status VARCHAR(50)NOT NULL;


/* updat column  */ 
ALTER TABLE customers
MODIFY COLUMN customer_name VARCHAR(255) NOT NULL,
MODIFY COLUMN email VARCHAR(255) NOT NULL,
MODIFY COLUMN phone VARCHAR(20) NOT NULL;

/* updat column  */ 
ALTER TABLE products
MODIFY COLUMN product_name VARCHAR(255) NOT NULL;

