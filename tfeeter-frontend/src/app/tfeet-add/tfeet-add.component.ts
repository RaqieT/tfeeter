import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Tfeet } from '../tfeet';
import { TfeetService } from '../tfeet.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './tfeet-add.component.html',
  styleUrls: [ './tfeet-add.component.css' ]
})
export class TfeetAddComponent implements OnInit {
  tfeet: Tfeet;

  constructor(
    private route: ActivatedRoute,
    private tfeetService: TfeetService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.tfeet = {} as Tfeet;
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.tfeetService.addTfeet(this.tfeet)
      .subscribe(() => this.goBack());
  }
}
