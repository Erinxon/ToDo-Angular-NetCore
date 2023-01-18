namespace To_Do_BackEnd.ApiResponse
{
    public class ApiResponse<T>
    {
        public ApiResponse()
        {
            this.Succeed = true;
            this.Pagination = new Pagination();
        }

        public T Data { get; set; }
        public bool Succeed { get; set; }
        public string Message { get; set; }
        public Pagination Pagination { get; set; }
    }
}
