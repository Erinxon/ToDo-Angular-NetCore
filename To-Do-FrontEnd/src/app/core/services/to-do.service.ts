import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/api-response.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private readonly http: HttpClient) { }

  getTasks(UserId: string, pageNumber: number = 1, pageSize: number = 100, type: number = 0){
    return this.http.get<ApiResponse<Task[]>>(`/ToDo?UserId=${UserId}&pageNumber=${pageNumber}&pageSize=${pageSize}&type=${type}`)
  }

}
