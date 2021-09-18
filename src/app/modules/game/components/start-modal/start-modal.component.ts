import { Component, OnInit } from '@angular/core';
import { GameSettings } from '@modules/game/gameSettings';

@Component({
  selector: 'app-start-modal',
  templateUrl: './start-modal.component.html',
  styleUrls: ['./start-modal.component.scss']
})
export class StartModalComponent implements OnInit {

  settings: GameSettings = new GameSettings();
  constructor() {
    
  }

  ngOnInit(): void {
    this.settings = new GameSettings();
    this.settings.rows = 10;
    this.settings.columns = 10;
    this.settings.mineTotalCount = 10;
    this.settings.maxLives = 3;
  }

}
