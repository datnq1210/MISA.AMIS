using MISA.Common.Interfaces;
using MISA.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.BLL
{
    public class OvertimeFormService: BaseService<OvertimeForm>, IOvertimeFormService
    {
        public OvertimeFormService(IDbContext<OvertimeForm> dbContext) : base(dbContext)
        {

        }
    }
}
