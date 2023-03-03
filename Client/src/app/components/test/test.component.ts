import { Component } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, from, map } from 'rxjs';
import { Bill } from 'src/app/interfaces/bill.interface';
import { MService } from 'src/app/services/m.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent {
  bills: Observable<Bill[]>;
  billsFiltered: Bill[] = [];
  billForm: FormGroup;
  constructor(private mService: MService, private formBuilder: FormBuilder) {
    this.billForm = formBuilder.group({ fromDate: [''], toDate: [''] });
    this.bills = mService.getAll();
    this.getDateBetweenDates();
  }

  getDateBetweenDates() {
    this.billsFiltered = [];
    let fromDate = this.billForm.get('fromDate')?.value;
    let toDate = this.billForm.get('toDate')?.value;
    this.bills
      .pipe(
        map((element) => {
          return element.map((data) => {
            if (
              data.date.seconds > this.convertDate(fromDate) &&
              data.date.seconds < this.convertDate(toDate)
            ) {
              this.billsFiltered.push(data);
            } else {
              
            }
          });
        })
      )
      .subscribe((data) => {
        console.log(this.billsFiltered);
      });
  }

  convertDate(date: any) {
    console.log(date);
    return Timestamp.fromDate(new Date(date))['seconds'];
  }
}
