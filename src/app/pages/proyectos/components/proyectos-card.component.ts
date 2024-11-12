import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from './proyectos.model';

@Component({
	selector: 'app-projectos-card',
	standalone: true,
	imports: [CommonModule],
	template: `
		<div class="card">
			<img [src]="project.image" [alt]="project.title" class="project-image" />
			<div class="project-content">
				<div class="project-header">
					<h1>{{ project.title }}</h1>
					<!-- <span [class]="getStatusClass()">{{ project.status }}</span> -->
				</div>
				<p class="project-description">{{ project.description }}</p>
				<div class="project-progress">
					<div class="progress-bar">
						<div class="progress-bar-fill" [style.width.%]="project.progress"></div>
					</div>
					<!-- <span class="progress-text">{{ project.progress }}% completado</span> -->
				</div>
			</div>
		</div>
	`,
	styles: [
		`
			.project-image {
				width: 100%;
				height: 100%;
				object-fit: cover;
				border-radius: 0.5rem;
				margin-bottom: 1rem;
			}

			.project-content {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
			}

			.project-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.project-description {
				color: var(--text-light);
				margin: 0.5rem 0;
			}

			.project-progress {
				margin-top: 1rem;
			}

			.progress-text {
				display: block;
				font-size: 0.875rem;
				color: var(--text-light);
				margin-top: 0.25rem;
			}
		`
	]
})
export class ProjectCardComponent {
	@Input() project!: Project;

	getStatusClass(): string {
		const baseClass = 'status-badge';
		switch (this.project.status) {
			case 'En Progreso':
				return `${baseClass} status-progress`;
			case 'Completado':
				return `${baseClass} status-completed`;
			case 'Planificado':
				return `${baseClass} status-planned`;
			default:
				return baseClass;
		}
	}
}
