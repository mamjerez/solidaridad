import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { IsAdminService } from '@services/isAdmin.service';
import { DialogService } from '@services/dialog.service';
import { IsSecretariaService } from '@services/isSecretaria.service';
import { UserService } from '@services/user.service';
import { IsAsociacionService } from '@services/isAsociacion.service';

import { AutofocusDirective } from '@app/commons/directives/autofocus.directive';

@Component({
	selector: 'app-password-check',
	imports: [FormsModule, AutofocusDirective],
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss']
})
export default class AuthComponent implements OnInit {
	private readonly _isAdminService = inject(IsAdminService);
	private readonly _isSecretariaService = inject(IsSecretariaService);
	private readonly _isAsociacionService = inject(IsAsociacionService);
	private readonly _dialogService = inject(DialogService);
	private readonly _router = inject(Router);
	private readonly _userService = inject(UserService);
	private readonly _correctPassword: string[] = ['mam', '1919', 'mca', 'vcp', 'jsm', 'jzo'];
	private readonly _passwordAsociacion: string[] = ['viñedos2025'];
	private readonly _passwordAvatarMap: Record<string, string> = {
		mam: 'assets/img/directiva/mam.png',
		1919: 'assets/img/directiva/ramos.jpg',
		mca: 'assets/img/directiva/cazorla.jpg',
		vcp: 'assets/img/directiva/vanessa.jpg',
		jsm: 'assets/img/directiva/saborido.jpg',
		jzo: 'assets/img/directiva/zarzuela.jpg',
		s: 'assets/img/directiva/secretaria.jpg',
		viñedos2025: 'assets/img/directiva/viñedos2025.jpg'
	};
	private readonly _idAsociacionMap: Record<string, string> = {
		viñedos2025: '84'
	};
	private readonly _correctSecretarias = 's';
	private _intentos = 0;
	private _admin = false;
	private _user: string;
	public password = '';
	public username = '';

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
			this._admin = true;
			this.grantSecretariaAccess();
		} else if (this.isSecretariaPassword()) {
			this.grantSecretariaAccess();
		} else if (this.isAsociacionPassword()) {
			this.grantAsociacionAccess();
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

	private isAsociacionPassword(): boolean {
		// console.log(this.password);
		return this._passwordAsociacion.includes(this.password);
	}

	private grantAdminAccess(): void {
		this._isAdminService.setIsAdmin(true);
		this._userService.setAvatar(this._passwordAvatarMap[this.password]);
		this.mostrarDialog('Ahora eres administrador', false, true);
	}

	private grantSecretariaAccess(): void {
		this._isSecretariaService.setIsSecretaria(true);
		if (this._admin) {
			this._user = this._userService.getUserName();
			this.mostrarDialog(`Hola ${this._user} `, false, false);
			this._router.navigate(['//home']);
		} else {
			this.mostrarDialog('Ahora eres secretaria', false, false);
			this._userService.setAvatar(this._passwordAvatarMap[this.password]);
			this._router.navigate(['/secretarias']);
		}
	}

	private grantAsociacionAccess(): void {
		this._isAsociacionService.setIsAsociacion(true);
		this._userService.setAvatar(this._passwordAvatarMap[this.password]);
		this._user = this._userService.getUserName();
		this.mostrarDialog(`Hola ${this._user} `, false, false);
		this._router.navigate(['/ficha', this._idAsociacionMap[this.password]]);
	}

	private handleIn_correctPassword(): void {
		this._intentos++;
		if (this._intentos >= 3) {
			this.mostrarDialog('Demasiados intentos', true, false, 1000);
			this._router.navigate(['/home']);
		} else {
			this._isSecretariaService.setIsSecretaria(false);
			this._userService.setAvatar('assets/img/anom.png');
			this.mostrarDialog('Contraseña incorrecta', true, false);
		}
	}

	private mostrarDialog(mensaje: string, hasError: boolean, isBack: boolean, timeout?: number): void {
		this._dialogService.openDialog(mensaje, hasError, isBack, timeout);
	}
}
