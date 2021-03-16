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
    public class OvertimeFormsController : BaseController<OvertimeForm>
    {
        IOvertimeFormService _overtimeFormService;

        public OvertimeFormsController(IOvertimeFormService overtimeFormService) : base(overtimeFormService)
        {
            _overtimeFormService = overtimeFormService;
        }

        [HttpPost("/api/v1/OvertimeForms/paging")]
        public IEnumerable<OvertimeForm> Paging(Page page)
        {
            return _overtimeFormService.Paging(page);
        }
    }
}
