import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {User} from '../user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {
  user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.user = {} as User;
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    console.log(this.user);
    this.userService.addUser(this.user)
      .subscribe(() => this.goBack());
  }
}
