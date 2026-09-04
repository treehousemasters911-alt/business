const pages = [...document.querySelectorAll('.page')];
const pageLinks = [...document.querySelectorAll('[data-page-link]')];

function showPage(pageName) {
	const target = document.querySelector(`[data-page="${pageName}"]`) || pages[0];
	pages.forEach((page) => page.classList.toggle('active', page === target));
	pageLinks.forEach((link) => link.classList.toggle('active', link.dataset.pageLink === target.dataset.page));
	document.querySelector('footer span:last-child').textContent = `${String(pages.indexOf(target) + 1).padStart(2, '0')} / 05`;
	window.scrollTo(0, 0);
}

function handleRoute() {
	showPage(window.location.hash.slice(1) || 'welcome');
}

window.addEventListener('hashchange', handleRoute);
handleRoute();

document.addEventListener('keydown', (event) => {
	if (event.key !== 'Enter' || ['INPUT', 'TEXTAREA', 'BUTTON'].includes(document.activeElement.tagName)) return;
	const currentPage = pages.findIndex((page) => page.classList.contains('active'));
	if (currentPage < pages.length - 1) {
		event.preventDefault();
		window.location.hash = pages[currentPage + 1].dataset.page;
	}
});

document.querySelector('#wishForm').addEventListener('submit', (event) => {
	event.preventDefault();
	const input = document.querySelector('#wishInput');
	const wish = input.value.trim();
	if (!wish) return;
	const wall = document.querySelector('#wishWall');
	const note = document.createElement('p');
	note.className = 'wish-note note-yellow new';
	note.textContent = wish;
	const maxLeft = Math.max(10, wall.clientWidth - 140);
	const maxTop = Math.max(10, wall.clientHeight - 80);
	note.style.left = `${10 + Math.random() * maxLeft}px`;
	note.style.top = `${20 + Math.random() * maxTop}px`;
	note.style.transform = `rotate(${Math.round(Math.random() * 16 - 8)}deg)`;
	wall.append(note);
	input.value = '';
});

document.querySelector('#confettiButton').addEventListener('click', () => {
	const colors = ['#e63946', '#f5d547', '#6d8be8', '#f4a9bd'];
	for (let index = 0; index < 90; index += 1) {
		const piece = document.createElement('i');
		const drift = Math.round((Math.random() - 0.5) * 260);
		piece.style.cssText = `position:fixed;z-index:10;left:${Math.random() * 100}vw;top:${-10 + Math.random() * 35}vh;width:${6 + Math.random() * 7}px;height:${10 + Math.random() * 12}px;background:${colors[index % colors.length]};transform:rotate(${Math.random() * 180}deg);--drift:${drift}px;animation:fall ${1.5 + Math.random() * 2.5}s ease-out forwards;`;
		document.body.append(piece);
		setTimeout(() => piece.remove(), 4500);
	}
});

const animationStyle = document.createElement('style');
animationStyle.textContent = '@keyframes fall { to { transform: translate3d(var(--drift), 115vh, 0) rotate(720deg); opacity: 0; } }';
document.head.append(animationStyle);

document.querySelector('#soundToggle').addEventListener('click', (event) => {
	const label = event.currentTarget.querySelector('span');
	label.textContent = label.textContent === 'sound on' ? 'sound off' : 'sound on';
});
