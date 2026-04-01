(function () {
	const input = document.getElementById('directory-search');
	const cards = Array.from(document.querySelectorAll('.country-card'));
	const count = document.getElementById('results-count');
	const emptyState = document.getElementById('empty-state');
	const externalLinks = Array.from(document.querySelectorAll('a[target="_blank"]'));

	function normalize(value) {
		return (value || '')
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.trim();
	}

	function updateResults() {
		const query = normalize(input.value);
		let visible = 0;

		cards.forEach((card) => {
			const haystack = normalize(card.getAttribute('data-search'));
			const match = !query || haystack.includes(query);

			card.hidden = !match;
			card.style.display = match ? '' : 'none';

			if (match) visible += 1;
		});

		count.textContent = `${visible} ${visible === 1 ? 'country' : 'countries'} shown`;
		emptyState.classList.toggle('is-visible', visible === 0);
	}

	function restoreExternalLinkAnnouncement() {
		externalLinks.forEach((link) => {
			const label = link.getAttribute('aria-label');
			if (label) {
				if (!label.includes('(opens in a new tab)')) {
					link.setAttribute('aria-label', `${label} (opens in a new tab)`);
				}
				return;
			}

			const linkText = link.textContent.trim();
			if (linkText) {
				link.setAttribute('aria-label', `${linkText} (opens in a new tab)`);
			}
		});
	}

	input.addEventListener('input', updateResults);
	restoreExternalLinkAnnouncement();
	updateResults();
})();