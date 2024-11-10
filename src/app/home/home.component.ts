import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	standalone: true,
	imports: []
})
export default class HomeComponent implements OnInit {
	public images = ['/assets/img/juntaDirectiva.jpg', '/assets/img/2024Pelayo.jpg', '/assets/img/2022Mamen.jpg'];
	public currentImageIndex = 0;

	ngOnInit() {
		this.startSlider();
	}

	startSlider() {
		setInterval(() => {
			this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
		}, 3000);
	}
}
