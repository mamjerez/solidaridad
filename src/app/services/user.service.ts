import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private avatarUrlSubject = new BehaviorSubject<string>('assets/img/anom.png');

	private userNameMapping: Record<string, string> = {
		mam: 'Miguel Angel',
		ramos: 'Antonio',
		cazorla: 'Manuel',
		vanessa: 'Vanessa',
		saborido: 'José',
		zarzuela: 'José Antonio'
	};

	// Exponemos el Observable para que los componentes puedan suscribirse
	avatarUrl$ = this.avatarUrlSubject.asObservable();

	setAvatar(url: string): void {
		this.avatarUrlSubject.next(url);
	}

	getAvatar(): string {
		return this.avatarUrlSubject.getValue();
	}

	getUserName(): string {
		const avatarUrl = this.getAvatar();
		// Suponiendo que el nombre de usuario está en la URL del avatar, por ejemplo: 'assets/img/username.png'
		const parts = avatarUrl.split('/');
		const fileName = parts[parts.length - 1];
		const userName = fileName.split('.')[0]; // Elimina la extensión del archivo
		return this.userNameMapping[userName] || userName;
	}
}
