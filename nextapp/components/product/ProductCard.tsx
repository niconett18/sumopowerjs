'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { Product } from './types';

export interface ProductCardProps {
	product: Product;
	onQuickLook: (product: Product) => void;
	className?: string;
	style?: React.CSSProperties;
}

function ProductCardBase({ product, onQuickLook, className, style }: ProductCardProps) {
	const title = useMemo(() => product.title || '', [product.title]);
	const image = product.images?.[0];
	const [imageError, setImageError] = useState(false);

	const handleImageError = () => {
		setImageError(true);
	};

	return (
		<div className={['product-card', 'group', className].filter(Boolean).join(' ')} style={style}>
			<div className="product-image" style={{ position: 'relative' }}>
				{image && !imageError ? (
					<Image
						src={image.src}
						alt={image.alt || title}
						width={300}
						height={190}
						loading="lazy"
						quality={85}
						className="w-full h-full object-contain"
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


