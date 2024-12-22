import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'validation'
})
export class ValidationPipe implements PipeTransform {
	transform(value: any, errorObj: object): unknown {
		return value[Object.keys(errorObj)[0]];
	}
}
