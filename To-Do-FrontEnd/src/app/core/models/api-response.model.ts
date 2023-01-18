import { Pagination } from "./Pagination.model";

export interface ApiResponse<T>{
    data: T,
    succeed: boolean;
    message?: string;
    pagination: Pagination;
}