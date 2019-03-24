export const formatHours = (hours) => hours % 1 ? `${Math.floor(hours)}H ${Math.floor(hours % 1 * 60)}M` : `${Math.floor(hours)}H`;
