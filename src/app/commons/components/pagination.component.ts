import { Component, input, output } from '@angular/core';

@Component({
	selector: 'app-pagination',
	template: `
		<div class="pagination">
			<button [disabled]="currentPage() === 1" (click)="onPageChange(currentPage() - 1)">< Anterior</button>
			<span>Pagina {{ currentPage() }} de {{ totalPages() }}</span>
			<button [disabled]="currentPage() === totalPages()" (click)="onPageChange(currentPage() + 1)">Sguiente ></button>
		</div>
	`,
	styles: [
		`
			.pagination {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 15px;
				margin-top: 20px;
			}

			button {
				padding: 8px 16px;
				border: 1px solid #ddd;
				border-radius: 4px;
				background: #fff;
				cursor: pointer;
			}

			button:disabled {
				background: #f5f5f5;
				cursor: not-allowed;
			}

			button:hover:not(:disabled) {
				background: #f0f0f0;
			}
		`
	]
})
export class PaginationComponent {
	readonly currentPage = input(1);
	readonly totalPages = input(1);
	// @Output() pageChange = new EventEmitter<number>();
	pageChange = output<number>();

	onPageChange(page: number) {
		if (page >= 1 && page <= this.totalPages()) {
			this.pageChange.emit(page);
		}
	}
}
