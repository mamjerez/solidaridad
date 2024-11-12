import { Component } from '@angular/core';
import { Project } from './components/proyectos.model';
import { PROJECTS } from './components/proyectos.data';
import { ProjectCardComponent } from './components/proyectos-card.component';

@Component({
	selector: 'app-proyectos',
	standalone: true,
	imports: [ProjectCardComponent],
	templateUrl: './proyectos.component.html',
	styleUrl: './proyectos.component.scss'
})
export default class ProyectosCardComponent {
	projects = PROJECTS;
	filteredProjects = PROJECTS;
	showProjectForm = false;

	onFilterChange(status: string) {
		this.filteredProjects =
			status === 'Todos' ? this.projects : this.projects.filter((project) => project.status === status);
	}
}
