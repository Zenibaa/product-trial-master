DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS wishlist_items;
DROP TABLE IF EXISTS cart_items;

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    firstname VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at BIGINT NOT NULL,
    updated_at BIGINT
);

INSERT INTO users (id, username, firstname, role, email, password, created_at, updated_at) VALUES
(1, 'admin', 'Admin','ADMIN', 'admin@admin.com', '$2a$10$PmdlrUHWXSFxijPIV1lneeCgvzndwCYsAyz1sJMztLf1OAZLeJ3Mu', 1720444230000, 1720444230000);

INSERT INTO users (id, username, firstname, role,  email, password, created_at, updated_at) VALUES
(2, 'user1', 'User1','USER', 'user1@example.com', '$2a$10$hmvk.LtwDslm7FRA92C7ze2Vcvju.hQJX7Bn7DDqdBOmU6hbfcNZy', 1720444230000, 1720444230000);

INSERT INTO users (id, username, firstname, role,  email, password, created_at, updated_at) VALUES
(3, 'user2', 'User2','USER', 'user2@example.com', '$2a$10$hmvk.LtwDslm7FRA92C7ze2Vcvju.hQJX7Bn7DDqdBOmU6hbfcNZy', 1720444230000, 1720444230000);

INSERT INTO users (id, username, firstname,  role, email, password, created_at, updated_at) VALUES
(4, 'user3', 'User3','USER', 'user3@example.com', '$2a$10$hmvk.LtwDslm7FRA92C7ze2Vcvju.hQJX7Bn7DDqdBOmU6hbfcNZy', 1720444230000, 1720444230000);

