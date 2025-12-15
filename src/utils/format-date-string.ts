export const formatDateString = (dateStr: string) => {
	const date = new Date(`${dateStr}T00:00:00`);
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');

	return `${year}-${month}-${day}`;
};
