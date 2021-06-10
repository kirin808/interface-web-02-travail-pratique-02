export default class Router {
	slug = "task";
	
	constructor(c) {
		this.controller = c;
		
		this.initHash();
		this.init();
	}

	initHash = () => {
		if(window.location.hash) {
			this.controller.showDetails(this.parseHashId(window.location.hash));
		}
	}

	init = () => {
		window.addEventListener('hashchange', (e) => {
			this.controller.showDetails(this.parseHashId(window.location.hash));
		});
	}

	setHashLocation = (id) => {
		window.location = `#!/${this.slug}/${id}`;
	}

	parseHashId = (hash) => {
		return hash.split(`#!/${this.slug}/`)[1];
	}
}