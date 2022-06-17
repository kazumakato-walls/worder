INSERT INTO user (name, age) VALUES ("太郎", 15);
INSERT INTO user (name, age) VALUES ("次郎", 18);
INSERT INTO user (name, age) VALUES ("花子", 20);

INSERT INTO menus (food, price, visible_flg, created_at) VALUES ("カレー", 850,1,CURRENT_DATE());
INSERT INTO menus (food, price, visible_flg, created_at) VALUES ("ラーメン", 920,1,CURRENT_DATE());
INSERT INTO menus (food, price, visible_flg, created_at) VALUES ("炒飯", 680,1,CURRENT_DATE());
INSERT INTO menus (food, price, visible_flg, created_at) VALUES ("サラダ", 480,1,CURRENT_DATE());
INSERT INTO menus (food, price, visible_flg, created_at) VALUES ("コーラ", 350,1,CURRENT_DATE());
INSERT INTO menus (food, price, visible_flg, created_at) VALUES ("ジンジャエール", 350,1,CURRENT_DATE());
INSERT INTO menus (food, price, visible_flg, created_at) VALUES ("ウーロン茶", 350,1,CURRENT_DATE());

INSERT INTO orders (menu_id, seat, delivery_flg, bill_flg, created_at) 
VALUES (1,"A1",0,0,CURRENT_DATE());
INSERT INTO orders (menu_id, seat, delivery_flg, bill_flg, created_at) 
VALUES (2,"A1",1,0,CURRENT_DATE());
INSERT INTO orders (menu_id, seat, delivery_flg, bill_flg, created_at) 
VALUES (3,"A2",0,1,CURRENT_DATE());
INSERT INTO orders (menu_id, seat, delivery_flg, bill_flg, created_at) 
VALUES (4,"A2",1,1,CURRENT_DATE());

