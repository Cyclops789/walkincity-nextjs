/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: continents
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `continents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `continent_name` varchar(50) NOT NULL,
  `continent_icon` varchar(50) NOT NULL,
  `continent_color` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: countries
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `countries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `short_name` varchar(50) NOT NULL,
  `long_name` varchar(100) NOT NULL,
  `border_color` varchar(255) NOT NULL,
  `continent` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `long_name` (`long_name`),
  UNIQUE KEY `short_name` (`short_name`)
) ENGINE = InnoDB AUTO_INCREMENT = 30 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: icons
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `icons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `old` varchar(255) NOT NULL,
  `new` varchar(255) NOT NULL,
  `created_on` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: migrations
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 24 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: notifications
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `link` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: radios
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `radios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `created_on` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `url` (`url`)
) ENGINE = InnoDB AUTO_INCREMENT = 31 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: roles
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `permissions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`permissions`)),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: seeds
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `seeds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seed` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tokens
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `videoId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `role` int(11) NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT 'placeholder.png',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: videos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `videos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vid` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `place` varchar(255) NOT NULL,
  `weather` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `created_on` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `continent` varchar(255) NOT NULL,
  `seekTo` int(11) NOT NULL DEFAULT 1,
  `verified` tinyint(1) NOT NULL DEFAULT 0,
  `hide` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vid` (`vid`)
) ENGINE = InnoDB AUTO_INCREMENT = 124 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: videos_requests
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `videos_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vid` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `place` varchar(255) NOT NULL,
  `weather` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `seekTo` int(11) NOT NULL,
  `continent` varchar(255) NOT NULL,
  `by_email` varchar(255) NOT NULL,
  `action` varchar(10) DEFAULT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vid` (`vid`)
) ENGINE = InnoDB AUTO_INCREMENT = 14 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: continents
# ------------------------------------------------------------

INSERT INTO
  `continents` (
    `id`,
    `continent_name`,
    `continent_icon`,
    `continent_color`
  )
VALUES
  (1, 'Africa', 'africa', 'brown');
INSERT INTO
  `continents` (
    `id`,
    `continent_name`,
    `continent_icon`,
    `continent_color`
  )
VALUES
  (2, 'Asia', 'asia', 'yellow');
INSERT INTO
  `continents` (
    `id`,
    `continent_name`,
    `continent_icon`,
    `continent_color`
  )
VALUES
  (3, 'Europe', 'europe', 'green');
INSERT INTO
  `continents` (
    `id`,
    `continent_name`,
    `continent_icon`,
    `continent_color`
  )
VALUES
  (4, 'Americas', 'americas', 'blue');
INSERT INTO
  `continents` (
    `id`,
    `continent_name`,
    `continent_icon`,
    `continent_color`
  )
VALUES
  (6, 'Oceania', 'oceania', 'brown');
INSERT INTO
  `continents` (
    `id`,
    `continent_name`,
    `continent_icon`,
    `continent_color`
  )
VALUES
  (7, 'Antarctica', 'antarctica', 'grey');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: countries
# ------------------------------------------------------------

INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (1, 'FR', 'France', '#031935', 'Europe');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (2, 'US', 'United States', '#640a1a', 'Americas');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (3, 'ES', 'Spain', '#ebb019', 'Europe');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (4, 'CN', 'China', '#ec1818', 'Asia');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (5, 'IT', 'Italy', '#288e3c', 'Europe');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (6, 'GB', 'United Kingdom', 'blue', 'Europe');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (7, 'DE', 'Germany', 'black', 'Europe');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (8, 'MX', 'Mexico', 'green', 'Americas');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (9, 'TH', 'Thailand', 'red', 'Asia');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (10, 'TR', 'Turkey', 'red', 'Europe');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (11, 'AT', 'Austria', 'red', 'Europe');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (12, 'MY', 'Malaysia', 'blue', 'Asia');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (13, 'HK', 'Hong Kong', 'red', 'Asia');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (14, 'GR', 'Greece', 'blue', 'Europe');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (15, 'RU', 'Russia', 'red', 'Asia');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (16, 'JP', 'Japan', 'red', 'Asia');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (17, 'CA', 'Canada', 'red', 'Americas');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (18, 'SA', 'Saudi Arabia', 'green', 'Asia');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (19, 'PL', 'Poland', 'red', 'Europe');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (20, 'KR', 'South Korea', 'blue', 'Asia');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (21, 'NL', 'Netherlands', 'blue', 'Europe');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (22, 'HU', 'Hungary', 'green', 'Europe');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (23, 'AE', 'United Arab Emirates', 'black', 'Asia');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (24, 'IN', 'India', 'brown', 'Asia');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (25, 'HR', 'Croatia', 'blue', 'Europe');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (26, 'SG', 'Singapore', 'red', 'Asia');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (27, 'ID', 'Indonesia', 'red', 'Asia');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (28, 'CZ', 'Czech Republic', 'blue', 'Europe');
INSERT INTO
  `countries` (
    `id`,
    `short_name`,
    `long_name`,
    `border_color`,
    `continent`
  )
