import { buildButton, buildElement, buildTextElement } from "./DOMBuilder.js"

export default class TodoUI {	
	constructor(tl, template, dp) {
		this.tasksListing = tl;
		this.taskPanelTemplate = template;
		
		this.detailsPanel = dp;
		this.detailsToggle = dp.querySelector('#checkboxToggleDetails');
		this.detailsData = dp.querySelector('dl');
		this.detailsName = dp.querySelector('[data-details="name"] > dd');
		this.detailsDesc = dp.querySelector('[data-details="description"] > dd');
		this.detailsImportance = dp.querySelector('[data-details="importance"] > dd');
	}

	drawTask = (id, name, imp) => {
		const 
			clone = this.taskPanelTemplate.cloneNode(true).content,
			panel = clone.querySelector('li');

			panel.setAttribute("data-task-id", id);
			panel.classList.add(`taskPriority${imp}`);

			// Nom de la tâche
			panel.querySelector('.taskSummary > span:first-of-type').textContent = name;

			// Priorité de la tâche
			const re = /\{\{\s*importance\s*\}\}/i;

			
			panel.querySelector('.taskSummary > span:last-of-type').textContent = panel.querySelector('.taskSummary > span:last-of-type').textContent.replace(re, imp);

		this.tasksListing.append(panel);

		return panel;
	}

	removeTask = (p) => {
		p.remove();
	}

	drawDetails = (name, importance, desc) => {
		this.detailsToggle.checked = true;

		this.detailsName.textContent = name;
		this.detailsImportance.textContent = importance;
		this.detailsDesc.textContent = (desc !== "") ? desc : "Aucune description disponible";		
	}

	cleanDetails = () => {
		this.detailsName.textContent =
		this.detailsImportance.textContent =
		this.detailsDesc.textContent = "";

		this.detailsToggle.checked = false;
	}


}