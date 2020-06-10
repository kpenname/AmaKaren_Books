-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.6-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5995
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for amakaren_books
DROP DATABASE IF EXISTS `amakaren_books`;
CREATE DATABASE IF NOT EXISTS `amakaren_books` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `amakaren_books`;

-- Dumping structure for table amakaren_books.bookreview
DROP TABLE IF EXISTS `bookreview`;
CREATE TABLE IF NOT EXISTS `bookreview` (
  `bookReviewId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(10) unsigned NOT NULL,
  `bookId` int(10) unsigned NOT NULL,
  `reviewText` mediumtext NOT NULL,
  `recommended` enum('Yes','No') NOT NULL,
  `rating` set('1','2','3','4','5') NOT NULL,
  PRIMARY KEY (`bookReviewId`),
  KEY `bookId6` (`bookId`),
  KEY `userId` (`userId`),
  CONSTRAINT `bookId6` FOREIGN KEY (`bookId`) REFERENCES `books` (`bookId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table amakaren_books.bookreview: ~5 rows (approximately)
/*!40000 ALTER TABLE `bookreview` DISABLE KEYS */;
INSERT INTO `bookreview` (`bookReviewId`, `userId`, `bookId`, `reviewText`, `recommended`, `rating`) VALUES
	(8, 5, 8, 'The Hunger Games is a compelling novel focusing on life in an authoritarian society in which young people must compete to the death in the annual Hunger Games.', 'Yes', '5'),
	(9, 7, 19, 'Exciting, violent dystopian thriller is original, addictive.', 'Yes', '5'),
	(10, 9, 10, 'Gone with the Wind is a brilliant book that challenges the sexism and racism of its day.', 'Yes', '4'),
	(12, 8, 12, 'The Giving Tree by Shel Silverstein is a fictional poetic picture book. It is about a symbolist relationship between a loving tree that gives and gives to a selfish little boy.', 'Yes', '5'),
	(13, 9, 9, 'The Book Thief is the kind of novel that continues to stay with you long after you have finished reading.', 'Yes', '4');
/*!40000 ALTER TABLE `bookreview` ENABLE KEYS */;

-- Dumping structure for table amakaren_books.books
DROP TABLE IF EXISTS `books`;
CREATE TABLE IF NOT EXISTS `books` (
  `bookId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(10) unsigned NOT NULL,
  `title` text NOT NULL,
  `author` varchar(50) NOT NULL,
  `genre` set('Action','Romance','Horror','Crime','Fantasy','SciFi','Poetry','Drama','Children') NOT NULL,
  `yearPub` int(11) NOT NULL,
  `pages` int(11) NOT NULL,
  `available` enum('Yes','No') NOT NULL,
  PRIMARY KEY (`bookId`),
  KEY `userid4` (`userId`),
  CONSTRAINT `userid4` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table amakaren_books.books: ~24 rows (approximately)
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` (`bookId`, `userId`, `title`, `author`, `genre`, `yearPub`, `pages`, `available`) VALUES
	(5, 2, 'Pride and Prejudice', 'Jane Austen ', 'Drama', 1994, 261, 'Yes'),
	(6, 2, 'To Kill a Mockingbird', 'Harper Lee ', 'Action', 2001, 183, 'Yes'),
	(7, 5, 'Harry Potter and the Order of the Phoenix', ' J.K. Rowling ', 'Horror', 2002, 241, 'Yes'),
	(8, 5, ' The Hunger Games', 'Suzanne Collins ', 'Action', 2018, 184, 'Yes'),
	(9, 9, 'The Book Thief', ' Markus Zusak', 'Drama', 2011, 201, 'Yes'),
	(10, 9, 'Gone with the Wind', 'Margaret Mitchell ', 'Romance', 2009, 263, 'Yes'),
	(11, 8, 'The Fault in Our Stars', ' John Green', 'SciFi', 2019, 145, 'Yes'),
	(12, 8, 'The Giving Tree', ' Shel Silverstein ', 'Poetry', 2012, 195, 'Yes'),
	(14, 4, 'The Hitchhiker\'s Guide to the Galaxy ', 'Douglas Adams ', 'Fantasy', 2014, 231, 'Yes'),
	(15, 4, 'Memoirs of a Geisha', ' Arthur Golden ', 'Romance', 2016, 139, 'Yes'),
	(16, 13, 'Alice\'s Adventures in Wonderland ', ' Lewis Carroll ', 'Children', 2003, 141, 'Yes'),
	(17, 13, 'Jane Eyre', 'Charlotte Brontë ', 'Children', 2005, 265, 'Yes'),
	(18, 7, 'Les Misérables', 'Victor Hugo ', 'Fantasy', 2013, 182, 'Yes'),
	(19, 7, 'Divergent ', 'Veronica Roth ', 'Horror', 2003, 185, 'Yes'),
	(20, 6, 'The Grapes of Wrath', ' John Steinbeck', 'Action', 2015, 201, 'Yes'),
	(21, 6, 'Lord of the Flies', ' William Golding ', 'Horror', 1998, 174, 'Yes'),
	(22, 12, 'Animal Farm', ' George Orwell', 'Drama', 1996, 193, 'Yes'),
	(23, 15, 'The Hobbit, or There and Back Again', 'J.R.R. Tolkien ', 'Children', 2012, 104, 'Yes'),
	(24, 15, 'Brave New World', 'Aldous Huxley ', 'SciFi', 2020, 237, 'Yes'),
	(25, 3, 'Crime and Punishment', ' Fyodor Dostoyevsky', 'Crime', 1999, 204, 'Yes'),
	(26, 10, 'Slaughterhouse-Five', ' Kurt Vonnegut Jr. ', 'Fantasy', 2007, 167, 'Yes'),
	(27, 14, 'The Adventures of Huckleberry Finn', 'Mark Twain', 'Drama', 2001, 181, 'Yes'),
	(28, 11, 'Great Expectations ', ' Charles Dickens', 'Fantasy', 1991, 153, 'Yes'),
	(29, 10, 'The Stranger', 'Albert Camus ', 'Drama', 2003, 167, 'Yes');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;

-- Dumping structure for table amakaren_books.message
DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `messageId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `message` varchar(255) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `dateSent` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`messageId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table amakaren_books.message: ~3 rows (approximately)
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` (`messageId`, `message`, `email`, `dateSent`) VALUES
	(1, 'I really love this site!', 'kiki@mail.com', '2020-06-08 17:01:49'),
	(8, 'Great', 'kiki@mail.com', '2020-06-08 17:52:35'),
	(9, 'I think this is really great!', 'mailer@mail.com', '2020-06-08 20:43:55');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;

-- Dumping structure for table amakaren_books.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `userId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `userName` varchar(50) DEFAULT NULL,
  `passWord` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `address` varchar(128) DEFAULT '',
  `City` varchar(25) DEFAULT NULL,
  `province` set('QC','ON','AB','MN','BC','NB','SK','PE','NS','NL') DEFAULT NULL,
  `postCode` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table amakaren_books.users: ~22 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`userId`, `firstName`, `lastName`, `userName`, `passWord`, `email`, `phone`, `address`, `City`, `province`, `postCode`) VALUES
	(2, 'Amy', 'lewis', 'alewis', '1234', 'amy@gmail.com', 2522, '397 Blvd Cite des Jeunes', 'Gatineau', 'QC', 'J8Y6L4'),
	(3, 'Peter ', 'Rosato', 'prosato', 'abcd', 'dakota.spor@yahoo.com', 3522, '141 Boulevard du Mont bleu', 'Gatineau', 'QC', 'J8Z1K2'),
	(4, 'Brianna', 'Hall', 'bhall', '1234', 'b.hall@randatmail.com', 2144, '9 Rue Talbot', 'Gatineau', 'QC', 'J8Z1LB'),
	(5, 'Adele', 'Rogers', 'arogers', 'abcd', 'a.rogers@randatmail.com', 2355, '63 Rue Lemieux', 'Gatineau', 'QC', 'J8Z1G7'),
	(6, 'Derek', 'Gray', 'dgray', '1234', 'd.gray@randatmail.com', 5477, '76 Rue Pelletier', 'Gatineau', 'QC', 'J8L1C5'),
	(7, 'Eric', 'Morgan', 'emorgan', 'abcd', 'e.morgan@randatmail.com', 3554, '369 Boulevard Riel', 'Gatineau', 'QC', 'J8Z1B3'),
	(8, 'Annabella', 'Henderson', 'ahenderson', '1234', 'a.henderson@randatmail.com', 3223, '320 Rue Francois de Levis', 'Gatineau', 'QC', 'J8Z1A4'),
	(9, 'Catherine', 'Farrell', 'cfarrell', 'abcd', 'c.farrell@randatmail.com', 5465, '71 Rue d\'Orsonnens', 'Gatineau', 'QC', 'J8Y6H8'),
	(10, 'Richard', 'Ellis', 'rellis', '1234', 'r.ellis@randatmail.com', 9874, '311 Rue Francois de Levis', 'Gatineau', 'QC', 'J8Z1A3'),
	(11, 'Vanessa', 'Hunt', 'vhunt', 'abcd', 'v.hunt@randatmail.com', 6545, '4 Rue Alie', 'Gatineau', 'QC', 'J8Z1M9'),
	(12, 'Michael', 'Nelson', 'mnelson', '1234', 'm.nelson@randatmail.com', 8497, '145 Rue Jolicoeur', 'Gatineau', 'QC', 'J8Z1C8'),
	(13, 'Dale', 'Mason', 'dmason', 'abcd', 'd.mason@randatmail.com', 9954, '37 Rue Bernier', 'Gatineau', 'QC', 'J8Z1E7'),
	(14, 'Robert', 'Higgins', 'rhiggins', '1234', 'r.higgins@randatmail.com', 3259, '35 Rue Hinchey', 'Gatineau', 'QC', 'J8Z1H1'),
	(15, 'Paul', 'Brown', 'pbrown', 'abcd', 'p.brown@randatmail.com', 5412, '86 Rue Boucher', 'Gatineau', 'QC', 'J8Y6G6'),
	(27, NULL, NULL, 'samIam', '456', NULL, NULL, '', NULL, NULL, NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for table amakaren_books.wishlist
DROP TABLE IF EXISTS `wishlist`;
CREATE TABLE IF NOT EXISTS `wishlist` (
  `wishlistId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(10) unsigned NOT NULL DEFAULT 0,
  `title` varchar(100) DEFAULT '0',
  `author` varchar(100) DEFAULT '0',
  PRIMARY KEY (`wishlistId`),
  KEY `wishlist_userId` (`userId`),
  CONSTRAINT `wishlist_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table amakaren_books.wishlist: ~0 rows (approximately)
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
