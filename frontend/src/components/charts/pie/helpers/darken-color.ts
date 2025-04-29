// Función para oscurecer un color dado en formato hexadecimal o RGB
// Útil en la etiqueta central del gráfico para mejorar la visibilidad al usuario
export const darkenColor = (color: string, percent: number): string => {
  let r: number;
  let g: number;
  let b: number;

  // Manejo de color en formato hexadecimal
  if (color.startsWith('#')) {
    const bigint = parseInt(color.slice(1), 16);
    r = (bigint >> 16) & 255;
    g = (bigint >> 8) & 255;
    b = bigint & 255;
  } else {
    // Manejo de color en formato RGB
    const rgb = color.match(/\d+/g);
    r = rgb ? parseInt(rgb[0]) : 0;
    g = rgb ? parseInt(rgb[1]) : 0;
    b = rgb ? parseInt(rgb[2]) : 0;
  }

  // Oscurecer color
  r = Math.max(0, Math.floor(r * (1 - percent / 100)));
  g = Math.max(0, Math.floor(g * (1 - percent / 100)));
  b = Math.max(0, Math.floor(b * (1 - percent / 100)));

  return `rgb(${r}, ${g}, ${b})`;
};
