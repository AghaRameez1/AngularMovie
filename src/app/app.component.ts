import {Component} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( ) {
    moment.locale('en-us');
    const currentTimeFR = moment().format('LLL');
    console.log(currentTimeFR)

  }
  ngOnInit() {

  }

}
