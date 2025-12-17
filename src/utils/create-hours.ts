// Genera horas desde 06:00 a 22:00
export const createHours = () => {
	return Array.from({ length: 15 }, (_, i) => {
		const h = i + 8;
		return `${h.toString().padStart(2, '0')}:00`;
	});
};
