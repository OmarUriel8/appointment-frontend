import { Testimonial } from '@/interfaces';
import { baseUrl } from './api.config';
import { testimonialsMook } from '@/config/information.data';

export const getTestimonials = async (limit: number): Promise<Testimonial[]> => {
	if (isNaN(Number(limit))) limit = 3;
	if (+limit < 1) limit = 3;

	const resp = await fetch(`${baseUrl}/appointment/testimonials`);

	if (!resp.ok) {
		return testimonialsMook;
	}

	const testimonials: Testimonial[] = await resp.json();

	return testimonials.length === 0 ? testimonialsMook : testimonials;
};
