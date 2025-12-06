import { Testimonial } from '@/interfaces';

export const benefits = [
	{
		id: 1,
		title: 'Registro y Gestión Total de Citas',
		description: `Crea tu perfil y administra personalmente todas tus reservas desde una única
              plataforma (agendar, modificar o cancelar)`,
	},
	{
		id: 2,
		title: 'Seguimiento Detallado del Historial',
		description: `Visualiza el estado de tus citas (confirmada, pendiente, completada,
              cancelada) y consulta el historial completo de servicios recibidos.`,
	},
	{
		id: 3,
		title: 'Disponibilidad en Tiempo Real',
		description: `Consulta horarios de disponibilidad actualizados al instante y reserva sin
              preocuparte por sobrecargas o esperas innecesarias.`,
	},
];

export const howFuntion = [
	{
		id: 1,
		title: 'Encuentra el Servicio',
		descripption: `Explora los servicios disponibles, selecciona al profesional de tu preferencia y elige la fecha y hora que mejor se ajusten a tu agenda.`,
	},
	{
		id: 2,
		title: 'Confirma y Regístrate',
		descripption: `Completa tu perfil por primera vez o inicia sesión. Revisa los detalles y confirma tu reserva.`,
	},
	{
		id: 3,
		title: 'Gestiona tu Agenda',
		descripption: `Accede a tu panel personal para ver el estado de tu cita, modificarla o cancelarla si es necesario. ¡Mantén el control total de tu historial!`,
	},
];

export const testimonialsMook: Testimonial[] = [
	{
		id: '1',
		name: 'Daniela G.',
		comments: 'El proceso para agendar fue rapidísimo. ¡Excelente servicio!',
		score: 4,
	},
	{
		id: '2',
		name: 'Ricardo M.',
		comments: 'Me encantó que recibí recordatorio antes de mi cita. Muy útil.',
		score: 4.3,
	},
	{
		id: '3',
		name: 'Sofía L.',
		comments: 'La atención y la facilidad para reservar lo hacen mi plataforma favorita.',
		score: 4.5,
	},
];
