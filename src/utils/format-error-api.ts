export const formatErrorAPI = (err: any) => {
	let errorMessage = '';
	// Verifica si el error tiene la estructura de tu backend con un array de mensajes
	if (err.message && Array.isArray(err.message)) {
		// Une todos los mensajes en una sola cadena, separados por un punto y espacio.
		errorMessage = err.message.join('. ');
	} else if (err.message) {
		// Si es un error simple, usa ese mensaje
		errorMessage = err.message;
	}

	// Lanza la excepción con el mensaje de error unificado
	throw new Error(errorMessage);
};
