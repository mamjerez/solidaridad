import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

import { DialogComponent } from '@app/commons/components/dialog/dialog.component';

import { IsAdminService } from '@services/isAdmin.service';
import { DialogService } from '@services/dialog.service';
import { IsSecretariaService } from '@services/isSecretaria.service';

@Component({
	standalone: true,
	selector: 'app-password-check',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
	imports: [FormsModule]
})
export default class AuthComponent implements OnInit {
	@ViewChild('dialogComponent', { static: false }) dialogComponent!: DialogComponent;
	private _isAdminService = inject(IsAdminService);
	private _isSecretariaService = inject(IsSecretariaService);
	private readonly _dialogService = inject(DialogService);
	private _location = inject(Location);
	password = '';
	correctPassword = 'trucha0121';
	correctSecretarias = 's';
	public mensaje = '';

	ngOnInit(): void {
		if (this._isAdminService.getIsAdmin()) {
			this._isAdminService.setIsAdmin(false);
			this._location.back();
		}
	}

	checkPassword(): void {
		if (this.password === this.correctPassword) {
			this._isAdminService.setIsAdmin(true);
			this.mensaje = 'Ahora eres administrador';
			this.mostrarDialog('Ahora eres administrador', false, true);
		} else {
			if (this.password === this.correctSecretarias) {
				this._isSecretariaService.setIsSecretaria(true);
				this.mensaje = 'Ahora eres secretaria';
				this.mostrarDialog('Ahora eres secretaria', false, true);
			} else {
				this.mensaje = 'Contraseña incorrecta';
				this.mostrarDialog('Contraseña incorrecta', true, false);
			}
		}
	}

	private mostrarDialog(mensaje: string, hasError: boolean, isBack: boolean, timeout?: number): void {
		this._dialogService.openDialog(mensaje, hasError, isBack, timeout);
		// La lógica de cierre y navegación ahora está manejada por DialogComponent
	}
}
