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
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

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
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

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
  PRIMARY KEY (`id`),
  UNIQUE KEY `vid` (`vid`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

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
  (8, 'create_videos_table');

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
    '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]'
  );
INSERT INTO
  `roles` (`id`, `name`, `permissions`)
VALUES
  (2, 'Admin', '[1,2,3,4,5,10,11,12,13]');
INSERT INTO
  `roles` (`id`, `name`, `permissions`)
VALUES
  (3, 'Videos verifier', '[1,5]');

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
    `role`
  )
VALUES
  (
    2,
    'hamza',
    'hamza@cyyc.lol',
    'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
    '2024-01-29 11:53:06',
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: videos_requests
# ------------------------------------------------------------


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
