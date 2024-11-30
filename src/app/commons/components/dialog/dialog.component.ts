import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from '@services/dialog.service'; // Asegúrate de que la ruta es correcta
import { Location } from '@angular/common';
import { Subscription, timer } from 'rxjs';

@Component({
	selector: 'app-dialog',
	standalone: true,
	imports: [CommonModule],
	template: `
		<dialog #dialog class="dialog-container">
			<div [ngClass]="config.isError ? 'dialog-error' : 'dialog-success'">
				{{ config.mensaje }}
			</div>
		</dialog>
	`
})
export class DialogComponent implements AfterViewInit, OnDestroy {
	@ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
	private _subscriptions = new Subscription();
	private _timeoutSubscription?: Subscription;
	public config = { mensaje: '', isError: false, isBack: false, timeout: 2000 };

	constructor(
		private dialogService: DialogService,
		private location: Location
	) {}

	ngAfterViewInit() {
		const visibilitySub = this.dialogService.dialogVisible$.subscribe((visible) => {
			if (visible) {
				this.dialog.nativeElement.showModal();

				// Configurar el cierre automático usando el timeout de la configuración
				const timeoutDuration = this.config.timeout ?? 2000; // Si timeout es undefined, usa 2000ms
				this._timeoutSubscription = timer(timeoutDuration).subscribe(() => {
					this.dialogService.closeDialog();
					if (this.config.isBack) {
						this.location.back();
					}
				});
			} else {
				this.dialog.nativeElement.close();

				// Cancelar el timeout si el diálogo se cierra manualmente antes de que expire
				if (this._timeoutSubscription) {
					this._timeoutSubscription.unsubscribe();
				}
			}
		});
		this._subscriptions.add(visibilitySub);

		// Suscribirse a los cambios en la configuración del diálogo
		const configSub = this.dialogService.dialogConfig$.subscribe((config) => {
			this.config = { ...this.config, ...config }; // Combina la configuración existente con la nueva
		});
		this._subscriptions.add(configSub);
	}

	ngOnDestroy() {
		// Limpiar todas las suscripciones para evitar fugas de memoria
		this._subscriptions.unsubscribe();
		if (this._timeoutSubscription) {
			this._timeoutSubscription.unsubscribe();
		}
	}
}
