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
  `name` varchar(255) NOT NULL,
  `permissions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`permissions`)),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

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
  PRIMARY KEY (`id`),
  UNIQUE KEY `vid` (`vid`)
) ENGINE = InnoDB AUTO_INCREMENT = 140 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

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
    '2023-07-10 16:25:16.393135'
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
    '2023-07-10 16:25:16.397577'
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
    '2023-07-10 16:25:16.402166'
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
    '2023-07-10 16:25:16.408602'
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
    '2023-07-10 16:25:16.415845'
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
    '2023-07-10 16:25:16.423373'
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
    '2023-07-10 16:25:16.429579'
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
    '2023-07-10 16:25:16.433944'
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
    '2023-07-10 16:20:33.616536'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    3,
    '1_RADIO_NO_NAME',
    'https://play.global.audio/nrj128',
    '2023-07-10 16:20:33.624729'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    4,
    '2_RADIO_NO_NAME',
    'https://radiosummernight.stream.laut.fm/radiosummernight?t302=2023-03-10_21-14-37&uuid=0e1bb9b7-2653-4b6c-99cf-95a2c5895f9b',
    '2023-07-10 16:20:33.629985'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    5,
    '3_RADIO_NO_NAME',
    'https://a1-it.newradio.it/stream',
    '2023-07-10 16:20:33.636911'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    6,
    '4_RADIO_NO_NAME',
    'https://srv1.streamradiowy.eu/radio90',
    '2023-07-10 16:20:33.645579'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    7,
    '5_RADIO_NO_NAME',
    'https://air4.amgradio.ru/HypeFM',
    '2023-07-10 16:20:33.651104'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    8,
    '6_RADIO_NO_NAME',
    'https://air4.amgradio.ru/Retro',
    '2023-07-10 16:20:33.658611'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    9,
    '7_RADIO_NO_NAME',
    'https://air7.amgradio.ru/Cafe',
    '2023-07-10 16:20:33.663161'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    10,
    '8_RADIO_NO_NAME',
    'https://stream.lolliradio.net/lolli_italia.mp3',
    '2023-07-10 16:20:33.667515'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    11,
    '9_RADIO_NO_NAME',
    'https://play.global.audio/radio1128',
    '2023-07-10 16:20:33.674116'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    12,
    '10_RADIO_NO_NAME',
    'https://air4.amgradio.ru/RemixFM',
    '2023-07-10 16:20:33.680425'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    13,
    '11_RADIO_NO_NAME',
    'https://mp3.amgradio.ru/RusRock',
    '2023-07-10 16:20:33.684658'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    14,
    '12_RADIO_NO_NAME',
    'https://ice01.fluidstream.net/birikina',
    '2023-07-10 16:20:33.691425'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    15,
    '13_RADIO_NO_NAME',
    'https://friesenradio.stream.laut.fm/friesenradio?t302=2023-03-10_21-15-37&uuid=50ab012c-e413-4277-a15b-a95fcd0533b6',
    '2023-07-10 16:20:33.695593'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    16,
    '14_RADIO_NO_NAME',
    'https://live.antenne.at/ak',
    '2023-07-10 16:20:33.700046'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    17,
    '15_RADIO_NO_NAME',
    'https://s7.yesstreaming.net:8040/stream',
    '2023-07-10 16:20:33.704403'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    18,
    '16_RADIO_NO_NAME',
    'https://radiosummernight.stream.laut.fm/radiosummernight?t302=2023-03-10_21-28-27&uuid=eb63ea3e-c284-4ca7-aec5-498dab62e4a8',
    '2023-07-10 16:20:33.708668'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    19,
    '17_RADIO_NO_NAME',
    'https://s2.stationplaylist.com:7094/listen.aac',
    '2023-07-10 16:20:33.713800'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    20,
    '18_RADIO_NO_NAME',
    'https://play.global.audio/nrjhi.aac',
    '2023-07-10 16:20:33.717887'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    21,
    '19_RADIO_NO_NAME',
    'https://1000hamburg.stream.laut.fm/1000hamburg?t302=2023-03-12_11-25-53&uuid=9eb5dcf6-862e-4f96-aef2-7d45eccef030',
    '2023-07-10 16:20:33.721827'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    22,
    '20_RADIO_NO_NAME',
    'https://nr12.newradio.it:8612/stream',
    '2023-07-10 16:20:33.726180'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    23,
    '21_RADIO_NO_NAME',
    'https://srv.giannivps.gq:8002/light_radio_aacp',
    '2023-07-10 16:20:33.730289'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    24,
    '22_RADIO_NO_NAME',
    'https://nl1.streamhosting.ch/lounge128.mp3',
    '2023-07-10 16:20:33.734637'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    25,
    '23_RADIO_NO_NAME',
    'https://live.hostingbudget.nl:4490/stream',
    '2023-07-10 16:20:33.738840'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    26,
    '24_RADIO_NO_NAME',
    'https://c2409ic1.fast-serv.com/stream',
    '2023-07-10 16:20:33.743731'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    27,
    '25_RADIO_NO_NAME',
    'https://srv.webradiomanager.fr:2140/stream',
    '2023-07-10 16:20:33.747823'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    28,
    '26_RADIO_NO_NAME',
    'https://ec2.yesstreaming.net:2560/stream',
    '2023-07-10 16:20:33.752169'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    29,
    '27_RADIO_NO_NAME',
    'https://srv.webradiomanager.fr:1740/stream',
    '2023-07-10 16:20:33.756442'
  );
INSERT INTO
  `radios` (`id`, `name`, `url`, `created_on`)
VALUES
  (
    30,
    '28_RADIO_NO_NAME',
    'https://radio.lacapanna.eu:8000/radio.mp3',
    '2023-07-10 16:20:33.760676'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: roles
# ------------------------------------------------------------

INSERT INTO
  `roles` (`name`, `permissions`, `id`)
VALUES
  (
    'Super Admin',
    '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]',
    1
  );
INSERT INTO
  `roles` (`name`, `permissions`, `id`)
VALUES
  ('Admin', '[1,2,3,4,5,10,11,12,13]', 2);
INSERT INTO
  `roles` (`name`, `permissions`, `id`)
VALUES
  ('Videos verifier', '[1,5]', 3);

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
    '2024-01-29 12:53:06',
    1
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
    `verified`
  )
VALUES
  (
    3,
    'LPgZ4lKfBPw',
    'France',
    'Paris',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:24.973212',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    4,
    'JlCRKE2iQU4',
    'France',
    'Paris',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:24.982141',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    5,
    'GmQ5wdpsbnI',
    'France',
    'Paris',
    'weather-rain-morning',
    'walk',
    '2023-07-10 16:11:24.992929',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    6,
    'GjiVa5MmzuI',
    'France',
    'Paris',
    'weather-rain-night',
    'walk',
    '2023-07-10 16:11:25.000871',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    7,
    'KJbHcb5ZI_4',
    'United States',
    'New York City',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.005777',
    'Americas',
    1,
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
    `verified`
  )
VALUES
  (
    8,
    'yKvu63qXSp8',
    'United States',
    'New York City',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.010495',
    'Americas',
    1,
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
    `verified`
  )
VALUES
  (
    9,
    'eZe4Q_58UTU',
    'United States',
    'New York City',
    'weather-rain-morning',
    'walk',
    '2023-07-10 16:11:25.057847',
    'Americas',
    1,
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
    `verified`
  )
VALUES
  (
    10,
    'BOa0zQBRs_M',
    'United States',
    'New York City',
    'weather-rain-night',
    'walk',
    '2023-07-10 16:11:25.065870',
    'Americas',
    1,
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
    `verified`
  )
VALUES
  (
    11,
    'TXH5eGF2COk',
    'Spain',
    'Madrid',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.070514',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    12,
    'epDp5YVYpNc',
    'Spain',
    'Barcelona',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.076356',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    13,
    'KLkSW2JNhjY',
    'Spain',
    'Barcelona',
    'weather-rain-morning',
    'walk',
    '2023-07-10 16:11:25.084842',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    14,
    'TScr2bIJVv0',
    'Spain',
    'Madrid',
    'weather-rain-night',
    'walk',
    '2023-07-10 16:11:25.090079',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    15,
    'GjVuQ7pYJ-I',
    'China',
    'Hangzhou',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.094949',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    16,
    'egSBCwmg7kk',
    'China',
    'ChunXi Road Chengdu',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.099888',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    17,
    'Z6mESlHv2WM',
    'China',
    'Century',
    'weather-rain-morning',
    'walk',
    '2023-07-10 16:11:25.106672',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    18,
    'MudeUxLjqEY',
    'China',
    'Xiangtan',
    'weather-rain-night',
    'walk',
    '2023-07-10 16:11:25.115126',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    19,
    'EsFheWkimsU',
    'Italy',
    'Rome',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.122237',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    20,
    'ZEFUaNTUa6g',
    'Italy',
    'Rome',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.128935',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    21,
    'Ypq4N3EldBM',
    'Italy',
    'Naples',
    'weather-rain-morning',
    'walk',
    '2023-07-10 16:11:25.133924',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    22,
    'c3gGMBBhjl0',
    'Italy',
    'Venice',
    'weather-rain-night',
    'walk',
    '2023-07-10 16:11:25.138832',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    23,
    '1dYs8ByEqHY',
    'United Kingdom',
    'England',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.143673',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    24,
    'aDNB-xxt50o',
    'United Kingdom',
    'Liverpool',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.149611',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    25,
    'H43glfbQEh4',
    'United Kingdom',
    'London',
    'weather-rain-morning',
    'walk',
    '2023-07-10 16:11:25.154971',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    26,
    '1q9tRZhxZXc',
    'United Kingdom',
    'London',
    'weather-rain-night',
    'walk',
    '2023-07-10 16:11:25.164604',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    27,
    '-l9E7OAexQM',
    'Germany',
    'Berlin',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.170867',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    28,
    'Nb7A4GCwms0',
    'Germany',
    'Frankfurt',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.176393',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    29,
    'faNd76CW824',
    'Germany',
    'Berlin',
    'weather-rain-night',
    'walk',
    '2023-07-10 16:11:25.181576',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    30,
    'uj63OpMTzZI',
    'Mexico',
    'Mexico City',
    'weather-cloud-morning',
    'walk',
    '2023-07-10 16:11:25.186282',
    'Americas',
    1,
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
    `verified`
  )
VALUES
  (
    31,
    'Y81PNtTBWe4',
    'Mexico',
    'Mexico City',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.192827',
    'Americas',
    1,
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
    `verified`
  )
VALUES
  (
    32,
    'jpeFwe-FXII',
    'Mexico',
    'Mexico City',
    'weather-rain-morning',
    'walk',
    '2023-07-10 16:11:25.198133',
    'Americas',
    1,
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
    `verified`
  )
VALUES
  (
    33,
    '47UstD1XxAI',
    'Mexico',
    'Mexico City',
    'weather-rain-night',
    'walk',
    '2023-07-10 16:11:25.203638',
    'Americas',
    1,
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
    `verified`
  )
VALUES
  (
    34,
    'ADmgOq9O2tY',
    'Thailand',
    'Bangkok',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.208669',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    35,
    'cT0TstuOzgA',
    'Thailand',
    'Bangkok',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.213410',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    36,
    'p9Mz_PkscAg',
    'Thailand',
    'Bangkok',
    'weather-rain-morning',
    'walk',
    '2023-07-10 16:11:25.221088',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    37,
    'MDjuOz2gjRg',
    'Thailand',
    'Bangkok',
    'weather-rain-night',
    'walk',
    '2023-07-10 16:11:25.226023',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    38,
    'k8IqqhFebu8',
    'Turkey',
    'Istanbul',
    'weather-rain-night',
    'walk',
    '2023-07-10 16:11:25.231022',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    39,
    'fQFrt5QqGNE',
    'Turkey',
    'Istanbul, Istiklal Caddesi',
    'weather-rain-morning',
    'walk',
    '2023-07-10 16:11:25.240551',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    40,
    'NCgh8HalGro',
    'Turkey',
    'Istanbul',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.248103',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    41,
    'P5oYtWDb8FM',
    'Austria',
    'Vienna',
    'weather-cloud-morning',
    'walk',
    '2023-07-10 16:11:25.253108',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    42,
    'hH7hOWp-Jno',
    'Austria',
    'Vienna',
    'weather-cloud-morning',
    'walk',
    '2023-07-10 16:11:25.261133',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    43,
    'U0dGOE6XFYg',
    'Austria',
    'Vienna',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.269438',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    44,
    'PZ5SQbXBwhg',
    'Austria',
    'Vienna',
    'weather-rain-morning',
    'walk',
    '2023-07-10 16:11:25.274303',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    45,
    'O81iI98SAiw',
    'Malaysia',
    'Kuala Lumpur',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.279228',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    46,
    'RGE3l6Ed5j8',
    'Malaysia',
    'Kuala Lumpur',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.288424',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    47,
    'mWJJCX_sVas',
    'Malaysia',
    'Kuala Lumpur',
    'weather-rain-morning',
    'walk',
    '2023-07-10 16:11:25.296114',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    48,
    's4GHrWyvuw8',
    'Malaysia',
    'Kuala Lumpur',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.303016',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    49,
    'vXo5X8bJEcY',
    'Hong Kong',
    'Kowloon Kowloon',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.312155',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    50,
    'QkZj9DTxbHU',
    'Hong Kong',
    'Causeway Bay',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.321156',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    51,
    'epJhBu4UvJw',
    'Hong Kong',
    'Tsim Sha Tsui',
    'weather-rain-night',
    'walk',
    '2023-07-10 16:11:25.328251',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    52,
    'H50az3Aq7x4',
    'Hong Kong',
    'Causeway Bay',
    'weather-rain-morning',
    'walk',
    '2023-07-10 16:11:25.333169',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    53,
    'QVh0TuWyEYc',
    'Greece',
    'Athens',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.340178',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    54,
    'XnQSWZdLcEA',
    'Greece',
    'Athens',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.344968',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    55,
    'CsNJ88wPxjU',
    'Greece',
    'Athens',
    'weather-rain-morning',
    'walk',
    '2023-07-10 16:11:25.352538',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    56,
    '6BT7Qm6Af2Q',
    'Greece',
    'Athens',
    'weather-rain-night',
    'walk',
    '2023-07-10 16:11:25.357116',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    57,
    'KBeCMiUPuic',
    'Russia',
    'Saint Petersburg',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.362489',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    58,
    'c0KaSjQF1YQ',
    'Russia',
    'Moscow',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.371235',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    59,
    'CpBMDMmKYbY',
    'Russia',
    'Moscow',
    'weather-rain-morning',
    'walk',
    '2023-07-10 16:11:25.378313',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    60,
    'e5HZevxkQbs',
    'Russia',
    'Moscow',
    'weather-snow-morning',
    'walk',
    '2023-07-10 16:11:25.385157',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    61,
    'AJYW9uVFock',
    'Japan',
    'Nagoya',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.389628',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    62,
    'b3yQXprMj3s',
    'Japan',
    'Shibuya',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.394134',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    63,
    'ixi9r2X5AbI',
    'Japan',
    'Tokyo',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.399706',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    64,
    'dGy_6qyyY7c',
    'Japan',
    'Tokyo',
    'weather-rain-night',
    'walk',
    '2023-07-10 16:11:25.405062',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    65,
    'lh8dNmneVyY',
    'Canada',
    'Vancouver',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.411959',
    'Americas',
    1,
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
    `verified`
  )
VALUES
  (
    66,
    'FopDhDkHd30',
    'Canada',
    'Vancouver',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.416471',
    'Americas',
    1,
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
    `verified`
  )
VALUES
  (
    67,
    'diNGaDsBt5c',
    'Canada',
    'East Vancouver',
    'weather-snow-night',
    'walk',
    '2023-07-10 16:11:25.423094',
    'Americas',
    1,
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
    `verified`
  )
VALUES
  (
    68,
    'UNTHFrHgw5E',
    'Canada',
    'Vancouver',
    'weather-rain-morning',
    'walk',
    '2023-07-10 16:11:25.427816',
    'Americas',
    1,
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
    `verified`
  )
VALUES
  (
    69,
    'qbpZE8HvPGo',
    'Saudi Arabia',
    'Jeddah',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.432115',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    70,
    'GxIRQJqM46o',
    'Saudi Arabia',
    'Riyadh',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.439091',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    71,
    'WS0-aTyFVk4',
    'Saudi Arabia',
    'Riyadh',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.446543',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    72,
    '4upl609gksM',
    'Saudi Arabia',
    'Riyadh',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.453046',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    73,
    'PjSeEGZVq34',
    'Poland',
    'Krakow',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.461927',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    74,
    '2hXuUDnwyAI',
    'Poland',
    'Krakow',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.466144',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    75,
    '17VKpXuIYag',
    'Poland',
    'Warsaw',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.470947',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    76,
    'YIQ4Ap9aUMo',
    'Poland',
    'Warsaw',
    'weather-rain-morning',
    'walk',
    '2023-07-10 16:11:25.480324',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    77,
    '-GvY4qZh1gI',
    'South korea',
    'Seoul',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.485015',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    78,
    'tdfWkXJPBj0',
    'South korea',
    'Seoul',
    'weather-snow-night',
    'walk',
    '2023-07-10 16:11:25.489683',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    79,
    'dP9JOa75qN0',
    'South korea',
    'Seoul',
    'weather-cloud-morning',
    'walk',
    '2023-07-10 16:11:25.494292',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    80,
    'sBtYWK817-0',
    'South korea',
    'Seoul',
    'weather-rain-night',
    'walk',
    '2023-07-10 16:11:25.499014',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    81,
    '3laHW-dc_ac',
    'Netherlands',
    'Amsterdam',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.505787',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    82,
    '2GSbgmzNxPA',
    'Netherlands',
    'Rotterdam',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.510551',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    83,
    'kQe1ywsZ6xk',
    'Netherlands',
    'Volendam',
    'weather-rain-night',
    'walk',
    '2023-07-10 16:11:25.517336',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    84,
    'GLYmvFTn3R0',
    'Netherlands',
    'Thunderstorm',
    'weather-rain-night',
    'walk',
    '2023-07-10 16:11:25.523700',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    85,
    'W3lQXP1TBjg',
    'Hungary',
    'Budapest',
    'weather-cloud-morning',
    'walk',
    '2023-07-10 16:11:25.530581',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    86,
    'pdpSzAaiIuQ',
    'Hungary',
    'Budapest',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.536735',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    87,
    'cgPX_rBF-wo',
    'Hungary',
    'Budapest',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.541433',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    88,
    'CQT1qcAax2A',
    'Hungary',
    'Budapest',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.546133',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    89,
    'O8k_1GNV08M',
    'Hungary',
    'Budapest',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.551584',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    90,
    'NG13Z3RobEQ',
    'United Arab Emirates',
    'Dubai',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.558027',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    91,
    'J0pOmWJdNos',
    'United Arab Emirates',
    'Dubai',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.562773',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    92,
    'cLiWIS1McA4',
    'United Arab Emirates',
    'Dubai',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.566980',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    93,
    'vi6JlY8U9rI',
    'India',
    'Mumbai',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.571127',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    94,
    'FQINAGuleoU',
    'India',
    'Mumbai',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.575581',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    95,
    'ldLB1vgXXS4',
    'India',
    'New Delhi',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.580027',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    96,
    'DGDqwjQDwUQ',
    'Croatia',
    'Dubrovnik',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.585289',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    97,
    '2AMc2YweFnc',
    'Croatia',
    'Split',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.591671',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    98,
    'Upzi_oNflwE',
    'Croatia',
    'Zagreb',
    'weather-rain-morning',
    'walk',
    '2023-07-10 16:11:25.596542',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    99,
    '88XFGB1dB1I',
    'Croatia',
    'Split',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.603263',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    100,
    'aUJl46bEWYo',
    'Singapore',
    'Chinatown',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.607536',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    101,
    'RCXkT-DtYk8',
    'Singapore',
    'Marina Bay',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.611889',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    102,
    'eYqPXjUAgRA',
    'Singapore',
    'Orchard Road',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.617522',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    103,
    'KPx_53cFwfg',
    'Singapore',
    'Chinatown',
    'weather-normal-night',
    'walk',
    '2023-07-10 16:11:25.621884',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    104,
    '5p5FoQR8wTM',
    'Indonesia',
    'Ubud, Bali',
    'weather-cloud-morning',
    'walk',
    '2023-07-10 16:11:25.626329',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    105,
    'Pl0NT3WZ8Lw',
    'Indonesia',
    'Jakarta',
    'weather-cloud-morning',
    'walk',
    '2023-07-10 16:11:25.632671',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    106,
    'jZ6mSUMNvXY',
    'Indonesia',
    'Pangandaran',
    'weather-rain-morning',
    'walk',
    '2023-07-10 16:11:25.637003',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    107,
    'B0mxEidqQN4',
    'Indonesia',
    'Bajarsari',
    'weather-rain-morning',
    'walk',
    '2023-07-10 16:11:25.641571',
    'Asia',
    1,
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
    `verified`
  )
VALUES
  (
    108,
    'oCV8bbM9hk0',
    'Czech Republic',
    'Prague',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.648182',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    109,
    'BGRhCDKz6lQ',
    'Czech Republic',
    'Brno',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.652501',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    110,
    'SajRNOAIj1k',
    'Czech Republic',
    'Prague',
    'weather-snow-morning',
    'walk',
    '2023-07-10 16:11:25.658908',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    111,
    '_grR16CVnV8',
    'Czech Republic',
    'Prague',
    'weather-rain-morning',
    'walk',
    '2023-07-10 16:11:25.663346',
    'Europe',
    1,
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
    `verified`
  )
VALUES
  (
    112,
    'OsnRSr7LxII',
    'Morocco',
    'Marrakech',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.669822',
    'Africa',
    1,
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
    `verified`
  )
VALUES
  (
    113,
    'hNGzHOHjbis',
    'Morocco',
    'Chefchaouen',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.674009',
    'Africa',
    1,
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
    `verified`
  )
VALUES
  (
    114,
    'RNgqN4ogTjo',
    'Morocco',
    'Rabat',
    'weather-normal-morning',
    'walk',
    '2023-07-10 16:11:25.680165',
    'Africa',
    1,
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
    `verified`
  )
VALUES
  (
    115,
    'FUYeQ4Ypsdc',
    'Morocco',
    'Casablanca',
    'weather-rain-morning',
    'walk',
    '2023-07-10 16:11:25.684932',
    'Africa',
    1,
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