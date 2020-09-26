module.exports={
    OS_USERNAME: 'gestionvm',
    OS_PROJECT_NAME: 'gestionvm',
    OS_PASSWORD: '123',
    tokenOpenStack: '',
    ipOpenstack: '10.55.2.20',
    ipServerUsuarios: '10.55.6.31',
    idNetPublic:'a0423419-93f8-4a3d-9115-a69193f6c2f7',//Ejecutar comando openstack network list y copiar id public
    roleMember:'2bbc851c6bb74838a32741b3aa6a1771', //Ejecutar comando openstack role list y copiar id member
    roleAdmin:'d062d353ed9b4f7a8523140c442af130',
    headersOpenStack:{},
    headersDataBase:{
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Access-Control-Allow-Origin":"*"
            }
    }
};