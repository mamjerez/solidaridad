import { Component, inject, OnInit, input } from '@angular/core';

import { IsAdminService } from '@services/isAdmin.service';
import { DialogService } from '@services/dialog.service';

import { CustomDatePipe } from '@app/commons/pipes/custom-date.pipe';

@Component({
	selector: 'app-documentos',
	imports: [CustomDatePipe],
	templateUrl: './documentos.component.html'
})
export default class DocumentosComponent implements OnInit {
	private readonly _isAdminService = inject(IsAdminService);
	private readonly _dialogService = inject(DialogService);
	public readonly docs = input<any[]>(undefined);
	public canViewConfidencial = false;

	ngOnInit(): void {
		this._isAdminService.isAdmin$.subscribe((value) => {
			this.canViewConfidencial = value;
		});
	}

	handleLinkClick(url: string, event: MouseEvent): void {
		event.preventDefault(); // Prevenir la navegación por defecto

		if (this.isLocalPath(url)) {
			this.copyToClipboard(url);
		} else {
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
				this.mostrarDialog('Ruta copiada al portapapeles', false, false);
			})
			.catch((err) => {
				this.mostrarDialog('Error al copiar la ruta en el portapapeles' + err, true, false);
			});
	}

	private mostrarDialog(mensaje: string, hasError: boolean, isBack: boolean, timeout?: number): void {
		this._dialogService.openDialog(mensaje, hasError, isBack, timeout);
	}
}
