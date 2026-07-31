export function convertArrayToRgba(arr, opacityOverride = null) {
  if (!Array.isArray(arr)) {
    return 'rgba(120, 120, 120, 1)';
  }
  const r = arr[0] ?? 120;
  const g = arr[1] ?? 120;
  const b = arr[2] ?? 120;
  let a = (arr[3] ?? 255) / 255;

  if (opacityOverride !== null) {
    a = opacityOverride;
  }

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function getColorWithOpacity(color, opacity) {
  if (Array.isArray(color)) {
    return convertArrayToRgba(color, opacity);
  }
  if (typeof color === 'string') {
    if (color.startsWith('#')) {
      const cleanHex = color.replace('#', '');
      const r = parseInt(cleanHex.substring(0, 2), 16);
      const g = parseInt(cleanHex.substring(2, 4), 16);
      const b = parseInt(cleanHex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    if (color.startsWith('rgba')) {
      return color.replace(/,[\s\d.]+\)$/, `, ${opacity})`);
    }
    return color;
  }
  return `rgba(255, 255, 255, ${opacity})`;
}

export default convertArrayToRgba;
