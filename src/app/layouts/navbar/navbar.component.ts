// import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DialogComponent } from '@app/commons/components/dialog/dialog.component';
import { IsAdminService } from '@services/isAdmin.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	standalone: true,
	imports: [RouterLink, DialogComponent]
})
export class NavbarComponent implements OnInit {
	public readonly router = inject(Router);
	private readonly _isAdminService = inject(IsAdminService);
	public isAdmin: boolean;

	ngOnInit(): void {
		this._isAdminService.isAdmin$.subscribe((value) => {
			this.isAdmin = value;
		});
	}

	auth(): void {
		this.router.navigateByUrl('auth');
	}
}
