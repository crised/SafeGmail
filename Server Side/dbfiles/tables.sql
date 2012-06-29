create table User (
userId varchar(256) PRIMARY KEY,
pubKey varchar(2048) NOT NULL,
prvKey varchar(2048) NOT NULL
)


create table Message (
messageId varchar(256) PRIMARY KEY,
prvKey varchar(2048) NOT NULL,
messageKey varchar(2048) NOT NULL,
question varchar(1024) NOT NULL,
answer varchar(1024) NOT NULL
)