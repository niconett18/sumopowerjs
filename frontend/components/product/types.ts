export interface ProductImage {
	src: string;
	alt: string;
}

export interface Product {
	id: string;
	title: string;
	subtitle?: string;
	images: ProductImage[];
	highlights: string[];
	specs?: Record<string, string | number>;
	price?: string;
	buyUrl?: string;
	badges?: string[];
	ctaLabel?: string;
}


