const pages = [...document.querySelectorAll('.page')];
const pageLinks = [...document.querySelectorAll('[data-page-link]')];

function showPage(pageName) {
	const target = document.querySelector(`[data-page="${pageName}"]`) || pages[0];
	pages.forEach((page) => page.classList.toggle('active', page === target));
	pageLinks.forEach((link) => link.classList.toggle('active', link.dataset.pageLink === target.dataset.page));
	document.querySelector('footer span:last-child').textContent = `${String(pages.indexOf(target) + 1).padStart(2, '0')} / 05`;
}

function handleRoute() {
	showPage(window.location.hash.slice(1) || 'welcome');
}

window.addEventListener('hashchange', handleRoute);
handleRoute();

document.querySelector('#wishForm').addEventListener('submit', (event) => {
	event.preventDefault();
	const input = document.querySelector('#wishInput');
	const wish = input.value.trim();
	if (!wish) return;
	const note = document.createElement('p');
	note.className = 'wish-note note-yellow new';
	note.textContent = wish;
	note.style.left = `${20 + Math.random() * 190}px`;
	note.style.top = `${35 + Math.random() * 170}px`;
	note.style.transform = `rotate(${Math.round(Math.random() * 16 - 8)}deg)`;
	document.querySelector('#wishWall').append(note);
	input.value = '';
});

document.querySelector('#confettiButton').addEventListener('click', () => {
	const colors = ['#e63946', '#f5d547', '#6d8be8', '#f4a9bd'];
	for (let index = 0; index < 34; index += 1) {
		const piece = document.createElement('i');
		piece.style.cssText = `position:fixed;z-index:10;left:${50 + (Math.random() - .5) * 60}%;top:45%;width:9px;height:16px;background:${colors[index % colors.length]};transform:rotate(${Math.random() * 180}deg);animation:fall ${1 + Math.random() * 1.8}s ease-out forwards;`;
		document.body.append(piece);
		setTimeout(() => piece.remove(), 3000);
	}
});

const animationStyle = document.createElement('style');
animationStyle.textContent = '@keyframes fall { to { transform: translateY(80vh) rotate(600deg); opacity: 0; } }';
document.head.append(animationStyle);

document.querySelector('#soundToggle').addEventListener('click', (event) => {
	const label = event.currentTarget.querySelector('span');
	label.textContent = label.textContent === 'sound on' ? 'sound off' : 'sound on';
});
