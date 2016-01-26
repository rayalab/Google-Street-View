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
-- Volcando datos para la tabla laravel.game: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` (`game_id`, `user_id`, `start`, `finish`, `created_at`, `updated_at`) VALUES
	(1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '2016-01-26 14:39:20', '2016-01-26 14:39:20');
/*!40000 ALTER TABLE `game` ENABLE KEYS */;

-- Volcando datos para la tabla laravel.poster: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `poster` DISABLE KEYS */;
INSERT INTO `poster` (`poster_id`, `longitude`, `latitude`, `longitude_line`, `latitude_line`, `longitude_wall_line`, `latitude_wall_line`, `image_default`, `first_clue_latitude`, `first_clue_longitude`, `first_clue_title`, `first_clue_description`, `second_clue_latitude`, `second_clue_longitude`, `second_clue_title`, `second_clue_description`, `created_at`, `updated_at`) VALUES
	(1, '-70.58365', '-33.41511', '-70.58403', '-33.415296', '-70.58365', '-33.41488', 'bundles/img/posters/005.png', '', '', '', '', '', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(2, '-70.58543', ' -33.413111', '-70.58538', '-33.4132', '-70.58599', ' -33.413167', 'bundles/img/posters/005.png', '', '', '', '', '', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(3, '-70.729174', '-33.356446', '-70.729164', '-33.356058', '-70.729199', '-33.356471', 'bundles/img/posters/005.png', '', '', '', '', '', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `poster` ENABLE KEYS */;

-- Volcando datos para la tabla laravel.poster_image: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `poster_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `poster_image` ENABLE KEYS */;

-- Volcando datos para la tabla laravel.users: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`user_id`, `name`, `full_name`, `run`, `facebook_id`, `facebook_email`, `facebook_token`, `cellphone`, `address`, `email`, `password`, `position_longitude`, `position_latitude`, `remember_token`, `created_at`, `updated_at`) VALUES
	(1, 'DiruzCode', 'Ricardo Castillo DiruzCode', '', '10208281429492399', '', 'CAAYlmxlwIbsBADskZCigmJbQzpYcDea93XZBOrVr1L57vxkgSNezvsewZBbL9mh88pm0oEDYSBmVDkGApMqe4oxLwLA71xyEZCLio8NAiQZBmhqWVDryc0SH31HFg4QQvDy6A8v19ZA4AODkbsHvxHp4UlWpic5RrUUWX128P12wV3mOo7TkzaRZB5ro5UGz3D5PkoZAWlwrGAZDZD', '', '', '', '', '-70.584075208', '-33.415208', NULL, '2016-01-26 14:53:53', '2016-01-26 14:53:53');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Volcando datos para la tabla laravel.user_poster: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `user_poster` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_poster` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
