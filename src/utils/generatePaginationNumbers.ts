export const generatePaginationNumber = (currentPage: number, totalPages: number) => {
	// si el numero total de paginas es 7 o menos
	//vamos a mostrar totdas las paginas sin puntos suspensivos
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	// si la pagina acutal esta entre las primeras 3 paginas
	// mostrar las primeras 3, puntos suspensivos y ultimas 2
	if (currentPage <= 3) {
		return [1, 2, 3, '...', totalPages - 1, totalPages];
	}

	// si la pagina actual entre las ultimas 3 paginas
	// mostar las primeras 2, puntos suspensivos, las ultimas 3

	if (currentPage >= totalPages - 2) {
		return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
	}

	// si la pagina actual esta en otro lugar medio
	// mostrar la primera pagina, puntos suspensivos, la pagina actual y vecinos
	return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};

// hecho con ia
export const createPagination = (page: number, totalPages: number) => {
	const pages: (number | string)[] = [];

	// Siempre mostrar las primeras 3 páginas
	for (let i = 1; i <= Math.min(3, totalPages); i++) {
		pages.push(i);
	}

	// Insertar "..." si hay salto antes de la página actual
	if (page > 5) {
		pages.push('left-ellipsis');
	}

	// Mostrar páginas alrededor de la actual
	for (let i = Math.max(4, page - 1); i <= Math.min(totalPages - 3, page + 1); i++) {
		pages.push(i);
	}

	// Insertar "..." si hay salto después de la página actual
	if (page < totalPages - 4) {
		pages.push('right-ellipsis');
	}

	// Siempre mostrar las últimas 3 páginas
	for (let i = Math.max(totalPages - 2, 4); i <= totalPages; i++) {
		if (i > 3) pages.push(i);
	}

	return pages;
};
