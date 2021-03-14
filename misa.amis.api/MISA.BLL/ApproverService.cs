using MISA.Common.Interfaces;
using MISA.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.BLL
{
    public class ApproverService : BaseService<Approver>, IApproverService
    {
        public ApproverService(IDbContext<Approver> dbContext) : base(dbContext)
        {

        }
    }
}
