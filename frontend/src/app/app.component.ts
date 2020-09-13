import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeatService } from './service/seat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Train Ticket Booking System';
  bookingInfo;
  flag: boolean = true;
  bookingForm: FormGroup;
  availablseats = [];
  error: string;
  res: any;
  updated;


  constructor( 
    private seatServ: SeatService,
    private fb : FormBuilder
  ){ 
    this.initateForm();
  }

  ngOnInit(){
    this.getSeatInfo();
  }

  // Getting Seat Info
  getSeatInfo(){
    this.seatServ.getSeatInfo().subscribe(data => {
      this.bookingInfo = data;
    });
  }

  // Form Initiation
  private initateForm(): void {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      count: ['', Validators.required]
    });
  }

  // GettingAvailableSeats
  getAvailSeats(){
    for(let i=0; i<this.bookingInfo.length; i++){
      if(this.bookingInfo[i].status == 'available'){
        this.availablseats.push(this.bookingInfo[i].seat)
      }
    }
  }

  onSubmit(formValues: FormGroup): void{
    this.getAvailSeats();
    const name: string = formValues.controls.name.value;
    const requiredSeats: number = parseInt(formValues.controls['count'].value);
    if (requiredSeats > this.availablseats.length || requiredSeats > 7) {
      this.error = "You entered more than 7 seats or seats not available";
    } else if (requiredSeats > 0) {
      let seatNo = [];
      for(let i=0; i<requiredSeats; i++){
        seatNo.push(this.availablseats[i]);
      }
      this.seatServ.bookSeat(seatNo, name).subscribe();
      this.res = name + ' your seats are ' + seatNo;
      this.flag = false;
    }
  }

  openBookingForm(): void {
    this.bookingForm.setValue({
      name: '',
      count: ''
    });
    this.getSeatInfo();
    this.flag = true;
    this.error = '';
    this.res = '';
  }
}
