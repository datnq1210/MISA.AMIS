using MISA.Common.Entities;
using MISA.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Common.Interfaces
{
    public interface IOvertimeFormService: IBaseService<OvertimeForm>
    {
        IEnumerable<OvertimeForm> Paging(Page page);
    }
}
