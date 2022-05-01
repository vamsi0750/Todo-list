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
  isEditMode: boolean;
  currentTodoIndex: number;


  constructor(
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {

    this.todoForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      date: [''],
      updatedDate:[]
    })
  }

  addTodo() {
    this.todoForm.value.id = this.todoList.length + 1;
    this.todoForm.value.date = new Date();
    this.todoList.push(this.todoForm.value);
    this.todoForm.reset();
  }

  deleteTodo(ri: number) {
    this.todoList.splice(ri, 1);
  }
  showDialog(todo: Todo, index: number) {
    this.isEditMode = true;
    this.todoForm.patchValue(todo);
    this.currentTodoIndex = index;

  }
  update() {
    this.todoList[this.currentTodoIndex].name = this.todoForm.value.name
    this.todoList[this.currentTodoIndex].updatedDate = new Date();
    this.isEditMode = false;
    this.todoForm.reset();
  }

}
