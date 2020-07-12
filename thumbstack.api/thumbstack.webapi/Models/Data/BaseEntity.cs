using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace thumbstack.webapi.Models.Data
{
    public abstract class BaseEntity : IEntity
    {
        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedBy { get; set; }
        public string ModifiedOn { get; set; }

        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
