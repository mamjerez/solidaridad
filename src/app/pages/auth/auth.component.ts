import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { IsAdminService } from '@services/isAdmin.service';
import { DialogService } from '@services/dialog.service';
import { IsSecretariaService } from '@services/isSecretaria.service';
import { UserService } from '@services/user.service';

@Component({
	selector: 'app-password-check',
	imports: [FormsModule],
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss']
})
export default class AuthComponent implements OnInit {
	private readonly _isAdminService = inject(IsAdminService);
	private readonly _isSecretariaService = inject(IsSecretariaService);
	private readonly _dialogService = inject(DialogService);
	private readonly _router = inject(Router);
	private readonly _userService = inject(UserService);
	private readonly _correctPassword: string[] = ['mam', '1919'];
	private readonly _passwordAvatarMap: Record<string, string> = {
		mam: 'assets/img/mam.png',
		1919: 'assets/img/ramos.jpg'
	};
	private readonly _correctSecretarias = 's';
	private _intentos = 0;
	public password = '';

	ngOnInit(): void {
		this.resetAdminState();
	}

	private resetAdminState(): void {
		if (this._isAdminService.getIsAdmin()) {
			this._isAdminService.setIsAdmin(false);
			this._userService.setAvatar('assets/img/anom.png');
		}
	}

	checkPassword(): void {
		if (this.isPasswordCorrect()) {
			this.grantAdminAccess();
		} else if (this.isSecretariaPassword()) {
			this.grantSecretariaAccess();
		} else {
			this.handleIn_correctPassword();
		}
	}

	private isPasswordCorrect(): boolean {
		return this._correctPassword.includes(this.password);
	}

	private isSecretariaPassword(): boolean {
		return this.password === this._correctSecretarias;
	}

	private grantAdminAccess(): void {
		this._isAdminService.setIsAdmin(true);
		this._userService.setAvatar(this._passwordAvatarMap[this.password]);
		this.mostrarDialog('Ahora eres administrador', false, true);
	}

	private grantSecretariaAccess(): void {
		this._isSecretariaService.setIsSecretaria(true);
		this.mostrarDialog('Ahora eres secretaria', false, false);
		this._router.navigate(['/secretarias']);
	}

	private handleIn_correctPassword(): void {
		this._intentos++;
		if (this._intentos >= 3) {
			this.mostrarDialog('Demasiados intentos', true, false, 1000);
			this._router.navigate(['/home']);
		} else {
			this._isSecretariaService.setIsSecretaria(false);
			this.mostrarDialog('Contraseña incorrecta', true, false);
		}
	}

	private mostrarDialog(mensaje: string, hasError: boolean, isBack: boolean, timeout?: number): void {
		this._dialogService.openDialog(mensaje, hasError, isBack, timeout);
	}
}
