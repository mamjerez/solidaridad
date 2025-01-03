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
	private dialogConfig = new BehaviorSubject<{ mensaje: string; isError: boolean; isBack: boolean; timeout?: number }>({
		mensaje: '',
		isError: false,
		isBack: false
		// Dejamos timeout opcional
	});
	dialogConfig$ = this.dialogConfig.asObservable();

	openDialog(mensaje: string, isError: boolean, isBack: boolean, timeout?: number) {
		// console.log('openDialog', mensaje, isError, isBack, timeout);
		this.dialogConfig.next({ mensaje, isError, isBack, timeout });
		this.dialogVisibility.next(true);
	}

	closeDialog() {
		this.dialogVisibility.next(false);
	}
}