VALUES
  (29, 'MA', 'Morocco', 'red', 'Africa');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: icons
# ------------------------------------------------------------

INSERT INTO
  `icons` (`id`, `name`, `time`, `old`, `new`, `created_on`)
VALUES
  (
    1,
    'rain',
    'morning',
    'weather-rain-morning',
    'fa-solid fa-cloud-sun-rain',
    '2023-07-10 15:25:16.393135'
  );
INSERT INTO
  `icons` (`id`, `name`, `time`, `old`, `new`, `created_on`)
VALUES
  (
    2,
    'rain',
    'night',
    'weather-rain-night',
    'fa-solid fa-cloud-moon-rain',
    '2023-07-10 15:25:16.397577'
  );
INSERT INTO
  `icons` (`id`, `name`, `time`, `old`, `new`, `created_on`)
VALUES
  (
    3,
    'cloud',
    'morning',
    'weather-cloud-morning',
    'fa-solid fa-cloud',
    '2023-07-10 15:25:16.402166'
  );
INSERT INTO
  `icons` (`id`, `name`, `time`, `old`, `new`, `created_on`)
VALUES
  (
    4,
    'cloud',
    'night',
    'weather-cloud-night',
    'fa-solid fa-cloud',
    '2023-07-10 15:25:16.408602'
  );
INSERT INTO
  `icons` (`id`, `name`, `time`, `old`, `new`, `created_on`)
VALUES
  (
    5,
    'snow',
    'morning',
    'weather-snow-morning',
    'fa-regular fa-snowflake',
    '2023-07-10 15:25:16.415845'
  );
INSERT INTO
  `icons` (`id`, `name`, `time`, `old`, `new`, `created_on`)
VALUES
  (
    6,
    'snow',
    'night',
    'weather-snow-night',
    'fa-solid fa-cloud-meatball',
    '2023-07-10 15:25:16.423373'
  );
INSERT INTO
  `icons` (`id`, `name`, `time`, `old`, `new`, `created_on`)
VALUES
  (
    7,
    'normal',
    'morning',
    'weather-normal-morning',
    'fa-solid fa-sun',
    '2023-07-10 15:25:16.429579'
  );
INSERT INTO
  `icons` (`id`, `name`, `time`, `old`, `new`, `created_on`)
