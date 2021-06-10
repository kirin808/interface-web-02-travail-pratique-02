import FormValidator from "./modules/FormValidator.js";
import TaskDAO from "./modules/TaskDAO.js";
import TodoApp from "./modules/TodoApp.js";
import TodoUI from "./modules/TodoUI.js";
import Router from "./modules/Router.js";

const
	// Éléments du DOM à récupérer
	addForm =  document.forms.addTask,
	tasksListing = document.querySelector('[data-list="todo"]'),
	tasksPanels = tasksListing.querySelectorAll("li"),
	detailsPanel = document.querySelector(".details"),
	taskPanelTemplate = document.querySelector('#templateTaskPanel'),

	// Classes à instancier
	addFormValidator = new FormValidator(addForm),
	taskDAO = new TaskDAO(),
	todoUI = new TodoUI(tasksListing, taskPanelTemplate, detailsPanel),
	todoApp = new TodoApp(
		taskDAO,
		todoUI,
		addForm,		 
		addFormValidator,
		tasksPanels,
		Router
	);