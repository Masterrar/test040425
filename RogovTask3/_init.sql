-- База создавалась в DBeaver. Сначала создаем бд, потом подключаемся к ней и делаем остальные запросы
CREATE DATABASE "RogovTask3";

CREATE TABLE Dates (
    Id BIGINT,
    Dt DATE
);

INSERT INTO Dates (Id, Dt) VALUES
(1, '2021-01-01'),
(1, '2021-01-10'),
(1, '2021-01-30'),
(2, '2021-01-15'),
(2, '2021-01-30');