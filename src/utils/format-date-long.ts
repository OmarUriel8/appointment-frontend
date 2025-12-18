export const formatDateLong = (date: string) => {
	console.log(date);
	const newDate = new Date(`${date}T00:00:00`).toLocaleDateString('es-MX', {
		dateStyle: 'long',
	});

	return newDate;
};
