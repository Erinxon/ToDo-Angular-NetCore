export interface ApiResponse<T>{
    data: T,
    succeed: boolean;
    message?: string;
}