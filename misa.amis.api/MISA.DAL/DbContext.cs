using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using Dapper;
using MISA.Common.Interfaces;
using MySqlConnector;

namespace MISA.DAL
{
    public class DbContext<MISAEntity> : IDbContext<MISAEntity>
    {
        #region Declare
        IConfiguration _configuration;
        IDbConnection _dbConnection;
        string _connectionString;
        #endregion

        #region Constructor
        public DbContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("MISALocalConnection");
            _dbConnection = new MySqlConnection(_connectionString);
        }
        #endregion

        #region Method
        public IEnumerable<MISAEntity> Get(string sqlCommand, DynamicParameters parameters, CommandType commandType)
        {
            return _dbConnection.Query<MISAEntity>(sqlCommand, parameters, commandType: commandType);
        }

        public int ExcuteNonQuery(string sqlCommand, DynamicParameters parameters, CommandType commandType)
        {
            return _dbConnection.Execute(sqlCommand, parameters, commandType: commandType);
        }
        #endregion
    }
}
