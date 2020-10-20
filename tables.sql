CREATE TABLE store_towns(
    strings varchar not null primary key, 
    towns varchar not null
);

CREATE TABLE reg_numbers(
    reg_num text not null,
    reg_strings varchar,
    FOREIGN KEY(reg_strings) REFERENCES store_towns(strings)
);

INSERT INTO store_towns(towns, strings) VALUES ('Cape Town', 'CA');
INSERT INTO store_towns(towns, strings) VALUES ('Bellville', 'CY');
INSERT INTO store_towns(towns, strings) VALUES ('Paarl', 'CJ');

INSERT INTO store_towns(towns, strings) VALUES ('Cape Town', 'CA');
