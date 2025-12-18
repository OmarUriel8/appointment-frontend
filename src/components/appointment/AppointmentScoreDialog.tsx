'use client';

import { updateAppointmentScore } from '@/actions';
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Textarea,
} from '@/components';
import { cn } from '@/lib/utils';
import { useAppointmentScore } from '@/store';
import { Star } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

export const AppointmentScoreDialog = () => {
	const [score, setScore] = useState(0);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const isOpenCancelDialog = useAppointmentScore((store) => store.isOpenCancelDialog);
	const setOpenCloseDialog = useAppointmentScore((store) => store.setOpenCloseDialog);
	const clearState = useAppointmentScore((store) => store.clearState);
	const id = useAppointmentScore((store) => store.id);

	const handleConfirmButton = async () => {
		if (!id) return;

		if (score === 0) {
			toast.error('Por favor selecciona una calificación');
			return;
		}

		const comments = textAreaRef.current?.value ?? '';
		if (comments?.trim().length === 0) {
			toast.error('El motivo de cancelacion es requerido');
			return;
		}

		const { ok, message } = await updateAppointmentScore({ id, comments, score });

		ok ? toast.success(message) : toast.error(message);

		setScore(0);
		setOpenCloseDialog(false);
		clearState();
	};

	return (
		<Dialog open={isOpenCancelDialog} onOpenChange={setOpenCloseDialog}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Calificar cita #{id}</DialogTitle>
					<DialogDescription>
						¿Cómo fue tu experiencia? Tu opinión nos ayuda a mejorar.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col items-center py-4 gap-4">
					{/* Componente de estrella */}
					<div className="flex gap-1">
						{[1, 2, 3, 4, 5].map((star) => (
							<button
								key={star}
								type="button"
								onClick={() => setScore(star)}
								className="transition-transform hover:scale-110 active:scale-95"
							>
								<Star
									className={cn(
										'h-8 w-8 transition-colors',
										star <= score
											? 'fill-yellow-400 text-yellow-400'
											: 'text-muted-foreground opacity-30'
									)}
								/>
							</button>
						))}
					</div>
					<span className="text-sm font-medium text-muted-foreground">
						{score > 0 ? `${score} de 5 estrellas` : 'Selecciona una puntuación'}
					</span>
				</div>

				<Textarea
					ref={textAreaRef}
					placeholder="Cuéntanos más detalles sobre el servicio..."
					className="min-h-[100px]"
				/>

				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => {
							setOpenCloseDialog(false);
							clearState();
						}}
					>
						Cancelar
					</Button>
					<Button className="btn-success" onClick={handleConfirmButton}>
						Confirmar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