CREATE TABLE products (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(255),
  category VARCHAR(255),
  price DOUBLE NOT NULL,
  quantity INT NOT NULL,
  internal_reference VARCHAR(255),
  shell_id BIGINT,
  inventory_status VARCHAR(50),
  rating DOUBLE,
  created_at BIGINT NOT NULL,
  updated_at BIGINT
);
INSERT INTO products (
    id, code, name, description, image, price, category,
    created_at, updated_at, shell_id, internal_reference,
    inventory_status, rating, quantity
) VALUES
      (1000, 'f230fh0g3', 'Bamboo Watch', 'Product Description', 'bamboo-watch.jpg', 65, 'Accessories', 1718114215761, 1718114215761, 15, 'REF-123-456', 'INSTOCK', 5, 12),
      (1001, 'nvklal433', 'Black Watch', 'Product Description', 'black-watch.jpg', 72, 'Accessories', 1718114215761, 1718114215761, 15, 'REF-123-456', 'INSTOCK', 4, 6),
      (1002, 'zz21cz3c1', 'Blue Band', 'Product Description', 'blue-band.jpg', 79, 'Fitness', 1718114215761, 1718114215761, 15, 'REF-123-456', 'LOWSTOCK', 3, 9),
      (1003, '244wgerg2', 'Blue T-Shirt', 'Product Description', 'blue-t-shirt.jpg', 29, 'Clothing', 1718114215761, 1718114215761, 15, 'REF-123-456', 'INSTOCK', 5, 17),
      (1004, 'h456wer53', 'Bracelet', 'Product Description', 'bracelet.jpg', 15, 'Accessories', 1718114215761, 1718114215761, 15, 'REF-123-456', 'INSTOCK', 4, 3),
      (1005, 'av2231fwg', 'Brown Purse', 'Product Description', 'brown-purse.jpg', 120, 'Accessories', 1718114215761, 1718114215761, 15, 'REF-123-456', 'OUTOFSTOCK', 4, 0),
      (1006, 'bib36pfvm', 'Chakra Bracelet', 'Product Description', 'chakra-bracelet.jpg', 32, 'Accessories', 1718114215761, 1718114215761, 15, 'REF-123-456', 'LOWSTOCK', 3, 5),
      (1007, 'mbvjkgip5', 'Galaxy Earrings', 'Product Description', 'galaxy-earrings.jpg', 34, 'Accessories', 1718114215761, 1718114215761, 15, 'REF-123-456', 'INSTOCK', 5, 11),
      (1008, 'vbb124btr', 'Game Controller', 'Product Description', 'game-controller.jpg', 99, 'Electronics', 1718114215761, 1718114215761, 15, 'REF-123-456', 'LOWSTOCK', 4, 4),
      (1009, 'cm230f032', 'Gaming Set', 'Product Description', 'gaming-set.jpg', 299, 'Electronics', 1718114215761, 1718114215761, 15, 'REF-123-456', 'INSTOCK', 3, 8),
      (1010, 'plb34234v', 'Gold Phone Case', 'Product Description', 'gold-phone-case.jpg', 24, 'Accessories', 1718114215761, 1718114215761, 15, 'REF-123-456', 'OUTOFSTOCK', 4, 0),
      (1011, '4920nnc2d', 'Green Earbuds', 'Product Description', 'green-earbuds.jpg', 89, 'Electronics', 1718114215761, 1718114215761, 15, 'REF-123-456', 'INSTOCK', 4, 14),
      (1012, '250vm23cc', 'Green T-Shirt', 'Product Description', 'green-t-shirt.jpg', 49, 'Clothing', 1718114215761, 1718114215761, 15, 'REF-123-456', 'INSTOCK', 5, 16),
      (1013, 'fldsmn31b', 'Grey T-Shirt', 'Product Description', 'grey-t-shirt.jpg', 48, 'Clothing', 1718114215761, 1718114215761, 15, 'REF-123-456', 'OUTOFSTOCK', 3, 0),
      (1014, 'waas1x2as', 'Headphones', 'Product Description', 'headphones.jpg', 175, 'Electronics', 1718114215761, 1718114215761, 15, 'REF-123-456', 'LOWSTOCK', 5, 5),
      (1015, 'vb34btbg5', 'Light Green T-Shirt', 'Product Description', 'light-green-t-shirt.jpg', 49, 'Clothing', 1718114215761, 1718114215761, 15, 'REF-123-456', 'INSTOCK', 4, 13),
      (1016, 'k8l6j58jl', 'Lime Band', 'Product Description', 'lime-band.jpg', 79, 'Fitness', 1718114215761, 1718114215761, 15, 'REF-123-456', 'INSTOCK', 3, 15),
      (1017, 'v435nn85n', 'Mini Speakers', 'Product Description', 'mini-speakers.jpg', 85, 'Clothing', 1718114215761, 1718114215761, 15, 'REF-123-456', 'INSTOCK', 4, 10),
      (1018, '09zx9c0zc', 'Painted Phone Case', 'Product Description', 'painted-phone-case.jpg', 56, 'Accessories', 1718114215761, 1718114215761, 15, 'REF-123-456', 'INSTOCK', 5, 9),
      (1019, 'mnb5mb2m5', 'Pink Band', 'Product Description', 'pink-band.jpg', 79, 'Fitness', 1718114215761, 1718114215761, 15, 'REF-123-456', 'INSTOCK', 4, 7),
      (1020, 'r23fwf2w3', 'Pink Purse', 'Product Description', 'pink-purse.jpg', 110, 'Accessories', 1718114215761, 1718114215761, 15, 'REF-123-456', 'OUTOFSTOCK', 4, 0),
      (1021, 'pxpzczo23', 'Purple Band', 'Product Description', 'purple-band.jpg', 79, 'Fitness', 1718114215761, 1718114215761, 15, 'REF-123-456', 'LOWSTOCK', 3, 4),
      (1022, '2c42cb5cb', 'Purple Gemstone Necklace', 'Product Description', 'purple-gemstone-necklace.jpg', 45, 'Accessories', 1718114215761, 1718114215761, 15, 'REF-123-456', 'INSTOCK', 4, 6),
      (1023, '5k43kkk23', 'Purple T-Shirt', 'Product Description', 'purple-t-shirt.jpg', 49, 'Clothing', 1718114215761, 1718114215761, 15, 'REF-123-456', 'LOWSTOCK', 5, 3),
      (1024, 'lm2tny2k4', 'Shoes', 'Product Description', 'shoes.jpg', 64, 'Clothing', 1718114215761, 1718114215761, 15, 'REF-123-456', 'INSTOCK', 4, 17),
      (1025, 'nbm5mv45n', 'Sneakers', 'Product Description', 'sneakers.jpg', 78, 'Clothing', 1718114215761, 1718114215761, 15, 'REF-123-456', 'INSTOCK', 4, 11),
      (1026, 'zx23zc42c', 'Teal T-Shirt', 'Product Description', 'teal-t-shirt.jpg', 49, 'Clothing', 1718114215761, 1718114215761, 15, 'REF-123-456', 'LOWSTOCK', 3, 2),
      (1027, 'acvx872gc', 'Yellow Earbuds', 'Product Description', 'yellow-earbuds.jpg', 89, 'Electronics', 1718114215761, 1718114215761, 15, 'REF-123-456', 'INSTOCK', 3, 18),
      (1028, 'tx125ck42', 'Yoga Mat', 'Product Description', 'yoga-mat.jpg', 20, 'Fitness', 1718114215761, 1718114215761, 15, 'REF-123-456', 'INSTOCK', 5, 7),
      (1029, 'gwuby345v', 'Yoga Set', 'Product Description', 'yoga-set.jpg', 20, 'Fitness', 1718114215761, 1718114215761, 15, 'REF-123-456', 'INSTOCK', 8, 19);

CREATE TABLE cart_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    created_at BIGINT,
    CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_cart_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE wishlist_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    created_at BIGINT,

    CONSTRAINT fk_wishlist_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_wishlist_product FOREIGN KEY (product_id) REFERENCES products(id)
);
