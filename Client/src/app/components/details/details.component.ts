import { Location, Time, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Bill } from 'src/app/interfaces/bill.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  result: any;
  bill: Bill;
  billForm: FormGroup;

  constructor(private location: Location, private fb: FormBuilder) {
    this.result = this.location.getState();
    this.bill = this.result.bill as Bill;
    let mDate = new Date(this.bill.date.seconds * 1000);
    const format = 'yyyy-MM-dd';
    const myDate = mDate;
    const locale = 'en-US';
    this.billForm = this.fb.group({
      billNumber: [this.bill.billNumber],
      billDescription: [this.bill.billDescription],
      currency: [this.bill.currency],
      date: [formatDate(myDate, format, locale)],
      enteredDate: [this.bill.enteredDate],
      comment: [this.bill.comment],
      filePath: [this.bill.filePath],
      totalCost: [this.bill.totalCost],
    });
    this.disableForm();
  }

  update() {}

  disableForm() {
    this.billForm.get('billNumber')?.disable();
    this.billForm.get('billDescription')?.disable();
    this.billForm.get('currency')?.disable();
    this.billForm.get('date')?.disable();
    this.billForm.get('enteredDate')?.disable();
    this.billForm.get('comment')?.disable();
    this.billForm.get('filePath')?.disable();
    this.billForm.get('totalCost')?.disable();
  }
}
