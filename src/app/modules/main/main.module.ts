import { GameModule } from './../game/game.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './components/main/main.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MainRoutingModule,
    GameModule,
    FlexLayoutModule
  ]
})
export class MainModule { }
