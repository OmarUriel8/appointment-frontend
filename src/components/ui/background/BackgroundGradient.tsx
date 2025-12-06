export const BackgroundGradient = () => {
	return (
		<>
			{/* Fondo decorativo */}
			<div className="absolute inset-0 overflow-hidden">
				{/* Gradiente de fondo */}
				<div className="absolute inset-0 bg-linear-to-br from-primary/20 via-background to-secondary/20 dark:from-primary/5 dark:via-background dark:to-secondary/5" />

				{/* Formas geométricas decorativas */}
				<div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-primary/30 blur-3xl dark:bg-primary/10" />
				<div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-secondary/30 blur-3xl dark:bg-secondary/10" />
				<div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-2xl dark:bg-accent/20" />

				{/* Patrón de grid sutil */}
				<div
					className="absolute inset-0 opacity-[0.08] dark:opacity-[0.05]"
					style={{
						backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
						backgroundSize: '50px 50px',
					}}
				/>

				{/* Círculos decorativos animados */}
				<div className="absolute left-1/4 top-1/4 h-32 w-32 animate-pulse rounded-full bg-primary/20 blur-xl dark:bg-primary/5" />
				<div
					className="absolute right-1/4 bottom-1/4 h-40 w-40 animate-pulse rounded-full bg-secondary/20 blur-xl dark:bg-secondary/5"
					style={{ animationDelay: '1s' }}
				/>

				{/* Formas adicionales para modo claro */}
				<div className="absolute left-1/3 top-2/3 h-48 w-48 rounded-full bg-accent/40 blur-2xl dark:hidden" />
				<div className="absolute right-1/3 bottom-1/3 h-56 w-56 rounded-full bg-primary/15 blur-2xl dark:hidden" />
			</div>
		</>
	);
};
