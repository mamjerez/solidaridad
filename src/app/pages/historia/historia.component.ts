import { Component } from '@angular/core';

@Component({
	selector: 'app-historia',

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
		{ src: '/assets/img/recuerdos/recuerdos1.jpg', alt: 'recuerdos1', id: 8 },
		{ src: '/assets/img/recuerdos/recuerdos2.jpg', alt: 'recuerdos2', id: 9 },
		{ src: '/assets/img/recuerdos/recuerdos3.jpg', alt: 'recuerdos3', id: 10 },
		{ src: '/assets/img/recuerdos/recuerdos4.jpg', alt: 'recuerdos4', id: 11 },
		{ src: '/assets/img/recuerdos/recuerdos5.jpg', alt: 'recuerdos5', id: 12 },
		{ src: '/assets/img/recuerdos/recuerdos6.jpg', alt: 'recuerdos6', id: 13 },
		{ src: '/assets/img/recuerdos/recuerdos7.jpg', alt: 'recuerdos7', id: 14 },
		{ src: '/assets/img/recuerdos/recuerdos8.jpg', alt: 'recuerdos8', id: 15 },
		{ src: '/assets/img/recuerdos/recuerdos9.jpg', alt: 'recuerdos9', id: 16 },
		{ src: '/assets/img/recuerdos/recuerdos10.jpg', alt: 'recuerdos10', id: 17 },
		{ src: '/assets/img/recuerdos/recuerdos11.jpg', alt: 'recuerdos11', id: 18 },
		{ src: '/assets/img/recuerdos/recuerdos12.jpg', alt: 'recuerdos12', id: 19 },
		{ src: '/assets/img/recuerdos/recuerdos13.jpg', alt: 'recuerdos13', id: 20 },
		{ src: '/assets/img/recuerdos/recuerdos14.jpg', alt: 'recuerdos14', id: 21 },
		{ src: '/assets/img/recuerdos/recuerdos15.jpg', alt: 'recuerdos15', id: 22 },
		{ src: '/assets/img/recuerdos/recuerdos16.jpg', alt: 'recuerdos16', id: 23 },
		{ src: '/assets/img/recuerdos/recuerdos17.jpg', alt: 'recuerdos17', id: 24 },
		{ src: '/assets/img/recuerdos/recuerdos18.jpg', alt: 'recuerdos18', id: 25 },
		{ src: '/assets/img/recuerdos/recuerdos19.jpg', alt: 'recuerdos19', id: 26 },
		{ src: '/assets/img/recuerdos/recuerdos20.jpg', alt: 'recuerdos20', id: 27 },
		{ src: '/assets/img/recuerdos/recuerdos21.jpg', alt: 'recuerdos21', id: 28 },
		{ src: '/assets/img/recuerdos/recuerdos22.jpg', alt: 'recuerdos22', id: 29 },
		{ src: '/assets/img/recuerdos/recuerdos23.jpg', alt: 'recuerdos23', id: 30 },
		{ src: '/assets/img/recuerdos/recuerdos24.jpg', alt: 'recuerdos24', id: 31 },
		{ src: '/assets/img/recuerdos/recuerdos25.jpg', alt: 'recuerdos25', id: 32 },
		{ src: '/assets/img/recuerdos/recuerdos26.jpg', alt: 'recuerdos26', id: 33 },
		{ src: '/assets/img/recuerdos/recuerdos27.jpg', alt: 'recuerdos27', id: 34 },
		{ src: '/assets/img/recuerdos/recuerdos28.jpg', alt: 'recuerdos28', id: 35 },
		{ src: '/assets/img/recuerdos/recuerdos29.jpg', alt: 'recuerdos29', id: 36 },
		{ src: '/assets/img/recuerdos/recuerdos30.jpg', alt: 'recuerdos30', id: 37 },
		{ src: '/assets/img/recuerdos/recuerdos31.jpg', alt: 'recuerdos31', id: 38 },
		{ src: '/assets/img/recuerdos/recuerdos32.jpg', alt: 'recuerdos32', id: 39 },
		{ src: '/assets/img/recuerdos/recuerdos33.jpg', alt: 'recuerdos33', id: 40 },
		{ src: '/assets/img/recuerdos/recuerdos34.jpg', alt: 'recuerdos34', id: 41 }
	];
}
