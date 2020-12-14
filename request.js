const http = require('http');

const options = {
  hostname: '169.254.169.254',
  path: '/latest/meta-data',
  method: 'GET'
}

http.request(options, (res) => {

    const instance_id = "";

    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

    res.setEncoding('utf8');

    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
      instance_id += chunk;
    });

    res.on('end', () => {
        console.log(instance_id);
    }); 

}
