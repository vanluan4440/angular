import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
})
export class CourseDialogComponent implements OnInit {
  constructor(
    private data: AngularFireDatabase,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}
  groups!: Observable<any>;
  name = '';
  des = '';
  ngOnInit(): void {}
  Add(name: string, des: string) {
    if (name == '' && des == '') {
      this.snackbar.open('You must insert value Room and Description', 'OK', {
        duration: 5000,
        panelClass: ['err'],
      });
    } else {
      const group = this.data.list('groups');
      group.push({
        name: this.name,
        description: this.des,
      });
      this.snackbar.open('Create room success', '', {
        duration: 5000,
        panelClass: ['success'],
      });
      this.name = '';
      this.des = '';
    }
  }
}
