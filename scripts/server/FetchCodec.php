<?php 

	$json = file_get_contents('php://input');
	$data = json_decode($json);

	require_once("{$data->model}DAO.php");

	$class = "{$data->model}DAO";
	
	$dao = new $class();

	$method = $data->action;

 	$pl = $data->payload;

	switch ($method) {
		case "insert":
			if($id = $dao->insert($pl)) {
				echo json_encode(array("id" => $id));
			};
			break;
		case "selectById":
			if($task = $dao->getTaskById($pl->id, true)) {
				echo ($task);
			} else {
				echo ("false");
			}
			break;
		case "delete":
			if($dao->deleteId($pl->id)) {
				echo json_encode(array("result" => "true"));
			}
	}
?>