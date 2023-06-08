-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Cze 08, 2023 at 11:56 AM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sky`
--
CREATE DATABASE IF NOT EXISTS `sky` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `sky`;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `constellations`
--

CREATE TABLE `constellations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `img_id` int(10) UNSIGNED NOT NULL,
  `moon` int(11) NOT NULL,
  `fog` int(11) NOT NULL,
  `cloudiness` int(11) NOT NULL,
  `precipitation` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `constellations`
--

INSERT INTO `constellations` (`id`, `name`, `description`, `img_id`, `moon`, `fog`, `cloudiness`, `precipitation`) VALUES
(11, 'nowa ', 'konstelacja', 1, 6, 5, 2, 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `img`
--

CREATE TABLE `img` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `link` text NOT NULL,
  `type_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `img`
--

INSERT INTO `img` (`id`, `name`, `link`, `type_id`) VALUES
(1, 'Konstelacja 1', 'constellation1.png', 2),
(2, 'gwiazda 1', 'star1.png', 1),
(3, 'Konstelacja2', 'constellation2.png', 2),
(4, 'moon 1', 'moon1.png', 3),
(5, 'moon 2', 'moon2.png', 3),
(6, 'moon 3', 'moon3.png', 3),
(7, 'gwiazda2', 'star2.png', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `img_types`
--

CREATE TABLE `img_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `img_types`
--

INSERT INTO `img_types` (`id`, `name`) VALUES
(1, 'stars'),
(2, 'constellations'),
(3, 'moon');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `stars`
--

CREATE TABLE `stars` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `img_id` int(10) UNSIGNED NOT NULL,
  `constellation_id` int(10) UNSIGNED NOT NULL,
  `priority` int(11) NOT NULL DEFAULT 1,
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stars`
--

INSERT INTO `stars` (`id`, `name`, `description`, `img_id`, `constellation_id`, `priority`, `active`) VALUES
(7, 'sda', 'dasd', 7, 11, 1, 1);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `constellations`
--
ALTER TABLE `constellations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `img_id` (`img_id`);

--
-- Indeksy dla tabeli `img`
--
ALTER TABLE `img`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_id` (`type_id`);

--
-- Indeksy dla tabeli `img_types`
--
ALTER TABLE `img_types`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `stars`
--
ALTER TABLE `stars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `img_id` (`img_id`,`constellation_id`),
  ADD KEY `constellation_id` (`constellation_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `constellations`
--
ALTER TABLE `constellations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `img`
--
ALTER TABLE `img`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `img_types`
--
ALTER TABLE `img_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `stars`
--
ALTER TABLE `stars`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `constellations`
--
ALTER TABLE `constellations`
  ADD CONSTRAINT `constellations_ibfk_1` FOREIGN KEY (`img_id`) REFERENCES `img` (`id`);

--
-- Constraints for table `img`
--
ALTER TABLE `img`
  ADD CONSTRAINT `img_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `img_types` (`id`);

--
-- Constraints for table `stars`
--
ALTER TABLE `stars`
  ADD CONSTRAINT `stars_ibfk_1` FOREIGN KEY (`constellation_id`) REFERENCES `constellations` (`id`),
  ADD CONSTRAINT `stars_ibfk_2` FOREIGN KEY (`img_id`) REFERENCES `img` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
