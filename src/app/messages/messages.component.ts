import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  date = new Date();
  messages!: Observable<any>;
  group = '';
  newMessage = '';
  load = false;
  constructor(
    private router: ActivatedRoute,
    private firebase: AngularFireDatabase
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.group = params.group;
      if (this.group) {
        this.messages = this.firebase
          .list('messages', (ref) =>
            ref.orderByChild('group').equalTo(this.group)
          )
          .valueChanges();
      }
    });
    setTimeout(() => {
      this.load = true;
    }, 500);
  }
  send() {
    if (this.newMessage) {
      const messages = this.firebase.list('messages');
      messages.push({
        group: this.group,
        text: this.newMessage,
        user: window.localStorage.getItem('name'),
        time: this.date.getHours() + ':' + this.date.getMinutes(),
      });
      this.newMessage = '';
    }
  }
}
