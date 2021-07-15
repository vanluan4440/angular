import { LogoutComponent } from './../logout/logout.component';
import { CourseDialogComponent } from './../course-dialog/course-dialog.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { from, Observable } from 'rxjs';
import { use } from 'vue/types/umd';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  name = window.localStorage.getItem('name');

  user = '';
  dk = false;
  number = 0;

  groups!: Observable<any>;
  constructor(
    private firebase: AngularFireDatabase,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.router.getCurrentNavigation();
  }

  ngOnInit(): void {
    this.groups = this.firebase.list('groups').valueChanges();
    setTimeout(() => {
      this.dk = true;
    }, 1500);
  }
  openDialog() {
    this.dialog.open(CourseDialogComponent);
  }
  logout() {
    this.dialog.open(LogoutComponent);
  }
}
