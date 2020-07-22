import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from '@angular/fire/database'

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  todoList: AngularFireList<any>


  constructor(private firebasedb: AngularFireDatabase) { }


  getTodo(){
    this.todoList = this.firebasedb.list("todos");
    return this.todoList;
  }

  addTodo(todoTitle:string):void{
    if(todoTitle.trim().length === 0){
      return;
    }
    this.todoList.push({
      todoTitle:todoTitle,
      completed:false,
      due:new Date(),
     
    })
    
    
}

deleteTodo($key:string):void{
  this.todoList.remove($key)
}

checkTodo($key:string,flag){
  this.todoList.update($key,{completed:flag})
}
addDate($key,due){
  this.todoList.update($key,{due})
}
 
}
