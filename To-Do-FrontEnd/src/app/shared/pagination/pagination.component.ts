import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from 'src/app/core/models/Pagination.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() lenthRecords: number = 0;
  @Input() pagination: Pagination = {
    page: 1,
    size: 10,
    total: 0,
    totalPages: 0
  };

  @Output() pageChanged: EventEmitter<Pagination> = new EventEmitter<Pagination>();

  constructor() { }

  previous(){
    if(this.pagination.page > 1){
      this.pagination.page--;
      this.pageChanged.emit(this.pagination);
    }
  }

  next(){
    if(this.pagination.page < this.pagination.totalPages){
      this.pagination.page++;
      this.pageChanged.emit(this.pagination);
    }
  }

}