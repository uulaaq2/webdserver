import { setError, setWarning, setSuccess, setCustom } from '../functions/setReply'
import DB from './DB'
import SQLQueryBuilder from './SQLQueryBuilder'

class Permissions {

  async addUserPermissions(fields, values) {
    try {
      const tableUserPermissions = process.env.TABLE_PERMISSION_USER    

      const preparedSQL = new SQLQueryBuilder()            
                                  .insert(tableUserPermissions)
                                  .setFieldsforMultipleValues(fields)
                                  .setMultipleValues(values)
                                  .get()     
      
      const db = new DB()
      await db.query(preparedSQL.sqlStatement, [preparedSQL.values])

      return setSuccess()
    } catch (error) {
      return setError(error)      
    }
  }

  async addDepartmentPermissions(fields, values) {
    try {
      const tableDepartmentPermissions = process.env.TABLE_PERMISSION_DEPARTMENT

      const preparedSQL = new SQLQueryBuilder()            
                                  .insert(tableDepartmentPermissions)
                                  .setFieldsforMultipleValues(fields)
                                  .setMultipleValues(values)
                                  .get()     
      
      const db = new DB()
      await db.query(preparedSQL.sqlStatement, [preparedSQL.values])

      return setSuccess()
    } catch (error) {
      return setError(error)      
    }
  }

  async addGroupPermissions(fields, values) {
    try {
      const tableGroupPermissions = process.env.TABLE_PERMISSION_GROUP

      const preparedSQL = new SQLQueryBuilder()            
                                  .insert(tableGroupPermissions)
                                  .setFieldsforMultipleValues(fields)
                                  .setMultipleValues(values)
                                  .get()     
      
      const db = new DB()
      await db.query(preparedSQL.sqlStatement, [preparedSQL.values])

      return setSuccess()
    } catch (error) {
      return setError(error)      
    }
  }  
  
}
export default Permissions