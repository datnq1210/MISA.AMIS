using MISA.Common.Interfaces;
using MISA.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.BLL
{
    public class ApplicantService: BaseService<Applicant>, IApplicantService
    {
        public ApplicantService(IDbContext<Applicant> dbconnection) : base(dbconnection)
        {

        }

    }
}
