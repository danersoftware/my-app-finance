import { Timestamp } from '@angular/fire/firestore';

export interface Bill {
  id: string;
  billNumber: string;
  billDescription: string;
  currency: string;
  date: Timestamp;
  enteredDate: Timestamp;
  comment: string;
  filePath: string;
  totalCost: number;
}
