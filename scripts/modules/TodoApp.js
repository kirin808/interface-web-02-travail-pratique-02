export default class TodoApp {
	/**
	 * 
	 * @param {object} taskDAO Interface DAO d'accès aux données.
	 * @param {object} todoUI Gestionnaire de l'interface graphique.
	 * @param {element} addForm Élément du formulaire d'ajout de tâche.
	 * @param {object} addFormValidator Gestionnaire de la validation du formulaire d'ajout.
	 * @param {element} taskPanels Élement contenant la liste des tâches affichées.
	 * @param {class} router Classe gestionnaire de la navigation hashbang.
	 * 
	 */
	constructor(taskDAO, todoUI, addForm, addFormValidator, taskPanels, Router) {
		this.taskDAO = taskDAO;
		this.todoUI = todoUI;
		this.addForm = addForm;
		this.addFormValidator = addFormValidator;
		this.taskPanels = taskPanels;

		this.router = new Router(this);
		
		this.initTasksPanels(taskPanels);
		this.initAddForm();
	}

	initAddForm = () => {
		const btn = this.addForm.addTask;
		
		btn.addEventListener('click', (e) => {
			this.addFormValidator.cleanErrors();

			if(this.addForm.checkValidity()) {
				this.addTask(
					this.addForm.name.value,
					this.addForm.description.value,
					this.addForm.importance.value
				);
				
				// Réinitialiser les champs du formulaire d'ajout
				this.resetAddForm();
			};
		});
	}

	initTasksPanels = () => {
		for(const panel of this.taskPanels) {
			this.initTaskPanel(panel);
		}
	}

	initTaskPanel = (panel) => {
		this.initShowDetails(panel.querySelector('button[name="showDetails"]'));
		this.initDelete(panel.querySelector('button[name="deleteTask"]'));
	}

	initShowDetails = (btn) => {
		const id = btn.closest("li").dataset.taskId;
		
		btn.addEventListener('click', (e) => {
			this.router.setHashLocation(id);
		});
	}

	initDelete = (btn) => {
		const panel = btn.closest("li");

		btn.addEventListener('click', (e) => {
			this.deleteTask(panel.dataset.taskId, panel);
		});
	}


	resetAddForm = () => {
		this.addForm.name.value = this.addForm.description.value = this.addForm.importance.value = "";
		
		this.addForm.querySelector('input[name="importance"]:checked').checked = false;
	}

	addTask = (n, d, imp) => {
		const resp = this.taskDAO.addTask(n, d, imp)
			.then(resp => this.initTaskPanel(this.todoUI.drawTask(resp.id, n, imp)
			))
			.catch((e) => {
				console.log(`Problème problème : ${e.message}`);
			});
	}

	showDetails = ($id) => {
		this.taskDAO.getTaskById($id)
			.then(
				data => { 
					if(data) {
						this.todoUI.drawDetails(
							data.name,
							data.importance,
							data.description
						)
					} else {
						this.router.resetLocation();
						this.todoUI.cleanDetails();
					}
				}
				
			)
			.catch((e) => {
				console.log(`Problème problème : ${e.message}`);
			});
	}

	deleteTask = (id, panel) => {
		const resp = this.taskDAO.deleteTask(id)
			.then(resp => {
				if(resp.result === "true") {
					this.todoUI.removeTask(panel);
				}
			});
	}

	
}