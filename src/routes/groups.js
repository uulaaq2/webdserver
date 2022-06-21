import express from 'express'
const router = express.Router()
import cors from 'cors'
import { headers } from '../options/corsOptions'
import { setWarning, setSuccess, setError, setCustom } from '../functions/setReply'
import Groups from '../classes/Groups'
import validateRequestInitial from '../functions/validateRequestInitial'

export default router

router.post('/get', cors(), headers, function(req, res) {
  const getGroups = async () => {
    try {
      
      const name = req.body.name
      const orderByFields = req.body.orderByFields
      const order = req.body.order
      const token = req.body.token
      const site = req.body.site

      const validateRequestInitialResult = validateRequestInitial('groups', 'admin', token, site)
      if (validateRequestInitialResult.status !== 'ok') {
        res.send(validateRequestInitialResult)       
      }

      if (!site) {        
        res.send(setCustom('missingParameters', 'Missing parameters'))
      }
  
      const groups = new Groups()
      const getGroupsResult = await groups.getGroups(name, orderByFields, order, site)
      
      res.send(getGroupsResult)
    } catch (error) {
      res.send(setError(error))
    }
  }

  getGroups()
})

router.post('/new', cors(), headers, function(req, res) {
  try {
    const token = req.body.token
    const site = req.body.site
    const permissionPath = 'groups.admin'

    const validateRequestInitialResult = validateRequestInitial(permissionPath, token, site)
    if (validateRequestInitialResult.status !== 'ok') {
      res.send(validateRequestInitialResult)       
    }

    const newGroup = async () => {
      const name = req.body.name
      const site = req.body.site
      
      const result = await new Groups().newGroup(name, site)
      res.send(result)
    }

    newGroup()

  } catch (error) {
    res.send(setError(error))
  }
})


