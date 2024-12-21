import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SocialMedia {
	name: string;
	url: string;
	icon: string;
}

@Component({
	selector: 'app-social-media',

	imports: [CommonModule],
	templateUrl: './social-media.component.html',
	styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent {
	socialMediaLinks: SocialMedia[] = [
		{
			name: 'Facebook',
			url: 'https://www.facebook.com/laalbarizuela/',
			icon: '📘'
		}
		// {
		// 	name: 'Twitter',
		// 	url: 'https://twitter.com/tuasociacion',
		// 	icon: '🐦'
		// },
		// {
		// 	name: 'Instagram',
		// 	url: 'https://instagram.com/tuasociacion',
		// 	icon: '📸'
		// }
	];
}
