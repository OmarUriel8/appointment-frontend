'use client';
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
	Label,
} from '@/components';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface Props {
	titleButton: string;
	title: string;
	description: string;
	children: React.ReactNode;
}

export const CustomDialog = ({ title, titleButton, description, children }: Props) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button className="btn-primary">
					<Plus className="mr-2 h-4 w-4" />
					{titleButton}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{children}
				{/* <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
					Cancelar
				</Button> */}
			</DialogContent>
		</Dialog>
	);
};
