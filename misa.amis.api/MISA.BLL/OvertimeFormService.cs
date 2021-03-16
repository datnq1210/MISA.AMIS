using Dapper;
using MISA.Common.Interfaces;
using MISA.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.BLL
{
    public class OvertimeFormService : BaseService<OvertimeForm>, IOvertimeFormService
    {
        public OvertimeFormService(IDbContext<OvertimeForm> dbContext) : base(dbContext)
        {

        }

        public IEnumerable<OvertimeForm> Paging(Page page)
        {
            var sqlCommand = "Proc_FormPaging";
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@limitRow", page.limit);
            parameters.Add("@offsetRow", page.offset);
            return dbconnection.Get(sqlCommand, parameters, System.Data.CommandType.StoredProcedure);
        }
    }
}
