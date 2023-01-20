using System;
using System.Collections.Generic;

#nullable disable

namespace To_Do_BackEnd.Models
{
    public partial class ViewGetTotalRecord
    {
        public int? Total { get; set; }
        public Guid UserId { get; set; }
    }
}
