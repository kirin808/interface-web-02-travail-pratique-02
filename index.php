<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>Gestionnaire de tâches 3000 :: Laser edition</title>
	<meta name="description" content="">

	<!-- Fonts -->

	<!-- Stylesheets -->
	<link rel="stylesheet" href="./styles/main.css">
	
	<!-- Scripts -->
	<script type="module" src="./scripts/script.js"></script>	
</head>

<body>
	<main>
		<h1>Gestionnaire universel de tâches</h1>
		<section class="block-shadowy">
			<h2>Ajouter une tâche</h2>
			<form name="addTask" class="flow-content">
				<div class="field-block">
					<label for="inputNomTache">Nom de la tâche :</label>
					<input type="text" id="inputNomTache" name="name" placeholder="Nom de la tâche..." data-label="Nom" required>
				</div>
				
				<div class="field-block">
					<label for="inputDescTache">Description :</label>
					<textarea id="inputDescTache" name="description" data-label="Description"></textarea>
				</div>
		
				<div class="field-block">
					<span>Importance de la tâche :</span>
					<div data-js-form-item="inputWrapper">
						<div class="radioInputs">
							<label><input type="radio" name="importance" value="1" data-label="Importance" required>Futile</label>
							<label><input type="radio" name="importance" value="2">Peut-être</label>
							<label><input type="radio" name="importance" value="3">Impératif</label>
						</div>
					</div>
				</div>
				
				<footer>
					<button type="button" name="addTask">Ajouter la tâche</button>
				</footer>
			</form>
		</section>

		<section class="liste">
			<h2>LA liste.</h2>

			<ul class="todoList" data-list="todo">
				<?php 
					require_once("scripts/server/TaskDAO.php");
					$taskDAO =  new TaskDAO();

					foreach($taskDAO->getAllTasks() as $task) :
				?>
				<li data-task-id="<?= $task->id; ?>" class="taskEntry taskPriority<?= $task->importance; ?> block-shadowy">
					<div class="taskSummary">
						<span><?= $task->name; ?></span>
						<span>Priorité : <?= $task->importance; ?></span>
					</div>
					
					<footer class="manageTask">
						<button type="button" name="showDetails">Afficher les détails</button>
						<button type="button" name="deleteTask">Supprimer cette tâche ingrate</button>
					</footer>
				</li>
				<?php endforeach; ?>
			</ul>
		</section>

		<section class="details block-shadowy">
			<input class="visually-hidden arrow-toggle" type="checkbox" id="checkboxToggleDetails" data-button="toggleDetails">
			<label class="arrow-icon" for="checkboxToggleDetails"><img src="assets/images/SVG/icone-fleche-accordeon.svg" alt="icône flèche vers le bas"></label>
			
			<h2>Détails de la tâche</h2>
			
			<dl data-list="taskDetails">
				<div data-details="name">
					<dt>Nom de la tâche : </dt>
					<dd></dd>
				</div>
				<div data-details="description">
					<dt>Description : </dt>
					<dd></dd>
				</div>
				<div data-details="importance">
					<dt>Importance : </dt>
					<dd></dd>
				</div>
			</dl>
		</section>
	</main>

	<!-- templates -->
	<template id="templateTaskPanel">
		<li class="taskEntry block-shadowy">
			<div class="taskSummary">
				<span>{{ name }}</span>
				<span>Priorité : {{ importance }}</span>
			</div>
			
			<footer class="manageTask">
				<button type="button" name="showDetails">Afficher les détails</button>
				<button type="button" name="deleteTask">Supprimer cette tâche ingrate</button>
			</footer>
		</li>
	</template>

	<!-- /end templates -->
</body>
</html>