import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { DialogComponent } from '@app/commons/components/dialog/dialog.component';

import { IsAdminService } from '@services/isAdmin.service';
import { DialogService } from '@services/dialog.service';
import { IsSecretariaService } from '@services/isSecretaria.service';
import { UserService } from '@services/user.service';

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
	private readonly router = inject(Router);
	private _location = inject(Location);
	private _userService = inject(UserService);
	password = '';
	correctPassword: string[] = ['mam', 'ramos'];
	passwordAvatarMap: { [key: string]: string } = {
		mam: 'assets/img/mam.png',
		ramos: 'assets/img/ramos.jpg'
	};

	correctSecretarias = 's';
	public mensaje = '';

	ngOnInit(): void {
		if (this._isAdminService.getIsAdmin()) {
			this._isAdminService.setIsAdmin(false);
			this._location.back();
		}
	}

	checkPassword(): void {
		if (this.correctPassword.includes(this.password)) {
			this._isAdminService.setIsAdmin(true);
			const avatarUrl = this.passwordAvatarMap[this.password];
			// Guardar el avatar en el servicio
			this._userService.setAvatar(avatarUrl);
			this.mensaje = 'Ahora eres administrador';
			this.mostrarDialog('Ahora eres administrador', false, true);
		} else {
			if (this.password === this.correctSecretarias) {
				this._isSecretariaService.setIsSecretaria(true);
				this.mensaje = 'Ahora eres secretaria';
				this.mostrarDialog('Ahora eres secretaria', false, false);
				this.router.navigate(['/secretarias']);
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
