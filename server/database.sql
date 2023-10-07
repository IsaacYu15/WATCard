CREATE DATABASE WATCARD;

CREATE TABLE transactions(    
    transaction_id SERIAL PRIMARY KEY,
    date VARCHAR(255),
    amount VARCHAR(255)

);