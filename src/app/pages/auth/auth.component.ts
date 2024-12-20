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
	selector: 'app-password-check',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
	imports: [FormsModule]
})
export default class AuthComponent implements OnInit {
	@ViewChild('dialogComponent', { static: false }) dialogComponent!: DialogComponent;
	private readonly isAdminService = inject(IsAdminService);
	private readonly isSecretariaService = inject(IsSecretariaService);
	private readonly dialogService = inject(DialogService);
	private readonly router = inject(Router);
	private readonly location = inject(Location);
	private readonly userService = inject(UserService);
	private readonly correctPassword: string[] = ['mam', '1919'];
	private readonly passwordAvatarMap: Record<string, string> = {
		mam: 'assets/img/mam.png',
		1919: 'assets/img/ramos.jpg'
	};
	private readonly correctSecretarias = 's';
	private intentos = 0;
	public mensaje = '';
	public password = '';

	ngOnInit(): void {
		this.resetAdminState();
	}

	private resetAdminState(): void {
		if (this.isAdminService.getIsAdmin()) {
			this.isAdminService.setIsAdmin(false);
			this.userService.setAvatar('assets/img/anom.png');
		}
	}

	checkPassword(): void {
		if (this.isPasswordCorrect()) {
			this.grantAdminAccess();
		} else if (this.isSecretariaPassword()) {
			this.grantSecretariaAccess();
		} else {
			this.handleIncorrectPassword();
		}
	}

	private isPasswordCorrect(): boolean {
		return this.correctPassword.includes(this.password);
	}

	private isSecretariaPassword(): boolean {
		return this.password === this.correctSecretarias;
	}

	private grantAdminAccess(): void {
		this.isAdminService.setIsAdmin(true);
		this.userService.setAvatar(this.passwordAvatarMap[this.password]);
		this.mensaje = 'Ahora eres administrador';
		this.mostrarDialog('Ahora eres administrador', false, true);
	}

	private grantSecretariaAccess(): void {
		this.isSecretariaService.setIsSecretaria(true);
		this.mensaje = 'Ahora eres secretaria';
		this.mostrarDialog('Ahora eres secretaria', false, false);
		this.router.navigate(['/secretarias']);
	}

	private handleIncorrectPassword(): void {
		this.intentos++;
		if (this.intentos >= 3) {
			this.mensaje = 'Demasiados intentos';
			this.mostrarDialog('Demasiados intentos', true, false, 1000);
			this.location.back();
		} else {
			this.isSecretariaService.setIsSecretaria(false);
			this.mensaje = 'Contraseña incorrecta';
			this.mostrarDialog('Contraseña incorrecta', true, false);
		}
	}

	private mostrarDialog(mensaje: string, hasError: boolean, isBack: boolean, timeout?: number): void {
		this.dialogService.openDialog(mensaje, hasError, isBack, timeout);
	}
}
