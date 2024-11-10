import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './layouts/footer/footer.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import HomeComponent from './home/home.component';
// import 'ag-grid-enterprise';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	standalone: true,
	imports: [NavbarComponent, RouterOutlet, FooterComponent, HomeComponent]
})
export class AppComponent {}
