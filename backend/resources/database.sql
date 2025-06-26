-- SQL Dump
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2025 at 01:05 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `db_kehamilan`
--
CREATE DATABASE IF NOT EXISTS `db_kehamilan` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `db_kehamilan`;

--
-- Hapus tabel lama untuk pembuatan ulang yang bersih
--
DROP TABLE IF EXISTS `answers`;
DROP TABLE IF EXISTS `questions`;
DROP TABLE IF EXISTS `testimonials`;
DROP TABLE IF EXISTS `articles`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `reservations`;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('visitor','admin') DEFAULT 'visitor',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin Bidan Sehat', 'admin@example.com', 'admin', '2025-06-15 17:00:00', '2025-06-15 17:00:00'),
(2, 'Rina Pengunjung', 'rina@example.com', 'visitor', '2025-06-15 17:00:00', '2025-06-15 17:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`) VALUES
(1, 'Trimester Pertama', 'Tips dan panduan untuk 12 minggu pertama kehamilan.'),
(2, 'Nutrisi', 'Panduan makanan sehat dan nutrisi penting untuk ibu hamil.'),
(3, 'Persalinan', 'Informasi seputar persiapan dan proses persalinan.');

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `date_posted` datetime DEFAULT current_timestamp(),
  `author_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `content`, `imageUrl`, `date_posted`, `author_id`, `category_id`, `createdAt`, `updatedAt`) VALUES
(1, '5 Makanan Wajib di Trimester Pertama', 'Berikut adalah lima jenis makanan yang sangat penting untuk mendukung perkembangan janin di awal kehamilan. Asupan gizi yang tepat akan membentuk fondasi kesehatan bayi Anda.', 'https://via.placeholder.com/800x450.png/e0f2fe/0c4a6e?text=Nutrisi+Ibu', '2025-06-16 01:00:00', 1, 1, '2025-06-16 01:00:00', '2025-06-16 01:00:00'),
(2, 'Pentingnya Asam Folat untuk Ibu Hamil', 'Asam folat adalah nutrisi kunci untuk mencegah cacat lahir pada bayi. Pastikan asupan harian Anda tercukupi...', 'https://via.placeholder.com/400x225.png/e0f2fe/0c4a6e?text=Vitamin', '2025-06-15 23:00:00', 1, 2, '2025-06-15 23:00:00', '2025-06-15 23:00:00'),
(3, 'Tips Mengatasi Morning Sickness', 'Mual di pagi hari adalah hal yang umum. Coba beberapa tips ini untuk meredakannya, seperti makan dalam porsi kecil tapi sering.', 'https://via.placeholder.com/400x225.png/e0f2fe/0c4a6e?text=Mual', '2025-06-15 22:00:00', 1, 1, '2025-06-15 22:00:00', '2025-06-15 22:00:00'),
(4, 'Persiapan Mental Menjelang Persalinan', 'Selain persiapan fisik, persiapan mental juga tidak kalah penting. Lakukan relaksasi dan cari dukungan dari orang terdekat.', 'https://via.placeholder.com/400x225.png/e0f2fe/0c4a6e?text=Mental', '2025-06-15 21:00:00', 1, 3, '2025-06-15 21:00:00', '2025-06-15 21:00:00'),
(5, 'Posisi Tidur yang Aman Saat Hamil Tua', 'Memasuki trimester ketiga, posisi tidur menjadi penting untuk kenyamanan dan kesehatan janin. Posisi miring ke kiri adalah yang paling disarankan.', 'https://via.placeholder.com/400x225.png/e0f2fe/0c4a6e?text=Tidur', '2025-06-15 20:00:00', 1, 1, '2025-06-15 20:00:00', '2025-06-15 20:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `title`, `content`, `user_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Apakah aman minum kopi saat hamil?', 'Halo Bidan, saya seorang penikmat kopi. Apakah saya harus berhenti total minum kopi selama masa kehamilan? Terima kasih.', 2, '2025-06-15 18:00:00', '2025-06-15 18:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `question_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id`, `content`, `user_id`, `question_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Halo Ibu Rina, terima kasih atas pertanyaannya. Konsumsi kafein selama kehamilan sebaiknya dibatasi, tidak lebih dari 200mg per hari atau setara dengan satu cangkir kopi. Terlalu banyak kafein dapat meningkatkan risiko tertentu. Sebaiknya konsultasikan juga dengan dokter kandungan Anda ya.', 1, 1, '2025-06-15 18:05:00', '2025-06-15 18:05:00');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `service_type` enum('yoga_prenatal','pijat_bayi') NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `status` enum('pending','confirmed','canceled') DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

ALTER TABLE `users` ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `email` (`email`);
ALTER TABLE `categories` ADD PRIMARY KEY (`id`);
ALTER TABLE `articles` ADD PRIMARY KEY (`id`), ADD KEY `author_id` (`author_id`), ADD KEY `category_id` (`category_id`);
ALTER TABLE `questions` ADD PRIMARY KEY (`id`), ADD KEY `user_id` (`user_id`);
ALTER TABLE `answers` ADD PRIMARY KEY (`id`), ADD KEY `user_id` (`user_id`), ADD KEY `question_id` (`question_id`);
ALTER TABLE `reservations` ADD PRIMARY KEY (`id`);
ALTER TABLE `testimonials` ADD PRIMARY KEY (`id`), ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

ALTER TABLE `users` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
ALTER TABLE `categories` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
ALTER TABLE `articles` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
ALTER TABLE `questions` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
ALTER TABLE `answers` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
ALTER TABLE `reservations` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `testimonials` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `articles_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `testimonials`
  ADD CONSTRAINT `testimonials_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT;