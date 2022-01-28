//////////
// SETUP
//////////

// import synchronous prompt for node. You need to install it first with `node install prompt-sync`:
const prompt = require("prompt-sync")();

// global variables
const menu_string = "Welcome to your task manager, Press:\n\n1. to see all your tasks\n2. to add a task\n3. to delete a task\n4. to mark a task as done\n5. to Save to file\n6. to Exit the task manager\n"

const tasks = JSON.parse(taskFile)
const done_array = JSON.parse(doneFile)
const exitNumber = 6
let taskFile
let doneFile


// IN THIS VERSION WE CHECK IF THE FILES DO EXIST
// to use files :
const fs = require('fs')
const fileNameTasks = "tasksFile.json"
const fileNameDone = "doneFile.json"


// check if the tasks file exists
if(fs.existsSync(fileNameTasks)) {
	// read file if it exists
	taskFile = fs.readFileSync(fileNameTasks, 'utf-8')
}else{
	// write a file with an empty array in it, if it does not exist
	fs.writeFileSync(fileNameTasks, "[]")
	taskFile = fs.readFileSync(fileNameTasks, 'utf-8')
}

// same for done File
if(fs.existsSync(fileNameDone)) {
	// read file if it exists
	doneFile = fs.readFileSync(fileNameDone, 'utf-8')
}else{
	// write a file with an empty array in it, if it does not exist
	fs.writeFileSync(fileNameDone, "[]")
	doneFile = fs.readFileSync(fileNameDone, 'utf-8')
}




///////////
//FUNCTIONS
///////////

// add a task
const addTask = () => {
	let newTask
	console.log('Type the content of the new task : ')
	newTask = prompt()
	tasks.push(newTask)
	done_array.push(false)
}

// display all tasks
const seeAllTasks = () => {
	console.log("\nHere are all your tasks : ")
	console.table([tasks, done_array])
}

// delete a task

const deleteTask = () => {
	let indexToDelete
	console.table(tasks)
	console.log('Give the index of the task you want to delete: ')
	indexToDelete = parseInt(prompt())
	tasks.splice(indexToDelete, 1);
	done_array.splice(indexToDelete, 1)

}

// mark as done

const markAsDone = () => {
	let indexToMarkAsDone
	console.table([tasks, done_array])
	console.log('Give the index of the task you want to mark as done: ')
	indexToMarkAsDone = parseInt(prompt())
	done_array[indexToMarkAsDone] = true;
}



// save to file

const saveToFile = () => {
	const dataJSONtasks = JSON.stringify(tasks)
	const dataJSONdone = JSON.stringify(done_array)

	fs.writeFileSync(fileNameTasks, dataJSONtasks)
	fs.writeFileSync(fileNameDone, dataJSONdone)

}


// menu
const menu = () => {
	console.log(menu_string)
	return parseInt(prompt())
}

// Main function
const main = () => {

	let choice

	while(choice != exitNumber)
	{
		choice = menu()
		switch(choice) {
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
			case 6: console.log("Bye !")
			break;
			default: console.log("\nChoose something between 1 and 6\n")
			break;
		}
	}
}

/////////////
// LAUNCH APP
/////////////
main()
