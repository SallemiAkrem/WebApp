function getValuesFromFormForAdd(){
  var roles = Roles_Live.find({ "code" : Session.get("CLIENT_CODE") });
  var arrayIDs = [];
  roles.forEach(function(doc){
    arrayIDs.push(doc._id);
  });
  var rolesID = '';
  for( var i=0; i < arrayIDs.length; i++){
    var x = arrayIDs[i];
    if( document.getElementById(x).checked ) {
      rolesID = rolesID + arrayIDs[i]+"*";
    }
  }
  if (document.getElementById('fname') != null) {
    var fname = document.getElementById("fname").value;
  }else {
    var fname = null;
  }
  if (document.getElementById('surname') != null) {
    var surname = document.getElementById("surname").value;
  }else {
    var surname = null;
  }
  if (document.getElementById('legalIdentifier') != null) {
    var legalIdentifier = document.getElementById("legalIdentifier").value;
  }else {
    var legalIdentifier = null;
  }
  if (document.getElementById('dateOfBirth') != null) {
    var dateOfBirth = document.getElementById("dateOfBirth").value;
  }else {
    var dateOfBirth = null;
  }
  if (document.getElementById('phone') != null) {
    var phone = document.getElementById("phone").value;
  }else {
    var phone = null;
  }
  if (document.getElementById('address') != null) {
    var address = document.getElementById("address").value;
  }else {
    var address = null;
  }
  if (document.getElementById('mail') != null) {
    var email = document.getElementById("mail").value;
  }else {
    var email = null;
  }
  if (document.getElementById('pass1') != null) {
    var pass1 = document.getElementById("pass1").value;
  }else {
    var pass1 = null;
  }
  //console.log(" rolesID :",rolesID);
  var user =
    {
      'fname' : fname,
      'surname' : surname,
      'legalIdentifier' : legalIdentifier,
      'dateOfBirth' : dateOfBirth,
      'phone' : phone,
      'address' : address,
      'email' : email,
      'password' : encryptPassword(pass1),
      'photo' : '/public/upload/users/1001',
      'roles': rolesID.slice(0, rolesID.length-1),
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': new Date(),
      'code': Session.get("CLIENT_CODE")
    };
  return user;
}
function getValuesFromFormForEdit(){
  var roles = Roles_Live.find({ "code" : Session.get("CLIENT_CODE") });
  var arrayIDs = [];
  roles.forEach(function(doc){
    arrayIDs.push(doc._id);
  });
  var rolesID = '';
  for( var i=0; i < arrayIDs.length; i++){
    var x = arrayIDs[i];
    if( document.getElementById(x+"#").checked ) {
      rolesID = rolesID + arrayIDs[i]+"*";
    }
  }
  if (document.getElementById('fnameEdit') != null) {
    var fname = document.getElementById("fnameEdit").value;
  }else {
    var fname = null;
  }
  if (document.getElementById('surnameEdit') != null) {
    var surname = document.getElementById("surnameEdit").value;
  }else {
    var surname = null;
  }
  if (document.getElementById('legalIdentifierEdit') != null) {
    var legalIdentifier = document.getElementById("legalIdentifierEdit").value;
  }else {
    var legalIdentifier = null;
  }
  if (document.getElementById('dateOfBirthEdit') != null) {
    var dateOfBirth = document.getElementById("dateOfBirthEdit").value;
  }else {
    var dateOfBirth = null;
  }
  if (document.getElementById('phoneEdit') != null) {
    var phone = document.getElementById("phoneEdit").value;
  }else {
    var phone = null;
  }
  if (document.getElementById('addressEdit') != null) {
    var address = document.getElementById("addressEdit").value;
  }else {
    var address = null;
  }
  if (document.getElementById('mailEdit') != null) {
    var email = document.getElementById("mailEdit").value;
  }else {
    var email = null;
  }
  if (document.getElementById('newPassword') != null) {
    var newPassword = document.getElementById("newPassword").value;
  }else {
    var newPassword = null;
  }
  var user =
    {
      'fname' : fname,
      'surname' : surname,
      'legalIdentifier' : legalIdentifier,
      'dateOfBirth' : dateOfBirth,
      'phone' : phone,
      'address' : address,
      'email' : email,
      'password' : newPassword,
      'photo' : '/public/upload/users/1001',
      'roles': rolesID.slice(0, rolesID.length-1),
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': new Date(),
      'code': Session.get("CLIENT_CODE")
    };
  return user;
}
function getValuesFromFormForEditAu(){
  var roles = Roles_Live.find({ "code": Session.get("CLIENT_CODE") });
  var arrayIDs = [];
  roles.forEach(function(doc){
    arrayIDs.push(doc._id);
  });
  var rolesID = '';
  for( var i=0; i < arrayIDs.length; i++){
    var x = arrayIDs[i];
    if( document.getElementById(x+"##").checked ) {
      rolesID = rolesID + arrayIDs[i]+"*";
    }
  }
  if (document.getElementById('fnameEdit1') != null) {
    var fname = document.getElementById("fnameEdit1").value;
  }else {
    var fname = null;
  }
  if (document.getElementById('surnameEdit1') != null) {
    var surname = document.getElementById("surnameEdit1").value;
  }else {
    var surname = null;
  }
  if (document.getElementById('legalIdentifierEdit1') != null) {
    var legalIdentifier = document.getElementById("legalIdentifierEdit1").value;
  }else {
    var legalIdentifier = null;
  }
  if (document.getElementById('dateOfBirthEdit1') != null) {
    var dateOfBirth = document.getElementById("dateOfBirthEdit1").value;
  }else {
    var dateOfBirth = null;
  }
  if (document.getElementById('phoneEdit1') != null) {
    var phone = document.getElementById("phoneEdit1").value;
  }else {
    var phone = null;
  }
  if (document.getElementById('addressEdit1') != null) {
    var address = document.getElementById("addressEdit1").value;
  }else {
    var address = null;
  }
  if (document.getElementById('mailEdit1') != null) {
    var email = document.getElementById("mailEdit1").value;
  }else {
    var email = null;
  }
  if (document.getElementById('newPassword1') != null) {
    var newPassword = document.getElementById("newPassword1").value;
  }else {
    var newPassword = null;
  }
  var user =
    {
      'fname' : fname,
      'surname' : surname,
      'legalIdentifier' : legalIdentifier,
      'dateOfBirth' : dateOfBirth,
      'phone' : phone,
      'address' : address,
      'email' : email,
      'password' : newPassword,
      'photo' : '/public/upload/users/',
      'roles': rolesID.slice(0, rolesID.length-1),
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': new Date(),
      'code': Session.get("CLIENT_CODE")
    };
  return user;
}
function verifyEdit(id){
  var user = Users_Authorization.findOne({ "_id" : id });
  if(user == undefined){
    return true;
  }
  return false;
}
function verifyDelete(id){
  var user = Users_Authorization.findOne({ "_id" : id+"#D" });
  if( user == undefined ){
    return true;
  }
  return false;
}
function sendCapsule(user, state){
  var d = new Date().toString();
  var res = d.split(" ");
  var date = res[0]+" "+res[1]+" "+res[2]+" "+res[4]+" "+res[3];
  var capsule = {
    'id_sender': 20,
    'id_receiver': 50,
    'sort': null,
    'priority': 1,
    'payload': null,
    'type': 'PAYLOAD',
    'sending_date': date,
    'receiving_date': null,
    'status_capsule': "NO",
    'tts': 10,
    'ACK': "NO"
  };
  if(state == "add" ){
    var res = user.roles.split("*");
    var role;
    if( res.length == 1){
      role = Roles_Live.findOne({ "_id" : user.roles });
    }else{
      var listRoles = [];
      for(var i=0; i < res.length; i++){
        var role = Roles_Live.findOne({ "_id" : res[i] });
        listRoles.push(role);
      }
      role = getFinalRole(listRoles);
    }
    var payload = {'att': ['dn', 'objectClass', 'CUserFirstName', 'CUserLastName', 'pwd', 'CUserAddress',
      'CUserEmail', 'CUserCin', 'CUserDateOfBirth', 'CUserPhoneNumber', 'CUserPicture',
      'ContractAdd', 'ContractUpdate', 'ContractDelete', 'ContractDisplay', 'ContractPrint', 'ContractSign', 'ContractValidator',
      'AccountAdd', 'AccountUpdate', 'AccountDelete',
      'AccountDisplay', 'AccountPrint', 'AccountValidator', 'InvoiceAdd',
      'InvoiceUpdate', 'InvoiceDelete', 'InvoiceDisplay', 'InvoicePrint', 'InvoiceSign', 'InvoiceValidator',
      'BookingAdd', 'BookingUpdate', 'BookingDelete', 'BookingDisplay', 'BookingPrint', 'BookingValidator',
      'ContentAdd', 'ContentDelete', 'ContentDisplay', 'ContentValidator',
      'RoleAdd', 'RoleDelete', 'RoleUpdate', 'RoleDisplay', 'RolePrint', 'RoleValidator',
      'SignatureAdd', 'SignatureValidator'],
      'dn': 'CUserEmail='+user.email+',ECode='+Session.get("CLIENT_CODE")+',o=Establishments,o=WebApp,dc=swallow,dc=tn',
      'objectClass': ['top', 'ClientUserAccount', 'ContractManagment', 'AccountManagment','InvoiceManagment', 'BookingManagment',
      'ContentManagment', 'RoleManagment', 'SignatureManagment'],
      'CUserFirstName': user.fname,
      'CUserLastName': user.surname,
      'CUserAddress': user.address,
      'pwd': user.password,
      'CUserEmail': user.email,
      'CUserPhoneNumber': user.phone,
      'CUserDateOfBirth': user.dateOfBirth,
      'CUserPicture': user.photo,
      'CUserCin': user.legalIdentifier,
      'ContractAdd': role.contractAdd,
      'ContractUpdate': role.contractUpdate,
      'ContractDelete': role.contractDelete,
      'ContractDisplay': role.contractDisplay,
      'ContractPrint': role.contractPrint,
      'ContractSign': role.contractSign,
      'ContractValidator': role.contractValidate,
      'AccountAdd': role.accountAdd,
      'AccountUpdate': role.accountUpdate,
      'AccountDelete': role.accountDelete,
      'AccountDisplay': role.accountDisplay,
      'AccountPrint': role.accountPrint,
      'AccountValidator': role.accountValidate,
      'InvoiceAdd': role.invoiceAdd,
      'InvoiceUpdate': role.invoiceUpdate,
      'InvoiceDelete': role.invoiceDelete,
      'InvoiceDisplay': role.invoiceDisplay,
      'InvoicePrint': role.invoicePrint,
      'InvoiceSign': role.invoiceSign,
      'InvoiceValidator': role.invoiceValidate,
      'BookingAdd': role.bookingAdd,
      'BookingUpdate': role.bookingUpdate,
      'BookingDelete': role.bookingDelete,
      'BookingDisplay': role.bookingDisplay,
      'BookingPrint': role.bookingPrint,
      'BookingValidator': role.bookingValidate,
      'ContentAdd': role.contentAdd,
      'ContentDelete': role.contentDelete,
      'ContentDisplay': role.contentDisplay,
      'ContentValidator': role.contentValidate,
      'RoleAdd': role.roleAdd,
      'RoleDelete': role.roleDelete,
      'RoleUpdate': role.roleUpdate,
      'RoleDisplay': role.roleDisplay,
      'RolePrint': role.rolePrint,
      'RoleValidator': role.roleValidate,
      'SignatureAdd': role.signatureAdd,
      'SignatureValidator': role.signatureValidate
    };
    capsule.sort = "LDAP_ADD_MSG";
    capsule.payload = payload;
    }else if( state == "edit"){
      var res = user.roles.split("*");
      var role;
      if( res.length == 1){
        role = Roles_Live.findOne({ "_id" : user.roles });
      }else{
        var listRoles = [];
        for(var i=0; i < res.length; i++){
          var role = Roles_Live.findOne({ "_id" : res[i] });
          listRoles.push(role);
        }
        role = getFinalRole(listRoles);
      }
      var payload = {
        'att':['dn','changetype','replace'],'dn': 'CUserEmail='+user.email+',ECode='+Session.get("CLIENT_CODE")+',o=Establishments,o=WebApp,dc=swallow,dc=tn','changetype': 'modify',
        'replace': ['CUserFirstName', 'CUserLastName', 'pwd', 'CUserAddress',
          'CUserEmail', 'CUserCin', 'CUserDateOfBirth', 'CUserPhoneNumber', 'CUserPicture',
          'ContractAdd', 'ContractUpdate', 'ContractDelete', 'ContractDisplay', 'ContractPrint', 'ContractSign', 'ContractValidator',
          'AccountAdd', 'AccountUpdate', 'AccountDelete',
          'AccountDisplay', 'AccountPrint', 'AccountValidator', 'InvoiceAdd',
          'InvoiceUpdate', 'InvoiceDelete', 'InvoiceDisplay', 'InvoicePrint', 'InvoiceSign', 'InvoiceValidator',
          'BookingAdd', 'BookingUpdate', 'BookingDelete', 'BookingDisplay', 'BookingPrint', 'BookingValidator',
          'ContentAdd', 'ContentDelete', 'ContentDisplay', 'ContentValidator',
          'RoleAdd', 'RoleDelete', 'RoleUpdate', 'RoleDisplay', 'RolePrint', 'RoleValidator',
          'SignatureAdd', 'SignatureValidator'] ,
          'CUserFirstName': user.fname,
          'CUserLastName': user.surname,
          'CUserAddress': user.address,
          'pwd': user.password,
          'CUserEmail': user.email,
          'CUserPhoneNumber': user.phone,
          'CUserDateOfBirth': user.dateOfBirth,
          'CUserPicture': user.photo,
          'CUserCin': user.legalIdentifier,
          'ContractAdd': role.contractAdd,
          'ContractUpdate': role.contractUpdate,
          'ContractDelete': role.contractDelete,
          'ContractDisplay': role.contractDisplay,
          'ContractPrint': role.contractPrint,
          'ContractSign': role.contractSign,
          'ContractValidator': role.contractValidate,
          'AccountAdd': role.accountAdd,
          'AccountUpdate': role.accountUpdate,
          'AccountDelete': role.accountDelete,
          'AccountDisplay': role.accountDisplay,
          'AccountPrint': role.accountPrint,
          'AccountValidator': role.accountValidate,
          'InvoiceAdd': role.invoiceAdd,
          'InvoiceUpdate': role.invoiceUpdate,
          'InvoiceDelete': role.invoiceDelete,
          'InvoiceDisplay': role.invoiceDisplay,
          'InvoicePrint': role.invoicePrint,
          'InvoiceSign': role.invoiceSign,
          'InvoiceValidator': role.invoiceValidate,
          'BookingAdd': role.bookingAdd,
          'BookingUpdate': role.bookingUpdate,
          'BookingDelete': role.bookingDelete,
          'BookingDisplay': role.bookingDisplay,
          'BookingPrint': role.bookingPrint,
          'BookingValidator': role.bookingValidate,
          'ContentAdd': role.contentAdd,
          'ContentDelete': role.contentDelete,
          'ContentDisplay': role.contentDisplay,
          'ContentValidator': role.contentValidate,
          'RoleAdd': role.roleAdd,
          'RoleDelete': role.roleDelete,
          'RoleUpdate': role.roleUpdate,
          'RoleDisplay': role.roleDisplay,
          'RolePrint': role.rolePrint,
          'RoleValidator': role.roleValidate,
          'SignatureAdd': role.signatureAdd,
          'SignatureValidator': role.signatureValidate
      };
      capsule.sort = "LDAP_MOD_MSG";
      capsule.payload = payload;
    }else{
      //case "delete"
      var payload = {'dn': 'CUserEmail='+user.email+',ECode='+Session.get("CLIENT_CODE")+',o=Establishments,o=WebApp,dc=swallow,dc=tn' };
      capsule.sort = "LDAP_DEL_MSG";
      capsule.payload = payload;
    }

  Meteor.call('sendCapsule', capsule, function(error){
    if(error){
      alert('Error');
    }else{
      console.log("OK");
    }
  });
}
Template.allClientsUsers.rendered = function(){
    var userLogged = Session.get("UserLogged");
    // Initialize fooTable
    $('.footable').footable();
    $('.footable2').footable();
    $('.dataTables-example').DataTable();
};
Template.allClientsUsers.events({
  'click .newUser'() {
    $('#newUserPopup').modal();
  },
  'click .saveAdd'() {
    var userAdded = getValuesFromFormForAdd();
    Users_Authorization.insert(userAdded);
    toastr.success('With success','Save done !');
  },
  'click .validateAdd'() {
    var userAdded = getValuesFromFormForAdd();
    userAdded.status = "INAU";
    Users_Authorization.insert(userAdded);
    toastr.success('With success','Validation done !');
  },
  //         LIVE events         //
  'click .btn-edit'() {
    var user = Users_Live.findOne({ "_id" : this._id });
    if (verifyEdit(user._id)){
      Session.set("userSelected", user);
      var res = user.roles.split("*");
      var roles = Roles_Live.find({ "code": Session.get("CLIENT_CODE") });
      var rolesList = [];
      roles.forEach(function(doc){
        var obj = {};
        if( res.indexOf(doc._id) > -1 ){
          obj.id = doc._id;
          obj.roleName = doc.roleName;
          obj.status = true;
          rolesList.push(obj);
        }else{
          obj.id = doc._id;
          obj.roleName = doc.roleName;
          obj.status = false;
          rolesList.push(obj);
        }
      });
      Session.set("RoleList", rolesList);
      $('#editUserPopUp').modal();
    }else{
      swal({
        title: "Access denied",
        text: "Edit operation is already in authorization state !",
        type: "warning",
        closeOnConfirm: true
      });
    }
  },
  'click .saveEditLive'() {
    var userUpdated = getValuesFromFormForEdit();
    var user = Session.get("userSelected");
    if( document.getElementById("newPassword").value != ""){
      if ( checkConfirmPassword() ){
        if ( checkOldPassword(user._id, document.getElementById("oldPassword").value )) {
          userUpdated._id = user._id;
          userUpdated.currentNumber = userUpdated.currentNumber + 1 ;
          userUpdated.password = encryptPassword(document.getElementById("newPassword").value);
          Users_Authorization.remove(user._id);
          Users_Authorization.insert(userUpdated);
          toastr.success('With success','Edict done !');
        }else{
          swal({ title: "Alert !",text: "You need to enter the right old password !",type: "warning",closeOnConfirm: true });
        }
      }else{
        swal({ title: "Alert !",text: "You need to enter the same password twice !",type: "warning",closeOnConfirm: true});
      }
    }else{
      userUpdated._id = user._id;
      userUpdated.password = user.password;
      Users_Authorization.insert(userUpdated);
      toastr.success('With success','Edict done !');
    }
  },
  'click .validateEditLive'() {
    var userUpdated = getValuesFromFormForEdit();
    var user = Session.get("userSelected");
    if( document.getElementById("newPassword").value != ""){
      if ( checkConfirmPassword() ){
        if ( checkOldPassword(user._id, document.getElementById("oldPassword").value )) {
          userUpdated._id = user._id;
          userUpdated.currentNumber = userUpdated.currentNumber + 1 ;
          userUpdated.password = encryptPassword(document.getElementById("newPassword").value);
          userUpdated.status = "INAU";
          Users_Authorization.remove(user._id);
          Users_Authorization.insert(userUpdated);
          toastr.success('With success','Edict done !');
        }else{
          swal({ title: "Alert !",text: "You need to enter the right old password !",type: "warning",closeOnConfirm: true });
        }
      }else{
        swal({ title: "Alert !",text: "You need to enter the same password twice !",type: "warning",closeOnConfirm: true});
      }
    }else{
      userUpdated._id = user._id;
      userUpdated.password = user.password;
      userUpdated.status = "INAU";
      Users_Authorization.insert(userUpdated);
      toastr.success('With success','Edict done !');
    }
  },
  'click .btn-details'() {
    var user = Users_Live.findOne({ "_id" : this._id });
    Session.set("UserDetails",user);
    var roles = user.roles.split("*");
    Session.set("RoleList", roles);
    $('#userDetailsPopUp').modal();
  },
  'click .btn-delete'() {
    var user = Users_Live.findOne({ "_id" : this._id });
    if (verifyDelete(user._id)){
      $('#checkDeleting').modal();
      Session.set("deleteUserLive",user);
    }else{
      swal({
        title: "Access denied",
        text: "Delete operation is already in authorization state !",
        type: "warning",
        closeOnConfirm: true
      });
    }
  },
  'click .BtnDelete'() {
    var user = Session.get("deleteUserLive");
    user._id = user._id+"#D"
    user.status = "RNAU";
    user.inputter = Session.get("UserLogged")._id;
    user.dateTime = new Date();
    user.authorizer = Session.get("UserLogged")._id;
    Users_Authorization.insert(user);
  },
  //        Authorization events        //
  'click .authorizeAu'() {
    var oldUser = Users_Live.findOne({ "_id" : this._id });
    var newUser = Users_Authorization.findOne({ "_id" : this._id });
    if(newUser.roles.length > 0 ){
      Session.set("OldUser",oldUser);
      Session.set("NewUser",newUser);
      $('#checkAuthorising').modal();
      var user = Users_Authorization.findOne({ "_id" : this._id });
      Session.set("UserAuthorized",user);
    }else{
      swal({ title: "Alert !",text: "You need to assign minimum one role for this user before authorization  !",type: "warning",closeOnConfirm: true});
    }
  },
  'click .BtnAuthorize'() {
    var user = Session.get("UserAuthorized");
    var query = Users_Live.findOne({ "_id": user._id });
    console.log("Query :", query);
    if(query != undefined){
      // Update case
      // USer exist in LIVE TABLE
      sendCapsule(user, "edit");
      console.log("edit");
    }
    var query2 = Users_Authorization.findOne({ "_id": user._id });
    if(query == undefined && query2._id.indexOf("#D") < 0){
      sendCapsule(user, "add");
      console.log("add");
    }
    if(query2._id.indexOf("#D") > 0){
      sendCapsule(user, "delete");
      console.log("delete");
    }
    authorize(user);
  },
  'click .validateAu'() {
    var user = Users_Authorization.findOne({ "_id" : this._id });
    Users_Authorization.update({'_id' : user._id }, {'$set':{ 'status' : 'INAU', 'inputter' : Session.get("UserLogged")._id , 'dateTime' : new Date() }});
  },

  'click .editAu'() {
    var user = Users_Authorization.findOne({ "_id" : this._id });
    Session.set("userSelected", user);
    var res = user.roles.split("*");
    var roles = Roles_Live.find({ "code": Session.get("CLIENT_CODE") });
    var rolesList = [];
    roles.forEach(function(doc){
      var obj = {};
      if( res.indexOf(doc._id) > -1 ){
        obj.id = doc._id;
        obj.roleName = doc.roleName;
        obj.status = true;
        rolesList.push(obj);
      }else{
        obj.id = doc._id;
        obj.roleName = doc.roleName;
        obj.status = false;
        rolesList.push(obj);
      }
    });
    Session.set("RoleList", rolesList);
    $('#editUserPopUpAu').modal();
  },
  'click .saveEditAu'() {
    var userUpdated = getValuesFromFormForEditAu();
    var user = Session.get("userSelected");
    if( document.getElementById("newPassword1").value != ""){
      if ( checkConfirmPassword() ){
        if ( checkOldPassword(user._id, document.getElementById("oldPassword1").value )) {
          userUpdated._id = user._id;
          userUpdated.password = encryptPassword(document.getElementById("newPassword1").value);
          Users_Authorization.remove(user._id);
          Users_Authorization.insert(userUpdated);
          toastr.success('With success','Edict done !');
        }else{
          swal({ title: "Alert !",text: "You need to enter the right old password !",type: "warning",closeOnConfirm: true });
        }
      }else{
        swal({ title: "Alert !",text: "You need to enter the same password twice !",type: "warning",closeOnConfirm: true});
      }
    }else{
      userUpdated._id = user._id;
      userUpdated.password = user.password;
      Users_Authorization.remove(user._id);
      Users_Authorization.insert(userUpdated);
      toastr.success('With success','Edict done !');
    }
  },
  'click .validateEditAu'() {
    var userUpdated = getValuesFromFormForEditAu();
    var user = Session.get("userSelected");
    if( document.getElementById("newPassword1").value != ""){
      if ( checkConfirmPassword() ){
        if ( checkOldPassword(user._id, document.getElementById("oldPassword1").value )) {
          userUpdated._id = user._id;
          userUpdated.password = encryptPassword(document.getElementById("newPassword1").value);
          userUpdated.status = "INAU";
          Users_Authorization.remove(user._id);
          Users_Authorization.insert(userUpdated);
          toastr.success('With success','Edict done !');
        }else{
          swal({ title: "Alert !",text: "You need to enter the right old password !",type: "warning",closeOnConfirm: true });
        }
      }else{
        swal({ title: "Alert !",text: "You need to enter the same password twice !",type: "warning",closeOnConfirm: true});
      }
    }else{
      userUpdated._id = user._id;
      userUpdated.password = user.password;
      userUpdated.status = "INAU";
      Users_Authorization.remove(user._id);
      Users_Authorization.insert(userUpdated);
      toastr.success('With success','Edict done !');
    }
  },
  'click .cancelAu'() {
    var user = Users_Authorization.findOne({ "_id" : this._id });
    Session.set("deleteUserAu",user);
    $('#checkCancel').modal();
  },
  'click .BtnCancel'() {
    var user = Session.get("deleteUserAu");
    Users_Authorization.remove(user._id);
    toastr.success('With success','Deleting operation done ');
  },
  'click .detailsAu'() {
    var user = Users_Authorization.findOne({ "_id" : this._id });
    Session.set("UserDetails",user);
    var roles = user.roles.split("*");
    Session.set("RoleList", roles);
    $('#userDetailsPopUp').modal();
  },

});
Template.allClientsUsers.helpers({
  userLive(){
    console.log("Live users : ", Users_Live.find({ "code" : Session.get("CLIENT_CODE") }).count());
    return Users_Live.find({ "code" : Session.get("CLIENT_CODE") });
  },
  userAuthorization(){
    var users = Users_Authorization.find({ "code" : Session.get("CLIENT_CODE") });
    var usersAuthorization = [];
    users.forEach(function(doc){
      var buttonDetails = true;
      if (doc._id.indexOf("#D") == -1){
        var buttonDetails = false;
      }
      var array = nextState(doc.status);
      var button = getButtonsAu(array);
      var user =
        {
          '_id' : doc._id,
          'fname' : doc.fname,
          'surname' : doc.surname,
          'legalIdentifier' : doc.legalIdentifier,
          'dateOfBirth' : doc.dateOfBirth,
          'phone' : doc.phone,
          'address' : doc.address,
          'email' : doc.email,
          'password' : doc.password,
          'photo' : doc.photo,
          'roles': doc.roles,
          'currentNumber': doc.currentNumber,
          'status': doc.status,
          'inputter': doc.inputter,
          'authorizer': doc.authorizer,
          'dateTime': doc.dateTime,
          'code': doc._id,
          'buttonEdit' : button.editAu,
          'buttonValidate' : button.validateAu,
          'buttonAuthorize' : button.authorizeAu,
          'buttonDetail' : buttonDetails
        };
      usersAuthorization.push(user);
    });
    return usersAuthorization;
  },
  userDetails(){
    var user = Session.get("userDetails");
    return user;
  },
  userSelected(){
    var user = Session.get("userSelected");
    return user;
  },
  roles(){
    return Roles_Live.find({ "code" : Session.get("CLIENT_CODE") });
  },
  userDetail() {
    return Session.get("UserDetails");
  },
  rolesList() {
    return Session.get("RoleList");
  },
  newUser() {
    return Session.get("NewUser");
  },
  oldUser() {
    return Session.get("OldUser");
  },
  warnings (){
    return Session.get("Warnings");
  },
  equals: function(v1, v2) {
    return (v1 === v2);
  },
  client(){
    return Session.get("CLIENT_NAME");
  },
  exist: function(v1) {
    var array = Session.get("RoleList");
    if (array != undefined){
      if( array.indexOf(v1) == -1 ){
        //console.log("IndexOF :", array.indexOf(v1));
        return false;
      }
      return true;
    }
  },
});
