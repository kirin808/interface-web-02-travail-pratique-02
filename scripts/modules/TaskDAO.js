export default class TaskDAO {
	gateway = "scripts/server/FetchCodec.php";
	model = "task";
	data = {
		method: "POST",
		headers: {
			"Content-type": "application/json; charset=utf-8"
		}
	}

	fetchStuff = async () => {
		let payload;

		const resp = await fetch(this.gateway, this.data)
			.then(resp => resp.json())
			.then(result => {
				console.log(result);
				payload = result;
			});
		return payload;
	}

	addTask = (name, desc, importance) => {
		this.data.body = JSON.stringify({
			action: "insert",
			model: this.model,
			payload: {
				name: name,
				description: desc,
				importance: importance
			}
		});

		return this.fetchStuff();
	}

	getTaskById = (id) => {
		this.data.body = JSON.stringify({
			action: "selectById",
			model: this.model,
			payload: {
				id: id
			}
		});

		return this.fetchStuff();
	}

	deleteTask = (id) => {
		this.data.body = JSON.stringify({
			action: "delete",
			model: this.model,
			payload: {
				id: id
			}
		});

		return this.fetchStuff();
	}
}