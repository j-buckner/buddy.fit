create table users (id integer primary key, email varchar(50) unique not null, password varchar(150) not null, nickname varchar(50), created_at timestamp not null);

insert into users(id, email, password, nickname, created_at) values (1, 'buck@buck.com', '$2a$10$5c0WQmvJ2xjKlMwu1/zaje7aaQr/sVRukLQcwfdegMY7f/2TxaXka', 'buck', '2020-03-29 19:10:25');
