using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Text;
using System.Threading.Tasks;
using Abp.UI;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace PMHelmutSchmidtPortal.HSUPortal;

public static class DbHelper
{
    public static DbCommand GetDbCommand(DbContext dbContext, StringBuilder queryString, SqlParameter[] parameters)
    {
        DbCommand command = dbContext.Database.GetDbConnection().CreateCommand();

        if (command.Connection == null)
        {
            throw new UserFriendlyException(StatusCodes.Status500InternalServerError, "Couldn't establish database connection");
        }
        
        if (command.Connection.State != ConnectionState.Open)
        {
            command.Connection.Open();
        }

        // Check if there is an existing transaction
        if (dbContext.Database.CurrentTransaction != null)
        {
            command.Transaction = dbContext.Database.CurrentTransaction.GetDbTransaction();
        }
        
        command.CommandText = queryString.ToString();
        command.CommandType = CommandType.Text;
        command.Parameters.AddRange(parameters);
        return command;
        
    }

    public static async Task<List<T>> ReadCommandResult<T>(this DbCommand command ,Action<List<T>,DbDataReader> mapDelegate)
    {
        await using DbDataReader result = await command.ExecuteReaderAsync();
        
        List<T> itemList = new();
        
        while (await result.ReadAsync())
        {
            mapDelegate(itemList, result);
        }

        return itemList;
    }
}