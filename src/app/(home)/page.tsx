export const revalidate = 604800; // 7 dias

import { getServicePagination, getTestimonials } from '@/actions';
import { Hero, ServiceCard, ServiceGrid } from '@/components';
import { titleFont } from '@/config/font';
import { benefits, howFuntion } from '@/config/information.data';
import { cn } from '@/lib/utils';

export default async function HomePage() {
	const { services } = await getServicePagination({ page: 1, limit: 3, query: '' });
	const arrayTestimonials = await getTestimonials(3);

	return (
		<>
			{/* Sección destacada */}
			<Hero />
			{/* Lista de servicios */}
			<section id="services" className="m-12">
				<h2 className={cn('mb-8 text-3xl font-bold text-center', titleFont.className)}>
					Algunos de Nuestros Servicios
				</h2>

				<ServiceGrid services={services} />
			</section>

			<section className="py-16">
				<h2 className="text-3xl font-bold text-center mb-10">Beneficios</h2>

				<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
					{benefits.map(({ title, description, id }) => (
						<div className="p-6 border rounded-2xl bg-muted shadow-sm" key={id}>
							<h3 className="text-xl font-semibold mb-2 text-slate-700">{title}</h3>
							<p className="text-muted-foreground">{description}</p>
						</div>
					))}
				</div>
			</section>

			<section className="py-20 bg-accent/30 mt-10">
				<h2 className="text-3xl font-bold text-center mb-12">¿Cómo funciona?</h2>

				<div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
					{howFuntion.map(({ id, title, descripption }) => (
						<div className="text-center" key={id}>
							<div className="text-primary text-5xl font-bold mb-4">{id}</div>
							<h3 className="text-xl font-semibold mb-2">{title}</h3>
							<p className="dark:text-gray-400 text-muted-foreground">{descripption}</p>
						</div>
					))}
				</div>
			</section>

			{/* testimonios */}
			<section className="py-20">
				<h2 className="text-3xl font-bold text-center mb-12">Testimonios</h2>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{arrayTestimonials.map(({ comments, id, name }) => (
						<div
							key={id}
							className="p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition"
						>
							<p className="text-muted-foreground italic mb-4">“{comments}”</p>
							<p className="font-semibold text-foreground">— {name}</p>
						</div>
					))}
				</div>
			</section>

			<section className="py-20">
				<h2 className="text-3xl font-bold text-center mb-10">Horario y Ubicación</h2>

				<div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
					{/* Horario */}
					<div className="p-8 border rounded-2xl shadow-sm bg-white">
						<h3 className="text-xl font-semibold mb-4 text-black">Horario de Atención</h3>
						<ul className="text-muted-foreground space-y-2">
							<li>Lunes a Viernes: 9:00 AM – 7:00 PM</li>
							<li>Sábado: 10:00 AM – 4:00 PM</li>
							<li>Domingo: Cerrado</li>
						</ul>
					</div>

					{/* Ubicación */}
					<div className="p-8 border rounded-2xl shadow-sm bg-white">
						<h3 className="text-xl font-semibold mb-4 text-black">Ubicación</h3>
						<p className="text-muted-foreground mb-4">
							Av. Principal #123, Colonia Centro, Ciudad de México
						</p>

						{/* Google Maps embed */}
						<div className="w-full h-56 rounded-xl overflow-hidden">
							<iframe
								//src="https://www.google.com/maps/embed?pb=!1m18!2m3!3m2!1sen!2smx!"
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.736937781019!2d-99.1690286239486!3d19.42698528184657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd1563%3A0x6c366f0e2de02ff7!2sEl%20%C3%81ngel%20de%20la%20Independencia!5e0!3m2!1ses!2smx!4v1700250000000!5m2!1ses!2smx"
								width="100%"
								height="100%"
								loading="lazy"
							></iframe>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
