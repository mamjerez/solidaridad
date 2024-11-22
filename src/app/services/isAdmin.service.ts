import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from '@environments/environment';

@Injectable({
	providedIn: 'root'
})
export class IsAdminService {
	private _isAdmin = new BehaviorSubject<boolean>(environment.isAdmin);
	isAdmin$ = this._isAdmin.asObservable();

	setIsAdmin(value: boolean): void {
		this._isAdmin.next(value);
	}

	getIsAdmin(): boolean {
		let currentValue: boolean;
		this._isAdmin.subscribe((value) => (currentValue = value)).unsubscribe();
		return currentValue;
	}
}
