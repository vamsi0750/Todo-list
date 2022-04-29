import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from './models/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  todoList: Array<Todo> = [];
  todoForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem("todos")?.length > 0) {
      this.todoList = JSON.parse(localStorage.getItem("todos"))
    }
    this.todoForm = this.fb.group({
      id:[''],
      name: ['', Validators.required],
      date:['']
    })
  }

  addTodo(){
    this.todoForm.value.id = this.todoList.length + 1;
    this.todoForm.value.date = new Date();
    this.todoList.push(this.todoForm.value);
    localStorage.setItem('todos',JSON.stringify(this.todoList))
    this.todoForm.reset();  
  }
}