VALUES
  (
    8,
    'normal',
    'night',
    'weather-normal-night',
    'fa-solid fa-moon',
    '2023-07-10 15:25:16.433944'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: migrations
# ------------------------------------------------------------

INSERT INTO
  `migrations` (`id`, `migration`)
VALUES
  (1, 'create_continents_table');
INSERT INTO
  `migrations` (`id`, `migration`)
VALUES
  (2, 'create_countries_table');
INSERT INTO
  `migrations` (`id`, `migration`)
VALUES
  (3, 'create_icons_table');
INSERT INTO
  `migrations` (`id`, `migration`)
VALUES
  (4, 'create_radios_table');
INSERT INTO
  `migrations` (`id`, `migration`)
VALUES
  (5, 'create_roles_table');
INSERT INTO
  `migrations` (`id`, `migration`)
VALUES
  (6, 'create_users_table');
INSERT INTO
  `migrations` (`id`, `migration`)
VALUES
  (7, 'create_videos_requests_table');
INSERT INTO
  `migrations` (`id`, `migration`)
VALUES
  (10, 'create_videos_table');
INSERT INTO
  `migrations` (`id`, `migration`)
VALUES
  (12, 'update_videos_requests_add_action');
INSERT INTO
  `migrations` (`id`, `migration`)
VALUES
  (17, 'create_tokens_table');
INSERT INTO
  `migrations` (`id`, `migration`)
VALUES
  (18, 'update_videos_requests_add_verified');
INSERT INTO
  `migrations` (`id`, `migration`)
VALUES
  (19, 'update_tokens_add_request_id');
INSERT INTO
  `migrations` (`id`, `migration`)
VALUES
  (20, 'update_videos_add_hide');
INSERT INTO
  `migrations` (`id`, `migration`)
VALUES
  (21, 'create_notifications_table');
INSERT INTO
  `migrations` (`id`, `migration`)
VALUES
  (22, 'update_notifications_add_link');
INSERT INTO
  `migrations` (`id`, `migration`)
VALUES
  (23, 'update_users_add_image');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: notifications
# ------------------------------------------------------------

INSERT INTO
  `notifications` (
    `id`,
    `user_id`,
    `message`,
    `is_read`,
    `created_at`,
    `updated_at`,
    `link`
  )
VALUES
  (
    1,
    2,
    'New video request has been added.',
    1,
    '2024-03-07 15:48:52',
    '2024-03-08 15:04:43',
    '/requests'
  );
INSERT INTO
  `notifications` (
    `id`,
    `user_id`,
    `message`,
    `is_read`,
    `created_at`,
    `updated_at`,
    `link`
  )
VALUES
  (
    2,
    2,
    'New video request has been added.',
    1,
    '2024-03-07 15:48:52',
    '2024-03-07 23:01:17',
    '/requests'
  );
INSERT INTO
  `notifications` (
    `id`,
    `user_id`,
    `message`,
    `is_read`,
    `created_at`,
    `updated_at`,
    `link`
  )
VALUES
  (
    3,
    2,
    'New video request has been added.',
    1,
    '2024-03-07 15:48:52',
    '2024-03-07 23:01:17',
    '/requests'
  );
INSERT INTO
  `notifications` (
    `id`,
    `user_id`,
    `message`,
    `is_read`,
    `created_at`,
    `updated_at`,
    `link`
  )
VALUES
  (
    4,
    2,
    'New video request has been added.',
    1,
    '2024-03-07 15:48:52',
    '2024-03-08 15:04:43',
    '/requests'
  );
INSERT INTO
  `notifications` (
    `id`,
    `user_id`,
    `message`,
    `is_read`,
    `created_at`,
    `updated_at`,
    `link`
  )
VALUES
  (
    5,
    2,
    'New video request has been added.',
    1,
    '2024-03-07 15:48:52',
    '2024-03-07 23:01:17',
    '/requests'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: radios
# ------------------------------------------------------------

INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    2,
    '0_RADIO_NO_NAME',
    'https://air5.amgradio.ru/RuWave48',
    '2023-07-10 15:20:33.616536'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    3,
    '1_RADIO_NO_NAME',
    'https://play.global.audio/nrj128',
    '2023-07-10 15:20:33.624729'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    4,
    '2_RADIO_NO_NAME',
    'https://radiosummernight.stream.laut.fm/radiosummernight?t302=2023-03-10_21-14-37&uuid=0e1bb9b7-2653-4b6c-99cf-95a2c5895f9b',
    '2023-07-10 15:20:33.629985'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    5,
    '3_RADIO_NO_NAME',
    'https://a1-it.newradio.it/stream',
    '2023-07-10 15:20:33.636911'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    6,
    '4_RADIO_NO_NAME',
    'https://srv1.streamradiowy.eu/radio90',
    '2023-07-10 15:20:33.645579'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    7,
    '5_RADIO_NO_NAME',
    'https://air4.amgradio.ru/HypeFM',
    '2023-07-10 15:20:33.651104'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    8,
    '6_RADIO_NO_NAME',
    'https://air4.amgradio.ru/Retro',
    '2023-07-10 15:20:33.658611'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    9,
    '7_RADIO_NO_NAME',
    'https://air7.amgradio.ru/Cafe',
    '2023-07-10 15:20:33.663161'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    10,
    '8_RADIO_NO_NAME',
    'https://stream.lolliradio.net/lolli_italia.mp3',
    '2023-07-10 15:20:33.667515'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    11,
    '9_RADIO_NO_NAME',
    'https://play.global.audio/radio1128',
    '2023-07-10 15:20:33.674116'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    12,
    '10_RADIO_NO_NAME',
    'https://air4.amgradio.ru/RemixFM',
    '2023-07-10 15:20:33.680425'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    13,
    '11_RADIO_NO_NAME',
    'https://mp3.amgradio.ru/RusRock',
    '2023-07-10 15:20:33.684658'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    14,
    '12_RADIO_NO_NAME',
    'https://ice01.fluidstream.net/birikina',
    '2023-07-10 15:20:33.691425'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    15,
    '13_RADIO_NO_NAME',
    'https://friesenradio.stream.laut.fm/friesenradio?t302=2023-03-10_21-15-37&uuid=50ab012c-e413-4277-a15b-a95fcd0533b6',
    '2023-07-10 15:20:33.695593'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    16,
    '14_RADIO_NO_NAME',
    'https://live.antenne.at/ak',
    '2023-07-10 15:20:33.700046'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    17,
    '15_RADIO_NO_NAME',
    'https://s7.yesstreaming.net:8040/stream',
    '2023-07-10 15:20:33.704403'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    18,
    '16_RADIO_NO_NAME',
    'https://radiosummernight.stream.laut.fm/radiosummernight?t302=2023-03-10_21-28-27&uuid=eb63ea3e-c284-4ca7-aec5-498dab62e4a8',
    '2023-07-10 15:20:33.708668'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    19,
    '17_RADIO_NO_NAME',
    'https://s2.stationplaylist.com:7094/listen.aac',
    '2023-07-10 15:20:33.713800'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    20,
    '18_RADIO_NO_NAME',
    'https://play.global.audio/nrjhi.aac',
    '2023-07-10 15:20:33.717887'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    21,
    '19_RADIO_NO_NAME',
    'https://1000hamburg.stream.laut.fm/1000hamburg?t302=2023-03-12_11-25-53&uuid=9eb5dcf6-862e-4f96-aef2-7d45eccef030',
    '2023-07-10 15:20:33.721827'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    22,
    '20_RADIO_NO_NAME',
    'https://nr12.newradio.it:8612/stream',
    '2023-07-10 15:20:33.726180'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    23,
    '21_RADIO_NO_NAME',
    'https://srv.giannivps.gq:8002/light_radio_aacp',
    '2023-07-10 15:20:33.730289'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    24,
    '22_RADIO_NO_NAME',
    'https://nl1.streamhosting.ch/lounge128.mp3',
    '2023-07-10 15:20:33.734637'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    25,
    '23_RADIO_NO_NAME',
    'https://live.hostingbudget.nl:4490/stream',
    '2023-07-10 15:20:33.738840'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    26,
    '24_RADIO_NO_NAME',
    'https://c2409ic1.fast-serv.com/stream',
    '2023-07-10 15:20:33.743731'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    27,
    '25_RADIO_NO_NAME',
    'https://srv.webradiomanager.fr:2140/stream',
    '2023-07-10 15:20:33.747823'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    28,
    '26_RADIO_NO_NAME',
    'https://ec2.yesstreaming.net:2560/stream',
    '2023-07-10 15:20:33.752169'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    29,
    '27_RADIO_NO_NAME',
    'https://srv.webradiomanager.fr:1740/stream',
    '2023-07-10 15:20:33.756442'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    30,
    '28_RADIO_NO_NAME',
    'https://radio.lacapanna.eu:8000/radio.mp3',
    '2023-07-10 15:20:33.760676'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: roles
# ------------------------------------------------------------

INSERT INTO
  `roles` (`id`, `name`, `permissions`)
VALUES
  (
    1,
    'Super Admin',
    '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]'
  );
INSERT INTO
  `roles` (`id`, `name`, `permissions`)
VALUES
  (2, 'Admin', '[1,2,3,4,5,10,11,12,13,18]');
INSERT INTO
  `roles` (`id`, `name`, `permissions`)
VALUES
  (3, 'Videos verifier', '[1,5,18]');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: seeds
# ------------------------------------------------------------

INSERT INTO
  `seeds` (`id`, `seed`)
VALUES
  (1, 'seed_continents');
INSERT INTO
  `seeds` (`id`, `seed`)
VALUES
  (2, 'seed_countries');
INSERT INTO
  `seeds` (`id`, `seed`)
VALUES
  (3, 'seed_icons');
INSERT INTO
  `seeds` (`id`, `seed`)
VALUES
  (4, 'seed_radios');
INSERT INTO
  `seeds` (`id`, `seed`)
VALUES
  (5, 'seed_roles');
INSERT INTO
  `seeds` (`id`, `seed`)
VALUES
  (6, 'seed_users');
INSERT INTO
  `seeds` (`id`, `seed`)
VALUES
  (7, 'seed_videos');
INSERT INTO
  `seeds` (`id`, `seed`)
VALUES
  (8, 'seed_continents');
INSERT INTO
  `seeds` (`id`, `seed`)
VALUES
  (9, 'seed_countries');
INSERT INTO
  `seeds` (`id`, `seed`)
VALUES
  (10, 'seed_continents');
INSERT INTO
  `seeds` (`id`, `seed`)
VALUES
  (11, 'seed_countries');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tokens
# ------------------------------------------------------------

INSERT INTO
  `tokens` (`id`, `token`, `created_at`, `videoId`)
VALUES
  (
    1,
    '3Y8uyTcoZhCSIyl3oxwJCZs1Mc0tSr34',
    '2024-02-26 16:03:10',
    4
  );
INSERT INTO
  `tokens` (`id`, `token`, `created_at`, `videoId`)
VALUES
  (
    2,
    '4AVzazraKj7FppLVctGYnTqlDrKoTbot',
    '2024-02-26 16:19:58',
    5
  );
INSERT INTO
  `tokens` (`id`, `token`, `created_at`, `videoId`)
VALUES
  (
    3,
    'C7KP7SHCKBCGwpIedVTC3gJCDPxQE7iY',
    '2024-03-03 16:19:21',
    11
  );
INSERT INTO
  `tokens` (`id`, `token`, `created_at`, `videoId`)
VALUES
  (
    4,
    'qI9kbFpuIpCAG5aI51T5ALq07fn2oNDY',
    '2024-03-03 16:21:20',
    12
  );
INSERT INTO
  `tokens` (`id`, `token`, `created_at`, `videoId`)
VALUES
  (
    5,
    'a1FkNzzLYk8o4EilgUaYvNGZfPY55gFt',
    '2024-03-07 15:48:18',
    13
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users
# ------------------------------------------------------------

INSERT INTO
  `users` (
    `id`,
    `username`,
    `email`,
    `password`,
    `created_at`,
    `role`,
    `image`
  )
VALUES
  (
    2,
    'hamza',
    'hamza@cyyc.lol',
    'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
    '2024-01-29 11:53:06',
    1,
    'upload_1ceb2ec5d731b6cb5932189f62c06b7c.webp'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: videos
# ------------------------------------------------------------

INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    3,
    'LPgZ4lKfBPw',
    'France',
    'Paris',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    4,
    'JlCRKE2iQU4',
    'France',
    'Paris',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    5,
    'GmQ5wdpsbnI',
    'France',
    'Paris',
    'weather-rain-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    6,
    'GjiVa5MmzuI',
    'France',
    'Paris',
    'weather-rain-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    7,
    'KJbHcb5ZI_4',
    'United States',
    'New York City',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Americas',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    8,
    'yKvu63qXSp8',
    'United States',
    'New York City',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Americas',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    9,
    'eZe4Q_58UTU',
    'United States',
    'New York City',
    'weather-rain-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Americas',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    10,
    'BOa0zQBRs_M',
    'United States',
    'New York City',
    'weather-rain-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Americas',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    11,
    'TXH5eGF2COk',
    'Spain',
    'Madrid',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    12,
    'epDp5YVYpNc',
    'Spain',
    'Barcelona',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    13,
    'KLkSW2JNhjY',
    'Spain',
    'Barcelona',
    'weather-rain-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    14,
    'TScr2bIJVv0',
    'Spain',
    'Madrid',
    'weather-rain-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    15,
    'GjVuQ7pYJ-I',
    'China',
    'Hangzhou',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    16,
    'egSBCwmg7kk',
    'China',
    'ChunXi Road Chengdu',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    17,
    'Z6mESlHv2WM',
    'China',
    'Century',
    'weather-rain-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    18,
    'MudeUxLjqEY',
    'China',
    'Xiangtan',
    'weather-rain-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    19,
    'EsFheWkimsU',
    'Italy',
    'Rome',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    20,
    'ZEFUaNTUa6g',
    'Italy',
    'Rome',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    21,
    'Ypq4N3EldBM',
    'Italy',
    'Naples',
    'weather-rain-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    22,
    'c3gGMBBhjl0',
    'Italy',
    'Venice',
    'weather-rain-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    23,
    '1dYs8ByEqHY',
    'United Kingdom',
    'England',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    24,
    'aDNB-xxt50o',
    'United Kingdom',
    'Liverpool',
    'weather-normal-night',
    'walk',
    '2024-02-25 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    25,
    'H43glfbQEh4',
    'United Kingdom',
    'London',
    'weather-rain-morning',
    'walk',
    '2024-02-25 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    26,
    '1q9tRZhxZXc',
    'United Kingdom',
    'London',
    'weather-rain-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    27,
    '-l9E7OAexQM',
    'Germany',
    'Berlin',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    28,
    'Nb7A4GCwms0',
    'Germany',
    'Frankfurt',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    29,
    'faNd76CW824',
    'Germany',
    'Berlin',
    'weather-rain-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    30,
    'uj63OpMTzZI',
    'Mexico',
    'Mexico City',
    'weather-cloud-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Americas',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    31,
    'Y81PNtTBWe4',
    'Mexico',
    'Mexico City',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Americas',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    32,
    'jpeFwe-FXII',
    'Mexico',
    'Mexico City',
    'weather-rain-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Americas',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    33,
    '47UstD1XxAI',
    'Mexico',
    'Mexico City',
    'weather-rain-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Americas',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    34,
    'ADmgOq9O2tY',
    'Thailand',
    'Bangkok',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    35,
    'cT0TstuOzgA',
    'Thailand',
    'Bangkok',
    'weather-normal-morning',
    'walk',
    '2024-02-25 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    36,
    'p9Mz_PkscAg',
    'Thailand',
    'Bangkok',
    'weather-rain-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    37,
    'MDjuOz2gjRg',
    'Thailand',
    'Bangkok',
    'weather-rain-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    38,
    'k8IqqhFebu8',
    'Turkey',
    'Istanbul',
    'weather-rain-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    39,
    'fQFrt5QqGNE',
    'Turkey',
    'Istanbul, Istiklal Caddesi',
    'weather-rain-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    40,
    'NCgh8HalGro',
    'Turkey',
    'Istanbul',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    41,
    'P5oYtWDb8FM',
    'Austria',
    'Vienna',
    'weather-cloud-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    42,
    'hH7hOWp-Jno',
    'Austria',
    'Vienna',
    'weather-cloud-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    43,
    'U0dGOE6XFYg',
    'Austria',
    'Vienna',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    44,
    'PZ5SQbXBwhg',
    'Austria',
    'Vienna',
    'weather-rain-morning',
    'walk',
    '2024-02-25 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    45,
    'O81iI98SAiw',
    'Malaysia',
    'Kuala Lumpur',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    46,
    'RGE3l6Ed5j8',
    'Malaysia',
    'Kuala Lumpur',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    47,
    'mWJJCX_sVas',
    'Malaysia',
    'Kuala Lumpur',
    'weather-rain-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    48,
    's4GHrWyvuw8',
    'Malaysia',
    'Kuala Lumpur',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    49,
    'vXo5X8bJEcY',
    'Hong Kong',
    'Kowloon Kowloon',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    50,
    'QkZj9DTxbHU',
    'Hong Kong',
    'Causeway Bay',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    51,
    'epJhBu4UvJw',
    'Hong Kong',
    'Tsim Sha Tsui',
    'weather-rain-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    52,
    'H50az3Aq7x4',
    'Hong Kong',
    'Causeway Bay',
    'weather-rain-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    53,
    'QVh0TuWyEYc',
    'Greece',
    'Athens',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    54,
    'XnQSWZdLcEA',
    'Greece',
    'Athens',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    55,
    'CsNJ88wPxjU',
    'Greece',
    'Athens',
    'weather-rain-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    56,
    '6BT7Qm6Af2Q',
    'Greece',
    'Athens',
    'weather-rain-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    57,
    'KBeCMiUPuic',
    'Russia',
    'Saint Petersburg',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    58,
    'c0KaSjQF1YQ',
    'Russia',
    'Moscow',
    'weather-normal-night',
    'walk',
    '2024-02-25 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    59,
    'CpBMDMmKYbY',
    'Russia',
    'Moscow',
    'weather-rain-morning',
    'walk',
    '2024-02-25 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    60,
    'e5HZevxkQbs',
    'Russia',
    'Moscow',
    'weather-snow-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    61,
    'AJYW9uVFock',
    'Japan',
    'Nagoya',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    62,
    'b3yQXprMj3s',
    'Japan',
    'Shibuya',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    63,
    'ixi9r2X5AbI',
    'Japan',
    'Tokyo',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    64,
    'dGy_6qyyY7c',
    'Japan',
    'Tokyo',
    'weather-rain-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    65,
    'lh8dNmneVyY',
    'Canada',
    'Vancouver',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Americas',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    66,
    'FopDhDkHd30',
    'Canada',
    'Vancouver',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Americas',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    67,
    'diNGaDsBt5c',
    'Canada',
    'East Vancouver',
    'weather-snow-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Americas',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    68,
    'UNTHFrHgw5E',
    'Canada',
    'Vancouver',
    'weather-rain-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Americas',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    69,
    'qbpZE8HvPGo',
    'Saudi Arabia',
    'Jeddah',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    70,
    'GxIRQJqM46o',
    'Saudi Arabia',
    'Riyadh',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    71,
    'WS0-aTyFVk4',
    'Saudi Arabia',
    'Riyadh',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    72,
    '4upl609gksM',
    'Saudi Arabia',
    'Riyadh',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    73,
    'PjSeEGZVq34',
    'Poland',
    'Krakow',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    74,
    '2hXuUDnwyAI',
    'Poland',
    'Krakow',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    75,
    '17VKpXuIYag',
    'Poland',
    'Warsaw',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    76,
    'YIQ4Ap9aUMo',
    'Poland',
    'Warsaw',
    'weather-rain-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    77,
    '-GvY4qZh1gI',
    'South korea',
    'Seoul',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    78,
    'tdfWkXJPBj0',
    'South korea',
    'Seoul',
    'weather-snow-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    79,
    'dP9JOa75qN0',
    'South korea',
    'Seoul',
    'weather-cloud-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    80,
    'sBtYWK817-0',
    'South korea',
    'Seoul',
    'weather-rain-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    81,
    '3laHW-dc_ac',
    'Netherlands',
    'Amsterdam',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    82,
    '2GSbgmzNxPA',
    'Netherlands',
    'Rotterdam',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    83,
    'kQe1ywsZ6xk',
    'Netherlands',
    'Volendam',
    'weather-rain-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    84,
    'GLYmvFTn3R0',
    'Netherlands',
    'Thunderstorm',
    'weather-rain-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    85,
    'W3lQXP1TBjg',
    'Hungary',
    'Budapest',
    'weather-cloud-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    86,
    'pdpSzAaiIuQ',
    'Hungary',
    'Budapest',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    87,
    'cgPX_rBF-wo',
    'Hungary',
    'Budapest',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    88,
    'CQT1qcAax2A',
    'Hungary',
    'Budapest',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    89,
    'O8k_1GNV08M',
    'Hungary',
    'Budapest',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    90,
    'NG13Z3RobEQ',
    'United Arab Emirates',
    'Dubai',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    91,
    'J0pOmWJdNos',
    'United Arab Emirates',
    'Dubai',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    92,
    'cLiWIS1McA4',
    'United Arab Emirates',
    'Dubai',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    93,
    'vi6JlY8U9rI',
    'India',
    'Mumbai',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    94,
    'FQINAGuleoU',
    'India',
    'Mumbai',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    95,
    'ldLB1vgXXS4',
    'India',
    'New Delhi',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    96,
    'DGDqwjQDwUQ',
    'Croatia',
    'Dubrovnik',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    97,
    '2AMc2YweFnc',
    'Croatia',
    'Split',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    98,
    'Upzi_oNflwE',
    'Croatia',
    'Zagreb',
    'weather-rain-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    99,
    '88XFGB1dB1I',
    'Croatia',
    'Split',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    100,
    'aUJl46bEWYo',
    'Singapore',
    'Chinatown',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    101,
    'RCXkT-DtYk8',
    'Singapore',
    'Marina Bay',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    102,
    'eYqPXjUAgRA',
    'Singapore',
    'Orchard Road',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    103,
    'KPx_53cFwfg',
    'Singapore',
    'Chinatown',
    'weather-normal-night',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    104,
    '5p5FoQR8wTM',
    'Indonesia',
    'Ubud, Bali',
    'weather-cloud-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    105,
    'Pl0NT3WZ8Lw',
    'Indonesia',
    'Jakarta',
    'weather-cloud-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    106,
    'jZ6mSUMNvXY',
    'Indonesia',
    'Pangandaran',
    'weather-rain-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    107,
    'B0mxEidqQN4',
    'Indonesia',
    'Bajarsari',
    'weather-rain-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Asia',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    108,
    'oCV8bbM9hk0',
    'Czech Republic',
    'Prague',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    109,
    'BGRhCDKz6lQ',
    'Czech Republic',
    'Brno',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    110,
    'SajRNOAIj1k',
    'Czech Republic',
    'Prague',
    'weather-snow-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    111,
    '_grR16CVnV8',
    'Czech Republic',
    'Prague',
    'weather-rain-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Europe',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    112,
    'OsnRSr7LxII',
    'Morocco',
    'Marrakech',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Africa',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    113,
    'hNGzHOHjbis',
    'Morocco',
    'Chefchaouen',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Africa',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    114,
    'RNgqN4ogTjo',
    'Morocco',
    'Rabat',
    'weather-normal-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Africa',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    115,
    'FUYeQ4Ypsdc',
    'Morocco',
    'Casablanca',
    'weather-rain-morning',
    'walk',
    '2024-02-28 15:54:50.485823',
    'Africa',
    1,
    1,
    0
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    122,
    'd0h4QPqAwss',
    'France',
    'Test',
    'weather-normal-morning',
    'walk',
    '2024-02-25 14:57:34.629220',
    'Europe',
    2,
    0,
    1
  );
INSERT INTO
  `videos` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `continent`,
    `seekTo`,
    `verified`,
    `hide`
  )
VALUES
  (
    123,
    'ldqkdnkjkjb3',
    'France',
    'Test',
    'weather-normal-morning',
    'walk',
    '2024-02-25 14:58:41.376874',
    'Europe',
    2,
    0,
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: videos_requests
# ------------------------------------------------------------

INSERT INTO
  `videos_requests` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `seekTo`,
    `continent`,
    `by_email`,
    `action`,
    `verified`
  )
VALUES
  (
    5,
    'd0h4QPqAwss',
    'France',
    'Test',
    'weather-normal-morning',
    'walk',
    '2024-03-03 16:19:58',
    2,
    'Europe',
    'hamzajarane8@gmail.com',
    'accept',
    1
  );
INSERT INTO
  `videos_requests` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `seekTo`,
    `continent`,
    `by_email`,
    `action`,
    `verified`
  )
VALUES
  (
    6,
    'd0h4QPqAwsss',
    'France',
    'Test',
    'weather-normal-morning',
    'walk',
    '2024-03-03 16:19:58',
    2,
    'Europe',
    'hamzajarane8@gmail.com',
    'accept',
    1
  );
INSERT INTO
  `videos_requests` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `seekTo`,
    `continent`,
    `by_email`,
    `action`,
    `verified`
  )
