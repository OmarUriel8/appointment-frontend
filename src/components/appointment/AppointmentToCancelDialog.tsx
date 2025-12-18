'use client';

import { updateAppointmentStatus } from '@/actions';
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
import { useAppointmentToCancel } from '@/store';
import { useRef } from 'react';
import { toast } from 'sonner';

export const AppointmentToCancelDialog = () => {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const isOpenCancelDialog = useAppointmentToCancel((store) => store.isOpenCancelDialog);
	const setOpenCloseDialog = useAppointmentToCancel((store) => store.setOpenCloseDialog);
	const clearState = useAppointmentToCancel((store) => store.clearState);
	const id = useAppointmentToCancel((store) => store.id);

	const handleConfirmButton = async () => {
		if (!id) return;

		const notes = textAreaRef.current?.value ?? '';
		if (notes?.trim().length === 0) {
			toast.error('El motivo de cancelacion es requerido');
			return;
		}

		const { ok, message } = await updateAppointmentStatus(id, 'CANCELLED', notes);

		ok ? toast.success(message) : toast.error(message);

		setOpenCloseDialog(false);
		clearState();
	};

	return (
		<Dialog open={isOpenCancelDialog} onOpenChange={setOpenCloseDialog}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Cancelar cita #{id}</DialogTitle>
					<DialogDescription>Indica el motivo de la cancelación</DialogDescription>
				</DialogHeader>

				<Textarea ref={textAreaRef} placeholder="Motivo de cancelación" />

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

					<Button variant="destructive" onClick={handleConfirmButton}>
						Confirmar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
