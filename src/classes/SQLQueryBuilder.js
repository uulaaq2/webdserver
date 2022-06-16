import { setSuccess } from '../functions/setReply'

class SQLQueryBuilder {
        pieces = []
        values = []

        select(selectfields) {
            this.pieces.push(`SELECT ${selectfields}`)

            return this
        }

        insert(tableName) {
            this.pieces.push(`INSERT INTO ${tableName}`)

            return this
        }
        
        insertIgnore(tableName) {
            this.pieces.push(`INSERT IGNORE INTO ${tableName}`)

            return this
        }

        update(tableName) {
            this.pieces.push(`UPDATE ${tableName}`)

            return this
        }

        set(setFields) {    
            let tempFields = []         
    
            for (let key in setFields) {
                if (setFields.hasOwnProperty(key)) {
                   tempFields.push(`${key}=?`)
                   this.values.push(setFields[key])
                }
            }
    
            if (tempFields.length > 0) {             
                this.pieces.push(`SET ${tempFields.join(',')}`)
            }

            return this
        }    

        setFieldsforMultipleValues(fieldsArray) {
            this.pieces.push(`(${fieldsArray.join(',')}) VALUES ?`)

            return this
        }

        setMultipleValues(valuesArray) {            
            this.values = valuesArray

            return this
        }
        
        table(tableName) {
            this.pieces.push(tableName)

            return this
        }
        
        from(tableName) {
            this.pieces.push(`FROM ${tableName}`)

            return this
        }
    
        where(whereFields) {    
            let tempFields = []         
    
            for (let key in whereFields) {
                if (whereFields[key]) {
                    if (whereFields.hasOwnProperty(key)) {
                        tempFields.push(`${key}=?`)
                        this.values.push(whereFields[key])
                    }
                }
            }
    
            if (tempFields.length > 0) {             
                this.pieces.push(`WHERE ${tempFields.join(' AND ')}`)
            }
            return this
        }

        like(likeFields) { 
            let tempFields = []         
            let tempValueText = ''
    
            for (let key in likeFields) {
                if (likeFields.hasOwnProperty(key)) {
                   if (likeFields[key] !== '') {
                    tempFields.push(`${key} like ?`)
                    tempValueText = '%' + likeFields[key] + '%';
                    this.values.push(tempValueText)
                   }
                }
            }
    
            if (tempFields.length > 0) {             
                this.pieces.push(`WHERE ${tempFields.join(' AND ')}`)
            }
            return this
        }

        orderBy(orderByFields) {
            if (orderByFields) {
                this.pieces.push(`ORDER BY ${orderByFields}`)
            }
            
            return this
        }
    
        get() {
            let data = {
                sqlStatement: this.pieces.join(' '),
                values: this.values
            }
            return setSuccess(data)
        }
}

export default SQLQueryBuilder