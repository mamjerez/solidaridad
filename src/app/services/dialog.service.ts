import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DialogService {
	// BehaviorSubject para gestionar el estado del diálogo
	private dialogVisibility = new BehaviorSubject<boolean>(false);
	dialogVisible$ = this.dialogVisibility.asObservable();

	// BehaviorSubject para gestionar el contenido del diálogo
	private dialogConfig = new BehaviorSubject<{ mensaje: string; isError: boolean; timeout?: number }>({
		mensaje: '',
		isError: false
		// Dejamos timeout opcional
	});
	dialogConfig$ = this.dialogConfig.asObservable();

	openDialog(mensaje: string, isError: boolean, timeout?: number) {
		console.log('openDialog', mensaje, isError, timeout);

		this.dialogConfig.next({ mensaje, isError, timeout });
		this.dialogVisibility.next(true);
	}

	closeDialog() {
		console.log('closeDialog');

		this.dialogVisibility.next(false);
	}
}
