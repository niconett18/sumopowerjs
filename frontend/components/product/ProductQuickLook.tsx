'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Product } from './types';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

const easings = {
	enter: [0.16, 1, 0.3, 1] as const,
	exit: [0.2, 0.8, 0.2, 1] as const,
};

const backdropVariants = {
	initial: { opacity: 0 },
	animate: { opacity: 1, transition: { duration: 0.18, ease: [0, 0, 1, 1] as const } },
	exit: { opacity: 0, transition: { duration: 0.18, ease: [0, 0, 1, 1] as const } },
};

const panelVariants = {
	initial: { opacity: 0, scale: 0.985, y: 12 },
	animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.32, ease: easings.enter } },
	exit: { opacity: 0, scale: 0.985, y: 12, transition: { duration: 0.22, ease: easings.exit } },
};

export interface ProductQuickLookProps {
	product: Product | null;
	open: boolean;
	onClose: () => void;
}

export default function ProductQuickLook({ product, open, onClose }: ProductQuickLookProps) {
	const [index, setIndex] = useState(0);
	const [isMobile, setIsMobile] = useState(false);
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const dialogRef = useRef<HTMLDivElement | null>(null);
	const lastFocusedElementRef = useRef<HTMLElement | null>(null);
	const closeButtonRef = useRef<HTMLButtonElement | null>(null);
	useBodyScrollLock(open);

	const images = product?.images || [];
	const activeImage = images[index] || images[0];

	useEffect(() => {
		if (!open) return;
		lastFocusedElementRef.current = document.activeElement as HTMLElement;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') { onClose(); }
			if (e.key === 'ArrowRight') { setIndex((i) => Math.min(i + 1, images.length - 1)); window.dispatchEvent(new CustomEvent('quicklook_next_image')); }
			if (e.key === 'ArrowLeft') { setIndex((i) => Math.max(i - 1, 0)); window.dispatchEvent(new CustomEvent('quicklook_next_image')); }
		};
		const onKeyTrap = (e: KeyboardEvent) => {
			if (e.key !== 'Tab') return;
			const root = dialogRef.current;
			if (!root) return;
			const focusable = root.querySelectorAll<HTMLElement>(
				'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
			);
			if (focusable.length === 0) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			const active = document.activeElement as HTMLElement | null;
			if (e.shiftKey) {
				if (active === first || !root.contains(active)) {
					e.preventDefault();
					last.focus();
				}
			} else {
				if (active === last) {
					e.preventDefault();
					first.focus();
				}
			}
		};
		document.addEventListener('keydown', onKey);
		document.addEventListener('keydown', onKeyTrap, true);
		const t = setTimeout(() => {
			closeButtonRef.current?.focus();
		}, 0);
		window.dispatchEvent(new CustomEvent('quicklook_open', { detail: { id: product?.id } }));
		return () => {
			document.removeEventListener('keydown', onKey);
			document.removeEventListener('keydown', onKeyTrap, true);
			window.dispatchEvent(new CustomEvent('quicklook_close', { detail: { id: product?.id } }));
			clearTimeout(t);
			// restore focus
			lastFocusedElementRef.current?.focus();
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open]);

	useEffect(() => { if (!open) setIndex(0); }, [open]);

	useEffect(() => {
		if (!lightboxOpen) return;
		const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightboxOpen(false); };
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [lightboxOpen]);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		const mq = window.matchMedia('(max-width: 640px)');
		const update = () => setIsMobile(mq.matches);
		update();
		mq.addEventListener('change', update);
		return () => mq.removeEventListener('change', update);
	}, []);

	const setActive = useCallback((i: number) => {
		setIndex(i);
		window.dispatchEvent(new CustomEvent('quicklook_next_image', { detail: { id: product?.id } }));
	}, [product?.id]);

	const onBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) onClose();
	}, [onClose]);

	const carouselDots = useMemo(() => (
		<div className="flex items-center gap-2 mt-3" aria-hidden="true">
			{images.map((_, i) => (
				<button key={i} type="button" onClick={() => setActive(i)} className={`h-1.5 rounded-full transition-all ${i === index ? 'bg-black/80 dark:bg-white/80 w-6' : 'bg-black/30 dark:bg-white/30 w-2.5'}`} aria-label={`Go to image ${i + 1}`} />
			))}
		</div>
	), [images, index, setActive]);

	return (
		<AnimatePresence>
			{open && product && (
				<motion.div
					className={`fixed inset-0 z-[2000] flex justify-center ${isMobile ? 'items-end' : 'items-center'}`}
					variants={backdropVariants}
					initial="initial"
					animate="animate"
					exit="exit"
					onClick={onBackdropClick}
					role="presentation"
				>
					<div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
					{isMobile ? (
						<motion.div
							ref={dialogRef}
							className="fixed inset-x-0 bottom-0 z-[2001] w-screen max-h-[92vh] rounded-t-3xl bg-white dark:bg-neutral-900 border-t border-black/10 dark:border-white/10 shadow-[0_-20px_40px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden"
							initial={{ y: 24, opacity: 0.98 }}
							animate={{ y: 0, opacity: 1, transition: { duration: 0.28, ease: easings.enter } }}
							exit={{ y: 24, opacity: 0.98, transition: { duration: 0.22, ease: easings.exit } }}
							drag="y"
							dragConstraints={{ top: 0, bottom: 0 }}
							dragElastic={0.04}
							onDragEnd={(_, info) => {
								if (info.offset.y > 120 || info.velocity.y > 800) onClose();
							}}
							role="dialog"
							aria-modal="true"
							aria-labelledby={`ql-title-${product.id}`}
							onClick={(e) => e.stopPropagation()}
						>
							<div className="sticky top-0 z-10 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md px-4 pt-[max(10px,env(safe-area-inset-top))] pb-3 flex items-center gap-3 border-b border-neutral-200/70 dark:border-neutral-800">
								<h2 id={`ql-title-${product.id}`} className="text-lg font-semibold leading-6 truncate">
									{product.title}
								</h2>
								<button
									ref={closeButtonRef}
									type="button"
									className="ml-auto h-11 w-11 -mr-2 grid place-items-center rounded-full bg-black/70 text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-white/80 active:scale-95"
									onClick={onClose}
									aria-label="Close"
								>
									<svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
										<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
									</svg>
								</button>
							</div>

							<div className="flex-1 overflow-y-auto px-4 pt-3 pb-4 space-y-4">
								<div className="mt-1 rounded-xl overflow-hidden aspect-[4/3] max-h-[38vh]" onClick={() => setLightboxOpen(true)}>
									{activeImage && (
										<img
											src={activeImage.src}
											alt={activeImage.alt || product.title}
											loading="lazy"
											className="h-full w-full object-contain select-none"
										/>
									)}
								</div>
								<div className="flex gap-2 mt-3 overflow-x-auto snap-x snap-mandatory">
									{images.map((img, i) => (
										<button
											key={img.src}
											type="button"
											onClick={() => setActive(i)}
											className="snap-start shrink-0 h-14 w-14 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 cursor-pointer ring-2 ring-transparent data-[active=true]:ring-black/80 dark:data-[active=true]:ring-white/80 transition"
											data-active={i === index}
											aria-label={`Select image ${i + 1}`}
										>
											<div className="relative h-full w-full">
												<Image src={img.src} alt={img.alt || product.title} fill className="object-contain" loading="lazy" />
											</div>
										</button>
									))}
								</div>

								{product.subtitle && (
									<p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">{product.subtitle}</p>
								)}
								{product.highlights?.length > 0 && (
									<div>
										<h3 className="text-base font-medium">Highlights</h3>
										<ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed mt-2">
											{product.highlights.map((h, i) => (
												<li key={i} className="text-neutral-800 dark:text-neutral-200">{h}</li>
											))}
										</ul>
									</div>
								)}
							</div>

							<div className="sticky bottom-0 left-0 right-0 bg-white/95 dark:bg-neutral-900/95 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md border-t border-neutral-200/70 dark:border-neutral-800 px-4 pt-3 pb-[max(14px,env(safe-area-inset-bottom))]">
								{product.buyUrl && (
									<a
										href={product.buyUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="w-full h-11 rounded-full bg-black text-white font-medium grid place-items-center"
									>
										{product.ctaLabel || 'Buy'}
									</a>
								)}
							</div>

							<AnimatePresence>
								{lightboxOpen && (
									<motion.div
										className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 md:p-8"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1, transition: { duration: 0.18 } }}
										exit={{ opacity: 0, transition: { duration: 0.18 } }}
										onClick={() => setLightboxOpen(false)}
									>
										{activeImage && (
											<img src={activeImage.src} alt={activeImage.alt || product.title} className="max-w-[85vw] md:max-w-[70vw] max-h-[78vh] md:max-h-[82vh] object-contain select-none" />
										)}
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					) : (
						<motion.div
							ref={dialogRef}
							className="relative mx-auto w-[min(1024px,92vw)] md:w-[min(1100px,92vw)] rounded-3xl bg-white dark:bg-neutral-900 shadow-2xl border border-black/10 dark:border-white/10 p-5 md:p-7 lg:p-8 z-[2001]"
							variants={panelVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							role="dialog"
							aria-modal="true"
							aria-labelledby={`ql-title-${product.id}`}
							onClick={(e) => e.stopPropagation()}
						>
							<button
								ref={closeButtonRef}
								type="button"
								className="absolute top-3 right-3 md:top-4 md:right-4 p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white bg-transparent border-0 outline-none ring-0 shadow-none appearance-none"
								onClick={onClose}
								aria-label="Close quick look"
								style={{ border: 'none', boxShadow: 'none', background: 'transparent', outline: 'none' }}
							>
								<svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
									<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
								</svg>
							</button>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
								<div>
									<div className="relative group aspect-[4/3] md:aspect-[5/4] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 cursor-zoom-in" onClick={() => setLightboxOpen(true)}>
										{activeImage && (
											<img
												src={activeImage.src}
												alt={activeImage.alt || product.title}
												loading="lazy"
												className="absolute inset-0 h-full w-full object-contain transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center transform-gpu hover:scale-[1.5] group-hover:scale-[1.5] select-none"
											/>
										)}
									</div>
									<div className="flex gap-2 mt-3">
										{images.map((img, i) => (
											<button
												key={img.src}
												type="button"
												onClick={() => setActive(i)}
												className="h-14 w-14 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 cursor-pointer ring-2 ring-transparent data-[active=true]:ring-black/80 dark:data-[active=true]:ring-white/80 transition"
												data-active={i === index}
												aria-label={`Select image ${i + 1}`}
											>
												<div className="relative h-full w-full">
													<Image src={img.src} alt={img.alt || product.title} fill className="object-contain" loading="lazy" />
												</div>
											</button>
										))}
									</div>
									{carouselDots}
								</div>

								<div>
									<h2 id={`ql-title-${product.id}`} className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
										{product.title}
									</h2>
									{product.subtitle && (
										<p className="text-neutral-500 dark:text-neutral-400 mt-1">{product.subtitle}</p>
									)}
									{product.highlights?.length > 0 && (
										<>
											<h3 className="text-base md:text-lg font-medium mt-4">Highlights</h3>
											<ul className="space-y-2 text-sm md:text-base leading-relaxed mt-2">
												{product.highlights.map((h, i) => (
													<li key={i} className="text-neutral-800 dark:text-neutral-200">{h}</li>
												))}
											</ul>
											<div className="h-px bg-neutral-200 dark:bg-neutral-800 my-4 md:my-6" />
										</>
									)}

									<div className="flex flex-wrap items-center gap-3">
										{product.buyUrl && (
											<a
												href={product.buyUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center justify-center rounded-full bg-black text-white hover:bg-black/90 px-5 py-2.5 text-sm md:text-base"
											>
												{product.ctaLabel || 'Buy'}
											</a>
										)}
									</div>
								</div>
							</div>

							<AnimatePresence>
								{lightboxOpen && (
									<motion.div
										className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 md:p-8"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1, transition: { duration: 0.18 } }}
										exit={{ opacity: 0, transition: { duration: 0.18 } }}
										onClick={() => setLightboxOpen(false)}
									>
										{activeImage && (
											<img src={activeImage.src} alt={activeImage.alt || product.title} className="max-w-[85vw] md:max-w-[70vw] max-h-[78vh] md:max-h-[82vh] object-contain select-none" />
										)}
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					)}
				</motion.div>
			)}
		</AnimatePresence>
	);
}


