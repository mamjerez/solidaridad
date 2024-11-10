import { Location } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import NewsFormComponent from '@app/addNewRecod/add-new/add-new.component';

import { environment } from '@environments/environment';

import { ModalService } from '../modal/modal.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	standalone: true,
	imports: [RouterOutlet, RouterLink, RouterLinkActive]
})
export class NavbarComponent {
	@ViewChild('modal')
	modal!: ElementRef<HTMLDivElement>;
	@ViewChild('overlay') overlay!: ElementRef<HTMLDivElement>;
	private _location = inject(Location);
	private _modalService = inject(ModalService);
	public router = inject(Router);
	public path: string;
	public tag: string;
	public canAddRowSupabase = environment.canAddRowSupabase;

	getTag() {
		const urlSegments = this.router.url.split('/');
		this.tag = urlSegments[urlSegments.length - 1];
	}

	addNew(): void {
		// this._tagStoreService.getTag();
		this.getTag();
		this.router.navigateByUrl('addNew/' + this.tag);
		// this.useModal();
	}

	addCom(): void {
		this.getTag();
		this.router.navigateByUrl('addCom/' + this.tag);
	}

	addDoc(): void {
		this.getTag();
		this.router.navigateByUrl('addDoc/' + this.tag);
	}

	addCard(): void {
		this.getTag();
		this.router.navigateByUrl('addCard/' + this.tag);
	}

	navigateTo() {
		this.router.navigateByUrl('/');
	}

	volver() {
		this._location.back();
	}

	useModal() {
		this._modalService.open(NewsFormComponent, {
			animations: {
				modal: {
					enter: 'enter-scaling 0.3s ease-out',
					leave: 'fade-out 0.1s forwards'
				},
				overlay: {
					enter: 'fade-in 1s',
					leave: 'fade-out 0.3s forwards'
				}
			},
			size: {
				width: '40rem',
				minWidth: '850px'
			}
		});
	}
}
