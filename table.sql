CREATE TABLE store_towns(
    id serial not null primary key,
    strings varchar not null, 
    towns varchar not null
);

CREATE TABLE reg_numbers(
    reg_num text not null,
    reg_strings int,
    FOREIGN KEY(reg_strings) REFERENCES store_towns(id)
);

INSERT INTO store_towns(towns, strings) VALUES ('Cape Town', 'CA');
INSERT INTO store_towns(towns, strings) VALUES ('Bellville', 'CY');
INSERT INTO store_towns(towns, strings) VALUES ('Paarl', 'CJ');

-- INSERT INTO store_towns(towns, strings) VALUES ('Cape Town', 'CA');

-- INSERT INTO reg_numbers(reg_num, strings) VALUES ('CA 12344', 'CA');