module.exports={
    OS_USERNAME: 'gestionvm',
    OS_PROJECT_NAME: 'admin',
    OS_PASSWORD: '123',
    tokenOpenStack: '',
    ipOpenstack: '10.55.2.20',
    ipServerUsuarios: '10.55.6.31',
    idProjectAdmin: '7de28cf9dc044066af3ecbfd004b6724', //Id proyecto admin en OpenStakc
    idNetPublic:'8b728c3e-06f5-446a-b488-61c240bb4c1c',//Ejecutar comando openstack network list y copiar id public
    roleMember:'db00aa503dcf4f08ac8402f00305e617', //Ejecutar comando openstack role list y copiar id member
    roleAdmin:'896625f3d0e64ffc9992089d502468f8',
    headersOpenStack:{},
    headersDataBase:{
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Access-Control-Allow-Origin":"*"
            }
    }
};