import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Tfeet } from '../tfeet';
import { TfeetService } from '../tfeet.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './tfeet-detail.component.html',
  styleUrls: [ './tfeet-detail.component.css' ]
})
export class TfeetDetailComponent implements OnInit {
  tfeet: Tfeet;

  constructor(
    private route: ActivatedRoute,
    private heroService: TfeetService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.heroService.getTfeet(id)
      .subscribe(tfeet => this.tfeet = tfeet);
  }

  goBack(): void {
    this.location.back();
  }
}
