'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';

export interface ProductCardProps {
	product: any;
	onQuickLook: (product: any) => void;
	className?: string;
	style?: React.CSSProperties;
	enhanced?: boolean;
}

function ProductCardBase({ product, onQuickLook, className, style, enhanced = false }: ProductCardProps) {
	const title = useMemo(() => product.title || '', [product.title]);
	const image = product.images?.[0];
	const [imageError, setImageError] = useState(false);

	const cardClasses = [
		'product-card',
		enhanced ? 'enhanced' : '',
		'group',
		className
	].filter(Boolean).join(' ');

	const handleImageError = () => {
		setImageError(true);
	};

	if (enhanced) {
		return (
			<div className={cardClasses} style={style}>
				<div className="product-image">
					{image && !imageError ? (
						<Image
							src={image.src}
							alt={image.alt || title}
							width={300}
							height={220}
							loading="lazy"
							quality={85}
							placeholder="blur"
							blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
							className="w-full h-full object-contain"
							onError={handleImageError}
							sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, (max-width: 992px) 240px, 280px"
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
							<div className="text-center">
								<i className="fas fa-image text-4xl mb-2"></i>
								<p className="text-sm">Image not found</p>
							</div>
						</div>
					)}
				</div>
				
				<div className="product-category">
					{product.category_key?.replace('category.', '').toUpperCase() || 'PRODUCT'}
				</div>
				
				<h3 className="product-title">{title}</h3>
				
				<div className="product-actions">
					<button
						className="btn-quick-view"
						onClick={() => onQuickLook(product)}
						aria-label={`Quick look at ${title}`}
					>
						<i className="fas fa-eye"></i>
						Quick View
					</button>
					
					{product.buyUrl && (
						<a
							href={product.buyUrl}
							target="_blank"
							rel="noreferrer"
							className="shopee-link enhanced"
							onClick={(e) => e.stopPropagation()}
							aria-label="Buy on Shopee"
						>
							<Image
								src="/assets/images/shopeelogo.png"
								alt="Shopee"
								width={20}
								height={20}
								className="filter brightness-0 invert"
							/>
						</a>
					)}
				</div>
			</div>
		);
	}

	// Original card design
	return (
		<div className={cardClasses} style={style}>
			<div className="product-image" style={{ position: 'relative' }}>
				{image && !imageError ? (
					<Image
						src={image.src}
						alt={image.alt || title}
						width={300}
						height={190}
						loading="lazy"
						quality={85}
						className="w-full object-contain"
						onError={handleImageError}
						sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, (max-width: 992px) 240px, 300px"
					/>
				) : (
					<div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-400">
						<div className="text-center">
							<i className="fas fa-image text-4xl mb-2"></i>
							<p className="text-sm">Image not found</p>
						</div>
					</div>
				)}
				{/* Apple-style hover overlay restricted to image area */}
				<div
					className="absolute inset-0 flex items-center justify-center bg-black/40 md:bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-sm"
					role="button"
					tabIndex={0}
					aria-label={`Quick look at ${title}`}
					onClick={() => onQuickLook(product)}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') onQuickLook(product);
					}}
				>
					<span className="px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-white text-black text-sm md:text-base font-medium shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
						Take a closer look
					</span>
				</div>
			</div>
			<span className="product-category">&nbsp;</span>
			<h3 className="product-title">{title}</h3>
			<button
				className="title-toggle"
				aria-label="Toggle full title"
				onClick={() => onQuickLook(product)}
			>
				View more
			</button>
			{product.buyUrl && (
				<a
					href={product.buyUrl}
					target="_blank"
					rel="noreferrer"
					className="shopee-link"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="shopee-brand">
						<Image
							src="/assets/images/shopeelogo.png"
							alt="Shopee"
							width={20}
							height={16}
							className="shopee-logo"
						/>
						<span className="shopee-text">Shopee</span>
					</div>
				</a>
			)}
		</div>
	);
}

const ProductCard = React.memo(ProductCardBase);
export default ProductCard;