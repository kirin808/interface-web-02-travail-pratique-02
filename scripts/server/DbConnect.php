<?php 
	abstract class DbConnect {

		protected $hostname;
		protected $database;
		protected $username;
		protected $password;

		public function __construct() {
			$this->hostname = "localhost";
			$this->database = "todo_list";
			$this->username = "the_fetchor";
			$this->password = "kunaiinou├»";
			
			try {
				$this->c = new \PDO("mysql:host=$this->hostname;dbname=$this->database", $this->username, $this->password);
				$this->c->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
				$this->c->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_OBJ);
			} catch (\PDOException $e) {
				echo 'Connection failed: ' . $e->getMessage();
			}
		}

	}

?>