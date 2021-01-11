import {Component, Input, Output} from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bricks',
  templateUrl: './bricks.component.html',
  styleUrls: ['./bricks.component.css'],
})
export class BricksComponent{

  @Input() data: { id: number, color: string };
  @Output() onColorChange = new EventEmitter();


  onBrickClick(id) {
    this.onColorChange.emit(id);
  }
}
