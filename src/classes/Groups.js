import { setError, setWarning, setSuccess, setCustom } from '../functions/setReply'
import DB from './DB'
import SQLQueryBuilder from './SQLQueryBuilder'
import Password from '../classes/Password'
import Token from '../classes/Token'
import axios from 'axios'
import config from '../config'

class Groups {
  // start of getGroups function 
  async getGroups(name, orderByFields, order, site) {
    try {
 
      const db = new DB() 
      const sqlQuery = new SQLQueryBuilder()            
                           .select('*')
                           .from(process.env.TABLE_GROUPS)
                           .where({Name: name, Site: site})
                           .orderBy(orderByFields)
                           .order(order)
                           .get()  
                           
                           console.log(sqlQuery)
      
      const results = await db.query(sqlQuery.sqlStatement, sqlQuery.values)

      if (results.status === 'error') {
        return setError(results)
      }

      if (results.results.length === 0) {
          return setWarning('No groups')
      }

      if (results.status !== 'ok'){
          return results
      }

      const data = {
          groups: results.results
      }

      return setSuccess(data)      
    } catch (error) {
      setError(error)
    }
  // end of getGroups function 
  }

  // start of newGroup function
  async newGroup(name, site) {
    try {
      const sqlQuery = new SQLQueryBuilder()
                          .insert(process.env.TABLE_GROUPS)
                          .set({Name: name, Site: site})
                          .get()
      
      return await new DB().query(sqlQuery.sqlStatement, sqlQuery.values)
    } catch (error) {
      return setError(error)
    }
  }
}

export default Groups