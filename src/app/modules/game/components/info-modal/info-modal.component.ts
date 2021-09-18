import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {header: string, resultTime: string}) { }

  ngOnInit(): void {
  }

}
