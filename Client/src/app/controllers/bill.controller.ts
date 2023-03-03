import { Injectable } from '@angular/core';
import { MService } from '../services/m.service';
import { Identity } from '../interfaces/identity.interface';
import { Bill } from '../interfaces/bill.interface';

@Injectable({
  providedIn: 'root',
})
export class BillController {
  constructor(private mService: MService) {}

  getLastId(billNumber: string): string {
    let temp = billNumber.substring(2);
    let tempNum = parseInt(temp);
    let prefixResult = this.addPrefixToIdNumber(++tempNum) as string;
    return prefixResult;
  }

  toTimestamp(strDate: string) {
    var datum = Date.parse(strDate);
    return (datum / 1000) as any;
  }

  incrementLastIdByOne(bill: Bill) {
    let identity = {
      id: 'vYrUTJL5FuQQTNtxvmxT',
      lastId: bill.billNumber,
    };
    console.log(identity);
    this.mService
      .updateLastId(identity)
      .then(() => {
        console.log('LastId is incremented by one.');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addPrefixToIdNumber(id: number) {
    if (id < 10) {
      return 'BN0000' + id;
    } else if (id < 100) {
      return 'BN000' + id;
    } else if (id < 1000) {
      return 'BN00' + id;
    } else if (id < 10000) {
      return 'BN0' + id;
    } else if (id < 100000) {
      return 'BN' + id;
    }
    return;
  }
}
