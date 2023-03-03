import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Bill } from 'src/app/interfaces/bill.interface';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MService } from 'src/app/services/m.service';
import { Observable, map, Subject } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Identity } from 'src/app/interfaces/identity.interface';
import { BillController } from 'src/app/controllers/bill.controller';
import { formatDate } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
})
export class BillComponent implements OnInit {
  billForm: FormGroup;
  bills: Observable<Bill[]>;
  billsFiltered: any = [];
  updateButton = false;
  billIdWhenUpdated = '';
  totalCostDollar = 0;
  totalCostDinar = 0;
  currentBill: Bill;
  modalRef: BsModalRef;
  @ViewChild('modalTemplate') modalContent: TemplateRef<any>;
  data = new Subject<any>();

  constructor(
    private formBuilder: FormBuilder,
    private mService: MService,
    private router: Router,
    private billController: BillController,
    private modalService: BsModalService
  ) {
    this.billForm = this.formBuilder.group({
      billNumber: ['', Validators.required],
      billDescription: [''],
      currency: ['', Validators.required],
      date: ['', Validators.required],
      enteredDate: [''],
      comment: [''],
      filePath: [''],
      totalCost: ['', Validators.required],
    });

    this.billForm.get('billNumber')?.disable();

    this.bills = mService.getAll();
    this.createCards();
    this.calculateTotalDollar();
    this.calculateTotalDinar();

    this.mService.getLastId().subscribe((data: any) => {
      let identity: Identity = data[0];
      this.billForm.patchValue({
        billNumber: billController.getLastId(identity.lastId),
      });
    });
  }
  ngOnInit(): void {
    // this.mService.getByDate(Timestamp.now(), "Feb 23, 2023");
  }

  openModal(template: TemplateRef<any>, data: string) {
    this.modalRef = this.modalService.show(template);
  }

  addBill() {
    let bill: Bill = this.billForm.getRawValue();
    bill.date = this.convertDateToTimestamp(
      new Date(this.billForm.get('date')?.value)
    );
    bill.enteredDate = this.convertDateToTimestamp(new Date());
    console.log(bill);
    this.mService
      .create(bill)
      .then(() => {
        console.log('Bill was added successfully!');
        this.billController.incrementLastIdByOne(bill);
        // this.billController.incrementLastIdByOne();
        localStorage.setItem('billNumber', bill.billNumber);
        this.openModal(this.modalContent, bill.billNumber);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.billForm.reset();
      });
    console.log(bill);
  }

  delete(id: string) {
    if (confirm('Are you sure you want to delete?')) {
      this.mService
        .delete(id)
        .then(() => {
          console.log('Bill was deleted successfully!');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  update(bill: Bill) {
    const format = 'yyyy-MM-dd';
    const myDate = bill.date.toDate();
    const locale = 'en-US';
    this.currentBill = bill;
    this.billIdWhenUpdated = bill.id;
    this.billForm.patchValue({
      billNumber: bill.billNumber,
      billDescription: bill.billDescription,
      currency: bill.currency,
      date: formatDate(myDate, format, locale),
      comment: bill.comment,
      totalCost: bill.totalCost,
    });

    this.updateButton = true;
  }

  updateBill() {
    let bill: Bill;
    bill = this.billForm.value;
    bill.date = this.convertDateToTimestamp(
      new Date(this.billForm.get('date')?.value)
    );
    bill.enteredDate = this.currentBill.enteredDate;
    bill.filePath = this.currentBill.filePath;

    bill.id = this.billIdWhenUpdated;
    console.log(bill);
    this.mService
      .update(bill)
      .then(() => {
        console.log('Bill was updated successfully');
      })
      .catch((err) => {
        console.log(err);
      });
    this.billForm.reset();
    this.updateButton = false;
    console.log(bill.id);
  }

  goToDetails(bill: Bill) {
    this.router.navigate(['details'], { state: { bill: bill } });
  }

  calculateTotalDollar() {
    this.bills
      .pipe(
        map((element) => {
          return element.map((data) => {
            if (data.currency == 'Dollar') {
              return data.totalCost;
            } else {
              return 0;
            }
          });
        })
      )
      .subscribe((data) => {
        this.totalCostDollar = data.reduce((acc, cur) => acc + cur, 0);
      });
  }

  calculateTotalDinar() {
    this.bills
      .pipe(
        map((element) => {
          return element.map((data) => {
            if (data.currency == 'Dinar') {
              return data.totalCost;
            } else {
              return 0;
            }
          });
        })
      )
      .subscribe((data) => {
        this.totalCostDinar = data.reduce((acc, cur) => acc + cur, 0);
      });
  }

  convertDateToTimestamp(date: Date) {
    return Timestamp.fromDate(date);
  }

  createCards() {
    this.billsFiltered = [];
    this.bills.pipe(
      map((element) => {
        return element.map((data) => {
          this.billsFiltered.push(data);
        });
      })
    );
  }
}
