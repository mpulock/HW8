import { Component } from '@angular/core';
import { AuthenticationService } from './shared/authentication.service';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyPhotoApp';

  email: string;
  password: string;

  constructor(public authenticationService: AuthenticationService,
    public userService: UserService
    ) {}

  signUp() {
    this.authenticationService.SignUp(this.email, this.password);
    this.userService.registerUser(this.email, this.email);

    this.userService.registerUser(this.email, this.email)
    .subscribe(
      result => console.log("Register user response", result),
      err => console.error('Got an errorin register user:' + err),
      () => console.log('Got a complete notification')
    );


    this.email = ''; 
    this.password = '';
  }

  signIn() {
    this.authenticationService.SignIn(this.email, this.password);
    this.email = ''; 
    this.password = '';
  }

  signOut() {
    this.authenticationService.SignOut();
  }
}
