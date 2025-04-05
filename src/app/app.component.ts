import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Firestore, collection, addDoc, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms'; // ✅ Add this
import { CommonModule } from '@angular/common'; // ✅ Add this

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule,CommonModule], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'groot-manager';

  
  firestore: Firestore = inject(Firestore);

  tasklist: any[] = [];
  NEWtask: string = '';
  editingIndex: number | null = null;
  editingId: string | null = null;
  currentTime: string = '';

  ngOnInit() {
    this.loadTasks();
    this.currentTime = this.getCurrentFormattedTime(); // For timestamp
  }

  // ✅ CREATE
  async addTask() {
    if (this.NEWtask.trim() === '') return;

    const taskCollection = collection(this.firestore, 'tasks');
    await addDoc(taskCollection, { NEWtask: this.NEWtask });

    this.NEWtask = '';
    this.loadTasks();
  }

  // ✅ READ
  loadTasks() {
    const taskCollection = collection(this.firestore, 'tasks');
    collectionData(taskCollection, { idField: 'id' }).subscribe(data => {
      this.tasklist = data;
    });
  }

  // ✅ DELETE
  async deleteTask(task: any) {
    const taskDocRef = doc(this.firestore, `tasks/${task.id}`);
    await deleteDoc(taskDocRef);
    this.loadTasks();
  }

  // ✅ UPDATE
  editTask(i: number) {
    this.NEWtask = this.tasklist[i].NEWtask;
    this.editingIndex = i;
    this.editingId = this.tasklist[i].id;
  }

  async updateTask() {
    if (this.editingId) {
      const taskDocRef = doc(this.firestore, `tasks/${this.editingId}`);
      await updateDoc(taskDocRef, { NEWtask: this.NEWtask });
      this.NEWtask = '';
      this.editingId = null;
      this.editingIndex = null;
      this.loadTasks();
    }
  }

  // ✅ Timestamp Formatting
  getCurrentFormattedTime(): string {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' · ' +
           now.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }


  cancelEdit() {
    this.NEWtask = '';
    this.editingId = null;
    this.editingIndex = null;
  }
  
}


/*
if im used service my .ts file will look like below




export class AppComponent implements OnInit {
  title = 'groot-manager';

  tasklist: Task[] = [];
  NEWtask: string = '';
  editingIndex: number | null = null;
  editingId: string | null = null;
  currentTime: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTasks();
    this.currentTime = this.getCurrentFormattedTime();
  }

  // ✅ CREATE
  async addTask() {
    if (this.NEWtask.trim() === '') return;

    const newTask: Task = {
      title: this.NEWtask,
      completed: false,
      createdAt: new Date()
    };

    await this.todoService.addTask(newTask);
    this.NEWtask = '';
    this.loadTasks();
  }

  // ✅ READ
  loadTasks() {
    this.todoService.getTasks().subscribe(data => {
      this.tasklist = data;
    });
  }

  // ✅ DELETE
  async deleteTask(task: Task) {
    if (task.id) {
      await this.todoService.deleteTask(task.id);
      this.loadTasks();
    }
  }

  // ✅ UPDATE
  editTask(i: number) {
    this.NEWtask = this.tasklist[i].title;
    this.editingIndex = i;
    this.editingId = this.tasklist[i].id ?? null;
  }

  async updateTask() {
    if (this.editingId) {
      await this.todoService.updateTask(this.editingId, { title: this.NEWtask });
      this.NEWtask = '';
      this.editingId = null;
      this.editingIndex = null;
      this.loadTasks();
    }
  }

  // ✅ Timestamp Formatting
  getCurrentFormattedTime(): string {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' · ' +
           now.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }

  cancelEdit() {
    this.NEWtask = '';
    this.editingId = null;
    this.editingIndex = null;
  }
}

*/