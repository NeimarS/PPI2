CREATE TABLE cliente (
  cod_cli serial PRIMARY KEY,
  nome varchar(50) NOT NULL,
  telefone varchar(50) NOT NULL,
  endereco varchar(50) NOT NULL,
  cpf varchar(11) NOT NULL,
  login varchar(20) NOT NULL,
  senha varchar(20) NOT NULL
);

CREATE TABLE dvd (
  cod_dvd serial PRIMARY KEY,
  titulo varchar(50) NOT NULL,
  valor float NOT NULL,
  locado char(1) NOT NULL
);

CREATE TABLE pedido (
  cod_pedido serial PRIMARY KEY,
  dvd1 integer,
  dvd2 integer,
  dvd3 integer,
  dvd4 integer,
  dvd5 integer,
  cod_cli integer,
  vencimento date,
  valortotal float,
  situacao varchar(10)
);


INSERT INTO cliente (cod_cli, nome, telefone, endereco, cpf, login, senha) VALUES
(2, 'João c alberto', '992554548', 'Rua tocantins, 78', '12345687981', 'teste3', '123'),
(3, 'João', '992554548', 'Rua tocantins, 78', '', '', ''),
(4, 'Tereza', '51998447529', 'rua fonseca, 56', '', '', ''),
(25, 'João b alberto', '992554548', 'Rua tocantins, 78', '12345678914', 'teste1', '123'),
(40, 'Ati 400', '92546521', 'Rua ati, 67', '12345678913', 'teste2', 'teste'),
(41, 'Ati 400', '92546521', 'Rua ati, 67', '12345678915', 'teste5', 'teste'),
(42, 'Ati 400', '92546521', 'Rua ati, 67', '12345678917', 'teste4', 'teste');


INSERT INTO dvd (cod_dvd, titulo, valor, locado) VALUES
(1, 'De volta ao futuro', 5, 'N'),
(2, 'A volta dos que não foram', 7, 'S'),
(3, 'Dragon ball - o filme', 6, 'N'),
(4, 'Os vingadores - ultimato', 5.8, 'N'),
(10, 'Games os Thrones', 54, 'N'),
(12, 'Os vingadores - Throne', 2.8, 'S');

INSERT INTO pedido (cod_pedido, dvd1, dvd2, dvd3, dvd4, dvd5, cod_cli, vencimento, valortotal, situacao) VALUES
(1, 1, 0, 0, 0, 0, 1, '2020-10-25', 5, 'fechado'),
(48, 0, 2, 0, 4, 0, 1, '2020-10-18', 12.8, 'aberto'),
(61, 4, 0, 1, 0, 0, 1, '2020-10-18', 10.8, 'aberto'),
(62, 4, 0, 0, 0, 1, 2, '2020-10-18', 10.8, 'aberto'),
(63, 4, 0, 1, 0, 0, 2, '2020-10-18', 10.8, 'aberto'),
(64, 0, 0, 1, 0, 0, 2, '2020-10-18', 5, 'aberto');

