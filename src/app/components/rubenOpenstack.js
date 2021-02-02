async function createServer( name, idImage, nameKey, idFlavor, idNet,idArquitecture=any,typeVM ) {
    let server;
    let answer={
        'status': 400,
        'content' :'Bad Request',
        'error': null
    }
    let file
    try {
        console.log(name)
        // file = fs.readFile('server/scripts/coreIMS/sipp.sh', 'utf-8');
        // file = fs.readFileSync('/home/telcoims/telcoUnicauca/server/scripts/coreIMS/sipp.sh', 'utf-8');
        file = fs.readFileSync('/home/telcoims/telcoUnicauca/server/scripts/coreIMS/'+name+'.sh', 'utf-8');
        // console.log('archivo',file)
      } catch (err) {''
          console.log("fallo el archivo")
        // file="apt install snmpd -y"
        file="echo 'apt install snmpd -y'>testFile"
    }
   
    let body={
        "server": {
            "name": name, 
            "imageRef": idImage, 
            "flavorRef": idFlavor, 
            "key_name": nameKey,
            "min_count": 1, 
            "max_count": 1, 
            "networks": [{"uuid": idNet}],
            // "personality":[{"path":"/root/", "contents": file}]
        }
    }
//ssh -i nameKey ubuntu@ipFlotante
   
    await axios.post('http://'+config.ipOpenstack+'/compute/v2.1/servers', body,config.headersOpenStack )
            .then(function (response) {
                
                if (response.data.server) {
                   
                    answer.status = 200
                   answer.content=response.data.server
                   answer.error=null
                }else{
                   
                    answer.status = 401
                    answer.content=null
                    answer.error=response.data
                }
            })
            .catch(error =>{
                // console.log("error creando servidor -------------------------------------------------------")
                console.log(error.response.data.badRequest)
                answer.status = 400
                answer.content=null
                answer.error=error
            });
    await sleep(10000)
    
    let portDevice;
    // console.log(answer)
   console.log("consultando puerto")
    await axios.get('http://'+config.ipOpenstack+':9696/v2.0/ports?device_id='+answer.content.id, config.headersOpenStack )
    .then(function (response) {
     portDevice= response.data.ports[0].id
    //  console.log(response)
    })
    .catch(error =>{
       console.log('error consult ports', error)
    });
    let body2={
        "floatingip": {
            "floating_network_id": config.idNetPublic,
            "port_id": portDevice
        }
    }
    await axios.post('http://'+config.ipOpenstack+':9696/v2.0/floatingips', body2, config.headersOpenStack )
    .then( data =>{
       // console.log(data)
    })
    .catch(error =>{
    console.log('error dd ip float', error)
    })
    await sleep(10000)
    answer.content= await openstack.consultServer(answer.content.id);
    
    
    ipfloat=answer.content.addresses[Object.keys(answer.content.addresses)[0]][1].addr;
    //create user and pass
    


    if (name != 'aio') {
        
        keyPair=fs.readFileSync('server/key.pem', {
            encoding: 'utf8',
          })
    
          var ssh = new SSH({
            host: ipfloat,
            user: 'ubuntu',
            key: keyPair
        });
        
        
       /* ssh.exec('sudo apt-get install snmpd -y'),
        ssh.exec("sudo sed -i'.bak' '/agentAddress  udp:127.0.0.1:161/d' /etc/snmp/snmpd.conf"),
        ssh.exec("sudo sed -i'.bak' '17i\agentAddress udp:161,udp6:[::1]:161' /etc/snmp/snmpd.conf"),
        ssh.exec("sudo service snmpd restart"),*/
        
        ssh.exec("sudo useradd telcoims"),
        ssh.exec("echo telcoims:telcoims | sudo chpasswd"),
        ssh.exec("sudo sed -i '$a telcoims    ALL=(ALL:ALL) ALL' /etc/sudoers"),
    
    
        //install scripts functions coreIMS
        ssh.exec("sudo echo '"+file+"'>fileScript"),
        ssh.exec("sudo chmod 775 fileScript"),
        ssh.exec("./fileScript",{
            pty: true,
            out: console.log.bind(console),
        })
        .start();
    }