import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game/game.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CountToColorPipe } from './count-to-color.pipe';
import { InfoModalComponent } from './components/info-modal/info-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { StartModalComponent } from './components/start-modal/start-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GameComponent,
    CountToColorPipe,
    InfoModalComponent,
    StartModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    GameComponent
  ]
})
export class GameModule { }
