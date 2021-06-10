import { buildTextElement } from "./DOMBuilder.js";

export default class FormValidator {
	errorFields = []; // Permettra d'accumuler les champs (node wrapper) qui auront une erreur ainsi que les nodes de messages d'erreur.
	fieldBlockClass = ".field-block";
	
	constructor(f) {
		this.form = f;
		
		this.init();
	}

	init = () => {
		//const formControls = Array.from(this.form.elements);

		for(const element of this.form.elements) {
			
			// N'accrocher l'événement invalid que sur un seul input d'une collection d'inputs radio afin d'éviter les call redondant lors d'un échec
			if (
				element.type === "radio" &&
				Array.from(this.form.elements).find(el => el.name === element.name) !== element) {
					return;		
			}

			element.addEventListener('invalid', e => {
				e.preventDefault();
				this.throwError(e.target);
			});
		};

		// Utiliser le Constraint API pour vérifier la validité des champs
		
	}

	throwError = i => {
		
		let
			field = i.closest(this.fieldBlockClass),
			errNode = buildTextElement("small", this.getError(i));

		// Ajouter le champ (wrapper) et son champ texte d'erreur au tableau d'erreur(s)
		this.storeError(
			{
				wrapperNode : field,
			 	errorMsgNode: errNode
			}
		);		

		// Injecter le message d'erreur
		field.append(errNode);
		// Basculer la classe d'erreur
		field.classList.toggle("error");
	}

	storeError = errObj => {
		this.errorFields.push(errObj);
	}

	getError = (i) => {
		if(i.validity.valueMissing) 
			return `Le champ ${i.dataset.label} est obligatoire`;

		if(i.validity.typeMismatch) 
			return `Le champ ${i.dataset.label} n'est pas du bon format`;
		
		if(i.validity.patternMismatch) 
			return `Le champ ${i.dataset.label} n'est pas du bon format`;
	}

	cleanErrors = () => {
		this.errorFields.forEach(f => {
			f.wrapperNode.classList.toggle("error");
			f.errorMsgNode.remove();
		});

		this.errorFields = [];
	}
}