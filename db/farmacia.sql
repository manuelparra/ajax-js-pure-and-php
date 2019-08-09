-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 09-08-2019 a las 19:59:05
-- Versión del servidor: 5.7.27-0ubuntu0.18.04.1
-- Versión de PHP: 7.2.19-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `farmacia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`id`, `nombre`) VALUES
(1, 'Anzoategui'),
(2, 'Valencia'),
(3, 'Zulia'),
(4, 'Trujillo'),
(5, 'Merida');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `insumo`
--

CREATE TABLE `insumo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `insumo`
--

INSERT INTO `insumo` (`id`, `nombre`) VALUES
(1, 'Bral'),
(2, 'Migren'),
(3, 'Buscapina'),
(4, 'Atorvastatina'),
(5, 'Eno'),
(6, 'Coraspirina'),
(7, 'Tachifort'),
(8, 'Atamel');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursal`
--

CREATE TABLE `sucursal` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `id_estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sucursal`
--

INSERT INTO `sucursal` (`id`, `nombre`, `direccion`, `id_estado`) VALUES
(1, 'Lecheria', 'Av. Josefa Camejo', 1),
(2, 'Puerto La Cruz', 'Av. Independencia', 1),
(3, 'Cabimas', 'Av. principal', 3),
(4, 'Maracaibo', 'Av. Delicias', 3),
(5, 'Valera', 'Av. Libertador', 4),
(6, 'Merida', 'Av. Las americas', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursal_insumo`
--

CREATE TABLE `sucursal_insumo` (
  `id` int(11) NOT NULL,
  `existencia` int(11) NOT NULL,
  `idsucursal` int(11) NOT NULL,
  `idinsumo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sucursal_insumo`
--

INSERT INTO `sucursal_insumo` (`id`, `existencia`, `idsucursal`, `idinsumo`) VALUES
(1, 5, 1, 1),
(2, 4, 1, 2),
(7, 20, 2, 1),
(8, 15, 2, 3),
(11, 2, 2, 4),
(12, 60, 3, 5),
(13, 3, 4, 1),
(14, 1, 4, 8),
(19, 33, 5, 7),
(20, 23, 6, 6);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `insumo`
--
ALTER TABLE `insumo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sucursal`
--
ALTER TABLE `sucursal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_estado` (`id_estado`);

--
-- Indices de la tabla `sucursal_insumo`
--
ALTER TABLE `sucursal_insumo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idsucursal_2` (`idsucursal`,`idinsumo`),
  ADD UNIQUE KEY `id` (`id`,`idsucursal`,`idinsumo`),
  ADD KEY `idinsumo` (`idinsumo`),
  ADD KEY `idsucursal` (`idsucursal`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `insumo`
--
ALTER TABLE `insumo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `sucursal`
--
ALTER TABLE `sucursal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `sucursal_insumo`
--
ALTER TABLE `sucursal_insumo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
