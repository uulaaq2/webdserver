import { checkPermission } from "./checkPermissions"
import { setSuccess, setCustom, setError } from './setReply'
import Token from '../classes/Token'
const fs = require('fs')

function validateRequestInitial(permissionPath, lookFor, token, site) {
  try {
    if (!permissionPath || !lookFor || !token || !site) {      
      return setCustom('missingparameters', 'Missing parameters')
    }

    const verifyTokenResult = new Token().verifyToken(token)
    if (verifyTokenResult.status !== 'ok') {
      return verifyTokenResult
    }

    if (!checkPermissions(permissionPath, lookFor, site)) {
      return setCustom('notauthorized', 'You don\'t have access')
    }

    return setSuccess()
  } catch (error) {
    setError(error)
  }  
}

export default validateRequestInitial