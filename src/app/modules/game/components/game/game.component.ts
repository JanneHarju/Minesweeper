import { GameSettings } from './../../gameSettings';
import { InfoModalComponent } from './../info-modal/info-modal.component';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Fireworks } from 'fireworks-js';
import { fireWorksConfig } from './fireWorksConfig';
import { StartModalComponent } from '../start-modal/start-modal.component';
import { Observable, Subject, timer } from 'rxjs';
import { map, repeatWhen, switchMap, takeUntil } from 'rxjs/operators';

export enum CellStatus {
  Origin,
  Flagged,
  Denoted,
  Number,
  Empty,
  Unknown,
}

export interface Cell {
  X: number;
  Y: number;
  status: CellStatus;
  isMine: boolean;
  mineCountAround?: number;
  id: number;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  flaggedMineCount = 0;
  denotedCount = 0;
  flaggedCount = 0;
  startTime!: Date;
  settings: GameSettings = new GameSettings();
  lives = 3;
  cells: Cell[] = [];
  CellStatus = CellStatus;
  secondTimer!: Observable<void>;

  private readonly _stop = new Subject<void>();
  private readonly _start = new Subject<void>();

  currentTime!: string;

  @ViewChild('fireworks')
  fireworksDiv!: ElementRef;

  gameFinished = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private dialogService: MatDialog
  ) {
    this.secondTimer = timer(0, 1000).pipe(
      map((value) => {
        this.updateTimer();
      }),
      takeUntil(this._stop),
      repeatWhen(() => this._start)
    );
  }

  private updateTimer() {
    const stopTime = new Date();
    const diffTimeInMilliseconds = Math.abs(
      stopTime.valueOf() - this.startTime.valueOf()
    );
    this.currentTime = this.millisToMinutesAndSeconds(diffTimeInMilliseconds);
  }

  ngOnInit(): void {
    this.showStartModal();
  }

  private initialGame() {
    const mineLocations: Cell[] = [];
    this.cells = [];
    this.lives = this.settings.maxLives;
    this.gameFinished = false;
    while (mineLocations.length < this.settings.mineTotalCount) {
      const mineLocationY = Math.floor(this.settings.rows * Math.random());
      const mineLocationX = Math.floor(this.settings.columns * Math.random());
      if (
        !mineLocations.find(
          (x) => x.X === mineLocationX && x.Y === mineLocationY
        )
      ) {
        mineLocations.push({ X: mineLocationX, Y: mineLocationY } as Cell);
      }
    }
    let id = 0;
    for (let xIndex = 0; xIndex < this.settings.columns; xIndex++) {
      for (let yIndex = 0; yIndex < this.settings.rows; yIndex++) {
        const isMine =
          mineLocations.find((x) => x.X === xIndex && x.Y === yIndex) !==
          undefined;
        this.cells.push({
          id: id,
          X: xIndex,
          Y: yIndex,
          status: CellStatus.Origin,
          isMine: isMine,
          mineCountAround: 0,
        } as Cell);
        id++;
      }
    }
    this.cells.forEach((cell) => {
      if (!cell.isMine) {
        let mineCount = this.cells.filter(
          (x) =>
            cell.X - 2 < x.X &&
            cell.X + 2 > x.X &&
            cell.Y - 2 < x.Y &&
            cell.Y + 2 > x.Y &&
            x.isMine
        ).length;
        cell.mineCountAround = mineCount !== 0 ? mineCount : undefined;
      }
    });
    console.log('Valmis');
  }

  cellSize(): string {
    const maxLength = Math.max(this.settings.columns, this.settings.rows);
    if (maxLength < 13) {
      return '50px';
    } else {
      return '30px';
    }
  }

  identify(index: number, item: Cell) {
    return item.id;
  }

  cellClicked(event: MouseEvent, item: Cell) {
    event.preventDefault();
    event.stopPropagation();
    this.handleMouseLeftClick(item);
    this.denotedCount = this.cells.filter(
      (x) => x.status === CellStatus.Denoted
    ).length;
    this.lives = this.settings.maxLives - this.denotedCount;
    if (this.lives < 0) {
      this.dialogService
        .open(InfoModalComponent, {
          data: { header: 'H??visit. Yrit?? uudestaan.' },
        })
        .afterClosed()
        .subscribe((x) => {
          this.showStartModal();
        });
    } else {
      this.checkIsGameFinished();
    }
  }

  private checkIsGameFinished() {
    const notOriginCount = this.cells.filter(
      (x) => x.status === CellStatus.Origin
    ).length;
    if (notOriginCount == 0 && this.lives >= 0) {
      this.gameFinished = true;
      const stopTime = new Date();
      const diffTimeInMilliseconds = Math.abs(
        stopTime.valueOf() - this.startTime.valueOf()
      );
      const resultTime = this.millisToMinutesAndSeconds(diffTimeInMilliseconds);
      this._stop.next();
      this.cdr.detectChanges();
      const fireworks = new Fireworks(
        this.fireworksDiv.nativeElement,
        fireWorksConfig
      );
      this.dialogService
        .open(InfoModalComponent, {
          data: {
            header: 'Onnittelut pelin l??p??isyst??',
            resultTime: resultTime,
          },
        })
        .afterClosed()
        .subscribe((x) => {
          this.showStartModal();
          fireworks.stop();
        });
      fireworks.start();
    }
  }
  private millisToMinutesAndSeconds(millis: number): string {
    let minutes = Math.floor(millis / 60000);
    let seconds = +((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
  private showStartModal() {
    this.dialogService
      .open(StartModalComponent)
      .afterClosed()
      .subscribe((x: GameSettings) => {
        this.startTime = new Date();
        this.settings = x;
        this.initialGame();
        this._start.next();
      });
  }

  handleMouseLeftClick(item: Cell) {
    if (item.isMine) {
      item.status = CellStatus.Denoted;
    } else {
      item.status = CellStatus.Number;
      if (item.mineCountAround == undefined) {
        const cellsAround = this.cells.filter(
          (x) =>
            item.X - 2 < x.X &&
            item.X + 2 > x.X &&
            item.Y - 2 < x.Y &&
            item.Y + 2 > x.Y &&
            !(x.X == item.X && x.Y == item.Y) &&
            x.status == CellStatus.Origin
        );
        cellsAround.forEach((x) => this.handleMouseLeftClick(x));
      }
    }
  }

  contextMenu(event: any, item: Cell): boolean {
    event.preventDefault();
    event.stopPropagation();
    if (item.status === CellStatus.Origin) {
      item.status = CellStatus.Flagged;
    } else if (item.status === CellStatus.Flagged) {
      item.status = CellStatus.Unknown;
    } else if (item.status === CellStatus.Unknown) {
      item.status = CellStatus.Origin;
    }
    this.flaggedCount = this.cells.filter(
      (x) => x.status === CellStatus.Flagged
    ).length;

    this.checkIsGameFinished();
    return false;
  }
}
