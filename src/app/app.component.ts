import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-recipe';

  loadedFeature = 'recipe';
  onNavigate(e){
    this.loadedFeature = e;
  }
}
