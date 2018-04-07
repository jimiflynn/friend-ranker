import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Link, MainMenuDirectory } from './core/navbar/navbar.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Friendranker';

  links: Link[] = MainMenuDirectory;

  constructor(
    private router: Router
  ) {}

  onToggle(drawer, via?: any) {
    console.log(`toggle drawer: `, via);
    return drawer.toggle()
  };

}
