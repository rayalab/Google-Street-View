-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         5.6.21 - MySQL Community Server (GPL)
-- SO del servidor:              Win32
-- HeidiSQL Versión:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura para tabla laravel.game
DROP TABLE IF EXISTS `game`;
CREATE TABLE IF NOT EXISTS `game` (
  `game_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `start` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `finish` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`game_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla laravel.game: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` (`game_id`, `user_id`, `start`, `finish`, `created_at`, `updated_at`) VALUES
	(1, 1, '2016-01-20 11:55:20', '0000-00-00 00:00:00', '2016-01-20 14:55:20', '2016-01-20 14:55:20');
/*!40000 ALTER TABLE `game` ENABLE KEYS */;


-- Volcando estructura para tabla laravel.migrations
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla laravel.migrations: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` (`migration`, `batch`) VALUES
	('2014_10_12_000000_create_users_table', 1),
	('2014_10_12_100000_create_password_resets_table', 1),
	('2016_01_08_140949_create_posters_table', 1),
	('2016_01_08_145420_create_tracks_table', 1),
	('2016_01_08_174904_create_user_posters_table', 1),
	('2016_01_20_021915_create_games_table', 1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;


-- Volcando estructura para tabla laravel.password_resets
DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla laravel.password_resets: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;


-- Volcando estructura para tabla laravel.poster
DROP TABLE IF EXISTS `poster`;
CREATE TABLE IF NOT EXISTS `poster` (
  `poster_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `longitude` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `latitude` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `longitude_line` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `latitude_line` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `longitude_wall_line` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `latitude_wall_line` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `image_1` longtext COLLATE utf8_unicode_ci NOT NULL,
  `image_2` longtext COLLATE utf8_unicode_ci NOT NULL,
  `image_3` longtext COLLATE utf8_unicode_ci NOT NULL,
  `image_4` longtext COLLATE utf8_unicode_ci NOT NULL,
  `image_5` longtext COLLATE utf8_unicode_ci NOT NULL,
  `image_6` longtext COLLATE utf8_unicode_ci NOT NULL,
  `image_7` longtext COLLATE utf8_unicode_ci NOT NULL,
  `image_8` longtext COLLATE utf8_unicode_ci NOT NULL,
  `image_9` longtext COLLATE utf8_unicode_ci NOT NULL,
  `image_default` longtext COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`poster_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla laravel.poster: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `poster` DISABLE KEYS */;
INSERT INTO `poster` (`poster_id`, `longitude`, `latitude`, `longitude_line`, `latitude_line`, `longitude_wall_line`, `latitude_wall_line`, `image_1`, `image_2`, `image_3`, `image_4`, `image_5`, `image_6`, `image_7`, `image_8`, `image_9`, `image_default`, `created_at`, `updated_at`) VALUES
	(1, '-70.58365', '-33.41511', '-70.58403', '-33.415296', '-70.58373', '-33.41488', 'bundles/img/posters/001.png', 'bundles/img/posters/002.png', 'bundles/img/posters/003.png', 'bundles/img/posters/004.png', 'bundles/img/posters/005.png', 'bundles/img/posters/006.png', 'bundles/img/posters/007.png', 'bundles/img/posters/008.png', 'bundles/img/posters/009.png', 'bundles/img/posters/005.png', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `poster` ENABLE KEYS */;


-- Volcando estructura para tabla laravel.track
DROP TABLE IF EXISTS `track`;
CREATE TABLE IF NOT EXISTS `track` (
  `track_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `longitude` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `latitude` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `poster_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`track_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla laravel.track: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `track` DISABLE KEYS */;
INSERT INTO `track` (`track_id`, `longitude`, `latitude`, `title`, `description`, `poster_id`, `created_at`, `updated_at`) VALUES
	(1, '-70.593351', '-33.416151', 'Primera pista', 'Descripcion Primera pista', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(2, '-70.586843', '-33.410331', 'Segunda pista', 'Descripcion Segunda pista', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(3, '-70.576809', '-33.411558', 'Tercera pista', 'Descripcion Tercera pista', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `track` ENABLE KEYS */;


-- Volcando estructura para tabla laravel.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `full_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `run` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `facebook_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `facebook_email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `facebook_token` longtext COLLATE utf8_unicode_ci NOT NULL,
  `cellphone` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email_contact` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `position_longitude` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `position_latitude` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla laravel.users: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`user_id`, `name`, `full_name`, `run`, `facebook_id`, `facebook_email`, `facebook_token`, `cellphone`, `address`, `email`, `email_contact`, `password`, `position_longitude`, `position_latitude`, `remember_token`, `created_at`, `updated_at`) VALUES
	(1, 'DiruzCode', 'Ricardo Castillo DiruzCode', '176112409', '10208281429492399', 'gb.rap.gb@hotmail.com', 'CAAYlmxlwIbsBADLbUcFpzlkqpxraalDRsZAZBzPfFt5LukotoPkRMwnpkbZBznXBr6ZB2spW4b9NugQVy24nZACacjiZCnMZAGMk0mdlfrE7tzk5X295ABf6MRoZC517V2cd9pQYBFNTBkwfiHYdGZAR7nsG5y9qEn9srhtYhF7waNTgLjZAaWKdaSZCaZAVYvo2f1xZBXv9b7L0vuAZDZD', '', '', 'gb.rap.gb@hotmail.com', 'infojobrc@gmail.com', '', '-70.584075208', '-33.415208', NULL, '2016-01-20 03:51:57', '2016-01-22 20:59:46');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;


-- Volcando estructura para tabla laravel.user_poster
DROP TABLE IF EXISTS `user_poster`;
CREATE TABLE IF NOT EXISTS `user_poster` (
  `user_poster_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `poster_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`user_poster_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla laravel.user_poster: ~9 rows (aproximadamente)
/*!40000 ALTER TABLE `user_poster` DISABLE KEYS */;
INSERT INTO `user_poster` (`user_poster_id`, `user_id`, `game_id`, `poster_id`, `created_at`, `updated_at`) VALUES
	(1, 1, 1, 1, '2016-01-20 14:33:39', '2016-01-20 14:33:39'),
	(2, 1, 1, 1, '2016-01-20 14:49:48', '2016-01-20 14:49:48'),
	(3, 1, 1, 1, '2016-01-20 14:51:04', '2016-01-20 14:51:04'),
	(4, 1, 1, 1, '2016-01-20 14:54:29', '2016-01-20 14:54:29'),
	(5, 1, 1, 1, '2016-01-20 14:55:03', '2016-01-20 14:55:03'),
	(6, 1, 1, 1, '2016-01-20 14:55:30', '2016-01-20 14:55:30'),
	(7, 1, 1, 1, '2016-01-20 14:57:10', '2016-01-20 14:57:10'),
	(8, 1, 1, 1, '2016-01-22 14:53:50', '2016-01-22 14:53:50'),
	(9, 1, 1, 1, '2016-01-22 19:15:22', '2016-01-22 19:15:22'),
	(10, 1, 1, 1, '2016-01-22 20:38:16', '2016-01-22 20:38:16');
/*!40000 ALTER TABLE `user_poster` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
