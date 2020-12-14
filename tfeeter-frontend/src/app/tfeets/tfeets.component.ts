import { Component, OnInit } from '@angular/core';

import { Tfeet } from '../tfeet';
import { TfeetService } from '../tfeet.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './tfeets.component.html',
  styleUrls: ['./tfeets.component.css']
})
export class TfeetsComponent implements OnInit {
  tfeets: Tfeet[];

  constructor(private tfeetService: TfeetService) { }

  ngOnInit() {
    this.getTfeets();
  }

  getTfeets(): void {
    this.tfeetService.getTfeets()
    .subscribe(heroes => this.tfeets = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.tfeetService.addTfeet({ title: name } as Tfeet)
      .subscribe(tfeet => {
        this.tfeets.push(tfeet);
      });
  }

  delete(tfeet: Tfeet): void {
    this.tfeets = this.tfeets.filter(h => h !== tfeet);
    this.tfeetService.deleteTfeet(tfeet).subscribe();
  }

}
