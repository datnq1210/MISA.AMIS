using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Common.Models
{
    public class OvertimeForm
    {
        public Guid OvertimeId { get; set; }
        public DateTime DateCreate { get; set; }
        public DateTime DateWorkStart { get; set; }
        public DateTime DateWorkEnd { get; set; }
        public string WorkTime
        {
            get
            {
                return DateWorkStart.ToString("dd/MM/yyyy")
                    + " - "
                    + DateWorkEnd.ToString("dd/MM/yyyy");
            }
        }
        public string ReasonOvertime { get; set; }
        public string Note { get; set; }
        public string State { get; set; }
        public Guid ApplicantId { get; set; }
        public string ApplicantName { get; set; }
        public Guid ApproverId { get; set; }
        public string ApproverName { get; set; }

    }
}
