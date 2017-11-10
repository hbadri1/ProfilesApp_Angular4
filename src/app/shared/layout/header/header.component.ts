import { Component, OnInit } from '@angular/core';
import { User } from '../../models';
import { UserService } from '../../services';

@Component({
  selector: 'header-layout',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showAuthed: boolean = false;
  currentUser: User;
  
  constructor(private useService : UserService) { }

  ngOnInit() {
    this.useService.currentUser.subscribe(
      userData =>{
        this.currentUser = userData;
      }
    );

    this.useService.isAuthenticated.subscribe(
      data => this.showAuthed = data
    );
  }

}
