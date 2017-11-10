import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { UserService } from '../../shared';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authType: String = '';
  title: String = '';
  authForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.authForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      this.title = (this.authType == 'login') ? 'Sign In' : 'Sign up';
      if (this.authType == 'register') {
        this.authForm.addControl('username', new FormControl());
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;
    //this.errors= new Errors();
    let credentials = this.authForm.value;
    this.userService.attempAuth(this.authType, credentials)
      .subscribe(
      data => {
        this.router.navigateByUrl('/');
      },
      err => {
        this.isSubmitting = false;
      });
  }

}
