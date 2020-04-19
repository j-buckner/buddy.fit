create table users (id serial primary key, email varchar(50) unique not null, password varchar(150) not null, nickname varchar(50), created_at timestamp not null);

insert into users(email, password, nickname, created_at) values ('buck@buck.com', '$2a$10$5c0WQmvJ2xjKlMwu1/zaje7aaQr/sVRukLQcwfdegMY7f/2TxaXka', 'buck', '2020-03-29 19:10:25');

create table food (id serial primary key, fdc_id text, brand_owner text, gtin_upc text, ingredients text, serving_size text, serving_size_unit text, househonld_serving_fulltext text, branded_food_category text, data_source text, modified_date text, available_date text, market_country text, discontinued_date text);
copy food(fdc_id, brand_owner, gtin_upc, ingredients, serving_size, serving_size_unit, househonld_serving_fulltext, branded_food_category, data_source, modified_date, available_date, market_country, discontinued_date)
from '/var/lib/postgresql/branded_food.csv' delimiter ',' csv header;