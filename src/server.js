import dotenv from 'dotenv'
const path = require('path')
dotenv.config({ path: path.join(__dirname, '..', '.env')})

import express from 'express'
import cors from 'cors'

import routerHome from './routes/home'
import routerSignIn from './routes/signin'
import routerUser from './routes/user'

const app = express();
const port = process.env.APP_PORT || 3003

app.use(express.static('dist/public'))

app.use(express.json());
app.use(cors())

app.use(routerHome)
app.use('/signin', routerSignIn)
app.use('/user', routerUser)


import Permissions from './classes/Permissions'

async function main(){
  const fields = [
    'Email_Address',
    'Permission_Name',
    'Permission_Label',
    'Permission_Actions',
    'Site'
  ]

  const permissions = new Permissions()
  const email1 = 'muhittin.yendun@au.indorama.net'
  const permissionName1 = 'userProfile'
  const permissionLabel1 = 'User profile'
  const actions1 = 'Edit, aaa, bbb, ccc, ddd'
  const site1 = 'Botany'

  const email2 = 'muhittin.yendun@au.indorama.net'
  const permissionName2 = 'userProfile2'
  const permissionLabel2 = 'User profile 2'
  const actions2 = 'Edit, aaa, bbb, ccc, ddd, eee'
  const site2 = 'Botany'

  const values = [
    [email1, permissionName1, permissionLabel1, actions1, site1],
    [email2, permissionName2, permissionLabel2, actions2, site2]
  ]
  
  const aaa = await permissions.addUserPermissions(fields, values)
    
    console.log(aaa)  

}

main().catch(error => console.log('main function error ', error))

app.listen(port, () => {
  try {
      console.log(`listening at ${port} ...`);      
  } catch (error) {
      console.log(error);
  }   
});

process.on('SIGINT', () =>{
  console.log("\nExiting ...");
  //db.connection.end();
  console.log("\nExited ...");
  process.exit(0);   
});