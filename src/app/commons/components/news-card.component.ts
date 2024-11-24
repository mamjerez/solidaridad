import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatCardModule } from '@angular/material/card';
import { News } from '../../models/news.interface';

@Component({
	selector: 'app-news-card',
	standalone: true,
	imports: [CommonModule],
	template: `
		<!-- <mat-card class="news-card">
			<img mat-card-image [src]="news.image_url" [alt]="news.title" />
			<mat-card-content> -->
		<h2>{{ news.title }}</h2>
		<p>{{ news.summary }}</p>
		<!-- </mat-card-content>
		</mat-card> -->
	`,
	styles: [
		`
			.news-card {
				margin-bottom: 16px;
				break-inside: avoid;
			}
			img {
				width: 100%;
				height: 200px;
				object-fit: cover;
			}
			h2 {
				font-size: 1.2rem;
				margin: 8px 0;
			}
		`
	]
})
export class NewsCardComponent {
	@Input() news!: News;
}
