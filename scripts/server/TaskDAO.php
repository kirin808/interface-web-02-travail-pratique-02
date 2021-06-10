<?php 

	require_once("Gateway.php");

	class TaskDAO extends Gateway {
		protected $table = "task";

		public function getAllTasks($jsonify = false) {
			return ($jsonify) ?
				json_encode($this->selectAll()) :
				$this->selectAll();
		}

		public function getTaskById($id, $jsonify = false) {
			return ($jsonify) ?
				json_encode($this->selectById($id)) :
				$this->selectById($id);
		}
	}


?>