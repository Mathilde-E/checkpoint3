CREATE TABLE `users` (
`id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
`firstname` char(255) NOT NULL,
`lastname` char(255) NOT NULL,
`email` char(250) NOT NULL,
`password` char(255) NOT NULL,
`token` char(255)
);

CREATE TABLE `categories` (
`id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
`name` char(255) NOT NULL
);

CREATE TABLE `content` (
`id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
`category_id` int NOT NULL,
`text` text,
`image` text,
`video` text,
`link` text
); 

ALTER TABLE `content` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
