import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from '@environments/environment';

@Injectable({
	providedIn: 'root'
})
export class IsAsociacionService {
	private _isAsociacion = new BehaviorSubject<boolean>(environment.isAsociacion);
	isAsociacion$ = this._isAsociacion.asObservable();

	setIsAsociacion(value: boolean): void {
		this._isAsociacion.next(value);
	}

	getIsAsociacion(): boolean {
		let currentValue: boolean;
		this._isAsociacion.subscribe((value) => (currentValue = value)).unsubscribe();
		return currentValue;
	}
}
