-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 13-Out-2020 às 23:03
-- Versão do servidor: 10.4.14-MariaDB
-- versão do PHP: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `db_loc`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `cliente`
--

CREATE TABLE `cliente` (
  `cod_cli` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `telefone` varchar(50) NOT NULL,
  `endereco` varchar(50) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `login` varchar(20) NOT NULL,
  `senha` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `cliente`
--

INSERT INTO `cliente` (`cod_cli`, `nome`, `telefone`, `endereco`, `cpf`, `login`, `senha`) VALUES
(2, 'João c alberto', '992554548', 'Rua tocantins, 78', '12345687981', 'teste3', '123'),
(3, 'João', '992554548', 'Rua tocantins, 78', '', '', ''),
(4, 'Tereza', '51998447529', 'rua fonseca, 56', '', '', ''),
(25, 'João b alberto', '992554548', 'Rua tocantins, 78', '12345678914', 'teste1', '123'),
(40, 'Ati 400', '92546521', 'Rua ati, 67', '12345678913', 'teste2', 'teste'),
(41, 'Ati 400', '92546521', 'Rua ati, 67', '12345678915', 'teste5', 'teste'),
(42, 'Ati 400', '92546521', 'Rua ati, 67', '12345678917', 'teste4', 'teste');

-- --------------------------------------------------------

--
-- Estrutura da tabela `dvd`
--

CREATE TABLE `dvd` (
  `cod_dvd` int(11) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `valor` float NOT NULL,
  `locado` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `dvd`
--

INSERT INTO `dvd` (`cod_dvd`, `titulo`, `valor`, `locado`) VALUES
(1, 'De volta ao futuro', 5, 'N'),
(2, 'A volta dos que não foram', 7, 'S'),
(3, 'Dragon ball - o filme', 6, 'N'),
(4, 'Os vingadores - ultimato', 5.8, 'N'),
(10, 'Games os Thrones', 54, 'N'),
(12, 'Os vingadores - Throne', 2.8, 'S');

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedido`
--

CREATE TABLE `pedido` (
  `cod_pedido` int(11) NOT NULL,
  `dvd1` int(11) NOT NULL,
  `dvd2` int(11) NOT NULL,
  `dvd3` int(11) NOT NULL,
  `dvd4` int(11) NOT NULL,
  `dvd5` int(11) NOT NULL,
  `cod_cli` int(11) NOT NULL,
  `vencimento` date NOT NULL,
  `valortotal` float DEFAULT NULL,
  `situacao` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `pedido`
--

INSERT INTO `pedido` (`cod_pedido`, `dvd1`, `dvd2`, `dvd3`, `dvd4`, `dvd5`, `cod_cli`, `vencimento`, `valortotal`, `situacao`) VALUES
(1, 1, 0, 0, 0, 0, 1, '2020-10-25', 5, 'fechado'),
(48, 0, 2, 0, 4, 0, 1, '2020-10-18', 12.8, 'aberto'),
(61, 4, 0, 1, 0, 0, 1, '2020-10-18', 10.8, 'aberto'),
(62, 4, 0, 0, 0, 1, 2, '2020-10-18', 10.8, 'aberto'),
(63, 4, 0, 1, 0, 0, 2, '2020-10-18', 10.8, 'aberto'),
(64, 0, 0, 1, 0, 0, 2, '2020-10-18', 5, 'aberto');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`cod_cli`);

--
-- Índices para tabela `dvd`
--
ALTER TABLE `dvd`
  ADD PRIMARY KEY (`cod_dvd`);

--
-- Índices para tabela `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`cod_pedido`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cliente`
--
ALTER TABLE `cliente`
  MODIFY `cod_cli` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de tabela `dvd`
--
ALTER TABLE `dvd`
  MODIFY `cod_dvd` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `pedido`
--
ALTER TABLE `pedido`
  MODIFY `cod_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
