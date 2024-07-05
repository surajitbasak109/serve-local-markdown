const state = {
    tocOpen: false
};
function createToc() {
	const h2s = document.querySelectorAll('h2');
    const tocLabel = document.createElement('h4');
    tocLabel.innerText = "Table of Contents";
    const tocOpener = document.createElement('button');
    const closeToc = document.createElement('span');
    closeToc.classList.add('close-toc');
    closeToc.innerHTML = "&#x2715;";
    closeToc.style.cursor = "pointer";
    closeToc.addEventListener('click', () => {
        state.tocOpen = false;
        toc.style.display = "none";
        tocOpener.style.display = "block";
    })
    tocOpener.textContent = "TOC";
    tocOpener.title = "Table of Content";
    tocOpener.classList.add("toc-opener");
    tocOpener.id = "tocOpener";
    tocOpener.addEventListener('click', (e) => {
        e.target.style.display = "none";
        toc.style.display = 'block';
        state.tocOpen = true;
    });
	const toc = document.createElement('div');
    toc.style.display = "none";
    const ul = document.createElement('ul');
	toc.id = "markdown-toc";
	toc.classList.add('toc');
	h2s.forEach(h2 => {
	    const li = document.createElement('li');
	    li.textContent = h2.innerText;
	    li.addEventListener('click', () => {
	    	h2.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
	    })
	    ul.appendChild(li);
	});
    toc.appendChild(tocLabel);
    toc.appendChild(closeToc);
    toc.appendChild(ul);
	document.body.appendChild(toc);
    document.body.appendChild(tocOpener);
}

document.addEventListener('DOMContentLoaded', () => {
    createToc();

    document.addEventListener('click', (e) => {
        if (!state.tocOpen) return;
        const targetElm = e.target;
        const isClickedInside = targetElm.closest('.toc') !== null || targetElm.closest('.toc-opener') !== null;

        if (!isClickedInside) {
            document.getElementById('markdown-toc').style.display = "none";
            document.getElementById('tocOpener').style.display = "block";
        }
    })
});
