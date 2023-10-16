const readline = require('readline');
const fs = require('fs');

class TodoList {
  constructor() {
    this.tasks = [];
  }

  addData(task) {
    this.tasks.push(task);
  }

  updateTask(index, task) {
    this.tasks[index] = task;
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
  }

  listTasks() {
    for (let i = 0; i < this.tasks.length; i++) {
      console.log(`${i + 1}. ${this.tasks[i]}`);
    }
  }
// save data
  saveTasks() {
    fs.writeFileSync('todoList.json', JSON.stringify(this.tasks));
  }
// load data
  loadTasks() {
    try {
      this.tasks = JSON.parse(fs.readFileSync('todoList.json'));
    } catch (error) {
      this.tasks = [];
    }
  }
}

const todoList = new TodoList();

// Load the Todo List data from the local file
todoList.loadTasks();

// Start the command-line interface
const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

read.question('Enter Your Choice? \n (add/update/delete/list): ', (input) => {
    if(input == 'add'){
        read.question('Enter a new Data: ', (task) => {
            todoList.addData(task);
            todoList.saveTasks();
            console.log('Data added successfully!');
            read.close();
          });
    }
    else if(input == 'update'){
        read.question('Enter the index of the task to update: ', (index) => {
                    read.question('Enter the new Data: ', (task) => {
                      todoList.updateTask(index, task);
                      todoList.saveTasks();
                      console.log('Data updated successfully!');
                      read.close();
                    });
                  });
    }
    else if(input == 'delete'){
        read.question('Enter the index of the Data to delete: ', (index) => {
                    todoList.deleteTask(index);
                    todoList.saveTasks();
                    console.log('Data deleted successfully!');
                    read.close();
                  });
    }
    else if(input == 'list'){
        todoList.listTasks();
        read.close();
    }
    else{
        console.log('Please Enter valid Choice!');
        read.close();
    }
});
