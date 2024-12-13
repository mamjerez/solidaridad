import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private avatarUrlSubject = new BehaviorSubject<string>('assets/img/anom.png');

	// Exponemos el Observable para que los componentes puedan suscribirse
	avatarUrl$ = this.avatarUrlSubject.asObservable();

	setAvatar(url: string): void {
		this.avatarUrlSubject.next(url);
	}

	// Método para obtener el valor actual
	getAvatar(): string {
		return this.avatarUrlSubject.getValue();
	}
}
