import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Task {
  id?: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})


export class TodoService {
  private taskCollection = collection(this.firestore, 'tasks');

  constructor(private firestore: Firestore) {}

  addTask(task: Task) {
    return addDoc(this.taskCollection, task);
  }

  getTasks(): Observable<Task[]> {
    return collectionData(this.taskCollection, { idField: 'id' }) as Observable<Task[]>;
  }

  updateTask(id: string, data: Partial<Task>) {
    const taskRef = doc(this.firestore, `tasks/${id}`);
    return updateDoc(taskRef, data);
  }

  deleteTask(id: string) {
    const taskRef = doc(this.firestore, `tasks/${id}`);
    return deleteDoc(taskRef);
  }
}