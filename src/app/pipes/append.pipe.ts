import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'append'
})
export class AppendPipe implements PipeTransform {

  transform(value: string, appendVal : string): string {
    if (!value || typeof value !== "string") {
      return value;
    }
    return value + appendVal;
  }

}
