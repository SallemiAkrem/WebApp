
Meteor.methods({
    sendEmail: function (to, from, subject, text) {
      check([to, from, subject, text], [String]);
      // Let other method calls from the same client start running,
      // without waiting for the email sending to complete.
      this.unblock();
      Email.send({
        to: to,
        from: from,
        subject: subject,
        text: text
      });
    },
    'sendLoginInfo': function(login, password){
      var name   = login.substring(0, login.lastIndexOf("@"));
      var domain = login.substring(login.lastIndexOf("@") +1);
      var entreprise = domain.substring(0, domain.lastIndexOf("."));
      console.log("LOGIN :"+login);
      console.log("NAME :"+name);
      console.log("PASSWORD :"+password);
      console.log("ENTREPRISE :"+entreprise);
      //console.log("RANDOM"+Math.random().toString(36).substring(7));
      var ldap = Npm.require('ldapjs');
      var ssha = Npm.require("ssha");
      Future = Npm.require('fibers/future');
      var myFuture = new Future();
      var result = 0 ;
      var client = ldap.createClient({
        url: 'ldap://10.10.10.2:389'
      });
      client.bind('cn=directory manager', 'salmenF03', function(err) {
        var opts = {
          //filter: '(uid=admin)',
          scope: 'sub',
          //attributes: ['dn', 'sn', 'cn', 'uid']
        };
        client.search('CUserEmail='+login+',ou='+entreprise+',o=establishment,dc=swallow,dc=tn', opts, function(err, res) {
          res.on('error', function(err) {
            result = 0;
            myFuture.return(result);
            console.log("Denied");
          });
          res.on('searchEntry', function(entry) {
            var jsonEntry = JSON.parse(JSON.stringify(entry.object));
            console.log('Json entry: ' + JSON.stringify(entry.object));
            console.log('Json entry login : ' + jsonEntry.CUserLogin);
            console.log('Json entry Password : ' + jsonEntry.userPassword);
            if( login === jsonEntry.CUserEmail && ssha.verify(password, jsonEntry.userPassword)){
              console.log("Success");
              result = 1;
              myFuture.return(result);
            }else{
              result = 0;
              myFuture.return(result);
              console.log("Denied");
            }
          });
        });
      });
      console.log("result :"+myFuture.wait());
      return myFuture.wait();
    },
    
});