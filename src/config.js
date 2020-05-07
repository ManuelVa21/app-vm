module.exports={
    ipOpenstack: '10.55.2.24',
    ipServerUsuarios: '10.55.6.31',
    idNetPublic:'dbd5b4b7-7b4f-4bb3-9fd3-c45ea064eea0',//Ejecutar comando openstack network list y copiar id public
    roleMember:'e6dfb94eb95542a0b415279abe461aab',//Ejecutar comando openstack role list y copiar id member
    roleAdmin:'fb348ad631eb4f76af256f5ee056ee1f',
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