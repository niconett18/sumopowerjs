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

	// Create images array with main product image
	const images = [{ src: imageSrc, alt: title }];

	// Add box image for Samsung products
	if (legacy.category_key === 'category.samsung' && imageSrc) {
		// Replace '/samsung/' with '/samsung box/' in the path to get box image
		const boxImageSrc = imageSrc.replace('/samsung/', '/samsung box/').replace('../', '/');
		
		// Only add if we have a valid path
		if (boxImageSrc && boxImageSrc !== imageSrc) {
			images.push({
				src: boxImageSrc,
				alt: `${title} - Package`
			});
		}
	}

	// Add box image for Infinix products
	if (legacy.category_key === 'category.infinix' && imageSrc) {
		// Replace '/infinix/' with '/infinix box/' in the path to get box image
		const boxImageSrc = imageSrc.replace('/infinix/', '/infinix box/').replace('../', '/');
		
		// Only add if we have a valid path
		if (boxImageSrc && boxImageSrc !== imageSrc) {
			images.push({
				src: boxImageSrc,
				alt: `${title} - Package`
			});
		}
	}

	// Add box image for OPPO products
	if (legacy.category_key === 'category.oppo' && imageSrc) {
		// Replace '/oppo/' with '/oppo box/' in the path to get box image
		const boxImageSrc = imageSrc.replace('/oppo/', '/oppo box/').replace('../', '/');
		
		// Only add if we have a valid path
		if (boxImageSrc && boxImageSrc !== imageSrc) {
			images.push({
				src: boxImageSrc,
				alt: `${title} - Package`
			});
		}
	}

	// Add box image for Vivo products
	if (legacy.category_key === 'category.vivo' && imageSrc) {
		// Replace '/vivo/' with '/vivo box/' in the path to get box image
		const boxImageSrc = imageSrc.replace('/vivo/', '/vivo box/').replace('../', '/');
		
		// Only add if we have a valid path
		if (boxImageSrc && boxImageSrc !== imageSrc) {
			images.push({
				src: boxImageSrc,
				alt: `${title} - Package`
			});
		}
	}

	// Add box image for Xiaomi products
	if (legacy.category_key === 'category.xiaomi' && imageSrc) {
		// Replace '/xiaomi/' with '/xiaomi box/' in the path to get box image
		const boxImageSrc = imageSrc.replace('/xiaomi/', '/xiaomi box/').replace('../', '/');
		
		// Only add if we have a valid path
		if (boxImageSrc && boxImageSrc !== imageSrc) {
			images.push({
				src: boxImageSrc,
				alt: `${title} - Package`
			});
		}
	}

	// Add box image for iPhone products
	if (legacy.category_key === 'category.iphone' && imageSrc) {
		// Extract the filename from the image URL
		const filename = imageSrc.split('/').pop() || '';
		
		// Create mapping for iPhone box images with naming variations
		const iphoneBoxMapping: { [key: string]: string } = {
			'15 promax.png': '15 PRO.png',
			'14 pro max.png': '14 PRO MAX.png',
			'14 pro.png': '14 PRO.png',
			'13 promax.png': '13 PRO MAX.png',
			'13 pro.png': '13 PRO.png',
			'12 pro max.png': '12 PRO MAX.png',
			'12_12pro.png': '12/12 PRO.png',
			'11 promax.png': '11 PROMAX.png',
			'ip 11 pro.png': '11 PRO.png',
			'ip 11.png': 'IP 11.png',
			'ip 15.png': 'IP 15.png',
			'ip 14.png': 'IP 14.png',
			'ip 13.png': 'IP 13.png',
			'ip 8 plus.png': '8G PLUS.png',
			'ip 8.png': '8G.png',
			'ip 7g plus.png': '7G PLUS.png',
			'ip 7g.png': '7G.png',
			'ip 6g plus.png': '6G PLUS.png',
			'ip 6.png': '6G.png',
			'ip 6s plus.png': '6S PLUS.png',
			'ip 6s.png': '6S.png',
			'ip 5s.png': 'IP 5S.png',
			'ip x.png': 'IP X.png',
			'ip xr.png': 'IP XR.png',
			'ip xsmax.png': 'XS MAX.png',
			'xs.png': 'XS MAX.png',
			'15 plus.png': '15 PLUS.png',
			'15 pro.png': '15 PRO.png',
			'iphone 14 plus.png': 'iphone 14 plus.png'
		};
		
		// Get the mapped box filename or try direct replacement
		const boxFilename = iphoneBoxMapping[filename] || filename;
		
		// Only add box image if we have a valid filename
		if (boxFilename && boxFilename.trim() !== '') {
			const boxImageSrc = `/assets/images/iphone box/${boxFilename}`;
			
			images.push({
				src: boxImageSrc,
				alt: `${title} - Package`
			});
		}
	}

	return {
		id,
		title,
		subtitle: undefined,
		images,
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


