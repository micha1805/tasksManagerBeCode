//////////
// SETUP
//////////

// to prompt values :
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// IN THIS VERSION THE FILES ARE SUPPOSED TO BE ALREADY EXISTING
// to use files :
// (they must already exist for the code to work properly)
const fs = require('fs')
const fileNameTasks = "tasksFile.json"
const fileNameDone = "doneFile.json"
// read files content :
const taskFile = fs.readFileSync(fileNameTasks, 'utf-8')
const doneFile = fs.readFileSync(fileNameDone, 'utf-8')

// global variables
const menu_string = "Welcome to your task manager, Press:\n\n1. to see all your tasks\n2. to add a task\n3. to delete a task\n4. to mark a task as done\n5. to Save to file\n6. to Exit the task manager\n\n"

const tasks = JSON.parse(taskFile)
const done_array = JSON.parse(doneFile)
const exitNumber = 6


///////////
//FUNCTIONS
///////////

// add a task
const addTask = () => {
	rl.question('Type the content of the new task :', (content) => {
		tasks.push(content)
		done_array.push(false)
		main()
	})
}

// display all tasks
const seeAllTasks = () => {
	console.log("\nHere are all your tasks :")
	console.table([tasks, done_array])
}

// delete a task

const deleteTask = () => {

	console.table(tasks)
	rl.question('Give the index of the task you want to delete: ', (index) => {
		tasks.splice(index, 1);
		done_array.splice(index, 1)
		main()
	})
}

// mark as done

const markAsDone = () => {
	console.table([tasks, done_array])
	rl.question('Give the index of the task you want to mark as done: ', (index) => {
		done_array[index] = true;
		main()
	})
}



// save to file

const saveToFile = () => {
	const dataJSONtasks = JSON.stringify(tasks)
	const dataJSONdone = JSON.stringify(done_array)

	fs.writeFileSync(fileNameTasks, dataJSONtasks)
	fs.writeFileSync(fileNameDone, dataJSONdone)

}

const whatToDo = (answer) => {

	if (parseInt(answer) != exitNumber ){

		switch(parseInt(answer)) {
			case 1: seeAllTasks();
			break;
			case 2: addTask();
			break;
			case 3: deleteTask()
			break;
			case 4: markAsDone()
			break;
			case 5: saveToFile()
			break;
			default: console.log("choose something between 1 and 5")
			main()
		}
		main()
	} else {
		console.log("Bye!")
		rl.close()

	}

}


// Main function
const main = () => {

	rl.question(menu_string, (answer) => {
		whatToDo(answer)
	})

}

/////////////
// LAUNCH APP
/////////////
main()
