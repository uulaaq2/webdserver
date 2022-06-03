const Permission = require('./Permissions')

async function start() {
  const permissions = new Permissions()
  const email = 'muhittin.yendun@au.indorama.net'
  const permissionName = 'userProfile'
  const permissionLabel = 'User profile'
  const actions = 'Edit, aaa, bbb'
  const site = 'Botany'
  
  return await permissions.addUserPermission(email, permissionName, permissionLabel, actions, site)
}

start()