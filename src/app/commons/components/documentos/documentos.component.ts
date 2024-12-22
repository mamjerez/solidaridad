import { Component, ElementRef, inject, OnInit, ViewChild, input } from '@angular/core';

import { IsAdminService } from '@services/isAdmin.service';

import { CustomDatePipe } from '@app/commons/pipes/custom-date.pipe';

@Component({
	selector: 'app-documentos',
	imports: [CustomDatePipe],
	templateUrl: './documentos.component.html'
})
export default class DocumentosComponent implements OnInit {
	readonly docs = input<any[]>(undefined);
	@ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

	private _isAdminService = inject(IsAdminService);
	public canViewConfidencial = false;
	public enlace = '';
	public mensaje = '';
	public isError = false;

	ngOnInit(): void {
		this._isAdminService.isAdmin$.subscribe((value) => {
			this.canViewConfidencial = value;
		});
	}

	handleLinkClick(url: string, event: MouseEvent): void {
		event.preventDefault(); // Prevenir la navegación por defecto

		if (this.isLocalPath(url)) {
			this.enlace = 'Copiar al portapapeles';
			this.copyToClipboard(url);
		} else {
			this.enlace = 'Enlace';
			window.open(url, '_blank', 'noopener,noreferrer');
		}
	}

	isLocalPath(url: string): boolean {
		const windowsPathPattern = /^[a-zA-Z]:\\/;
		return windowsPathPattern.test(url);
	}

	copyToClipboard(text: string): void {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				this.mensaje = 'Ruta copiada al portapapeles';
				this.closeDialogAfterDelay();
			})
			.catch((err) => {
				this.mensaje = 'Error al copiar la ruta en el portapapeles' + err;
				this.isError = true;
				this.closeDialogAfterDelay();
			});
	}

	closeDialogAfterDelay(): void {
		this.dialog.nativeElement.showModal();
		setTimeout(() => {
			this.dialog.nativeElement.close();
		}, 2000);
	}
}
