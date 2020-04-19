create table users (id serial primary key, email varchar(50) unique not null, password varchar(150) not null, nickname varchar(50), created_at timestamp not null);

insert into users(email, password, nickname, created_at) values ('buck@buck.com', '$2a$10$5c0WQmvJ2xjKlMwu1/zaje7aaQr/sVRukLQcwfdegMY7f/2TxaXka', 'buck', '2020-03-29 19:10:25');

create table food (id serial primary key, fdc_id text, data_type text, description text, food_category_id text, publication_date text);
copy food(fdc_id, data_type, description, food_category_id, publication_date)
from '/var/lib/postgresql/food.csv' delimiter ',' csv header;

create table branded_food (id serial primary key, fdc_id text, brand_owner text, gtin_upc text, ingredients text, serving_size text, serving_size_unit text, househonld_serving_fulltext text, branded_food_category text, data_source text, modified_date text, available_date text, market_country text, discontinued_date text);
copy branded_food(fdc_id, brand_owner, gtin_upc, ingredients, serving_size, serving_size_unit, househonld_serving_fulltext, branded_food_category, data_source, modified_date, available_date, market_country, discontinued_date)
from '/var/lib/postgresql/branded_food.csv' delimiter ',' csv header;

create table food_nutrient(id_prim serial primary key, id text, fdc_id text, nutrient_id text, amount text, data_points text, derivation_id text, min text, max text, median text, footnote text, min_year_acquired text);
copy food_nutrient(id, fdc_id, nutrient_id, amount, data_points, derivation_id, min, max, median, footnote, min_year_acquired)
from '/var/lib/postgresql/food_nutrient.csv' delimiter ',' csv header;

create table nutrient(id_prim serial primary key, id text, name text, unit_name text, nutrient_nbr text, rank text);
copy nutrient(id, name, unit_name, nutrient_nbr, rank)
from '/var/lib/postgresql/nutrient.csv' delimiter ',' csv header;