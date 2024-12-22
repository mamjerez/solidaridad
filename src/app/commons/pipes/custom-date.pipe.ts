import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
	transform(value: string | Date, format: string = 'd-MM-yyyy'): string {
		if (!value) {
			return '';
		}

		const date = typeof value === 'string' ? new Date(value) : value;
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();

		switch (format) {
			case 'd-MM-yyyy':
				return `${day}-${month}-${year}`;
			case 'MM/dd/yyyy':
				return `${month}/${day}/${year}`;
			default:
				return date.toLocaleDateString();
		}
	}
}
