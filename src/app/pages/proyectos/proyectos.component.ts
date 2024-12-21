import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-proyectos',
	templateUrl: './proyectos.component.html',
	styleUrl: './proyectos.component.scss'
})
export default class ProyectosCardComponent {
	private readonly _router = inject(Router);
}
