import { create } from 'zustand';

interface State {
	isOpenCancelDialog: boolean;
	id: number | undefined;
	setOpenCloseDialog: (value: boolean) => void;
	setAppointmentToCancel: (id: number) => void;
	clearState: () => void;
}

export const useAppointmentToCancel = create<State>()((set) => ({
	isOpenCancelDialog: false,
	id: undefined,
	notes: undefined,

	setOpenCloseDialog: (value: boolean) => {
		set({ isOpenCancelDialog: value });
	},
	setAppointmentToCancel: (id: number) => {
		set({
			id: id,
		});
	},
	clearState: () => {
		set({
			id: undefined,
		});
	},
}));
