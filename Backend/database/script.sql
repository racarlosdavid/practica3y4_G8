DROP DATABASE IF EXISTS ayd1;
CREATE DATABASE IF NOT EXISTS ayd1;
USE ayd1;

CREATE TABLE saludo (
    id int NOT NULL AUTO_INCREMENT,
    texto varchar(255),
    PRIMARY KEY (id)
);

INSERT INTO saludo (texto) VALUES ('Hola mundo');
INSERT INTO saludo (texto) VALUES ('Que pasa');
INSERT INTO saludo (texto) VALUES ('Helo world');
