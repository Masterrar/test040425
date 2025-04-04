-- База создавалась в DBeaver. Сначала создаем бд, потом подключаемся к ней и делаем остальные запросы
CREATE DATABASE "RogovTask2";

CREATE TABLE Clients (
    Id BIGINT PRIMARY KEY,
    ClientName VARCHAR(200) NOT NULL
);

CREATE TABLE ClientContacts (
    Id BIGINT PRIMARY KEY,
    ClientId BIGINT,
    ContactType VARCHAR(255),
    ContactValue VARCHAR(255),
    FOREIGN KEY (ClientId) REFERENCES Clients(Id)
);

INSERT INTO Clients (Id, ClientName) VALUES
(1, 'Client 1'),
(2, 'Client 2'),
(3, 'Client 3');

INSERT INTO ClientContacts (Id, ClientId, ContactType, ContactValue) VALUES
(1, 1, 'Email', 'client1@example.com'),
(2, 1, 'Phone', '+7 903-123-4567'),
(3, 2, 'Email', 'client2@example.com'),
(4, 2, 'Phone', '+7 903-234-5678'),
(5, 2, 'Telegram', '@client2_telegram'),
(6, 3, 'Email', 'client3@example.com'),
(7, 3, 'Phone', '+7 903-345-6789');