import { create } from 'zustand';

interface State {
	isOpenCancelDialog: boolean;
	id: number | undefined;
	setOpenCloseDialog: (value: boolean) => void;
	setAppointmentScore: (id: number) => void;
	clearState: () => void;
}

export const useAppointmentScore = create<State>()((set) => ({
	isOpenCancelDialog: false,
	id: undefined,
	notes: undefined,

	setOpenCloseDialog: (value: boolean) => {
		set({ isOpenCancelDialog: value });
	},
	setAppointmentScore: (id: number) => {
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
