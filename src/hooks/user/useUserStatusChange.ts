import { updateStatusUser } from '@/actions';
import { useState } from 'react';
import { toast } from 'sonner';

export const useUserStatusChange = (tipo: string) => {
	const [isLoading, setIsLoading] = useState(false);

	const handleChangeStatus = async (id: string, isActive: boolean) => {
		setIsLoading(true);

		const { ok, message, user } = await updateStatusUser({
			id,
			isActive: isActive,
		});
		//console.log({ ok, message, user });
		if (ok) {
			toast.success(`${tipo} ${isActive ? 'activado' : 'inactivado'}`);
		}
		setIsLoading(false);
	};

	return {
		isLoading,
		handleChangeStatus,
	};
};
