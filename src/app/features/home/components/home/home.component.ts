import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  matrix: string[][];
  colorMatrix: boolean[][];
  matrixX: number;
  matrixY: number;
  showMatrix: boolean;
  dnaString: string;
  valueEdited: boolean;
  minLen: boolean;
  maxLen: boolean;
  isMutantRow: boolean;
  isMutantCol: boolean;

  constructor(
  ) {
    this.dnaString = "";
    this.isMutantRow = false;
    this.isMutantCol = false;
    this.showMatrix = false;
    this.valueEdited = false;
    this.minLen = false;
    this.maxLen = false;
    this.matrixX = 6;
    this.matrixY = 6;
    this.updateMatrix();
  }

  ngOnInit(): void {

  }

  inputEdited(): void {
    this.showMatrix = false;
    this.valueEdited = true;
    if (this.dnaString.length < 36) {
      this.minLen = true;
      this.maxLen = false;
    } else if (this.dnaString.length > 36) {
      this.minLen = false;
      this.maxLen = true;
    } else {
      this.minLen = false;
      this.maxLen = false;
      this.updateMatrix();
    }
  }

  updateMatrix(): void {
    if (this.dnaString.length == 36) {
      this.matrix = new Array(this.matrixX);
      for (let i = 0; i < this.matrixX; i++) {
        this.matrix[i] = new Array(this.matrixY);
      }
      for (let i = 0; i < this.matrixX; i++) {
        for (let j = 0; j < this.matrixY; j++) {
          this.matrix[i][j] = this.dnaString.charAt(i * this.matrixX + j);
        }
      }
      this.showMatrix = true;
      this.validateIsMutantRow();
      this.validateIsMutantCol();
    }
  }

  validateIsMutantRow(): void {
    this.isMutantRow = false;
    for (let i = 0; i < this.matrixX; i++) {
      let counterRow = 1;
      for (let j = 0; j < this.matrixY; j++) {
        if (this.matrix[i][j] == this.matrix[i][j + 1]) {
          counterRow++;
          if (counterRow == 4) {
            this.isMutantRow = true;
          }
        } else {
          if (!this.isMutantRow) {
            counterRow = 1;
          }
        }
      }
    }
  }

  validateIsMutantCol(): void {
    this.isMutantCol = false;
    for (let i = 0; i < this.matrixX; i++) {
      let counterCol = 1;
      for (let j = 0; j < this.matrixY; j++) {
        if (j + 1 < this.matrixX && this.matrix[j][i] == this.matrix[j + 1][i]) {
          counterCol++;
          if (counterCol == 4) {
            this.isMutantCol = true;
          }
        } else {
          if (!this.isMutantCol) {
            counterCol = 1;
          }
        }
      }
    }
  }

}
