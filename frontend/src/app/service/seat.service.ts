import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  api_url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getSeatInfo(){
    return this.http.get(this.api_url+'/get_seat_info' );
  }

  bookSeat(seats, name){
    let data = {
      name : name,
      seats : seats
    }
    return this.http.post(this.api_url+'/book_seat', data);
  }
}
