import { Component, OnInit } from '@angular/core';
import { MService } from './services/m.service';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Client';
  connected: boolean = false;
  constructor(private mService: MService) {}
  ngOnInit(): void {
    this.createOnline$().subscribe((isOnline) => {
      if (isOnline) {
        console.log('Internet is connected!');
        this.connected = true;
      } else {
        console.log('Internet is not connected!');
        this.connected = false;
      }
    });
  }

  createOnline$() {
    return merge<any>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      })
    );
  }
}
