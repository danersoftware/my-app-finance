import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Observable, map, take } from 'rxjs';
import { Bill } from 'src/app/interfaces/bill.interface';
import { MService } from 'src/app/services/m.service';

@Component({
  selector: 'app-test-pagination',
  templateUrl: './test-pagination.component.html',
  styleUrls: ['./test-pagination.component.css'],
})
export class TestPaginationComponent implements OnInit {
  bills: Observable<Bill[]>;
  billsArray: Bill[] = [];
  returnedBillsArray: Bill[] = [];
  showBoundaryLinks: boolean = true;
  showDirectionLinks: boolean = true;
  constructor(private mService: MService) {}

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedBillsArray = this.billsArray.slice(startItem, endItem);
  }
  ngOnInit(): void {
    this.bills = this.mService.getAll();
    this.getDateBetweenDates();
  }

  getDateBetweenDates() {
    this.returnedBillsArray = [];
    this.bills
      .pipe(
        map((element) => {
          this.returnedBillsArray = [];
          return element.map((data) => {
            this.billsArray.push(data);
            this.billsArray.sort(function (a, b) {
              var nameA = a.billNumber.toLowerCase(),
                nameB = b.billNumber.toLowerCase();
              if (nameA < nameB)
                //sort string ascending
                return -1;
              if (nameA > nameB) return 1;
              return 0; //default return value (no sorting)
            });
          });
        })
      )
      .subscribe((data) => {
        
        this.returnedBillsArray = this.billsArray.slice(0, 10);
      });
  }
}
