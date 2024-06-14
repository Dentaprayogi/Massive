-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 14, 2024 at 05:27 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_monage`
--

-- --------------------------------------------------------

--
-- Table structure for table `anggaran`
--

CREATE TABLE `anggaran` (
  `anggaran_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `kategori_id` int(11) DEFAULT NULL,
  `jumlah` decimal(10,0) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `anggaran`
--

INSERT INTO `anggaran` (`anggaran_id`, `user_id`, `kategori_id`, `jumlah`, `start_date`, `end_date`) VALUES
(2, 1, 1, '1000000', '2024-01-01', '2024-02-01'),
(3, 1, 1, '1000000', '2023-11-01', '2023-12-01'),
(4, 1, 2, '1000000', '2024-01-01', '2024-02-01'),
(5, 1, 3, '1000000', '2024-01-01', '2024-02-01');

-- --------------------------------------------------------

--
-- Table structure for table `jenistransaksi`
--

CREATE TABLE `jenistransaksi` (
  `jenis_id` int(11) NOT NULL,
  `jenis` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jenistransaksi`
--

INSERT INTO `jenistransaksi` (`jenis_id`, `jenis`) VALUES
(1, 'pemasukan'),
(2, 'pengeluara'),
(3, 'tabungan');

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `kategori_id` int(11) NOT NULL,
  `kategori` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`kategori_id`, `kategori`) VALUES
(1, 'Makan dan Minum'),
(2, 'Belanja'),
(3, 'Bensin'),
(4, 'Transportasi'),
(5, 'Tagihan'),
(6, 'Peliharaan'),
(7, 'Kesehatan'),
(8, 'Pengeluaran Lainnya'),
(9, 'Gaji'),
(10, 'Bonus'),
(11, 'Hasil Investasi'),
(12, 'Pemasukan Lainnya');

-- --------------------------------------------------------

--
-- Table structure for table `pengingat`
--

CREATE TABLE `pengingat` (
  `pengingat_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `deskripsi` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pengingat`
--

INSERT INTO `pengingat` (`pengingat_id`, `user_id`, `tanggal`, `deskripsi`) VALUES
(1, 1, '2024-07-08', 'Membayar Tagihan Listrik');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `transaksi_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `jenis_id` int(11) DEFAULT NULL,
  `kategori_id` int(11) DEFAULT NULL,
  `jumlah` decimal(10,0) NOT NULL,
  `transaksi_date` date NOT NULL,
  `keterangan` text DEFAULT NULL,
  `sumber_keuangan` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`transaksi_id`, `user_id`, `jenis_id`, `kategori_id`, `jumlah`, `transaksi_date`, `keterangan`, `sumber_keuangan`) VALUES
(2, 1, 2, 1, '20000', '2024-01-02', 'Makan Geprek', 'Gaji'),
(3, 1, 2, 1, '20000', '2024-02-02', 'Makan Geprek', 'Gaji'),
(5, 1, 1, 9, '4000000', '2024-01-01', 'Gaji Pokok', 'Gaji'),
(7, 1, 3, 9, '1000000', '2023-01-05', 'Menabung di bulan Januari', 'Gaji'),
(8, 1, 2, 1, '20000', '2024-01-08', 'Makan Geprek', 'Gaji'),
(9, 1, 2, 1, '20000', '2024-01-16', 'Makan Soto', 'Gaji'),
(10, 1, 3, 9, '100000', '2023-02-05', 'Menabung di bulan Februari', 'Gaji');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `nama_depan` varchar(50) DEFAULT NULL,
  `nama_belakang` varchar(50) DEFAULT NULL,
  `jenis_kelamin` enum('laki-laki','perempuan') DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `tlp` varchar(13) DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `nama_depan`, `nama_belakang`, `jenis_kelamin`, `password`, `email`, `tlp`, `tgl_lahir`) VALUES
(1, 'User', 'pengguna', 'laki-laki', '$2b$12$WczelCkrjCJNI/HTuLile.vmRfLHi6eeNYyAEBZVS5e148Kd0xuiG', 'user@user.com', '085600000000', '2002-01-01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `anggaran`
--
ALTER TABLE `anggaran`
  ADD PRIMARY KEY (`anggaran_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `kategori_id` (`kategori_id`);

--
-- Indexes for table `jenistransaksi`
--
ALTER TABLE `jenistransaksi`
  ADD PRIMARY KEY (`jenis_id`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`kategori_id`);

--
-- Indexes for table `pengingat`
--
ALTER TABLE `pengingat`
  ADD PRIMARY KEY (`pengingat_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`transaksi_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `jenis_id` (`jenis_id`),
  ADD KEY `kategori_id` (`kategori_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `anggaran`
--
ALTER TABLE `anggaran`
  MODIFY `anggaran_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `jenistransaksi`
--
ALTER TABLE `jenistransaksi`
  MODIFY `jenis_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `kategori_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `pengingat`
--
ALTER TABLE `pengingat`
  MODIFY `pengingat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `transaksi_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `anggaran`
--
ALTER TABLE `anggaran`
  ADD CONSTRAINT `anggaran_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `anggaran_ibfk_2` FOREIGN KEY (`kategori_id`) REFERENCES `kategori` (`kategori_id`);

--
-- Constraints for table `pengingat`
--
ALTER TABLE `pengingat`
  ADD CONSTRAINT `pengingat_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `transaksi_ibfk_2` FOREIGN KEY (`jenis_id`) REFERENCES `jenistransaksi` (`jenis_id`),
  ADD CONSTRAINT `transaksi_ibfk_3` FOREIGN KEY (`kategori_id`) REFERENCES `kategori` (`kategori_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
