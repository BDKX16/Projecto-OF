export function formatDateToString(dateString) {
  if (!dateString) {
    return "Sin fecha";
  }
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  let dayString = day.toString();
  if (day === 1) {
    dayString += "ro";
  }

  return `${dayString} de ${month} ${year}`;
}

export function timeSince(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);

  const intervals = {
    mes: 2592000,

    semana: 604800,

    día: 86400,

    hora: 3600,

    minuto: 60,

    segundo: 1,

    minuto: 60,
    segundo: 1,
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / value);

    if (interval >= 1) {
      return `Hace ${interval} ${unit}${
        interval > 1 ? (unit == "mes" ? "es" : "s") : ""
      }`;
    }
  }

  return "Justo ahora";
}
