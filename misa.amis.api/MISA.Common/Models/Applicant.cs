using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Common.Models
{
    public class Applicant
    {
        public Guid ApplicantId { get; set; }
        public string ApplicantName { get; set; }
        public Guid WorkUnitId { get; set; }
    }
}
