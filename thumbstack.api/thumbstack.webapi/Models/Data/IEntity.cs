using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thumbstack.webapi.Models.Data
{
    public interface IEntity
    {
        int Id { get; set; }
        DateTime CreatedOn { get; set; }
        string CreatedBy { get; set; }
        DateTime ModifiedBy { get; set; }
        string ModifiedOn { get; set; }

        bool IsActive { get; set; }
        bool IsDeleted { get; set; }
    }
}
