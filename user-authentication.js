const http = require('http');

const admin = "redadmin";

const options = {
  hostname: '169.254.169.254',
  path: '/latest/meta-data',
  method: 'GET'
}

module.exports = {
    type: "credentials",
    users: function(username) {
        return new Promise(function(resolve) {

            // console.log("user.authentication.users")
            if (username == admin) {
                // Resolve with the user object. It must contain
                // properties 'username' and 'permissions'
                var user = { username: admin, permissions: "*" };
                resolve(user);
            } else {
                // Resolve with null to indicate this user does not exist
                resolve(null);
            }
        });
    },
    authenticate: function(username,password) {
        return new Promise(function(resolve) {
            // Do whatever work is needed to validate the username/password
            // combination.
            // console.log("user.authentication.authenticate")
            http.request(options, (res) => {

                const instance_id = "";

                console.log(`STATUS: ${res.statusCode}`);
                console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

                res.setEncoding('utf8');

                res.on('data', (chunk) => {
                  // console.log(`BODY: ${chunk}`);
                  instance_id += chunk;
                });

                res.on('end', () => {

                  console.log('No more data in response.');
                  console.log('user.authenticate.end.instance.id ' + instance_id);

                  if (username == admin && password == instance_id) {
                    // Resolve with the user object. Equivalent to having
                    // called users(username);
                    var user = { username: admin, permissions: "*" };
                    resolve(user);
                  } else {
                    // Resolve with null to indicate the username/password pair
                    // were not valid.
                    resolve(null);
                  }

                });
            })
        });
    }
 }
