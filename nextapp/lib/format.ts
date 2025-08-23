export function mapLegacyToProduct(legacy: any) {
	const id = String(legacy.id ?? legacy.name_en ?? legacy.name_id ?? Math.random());
	const rawTitle = String(legacy.name_en || legacy.name_id || '');
	const title = sanitizeTitle(rawTitle);
	const imageSrc = normalizePath(legacy.imageUrl || legacy.image || legacy.image_url || '');
	const defaultHighlights = [
		'Original quality components',
		'High-capacity cells',
		'Optimized for device safety',
		'Consistent performance',
	];
	return {
		id,
		title,
		subtitle: undefined,
		images: [{ src: imageSrc, alt: title }],
		highlights: defaultHighlights,
		buyUrl: legacy.shopeeUrl || legacy.buyUrl,
		price: undefined,
		badges: undefined,
		ctaLabel: 'Buy',
	} as const;
}

export function normalizePath(path: string) {
	if (typeof path !== 'string' || !path) return path;
	const stripped = path.replace(/^\.{1,2}\//, '');
	if (stripped.startsWith('/assets/')) return stripped;
	if (stripped.startsWith('assets/')) return `/${stripped}`;
	return stripped.startsWith('/') ? stripped : `/${stripped}`;
}

function sanitizeTitle(title: string): string {
	if (!title) return title;
	// Remove the literal phrase "Sumopower Battery" anywhere (case-insensitive)
	let out = title.replace(/\bSumopower\s+Battery\b/gi, '').trim();
	// Collapse extra spaces and punctuation gaps left behind
	out = out.replace(/\s{2,}/g, ' ')
		.replace(/\s*-\s*/g, ' - ')
		.replace(/^[-–\s]+/, '')
		.replace(/\s+$/, '');
	return out;
}


