CREATE TABLE `user_info` (
  `phone_number` bigint(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `nickname` varchar(255) NOT NULL DEFAULT '',
  `avatar` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `role_id` int(11) DEFAULT '6',
  PRIMARY KEY (`phone_number`) USING BTREE,
  KEY `idx_userinfo_1` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

