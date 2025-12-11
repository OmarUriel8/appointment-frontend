'use client';

import { createUpdateService } from '@/actions';
import { Button, Card, CardContent, Checkbox, Input } from '@/components';
import { Service } from '@/interfaces';
import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';
import { Plus, Save, Tag, Upload, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Props {
	service?: Service;
	slug: string;
}

interface InputForm extends Service {
	files: File[];
	imagesRemove: string[];
}

export const ServiceForm = ({ service, slug }: Props) => {
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const tagRef = useRef<HTMLInputElement>(null);

	const [dragActive, setDragActive] = useState(false);
	const [files, setFiles] = useState<File[]>([]);

	const {
		handleSubmit,
		formState: { errors },
		register,
		control,
		watch,
		getValues,
		setValue,
		reset,
	} = useForm<InputForm>({
		defaultValues: { ...service, imagesRemove: [], files: [], images: service?.images },
	});

	const selectedTags = watch('tags');
	const selectedImages = watch('images');

	useEffect(() => {
		setFiles([]);
		//reset(service); // fuerza que los valores del form se actualicen. Por las imagenes le agregue la funcion de eliminar
	}, [service]); //reset

	const addTag = () => {
		const value = tagRef.current?.value.toLocaleLowerCase().replace(',', '').trim() || '';

		if (value === '') return;

		const tagSet = new Set(getValues('tags'));
		tagSet.add(value);
		setValue('tags', Array.from(tagSet));
	};

	const removeTag = (tagToRemove: string) => {
		const tagSet = new Set(getValues('tags'));
		tagSet.delete(tagToRemove);
		setValue('tags', Array.from(tagSet));
	};

	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true);
		} else if (e.type === 'dragleave') {
			setDragActive(false);
		}
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		const files = e.dataTransfer.files;

		if (!files) return;

		setFiles((prev) => [...prev, ...Array.from(files)]);
		const curretFiles = getValues('files') || [];
		setValue('files', [...curretFiles, ...Array.from(files)]);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;

		if (!files) return;

		setFiles((prev) => [...prev, ...Array.from(files)]);
		const curretFiles = getValues('files') || [];
		setValue('files', [...curretFiles, ...Array.from(files)]);
	};

	const removeImage = (image: string) => {
		const newImages = getValues('images').filter((img) => img !== image) || [];
		setValue('images', newImages);
		const removeImages = getValues('imagesRemove');
		console.log(removeImages);
		setValue('imagesRemove', [...(removeImages ?? []), image]);
	};

	const removeUploadedImage = (fileRemove: File) => {
		const newImages = files.filter(
			(file) => file.lastModified !== fileRemove.lastModified
		);
		setFiles([...newImages]);
		setValue('files', newImages);
	};

	const onSubmit = async (data: InputForm) => {
		const { imagesRemove, ...serviceLike } = data;
		setLoading(true);

		const resp = await createUpdateService({
			slugParam: slug,
			serviceLike,
			imagesRemove,
		});

		if (!resp.ok) {
			setErrorMessage(resp.message);
			setLoading(false);
			return;
		}

		let messageSuccess = slug === 'new' ? `Servicio creado` : 'Servicio actualizado';
		toast.success(messageSuccess);
		setLoading(false);
		router.replace(`/admin/services/${resp.service?.slug}`);
	};
	return (
		<Card>
			<CardContent className="w-full">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="grid gap-6 grid-cols-1 lg:grid-cols-2"
				>
					<div className="col-span-2 lg:col-span-1">
						<div className="space-y-2">
							<Label htmlFor="name">Nombre servicio</Label>
							<Input
								type="text"
								id="name"
								placeholder="Nombre Servicio"
								{...register('name', { required: true })}
							/>
							<div className="h-5">
								{errors.name && (
									<p className="text-sm font-medium text-red-500">
										El nombre es requerido
									</p>
								)}
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="description">Descripción del servicio</Label>
							<Input
								type="text"
								id="description"
								placeholder="Descripción"
								{...register('description', { required: true })}
							/>
							<div className="h-5">
								{errors.description && (
									<p className="text-sm font-medium text-red-500">
										La descripción es requerida
									</p>
								)}
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="slug">Slug servicio</Label>
							<Input
								type="text"
								id="slug"
								placeholder="Slug"
								{...register('slug', {
									validate: (value) =>
										!/\s/.test(value ?? '') ||
										'El slug no puede contener espacios en blanco',
								})}
							/>
							<div className="h-5">
								{errors.slug && (
									<p className="text-sm font-medium text-red-500">El slug es requerido</p>
								)}
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="price">Precio del servicio</Label>
							<Input
								type="text"
								id="price"
								placeholder="Precio"
								{...register('price', { required: true, min: 1 })}
							/>
							<div className="h-5">
								{errors.price && (
									<p className="text-sm font-medium text-red-500">
										El precio debe de ser mayor a cero
									</p>
								)}
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="duration">Duración del servicio (minutos)</Label>
							<Input
								type="text"
								id="duration"
								placeholder="Duracion: 180"
								{...register('duration', { required: true, min: 1 })}
							/>
							<div className="h-5">
								{errors.duration && (
									<p className="text-sm font-medium text-red-500">
										La duración debe ser mayor a cero
									</p>
								)}
							</div>
						</div>

						{/* Tags */}
						<div className="space-y-2">
							<h2 className="">Etiquetas</h2>

							<div className="space-y-4">
								<div className="flex flex-wrap gap-2">
									{selectedTags?.map((tag) => (
										<span
											key={tag}
											className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200"
										>
											<Tag className="h-3 w-3 mr-1" />
											{tag}
											<button
												onClick={() => removeTag(tag)}
												className="ml-2 text-green-60 cursor-pointer"
											>
												<X className="h-3 w-3 " />
											</button>
										</span>
									))}
								</div>

								<div className="flex gap-2">
									<Input
										type="text"
										ref={tagRef}
										// value={newTag}
										// onChange={(e) => setNewTag(e.target.value)}
										// onKeyDown={(e) => e.key === 'Enter' && addTag()}
										placeholder="Añadir nueva etiqueta..."
										onKeyDown={(e) => {
											if (e.key === 'Enter' || e.key === ' ' || e.key === ',') {
												e.preventDefault();
												addTag();

												tagRef.current!.value = '';
											}
										}}
									/>
									<Button onClick={addTag} type="button" className="btn-success">
										<Plus className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</div>

						<div className="space-y-2 mt-5">
							<Controller
								name="isActive"
								control={control}
								render={({ field }) => (
									<Label className="cursor-pointer">
										<Checkbox
											checked={field.value}
											onCheckedChange={(value) => field.onChange(value)}
										/>{' '}
										Activo
									</Label>
								)}
							/>

							<div className="h-5"></div>
						</div>
					</div>
					{/* Sidebar */}
					<div className="col-span-1">
						{/* // ? Service Images */}

						<h2 className="text-xl font-semibol mb-6">Imágenes del servicio</h2>

						{/* // ? Drag & Drop Zone */}
						<div
							className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
								dragActive
									? 'border-blue-400 bg-blue-50'
									: 'border-slate-300 hover:border-slate-400'
							}`}
							onDragEnter={handleDrag}
							onDragLeave={handleDrag}
							onDragOver={handleDrag}
							onDrop={handleDrop}
						>
							<input
								type="file"
								multiple
								accept="image/*"
								className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
								onChange={handleFileChange}
							/>
							<div className="space-y-4">
								<Upload className="mx-auto h-12 w-12 text-slate-400" />
								<div>
									<p className="text-lg font-medium text-slate-700 dark:text-slate-200">
										Arrastra las imágenes aquí
									</p>
									<p className="text-sm text-slate-500 dark:text-slate-400">
										o haz clic para buscar
									</p>
								</div>
								<p className="text-xs text-slate-400 dark:text-slate-300">
									PNG, JPG, WebP hasta 3MB cada una
								</p>
							</div>
						</div>

						{/* // ? Current Images */}
						<div
							className={cn('mt-6 space-y-3', {
								hidden: !service || selectedImages?.length === 0,
							})}
						>
							<h3 className="text-sm font-medium">Imágenes actuales</h3>

							<div className="grid grid-cols-4 gap-3">
								{selectedImages?.map((image, index) => (
									<div key={index} className="relative group">
										<div className="aspect-square bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
											<img
												src={image}
												alt="Service"
												className="w-full h-full object-cover rounded-lg"
											/>
										</div>
										<button
											type="button"
											className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
											onClick={() => removeImage(image)}
										>
											<X className="h-3 w-3" />
										</button>
										<p className="mt-1 text-xs truncate">{image}</p>
									</div>
								))}
							</div>
						</div>

						{/** // ? imagenes por cargar */}

						<div
							className={cn('mt-6 space-y-3', {
								hidden: files.length === 0,
							})}
						>
							<h3 className="text-sm font-medium">Imágenes por cargar</h3>
							<div className="grid grid-cols-4 gap-3">
								{files.map((file, index) => (
									<div key={index} className="relative group">
										<div className="aspect-square bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
											<img
												src={URL.createObjectURL(file)}
												alt="Product"
												className="w-full h-full object-cover rounded-lg"
											/>
										</div>
										<button
											type="button"
											className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
											onClick={() => removeUploadedImage(file)}
										>
											<X className="h-3 w-3" />
										</button>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="col-span-2">
						{/* // ? Boton submit */}
						<div className="flex justify-end">
							<Button className="btn-primary mt-7">
								{loading ? (
									'Guardando...'
								) : (
									<>
										<Save className="mr-1 h-4 w-4" />
										Guardar
									</>
								)}
							</Button>
						</div>

						{errorMessage !== '' && (
							<div className="flex gap-2 items-center">
								<span className="text-sm text-red-500">{errorMessage}</span>
							</div>
						)}
					</div>
				</form>
			</CardContent>
		</Card>
	);
};
