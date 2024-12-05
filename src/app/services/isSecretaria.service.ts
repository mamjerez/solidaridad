import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from '@environments/environment';

@Injectable({
	providedIn: 'root'
})
export class IsSecretariaService {
	private _isSecretaria = new BehaviorSubject<boolean>(environment.isSecretaria);
	isSecretaria$ = this._isSecretaria.asObservable();

	setIsSecretaria(value: boolean): void {
		this._isSecretaria.next(value);
	}

	getIsSecretaria(): boolean {
		let currentValue: boolean;
		this._isSecretaria.subscribe((value) => (currentValue = value)).unsubscribe();
		return currentValue;
	}
}
