module.exports={
    ipOpenstack: '10.55.2.24',
    ipServerUsuarios: '10.55.6.31',
    idNetPublic:'73234f4d-fcc6-40b5-b166-7795b977b89d',//Ejecutar comando openstack network list y copiar id public
    roleMember:'5e1a62d77e0f4305993d7a67398329cd',//Ejecutar comando openstack role list y copiar id member
    roleAdmin:'b38243b8afda48139b1d01717c7a7376',
    headersOpenStack:{},
    headersDataBase:{
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Access-Control-Allow-Origin":"*"
            }
    },
    tokenOpenStack:''
};