import { Component } from '@angular/core';
import { Guestmessages } from '../../Pages/guestmessages/guestmessages';

@Component({
  selector: 'app-about',
  standalone:true,
  imports: [Guestmessages
  ],
  templateUrl: './about.html',
  styles: ``,
})
export class About {

}
