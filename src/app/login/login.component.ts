import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AngularFireModule } from '@angular/fire';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user!: Observable<any>;
  constructor(
    private router: Router,
    public firebaseAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private database: AngularFireDatabase,
    private fire: AngularFireModule
  ) {}

  login(username: string, password: string) {
    window.localStorage.setItem('name', username);
    this.firebaseAuth.signInWithEmailAndPassword(username, password).then(
      (credential) => {
        this.router.navigate(['chat'], {
          state: {
            name: username,
          },
        });
      },
      (err) => {
        this.snackBar.open(err.message, '', {
          duration: 4000,
          panelClass: ['custom-style'],
          verticalPosition: 'top',
        });
      }
    );
    const user = this.database.list('user');
    console.log(user);
    this.user.forEach((element) => {
      console.log(element.name);
    });
    console.log();
  }
  ngOnInit(): void {}
}
