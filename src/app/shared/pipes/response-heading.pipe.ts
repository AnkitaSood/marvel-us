import { Pipe, PipeTransform } from '@angular/core';
import {Character} from "../../characters/characters.model";
import {Comic} from "../../comics/comics.model";
import {Creator} from "../../creators/creators.model";

@Pipe({
  name: 'responseHeading',
  standalone: true
})
export class ResponseHeadingPipe implements PipeTransform {

  transform(item: Character | Comic | Creator): string {
    if ('name' in item) {
      return item.name;
    } else if ('title' in item) {
      return item.title;
    } else if ('fullName' in item) {
      return item.fullName;
    }
    return '';
  }

}
