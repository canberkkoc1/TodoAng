import { Component, OnInit } from '@angular/core';
import {TodoServiceService} from './todoservice/todoService.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers:[TodoServiceService]
})
export class TodoComponent implements OnInit {
  todoArray: any[];


  constructor(private toDoService:TodoServiceService) { }

  ngOnInit() {
    this.toDoService.getTodo().snapshotChanges()
    .subscribe(i => {
      this.todoArray = [];
      i.map(e=>{
        var x = e.payload.toJSON();
        x["$key"]=e.key;
        this.todoArray.push(x);
      })
    })
  }

onAddTodo(iTitle){
  this.toDoService.addTodo(iTitle.value)
  iTitle.value=null;
}

checkTodo($key:string,completed:boolean){
  this.toDoService.checkTodo($key,!completed)
}

onDelete($key:string){
  this.toDoService.deleteTodo($key)
}

onDate($key:string,date:Date){
  this.toDoService.addDate($key,date)
}

}
