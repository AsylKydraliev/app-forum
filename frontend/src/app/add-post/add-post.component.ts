import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.sass']
})
export class AddPostComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    const postData = this.form.value;
    console.log(postData)
  }
}
