import { useEffect } from 'react';

export function useBodyScrollLock(locked: boolean) {
	useEffect(() => {
		if (typeof document === 'undefined') return;
		const { body } = document;
		const previousOverflow = body.style.overflow;
		if (locked) {
			body.style.overflow = 'hidden';
		}
		return () => {
			body.style.overflow = previousOverflow;
		};
	}, [locked]);
}


