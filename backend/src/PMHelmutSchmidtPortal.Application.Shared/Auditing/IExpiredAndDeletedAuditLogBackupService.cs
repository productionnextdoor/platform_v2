using System.Collections.Generic;
using Abp.Auditing;

namespace PMHelmutSchmidtPortal.Auditing
{
    public interface IExpiredAndDeletedAuditLogBackupService
    {
        bool CanBackup();
        
        void Backup(List<AuditLog> auditLogs);
    }
}