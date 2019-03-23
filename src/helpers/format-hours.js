export default (hours) => hours % 1 ? `${hours}H ${hours % 1 * 60}M` : `${hours}H`;
