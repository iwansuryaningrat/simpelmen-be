-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 30 Sep 2022 pada 01.16
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simpelmen`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `conversations`
--

CREATE TABLE `conversations` (
  `conversation_id` int(11) NOT NULL,
  `conversation_user_id` int(11) NOT NULL,
  `conversation_title` varchar(50) NOT NULL,
  `conversation_created_at` datetime NOT NULL,
  `conversation_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `delivery_details`
--

CREATE TABLE `delivery_details` (
  `delivery_detail_id` int(11) NOT NULL,
  `delivery_detail_order_id` varchar(50) NOT NULL,
  `delivery_detail_name` varchar(50) NOT NULL,
  `delivery_detail_ikm` varchar(50) NOT NULL,
  `delivery_detail_email` varchar(100) NOT NULL,
  `delivery_detail_contact` varchar(15) NOT NULL,
  `delivery_detail_method` int(11) NOT NULL,
  `delivery_detail_address` varchar(255) NOT NULL,
  `delivery_detail_district` varchar(50) NOT NULL,
  `delivery_detail_city` varchar(50) NOT NULL,
  `delivery_detail_province` varchar(50) NOT NULL,
  `delivery_detail_postal_code` int(11) NOT NULL,
  `delivery_detail_shipping_cost` int(11) NOT NULL,
  `delivery_detail_courier` varchar(50) NOT NULL,
  `delivery_detail_receipt` varchar(100) NOT NULL,
  `delivery_detail_estimate` datetime NOT NULL,
  `delivery_detail_created_at` datetime NOT NULL,
  `delivery_detail_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `message_conversation_id` int(11) NOT NULL,
  `message_sender` int(11) NOT NULL,
  `message` text NOT NULL,
  `message_created_at` datetime NOT NULL,
  `message_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `orders`
--

CREATE TABLE `orders` (
  `order_id` varchar(50) NOT NULL,
  `order_code` varchar(100) NOT NULL,
  `order_product_id` int(11) NOT NULL,
  `order_user_id` int(11) NOT NULL,
  `order_quantity` int(11) NOT NULL,
  `order_note` text NOT NULL,
  `order_price` decimal(10,0) NOT NULL,
  `order_total_price` int(11) NOT NULL,
  `order_design` text NOT NULL,
  `order_created_at` datetime NOT NULL,
  `order_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `order_details`
--

CREATE TABLE `order_details` (
  `order_detail_id` int(11) NOT NULL,
  `order_detail_order_id` varchar(50) NOT NULL,
  `p1` double NOT NULL,
  `p2` double NOT NULL,
  `l1` double NOT NULL,
  `l2` double NOT NULL,
  `t1` double NOT NULL,
  `t2` double NOT NULL,
  `order_detail_created_at` datetime NOT NULL,
  `order_detail_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `order_status`
--

CREATE TABLE `order_status` (
  `order_status_id` int(11) NOT NULL,
  `order_status_order_id` varchar(50) NOT NULL,
  `order_status_user_id` int(11) NOT NULL,
  `order_status_description` varchar(255) NOT NULL,
  `order_status_admin_code` varchar(10) NOT NULL,
  `order_status_created_at` datetime NOT NULL,
  `order_status_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_category` char(1) NOT NULL,
  `product_material` int(11) NOT NULL,
  `product_size` int(11) NOT NULL,
  `product_finishing` int(11) NOT NULL,
  `product_weight` double NOT NULL,
  `product_description` varchar(255) NOT NULL,
  `product_created_at` datetime NOT NULL,
  `product_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `product_categories`
--

CREATE TABLE `product_categories` (
  `product_category_id` char(1) NOT NULL,
  `product_category_name` varchar(50) NOT NULL,
  `product_category_description` varchar(255) NOT NULL,
  `product_category_created_at` datetime NOT NULL,
  `product_category_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `product_finishings`
--

CREATE TABLE `product_finishings` (
  `product_finishing_id` int(11) NOT NULL,
  `product_finishing_name` varchar(50) NOT NULL,
  `product_finishing_description` varchar(255) NOT NULL,
  `product_finishing_created_at` datetime NOT NULL,
  `product_finishing_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `product_materials`
--

CREATE TABLE `product_materials` (
  `product_material_id` int(11) NOT NULL,
  `product_material_name` varchar(50) NOT NULL,
  `product_material_description` varchar(255) NOT NULL,
  `product_material_created_at` datetime NOT NULL,
  `product_material_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `product_sizes`
--

CREATE TABLE `product_sizes` (
  `product_size_id` int(11) NOT NULL,
  `product_size_length` double NOT NULL,
  `product_size_width` double NOT NULL,
  `product_size_heigth` double NOT NULL,
  `product_size_shape` varchar(50) NOT NULL,
  `product_size_description` varchar(255) NOT NULL,
  `product_size_created_at` datetime NOT NULL,
  `product_size_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(20) NOT NULL,
  `role_created_at` datetime NOT NULL,
  `role_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_ikm` varchar(50) NOT NULL,
  `user_contact` varchar(13) NOT NULL,
  `user_address` varchar(255) NOT NULL,
  `user_district` varchar(50) NOT NULL,
  `user_city` varchar(50) NOT NULL,
  `user_province` varchar(50) NOT NULL,
  `user_postal_code` int(11) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_picture` text NOT NULL,
  `user_status` int(11) NOT NULL DEFAULT 0,
  `user_verify` int(11) NOT NULL DEFAULT 0,
  `user_created_at` datetime NOT NULL,
  `user_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_role`
--

CREATE TABLE `user_role` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `user_role_created_at` datetime NOT NULL,
  `user_role_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`conversation_id`),
  ADD KEY `users` (`conversation_user_id`);

--
-- Indeks untuk tabel `delivery_details`
--
ALTER TABLE `delivery_details`
  ADD PRIMARY KEY (`delivery_detail_id`,`delivery_detail_order_id`),
  ADD KEY `delivery_detail_order_fk` (`delivery_detail_order_id`);

--
-- Indeks untuk tabel `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`,`message_conversation_id`,`message_sender`),
  ADD KEY `conversations_fk` (`message_conversation_id`),
  ADD KEY `sender_fk` (`message_sender`);

--
-- Indeks untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`,`order_product_id`,`order_user_id`),
  ADD KEY `customers_fk` (`order_user_id`),
  ADD KEY `product_fk` (`order_product_id`);

--
-- Indeks untuk tabel `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`order_detail_id`,`order_detail_order_id`),
  ADD KEY `order_detail_orders_fk` (`order_detail_order_id`);

--
-- Indeks untuk tabel `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`order_status_id`,`order_status_order_id`,`order_status_user_id`),
  ADD KEY `order_status_user_` (`order_status_user_id`),
  ADD KEY `order_fk` (`order_status_order_id`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `product_finishing_fk` (`product_finishing`),
  ADD KEY `product_material_fk` (`product_material`),
  ADD KEY `product_size_fk` (`product_size`),
  ADD KEY `product_categori_fk` (`product_category`);

--
-- Indeks untuk tabel `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`product_category_id`);

--
-- Indeks untuk tabel `product_finishings`
--
ALTER TABLE `product_finishings`
  ADD PRIMARY KEY (`product_finishing_id`);

--
-- Indeks untuk tabel `product_materials`
--
ALTER TABLE `product_materials`
  ADD PRIMARY KEY (`product_material_id`);

--
-- Indeks untuk tabel `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD PRIMARY KEY (`product_size_id`);

--
-- Indeks untuk tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indeks untuk tabel `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `roles_fk` (`role_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `conversations`
--
ALTER TABLE `conversations`
  MODIFY `conversation_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `delivery_details`
--
ALTER TABLE `delivery_details`
  MODIFY `delivery_detail_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `order_details`
--
ALTER TABLE `order_details`
  MODIFY `order_detail_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `order_status`
--
ALTER TABLE `order_status`
  MODIFY `order_status_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `product_finishings`
--
ALTER TABLE `product_finishings`
  MODIFY `product_finishing_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `product_materials`
--
ALTER TABLE `product_materials`
  MODIFY `product_material_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `product_sizes`
--
ALTER TABLE `product_sizes`
  MODIFY `product_size_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `conversations`
--
ALTER TABLE `conversations`
  ADD CONSTRAINT `users` FOREIGN KEY (`conversation_user_id`) REFERENCES `users` (`user_id`);

--
-- Ketidakleluasaan untuk tabel `delivery_details`
--
ALTER TABLE `delivery_details`
  ADD CONSTRAINT `delivery_detail_order_fk` FOREIGN KEY (`delivery_detail_order_id`) REFERENCES `orders` (`order_id`);

--
-- Ketidakleluasaan untuk tabel `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `conversations_fk` FOREIGN KEY (`message_conversation_id`) REFERENCES `conversations` (`conversation_id`),
  ADD CONSTRAINT `sender_fk` FOREIGN KEY (`message_sender`) REFERENCES `users` (`user_id`);

--
-- Ketidakleluasaan untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `customers_fk` FOREIGN KEY (`order_user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `product_fk` FOREIGN KEY (`order_product_id`) REFERENCES `products` (`product_id`);

--
-- Ketidakleluasaan untuk tabel `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_detail_orders_fk` FOREIGN KEY (`order_detail_order_id`) REFERENCES `orders` (`order_id`);

--
-- Ketidakleluasaan untuk tabel `order_status`
--
ALTER TABLE `order_status`
  ADD CONSTRAINT `order_fk` FOREIGN KEY (`order_status_order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `order_status_user_` FOREIGN KEY (`order_status_user_id`) REFERENCES `users` (`user_id`);

--
-- Ketidakleluasaan untuk tabel `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `product_categori_fk` FOREIGN KEY (`product_category`) REFERENCES `product_categories` (`product_category_id`),
  ADD CONSTRAINT `product_finishing_fk` FOREIGN KEY (`product_finishing`) REFERENCES `product_finishings` (`product_finishing_id`),
  ADD CONSTRAINT `product_material_fk` FOREIGN KEY (`product_material`) REFERENCES `product_materials` (`product_material_id`),
  ADD CONSTRAINT `product_size_fk` FOREIGN KEY (`product_size`) REFERENCES `product_sizes` (`product_size_id`);

--
-- Ketidakleluasaan untuk tabel `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `roles_fk` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  ADD CONSTRAINT `users_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
