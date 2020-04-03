create table users (id integer primary key, email varchar(50) unique not null, password varchar(50) not null, nickname varchar(50), created_on timestamp not null);

insert into users(id, email, password, created_on)
values (1, 'buck@buck.com', '1234', 'buck', '2020-03-29 19:10:25');
