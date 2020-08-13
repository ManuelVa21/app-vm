module.exports={
    OS_USERNAME: 'gestion',
    OS_PROJECT_NAME: 'gestion',
    OS_PASSWORD: 'rootGESTION',
    tokenOpenStack: '',
    ipOpenstack: '10.55.2.20',
    ipServerUsuarios: '10.55.6.31',
    idNetPublic:'007ba905-8193-4b15-b3e7-2fb28ba3045d',//Ejecutar comando openstack network list y copiar id public
    roleMember:'a7e43ba664bf49f986346a192109f9f7',//Ejecutar comando openstack role list y copiar id member
    roleAdmin:'b92c8607891b4c45b46e6f80aa9e03b8',
    headersOpenStack:{},
    headersDataBase:{
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Access-Control-Allow-Origin":"*"
            }
    }
};