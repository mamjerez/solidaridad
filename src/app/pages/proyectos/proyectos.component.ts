import { Component, inject } from '@angular/core';
import { PROJECTS } from './components/proyectos.data';
import { Router } from '@angular/router';

@Component({
	selector: 'app-proyectos',
	standalone: true,
	templateUrl: './proyectos.component.html',
	styleUrl: './proyectos.component.scss'
})
export default class ProyectosCardComponent {
	private readonly _router = inject(Router);
	projects = PROJECTS;
	filteredProjects = PROJECTS;
	showProjectForm = false;

	onFilterChange(status: string) {
		this.filteredProjects =
			status === 'Todos' ? this.projects : this.projects.filter((project) => project.status === status);
	}

	navigateTo(path: string) {
		this._router.navigate([path]);
	}
}
