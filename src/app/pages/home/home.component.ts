import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	standalone: true,
	imports: [CardMenuComponent]
})
export default class HomeComponent implements OnInit {
	private readonly _router = inject(Router);
	public images = [
		'/assets/img/inicio/juntaDirectiva.jpg',
		'/assets/img/inicio/2024Pelayo.jpg',
		'/assets/img/inicio/2022Mamen.jpg'
	];
	public currentImageIndex = 0;

	ngOnInit() {
		this.startSlider();
	}

	startSlider() {
		setInterval(() => {
			this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
		}, 3000);
	}

	navigateTo(path: string) {
		this._router.navigate([path]);
	}
}
