import { Component } from '@angular/core';

@Component({
	selector: 'app-historia',
	standalone: true,
	imports: [],
	templateUrl: './historia.component.html',
	styleUrl: './historia.component.scss'
})
export default class HistoriaComponent {
	memoriaImages = [
		{ src: '/assets/img/memoria/SebastianPeña.jpg', alt: 'Sebastián Peña' },
		{ src: '/assets/img/memoria/PedroGarcia.jpg', alt: 'Pedro García' }
	];

	logrosImages = [
		{ src: '/assets/img/logros/radioterapia.jpg', alt: 'Radioterapia' },
		{ src: '/assets/img/logros/1olimpiadas.png', alt: 'Olimpiadas' }
	];

	recuerdosImages = [
		{ src: '/assets/img/recuerdos/ReyesMagos.jpg', alt: 'Reyes Magos', id: 1 },
		{ src: '/assets/img/recuerdos/PlataformaA2003.jpg', alt: 'Plataforma A2003', id: 2 },
		{ src: '/assets/img/recuerdos/ADIFI.jpg', alt: 'ADIFI', id: 3 },
		{ src: '/assets/img/recuerdos/SebastianPedro.jpg', alt: 'Sebastian y Pedro', id: 4 },
		{ src: '/assets/img/recuerdos/FiestaVendimia.jpg', alt: 'Fiesta Vendimia', id: 5 },
		{ src: '/assets/img/recuerdos/panel.jpg', alt: 'Panel', id: 6 },
		{ src: '/assets/img/recuerdos/paneles.jpg', alt: 'Paneles', id: 7 },
		{ src: '/assets/img/recuerdos/recuerdos1.jpg', alt: 'ADIFI', id: 8 },
		{ src: '/assets/img/recuerdos/recuerdos2.jpg', alt: 'Sebastian y Pedro', id: 9 },
		{ src: '/assets/img/recuerdos/recuerdos3.jpg', alt: 'Fiesta Vendimia', id: 10 },
		{ src: '/assets/img/recuerdos/recuerdos4.jpg', alt: 'Fiesta Vendimia', id: 11 },
		{ src: '/assets/img/recuerdos/recuerdos5.jpg', alt: 'Fiesta Vendimia', id: 12 },
		{ src: '/assets/img/recuerdos/recuerdos6.jpg', alt: 'Fiesta Vendimia', id: 13 },
		{ src: '/assets/img/recuerdos/recuerdos7.jpg', alt: 'Fiesta Vendimia', id: 14 },
		{ src: '/assets/img/recuerdos/recuerdos8.jpg', alt: 'Fiesta Vendimia', id: 15 },
		{ src: '/assets/img/recuerdos/recuerdos9.jpg', alt: 'Fiesta Vendimia', id: 16 },
		{ src: '/assets/img/recuerdos/recuerdos10.jpg', alt: 'Fiesta Vendimia', id: 17 },
		{ src: '/assets/img/recuerdos/recuerdos11.jpg', alt: 'Fiesta Vendimia', id: 18 },
		{ src: '/assets/img/recuerdos/recuerdos12.jpg', alt: 'Fiesta Vendimia', id: 19 },
		{ src: '/assets/img/recuerdos/recuerdos13.jpg', alt: 'Fiesta Vendimia', id: 20 },
		{ src: '/assets/img/recuerdos/recuerdos14.jpg', alt: 'Fiesta Vendimia', id: 21 },
		{ src: '/assets/img/recuerdos/recuerdos15.jpg', alt: 'Fiesta Vendimia', id: 22 },
		{ src: '/assets/img/recuerdos/recuerdos16.jpg', alt: 'Fiesta Vendimia', id: 23 },
		{ src: '/assets/img/recuerdos/recuerdos17.jpg', alt: 'Fiesta Vendimia', id: 24 },
		{ src: '/assets/img/recuerdos/recuerdos18.jpg', alt: 'Fiesta Vendimia', id: 25 },
		{ src: '/assets/img/recuerdos/recuerdos19.jpg', alt: 'Fiesta Vendimia', id: 26 },
		{ src: '/assets/img/recuerdos/recuerdos20.jpg', alt: 'Fiesta Vendimia', id: 27 },
		{ src: '/assets/img/recuerdos/recuerdos21.jpg', alt: 'Fiesta Vendimia', id: 28 },
		{ src: '/assets/img/recuerdos/recuerdos22.jpg', alt: 'Fiesta Vendimia', id: 29 },
		{ src: '/assets/img/recuerdos/recuerdos23.jpg', alt: 'Fiesta Vendimia', id: 30 },
		{ src: '/assets/img/recuerdos/recuerdos24.jpg', alt: 'Fiesta Vendimia', id: 31 },
		{ src: '/assets/img/recuerdos/recuerdos25.jpg', alt: 'Fiesta Vendimia', id: 32 },
		{ src: '/assets/img/recuerdos/recuerdos26.jpg', alt: 'Fiesta Vendimia', id: 33 },
		{ src: '/assets/img/recuerdos/recuerdos27.jpg', alt: 'Fiesta Vendimia', id: 34 },
		{ src: '/assets/img/recuerdos/recuerdos28.jpg', alt: 'Fiesta Vendimia', id: 35 },
		{ src: '/assets/img/recuerdos/recuerdos29.jpg', alt: 'Fiesta Vendimia', id: 36 },
		{ src: '/assets/img/recuerdos/recuerdos30.jpg', alt: 'Fiesta Vendimia', id: 37 },
		{ src: '/assets/img/recuerdos/recuerdos31.jpg', alt: 'Fiesta Vendimia', id: 38 },
		{ src: '/assets/img/recuerdos/recuerdos32.jpg', alt: 'Fiesta Vendimia', id: 39 },
		{ src: '/assets/img/recuerdos/recuerdos33.jpg', alt: 'Fiesta Vendimia', id: 40 },
		{ src: '/assets/img/recuerdos/recuerdos34.jpg', alt: 'Fiesta Vendimia', id: 41 }
	];
}
