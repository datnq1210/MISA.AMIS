using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.Common.Interfaces;
using MISA.Common.Models;
using MISA.CukCuk.Api.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.AMIS.Api.Controllers
{
    public class ApplicantsController : BaseController<Applicant>
    {
        public ApplicantsController(IApplicantService employeeService): base(employeeService)
        {

        }
    }
}
