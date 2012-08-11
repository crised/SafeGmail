alter table Message drop PRIMARY KEY
alter table Message add column id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT
alter table Message add column senderMail varchar(256) NOT NULL
alter table Message add column expired tinyint NULL DEFAULT FALSE
alter table Message add column timeToLive timestamp NULL

alter table Message drop senderMail;

alter table Message modify timeToLive timestamp After id;
alter table Message add column toMail varchar(256) NOT NULL;
alter table Message add column fromMail varchar(256) NOT NULL;
alter table Message modify id int(10) unsigned  AUTO_INCREMENT AFTER messageId;
alter table Message modify messageId varchar(256) AFTER Id;
 
alter table Message modify fromMail varchar(256) AFTER messageKey;
alter table Message modify toMail varchar(256) AFTER fromMail;
