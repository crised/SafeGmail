alter table Message drop PRIMARY KEY
alter table Message add column id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT
alter table Message add column senderMail varchar(256) NOT NULL
alter table Message add column expired tinyint NULL DEFAULT FALSE
alter table Message add column timeToLive timestamp NULL