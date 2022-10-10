CREATE TABLE IF NOT EXISTS person
(
    id      int generated always as identity,
    name    varchar(20) not null,
    surname varchar(20) not null
);