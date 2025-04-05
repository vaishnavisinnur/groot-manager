import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Taskinterface } from '../taskinterface';

@Component({
  selector: 'todo-root',
  standalone: true,
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css', 
  imports: [FormsModule, CommonModule]
})
export class TodoComponent implements OnInit{
  ngOnInit(): void {
   
  }
  tasklist : Taskinterface[] = [];
  NEWtask: String = '';

  constructor(private todo : TodoService ){}


  // getAllTask() {
  //   this.todo.getAllTask().subscribe(
  //     (res) => {
  //       this.tasklist = res.map((e: any) => {
  //         const todo = e.payload.doc.data(); // Get task data
  //         return {
  //           id: e.payload.doc.id,  // Include document ID
  //           ...todo  // Spread to keep all Firestore fields
  //         };
  //       });
  //     },
  //     (err) => {
  //       console.error('Error while fetching tasks:', err);
  //       alert('Error while fetching tasks. Check console for details.');
  //     }
  //   );
  // }
  

  addTask(){

  }

  updateTask(){

  }

  deleteTask(Task : Taskinterface){
    if(window.confirm('are you sure want to delete')){
    // this.todo.deleteTask(Task);
    }
}

}


// export class TodoComponent  implements OnInit{
 
//   title = 'Todo App';

//   taskobj : task = new task();

//   tasklist : task[] = [];
//   editIndex: number | null = null;

//   ngOnInit(): void {
//     debugger;
//       const localdata = localStorage.getItem('taskuser');
//       if(localdata != null){
//         this.tasklist = JSON.parse(localdata);
//       } 
//   }

//   addOrUpdateTask() {
//     if (this.taskobj.newtask.trim() !== '') {
//       if (this.editIndex === null) {
//         // Add new task
//         this.tasklist.push({ ...this.taskobj });
//       } else {
//         // Update existing task
//         this.tasklist[this.editIndex] = { ...this.taskobj };
//         this.editIndex = null; // Reset edit mode after updating
//       }
//       this.saveToLocalStorage();
//       this.taskobj = new task(); // Reset input field
//     }
//   }

//   removetask(index: number) {
//     this.tasklist.splice(index, 1);
//     this.saveToLocalStorage();
//   }

//   edittask(index: number) {
//     this.taskobj = { ...this.tasklist[index] }; // Load task into input field
//     this.editIndex = index; // Store index to update on next button click
//   }

//   saveToLocalStorage() {
//     localStorage.setItem('taskuser', JSON.stringify(this.tasklist));
//   }
// }
// class task {
//   newtask : string;

//   constructor() {
//     this.newtask = " ";
//   }
// }



