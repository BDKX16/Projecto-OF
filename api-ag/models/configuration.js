const mongoose = require("mongoose");
/**
 * Configuración del esquema para el modelo de configuración del sitio web.
 *
 * Posibles configuraciones que suele tener un sitio web:
 * - siteTitle: Título del sitio web.
 * - siteDescription: Descripción del sitio web.
 * - adminEmail: Correo electrónico del administrador.
 * - itemsPerPage: Número de elementos por página.
 * - maintenanceMode: Modo de mantenimiento (true/false).
 * - theme: Tema del sitio web (e.g., 'light', 'dark').
 * - logoUrl: URL del logo del sitio web.
 * - footerText: Texto del pie de página.
 * - socialLinks: Enlaces a redes sociales (e.g., Facebook, Twitter).
 * - analyticsId: ID de Google Analytics.
 * - contactPhone: Número de teléfono de contacto.
 * - contactEmail: Correo electrónico de contacto.
 * - address: Dirección física del negocio.
 * - currency: Moneda utilizada en el sitio web (e.g., 'USD', 'EUR').
 * - language: Idioma predeterminado del sitio web (e.g., 'en', 'es').
 */

const configuracionSchema = new mongoose.Schema({
  clave: {
    type: String,
    required: true,
    unique: true,
  },
  valor: {
    type: String,
    required: true,
  },
});

const Configuration = mongoose.model("Configuracion", configuracionSchema);

module.exports = Configuration;
