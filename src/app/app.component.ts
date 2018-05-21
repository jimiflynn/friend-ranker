import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Link, MainMenuDirectory } from './core/navbar/navbar.interface';
import { MatSidenavContainer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer;
  title = 'Friendranker';
  links: Link[] = MainMenuDirectory;

  constructor(
    private router: Router
  ) {}

  onToggle(drawer, via?: any) {
    console.log(`toggle drawer: `, via);
    return drawer.toggle();
  };

  ngOnInit() {
    // console.log(this.sidenavContainer);
  }

}
