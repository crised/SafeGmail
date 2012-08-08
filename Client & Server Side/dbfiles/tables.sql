create table User (
userId varchar(256) PRIMARY KEY,
pubKey varchar(2048) NOT NULL,
prvKey varchar(2048) NOT NULL
)


create table Message (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
messageId varchar(256) NOT NULL,
prvKey varchar(2048) NOT NULL,
messageKey varchar(2048) NOT NULL,
question varchar(1024) NOT NULL,
answer varchar(1024) NOT NULL,
expired tinyint NULL DEFAULT FALSE,
timeToLive timestamp NULL
)

create table MessageRevivalRequest (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
requestorName varchar(256) NOT NULL,
requestorEmail varchar(256) NOT NULL,
senderEmail varchar(256) NOT NULL,
requestReason varchar(1024) NOT NULL,
messageId varchar(256) NOT NULL,
requestedOn timestamp NOT NULL
)