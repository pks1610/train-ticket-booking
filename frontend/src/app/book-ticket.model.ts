export class BookTicketResponseModel{
    public seats: SeatInfoModel[];
  }
  
  export class SeatInfoModel {
    public seat: number;
    public status: string;
    public name: string;
    public row: number;
  }
  