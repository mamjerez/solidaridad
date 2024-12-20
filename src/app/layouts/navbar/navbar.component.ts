import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { DialogComponent } from '@app/commons/components/dialog/dialog.component';

import { IsAdminService } from '@services/isAdmin.service';
import { IsSecretariaService } from '@services/isSecretaria.service';
import { UserService } from '@services/user.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	imports: [RouterLink, DialogComponent]
})
export class NavbarComponent implements OnInit, OnDestroy {
	public readonly router = inject(Router);
	private readonly _isAdminService = inject(IsAdminService);
	private readonly _isSecretariaService = inject(IsSecretariaService);
	private _userService = inject(UserService);
	private avatarSubscription!: Subscription;
	public isAdmin: boolean;
	public isSecretaria: boolean;
	public avatarUrl: string = '';

	ngOnInit(): void {
		this._isAdminService.isAdmin$.subscribe((value) => {
			this.isAdmin = value;
		});

		this._isSecretariaService.isSecretaria$.subscribe((value) => {
			this.isSecretaria = value;
		});
		this.avatarSubscription = this._userService.avatarUrl$.subscribe((url) => {
			this.avatarUrl = url;
		});
	}

	auth(): void {
		this.router.navigateByUrl('auth');
	}

	ngOnDestroy(): void {
		if (this.avatarSubscription) {
			this.avatarSubscription.unsubscribe();
		}
	}
}
