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
		{ src: '/assets/img/recuerdos/ReyesMagos.jpg', alt: 'Reyes Magos' },
		{ src: '/assets/img/recuerdos/PlataformaA2003.jpg', alt: 'Plataforma A2003' },
		{ src: '/assets/img/recuerdos/ADIFI.jpg', alt: 'ADIFI' },
		{ src: '/assets/img/recuerdos/SebastianPedro.jpg', alt: 'Sebastian y Pedro' },
		{ src: '/assets/img/recuerdos/FiestaVendimia.jpg', alt: 'Fiesta Vendimia' },
		{ src: '/assets/img/recuerdos/ReyesMagos.jpg', alt: 'Reyes Magos' },
		{ src: '/assets/img/recuerdos/PlataformaA2003.jpg', alt: 'Plataforma A2003' },
		{ src: '/assets/img/recuerdos/ADIFI.jpg', alt: 'ADIFI' },
		{ src: '/assets/img/recuerdos/SebastianPedro.jpg', alt: 'Sebastian y Pedro' },
		{ src: '/assets/img/recuerdos/FiestaVendimia.jpg', alt: 'Fiesta Vendimia' }
	];
}
