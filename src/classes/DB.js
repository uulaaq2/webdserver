import mysql from 'mysql'
import { setSuccess, setError, setWarning } from '../functions/setReply'

class DB {

    // set variables
    static connection = mysql.connection

    // if not connected then connect otherwise return the existing connection
    constructor() {
    if (!DB.connection) {
        DB.connection = mysql.createConnection({
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE,
                    port: process.env.DB_PORT,
                    multipleStatements: true
                })     
        DB.connection.connect((error) => {
                                if (error) throw error;
                                console.log('Connected to the db ...')
                            })

        }        
    }

    // check if connected
     isConnected() {
        return DB.connection.state === 'connected' ? true : false
    }

    // raw query, gets sql statement and values, runs the query and returns the result
    async query(sqlStatement = '', values = []) {
        // start of promise
        return new Promise((resolve, reject) => {
            console.log(sqlStatement)
            console.log(values)
            // start of query
            DB.connection.query(sqlStatement, values, (error, results) => {

                console.log(error)
                console.log(results)
                // check if there is error
                if (error) {
                    resolve(setError(error))
                }   

                // return results
                let data = {
                    results
                }

                resolve(setSuccess(data))                

            //end of query
            })
        // end of promise
        })
    // end of query function
    }

// end of class
}
export default DB