VALUES
  (
    7,
    'd0h4QPqAwssss',
    'France',
    'Test',
    'weather-normal-morning',
    'walk',
    '2024-03-03 16:19:58',
    2,
    'Europe',
    'hamzajarane8@gmail.com',
    'accept',
    1
  );
INSERT INTO
  `videos_requests` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `seekTo`,
    `continent`,
    `by_email`,
    `action`,
    `verified`
  )
VALUES
  (
    8,
    'd0h4QPqAwsssss',
    'France',
    'Test',
    'weather-normal-morning',
    'walk',
    '2024-03-03 16:19:58',
    2,
    'Europe',
    'hamzajarane8@gmail.com',
    'accept',
    1
  );
INSERT INTO
  `videos_requests` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `seekTo`,
    `continent`,
    `by_email`,
    `action`,
    `verified`
  )
VALUES
  (
    9,
    'd0h4QPqAwsssssss',
    'France',
    'Test',
    'weather-normal-morning',
    'walk',
    '2024-03-03 16:19:58',
    2,
    'Europe',
    'hamzajarane8@gmail.com',
    'accept',
    1
  );
INSERT INTO
  `videos_requests` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `seekTo`,
    `continent`,
    `by_email`,
    `action`,
    `verified`
  )
VALUES
  (
    10,
    'd0h4QPqAwsssssssss',
    'France',
    'Test',
    'weather-normal-morning',
    'walk',
    '2024-03-03 16:19:58',
    2,
    'Europe',
    'hamzajarane8@gmail.com',
    'accept',
    1
  );
INSERT INTO
  `videos_requests` (
    `id`,
    `vid`,
    `country`,
    `place`,
    `weather`,
    `type`,
    `created_on`,
    `seekTo`,
    `continent`,
    `by_email`,
    `action`,
    `verified`
  )
VALUES
  (
    13,
    '1Z5x-z4Sn4A',
    'United States',
    'sss',
    'weather-normal-morning',
    'walk',
    '2024-03-07 15:48:18',
    1,
    'Americas',
    'hamzajarane8@gmail.com',
    NULL,
    1
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
