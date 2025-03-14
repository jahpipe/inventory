-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 14, 2025 at 04:54 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventorymanagement`
--

-- --------------------------------------------------------

--
-- Table structure for table `inspectionitems`
--

CREATE TABLE `inspectionitems` (
  `id` int(11) NOT NULL,
  `inspection_report_id` int(11) NOT NULL,
  `stock_property_number` varchar(255) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `unit` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inspectionitems`
--

INSERT INTO `inspectionitems` (`id`, `inspection_report_id`, `stock_property_number`, `description`, `unit`, `quantity`, `created_at`, `updated_at`, `price`) VALUES
(9, 5, 'errm', 'school supply', 'unit', 23, '2025-03-13 05:37:41', '2025-03-13 05:37:41', 5000.00),
(10, 6, 'errm', 'school supply', 'unit', 23, '2025-03-13 05:40:51', '2025-03-13 05:40:51', 5000.00),
(11, 8, 'errm', 'school supply', 'unit', 23, '2025-03-13 05:41:08', '2025-03-13 05:41:08', 34.00),
(12, 9, 'errm', 'school supply', 'unit', 23, '2025-03-13 05:42:24', '2025-03-13 05:42:24', NULL),
(13, 10, NULL, 'school supply', 'unit', 23, '2025-03-13 05:42:31', '2025-03-13 05:42:31', NULL),
(14, 17, '123', 'manga', 'unit', 23, '2025-03-13 05:51:20', '2025-03-13 05:51:20', 123.00),
(15, 18, NULL, 'manga', 'unit', 23, '2025-03-13 05:51:30', '2025-03-13 05:51:30', NULL),
(16, 19, NULL, 'manga', 'unit', 23, '2025-03-13 05:52:15', '2025-03-13 05:52:15', NULL),
(17, 20, NULL, 'manga', 'unit', 23, '2025-03-13 05:53:01', '2025-03-13 05:53:01', NULL),
(18, 21, NULL, 'manga', 'unit', 23, '2025-03-13 05:57:32', '2025-03-13 05:57:32', NULL),
(19, 22, NULL, 'manga', 'unit', 23, '2025-03-13 06:12:26', '2025-03-13 06:12:26', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `inspectionofficers`
--

CREATE TABLE `inspectionofficers` (
  `id` int(11) NOT NULL,
  `inspection_report_id` int(11) NOT NULL,
  `officer_name` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inspectionofficers`
--

INSERT INTO `inspectionofficers` (`id`, `inspection_report_id`, `officer_name`, `role`, `created_at`, `updated_at`) VALUES
(4, 5, 'jovanie moreno', 'Unknown', '2025-03-13 05:37:41', '2025-03-13 05:37:41'),
(5, 6, 'jovanie moreno', 'Unknown', '2025-03-13 05:40:51', '2025-03-13 05:40:51'),
(6, 8, 'jovanie moreno', 'Unknown', '2025-03-13 05:41:08', '2025-03-13 05:41:08'),
(7, 9, 'jovanie moreno', 'Unknown', '2025-03-13 05:42:24', '2025-03-13 05:42:24'),
(8, 10, 'jovanie moreno', 'Unknown', '2025-03-13 05:42:31', '2025-03-13 05:42:31'),
(9, 17, 'angelo tabinas', 'Unknown', '2025-03-13 05:51:20', '2025-03-13 05:51:20'),
(10, 18, 'angelo tabinas', 'Unknown', '2025-03-13 05:51:30', '2025-03-13 05:51:30'),
(11, 19, 'angelo tabinas', 'Unknown', '2025-03-13 05:52:15', '2025-03-13 05:52:15'),
(12, 20, 'tabinas/officer', 'Unknown', '2025-03-13 05:53:01', '2025-03-13 05:53:01'),
(13, 21, 'jovanie moreno', 'Unknown', '2025-03-13 05:57:32', '2025-03-13 05:57:32'),
(14, 22, 'jovanie moreno', 'Unknown', '2025-03-13 06:12:26', '2025-03-13 06:12:26');

-- --------------------------------------------------------

--
-- Table structure for table `inspectionreport`
--

CREATE TABLE `inspectionreport` (
  `id` int(11) NOT NULL,
  `entity_name` varchar(255) NOT NULL,
  `fund_cluster` varchar(255) DEFAULT NULL,
  `supplier` varchar(255) NOT NULL,
  `iar_number` varchar(255) NOT NULL,
  `contract_number` varchar(255) DEFAULT NULL,
  `date` date NOT NULL,
  `requisitioning_office` varchar(255) NOT NULL,
  `invoice_number` varchar(255) NOT NULL,
  `responsibility_center_code` varchar(255) NOT NULL,
  `date_inspected` date NOT NULL,
  `inspection_status` tinyint(1) NOT NULL,
  `acceptance_status` varchar(255) NOT NULL,
  `supply_officer` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inspectionreport`
--

INSERT INTO `inspectionreport` (`id`, `entity_name`, `fund_cluster`, `supplier`, `iar_number`, `contract_number`, `date`, `requisitioning_office`, `invoice_number`, `responsibility_center_code`, `date_inspected`, `inspection_status`, `acceptance_status`, `supply_officer`, `created_at`, `updated_at`) VALUES
(5, ' DEPED Baybay City Division', 'asdf', 'PHILIPPINE CARABAO CENTER', '1231234', '1231234', '2025-03-13', 'SGOD-HNU', '3242345', 'asdasd2', '2025-03-15', 0, 'Full', 'frio', '2025-03-13 05:37:41', '2025-03-13 05:37:41'),
(6, ' DEPED Baybay City Division', 'wqes', 'PHILIPPINE CARABAO CENTER', '1231234', '1231234', '2025-03-13', 'SGOD-HNU', '3242345', 'asdasd2', '2025-03-15', 0, 'Full', 'frio', '2025-03-13 05:40:51', '2025-03-13 05:40:51'),
(8, ' DEPED Baybay City Division', 'wqes', 'PHILIPPINE CARABAO CENTER', '1231234', '1231234', '2025-03-13', 'SGOD-HNU', '3242345', 'asdasd2', '2025-03-15', 0, 'Full', 'frio', '2025-03-13 05:41:08', '2025-03-13 05:41:08'),
(9, ' DEPED Baybay City Division', 'wqes', 'PHILIPPINE CARABAO CENTER', '1231234', '1231234', '2025-03-13', 'SGOD-HNU', '3242345', 'asdasd2', '2025-03-15', 0, 'Full', 'frio', '2025-03-13 05:42:24', '2025-03-13 05:42:24'),
(10, ' DEPED Baybay City Division', 'wqes', 'PHILIPPINE CARABAO CENTER', '1231234', '1231234', '2025-03-13', 'SGOD-HNU', '3242345', 'asdasd2', '2025-03-15', 0, 'Full', 'frio', '2025-03-13 05:42:31', '2025-03-13 05:42:31'),
(17, 'asdaf', 'esfd', 'asdasd', '123123', 'sddsfdf', '2025-03-13', 'asdasdf', '123123', 'asdasf', '2025-03-22', 0, 'Full', 'frio omolon', '2025-03-13 05:51:20', '2025-03-13 05:51:20'),
(18, 'asdaf', 'asd', 'asdasd', '123123', 'sddsfdf', '2025-03-13', 'asdasdf', '123123', 'asdasf', '2025-03-22', 0, 'Full', 'frio omolon', '2025-03-13 05:51:30', '2025-03-13 05:51:30'),
(19, 'asdaf', 'asd', 'asdasd', '123123', 'sddsfdf', '2025-03-13', 'asdasdf', '123123', 'asdasf', '2025-03-22', 0, 'Full', 'frio omolon', '2025-03-13 05:52:15', '2025-03-13 05:52:15'),
(20, 'asdaf', 'asd', 'asdasd', '123123', 'sddsfdf', '2025-03-13', 'asdasdf', '123123', 'asdasf', '2025-03-22', 0, 'Full', 'frio omolon', '2025-03-13 05:53:01', '2025-03-13 05:53:01'),
(21, 'sdajjfka', NULL, 'jkansdn', '237324', 'snfbdksjf', '2025-03-13', 'cdu', '783812', 'jsbdasjd', '2025-03-15', 0, 'Full', 'frio omolon', '2025-03-13 05:57:32', '2025-03-13 05:57:32'),
(22, 'asdasd', NULL, 'asdsad', '12312', 'asdasd', '2025-03-13', 'asdaf', '123123', 'asdsad', '2025-03-18', 0, 'Full', 'froi omolon', '2025-03-13 06:12:26', '2025-03-13 06:12:26');

-- --------------------------------------------------------

--
-- Table structure for table `ris`
--

CREATE TABLE `ris` (
  `id` int(11) NOT NULL,
  `inspection_report_id` int(11) DEFAULT NULL,
  `division` varchar(100) DEFAULT NULL,
  `office` varchar(100) DEFAULT NULL,
  `ris_no` varchar(50) DEFAULT NULL,
  `purpose` text DEFAULT NULL,
  `requested_by` int(11) DEFAULT NULL,
  `approved_by` int(11) DEFAULT NULL,
  `issued_by` int(11) DEFAULT NULL,
  `received_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin') NOT NULL DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `lastName`, `contact`, `username`, `password`, `role`) VALUES
(1, 'moreno', 'moreno', '123123', 'moreno', 'moreno', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `inspectionitems`
--
ALTER TABLE `inspectionitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inspection_report_id` (`inspection_report_id`);

--
-- Indexes for table `inspectionofficers`
--
ALTER TABLE `inspectionofficers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inspection_report_id` (`inspection_report_id`);

--
-- Indexes for table `inspectionreport`
--
ALTER TABLE `inspectionreport`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ris`
--
ALTER TABLE `ris`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inspection_report_id` (`inspection_report_id`),
  ADD KEY `requested_by` (`requested_by`),
  ADD KEY `approved_by` (`approved_by`),
  ADD KEY `issued_by` (`issued_by`),
  ADD KEY `received_by` (`received_by`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `inspectionitems`
--
ALTER TABLE `inspectionitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `inspectionofficers`
--
ALTER TABLE `inspectionofficers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `inspectionreport`
--
ALTER TABLE `inspectionreport`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `ris`
--
ALTER TABLE `ris`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `inspectionitems`
--
ALTER TABLE `inspectionitems`
  ADD CONSTRAINT `inspectionitems_ibfk_1` FOREIGN KEY (`inspection_report_id`) REFERENCES `inspectionreport` (`id`);

--
-- Constraints for table `inspectionofficers`
--
ALTER TABLE `inspectionofficers`
  ADD CONSTRAINT `inspectionofficers_ibfk_1` FOREIGN KEY (`inspection_report_id`) REFERENCES `inspectionreport` (`id`);

--
-- Constraints for table `ris`
--
ALTER TABLE `ris`
  ADD CONSTRAINT `ris_ibfk_1` FOREIGN KEY (`inspection_report_id`) REFERENCES `inspectionreport` (`id`),
  ADD CONSTRAINT `ris_ibfk_2` FOREIGN KEY (`requested_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `ris_ibfk_3` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `ris_ibfk_4` FOREIGN KEY (`issued_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `ris_ibfk_5` FOREIGN KEY (`received_by`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
