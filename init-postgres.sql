CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    balance NUMERIC(8,2) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);