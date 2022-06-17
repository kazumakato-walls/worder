CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    age INT,
    PRIMARY KEY (id)
);

CREATE TABLE menus (
    id INT NOT NULL AUTO_INCREMENT,
    food VARCHAR(30) NOT NULL,
    price INT,
    visible_flg TINYINT,
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY (id)
);

CREATE TABLE orders (
    id INT NOT NULL AUTO_INCREMENT,
    menu_id INT,
    seat VARCHAR(6) NOT NULL,
    delivery_flg TINYINT,
    bill_flg TINYINT,
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY (id)
);
