Meteor.subscribe('firmwaresLive');
Meteor.subscribe('firmwaresAuthorization');

function getValuesFromFormForEdit(){
  if (document.getElementById('packageNameEdict') != null) {
    var name = document.getElementById("packageNameEdict").value;
  }else {
    var name = null;
  }
  if (document.getElementById('packageDescriptionEdict') != null) {
    var description = document.getElementById("packageDescriptionEdict").value;
  }else {
    var description = null;
  }
  var screens = "";
  if(document.getElementById('check').checked) {
    // Case : User want assign all screens to the package. Get all screens Address
    var allScreens = Screens_Live.find({});
    allScreens.forEach(function(doc){
      screens += doc.screenAddress+"#";
    });
  } else {
    var myOpts = $('#selectBox option:selected');
    if(myOpts.length > 0){
      for(var i=0; i < myOpts.length; i++){
        screens += myOpts[i].value+"#";
      }
    }
  }

  var d = new Date().toString();
  var res = d.split(" ");
  var dat = res[0]+" "+res[1]+" "+res[2]+" "+res[4]+" "+res[3];
  var firmware =
    {
      'name' : name,
      'description' : description,
      'screensID': screens,
      'currentNumber': 0,
      'status': 'HLD',
      'inputter': Session.get("UserLogged")._id,
      'authorizer': null,
      'dateTime': dat.toString()
    };
  return firmware;
}

Template.firmware.rendered = function(){
  settingLanguage();
  if(Session.get("ScreensList") == null){
    Router.go('allFirmwares');
  }
  $(document).ready(function () {
    $('#check').change(function () {
        if (!this.checked)
           $('#select').show();
        else
            $('#select').hide();
    });
});
  //$(".select2_demo_2").select2();
  $(".select2_demo_2").select2();
};
Template.firmware.events({
  'click .upload'() {
    $('#upload').modal();
    Meteor.call('newPackage', "/home/akrem/packages");
  },
  'click .saveUpdate'() {
    // if the record came from Live
    if(Session.get("TypeEdict") == "LIVE"){
      var firmwareUpdated = getValuesFromFormForEdit();
      var firmware = Session.get("FirmwareForEdit");
      firmwareUpdated.inputter = Session.get("UserLogged")._id;
      firmwareUpdated._id = firmware._id;
      firmwareUpdated.currentNumber = firmware.currentNumber+1;
      Firmwares_Authorization.insert(firmwareUpdated);
      if(Session.get("UserLogged").language == "en"){
        toastr.success('With success','Edict done !');
      }else {
        toastr.success('Avec succès','Modification fait !');
      }
      Router.go('allFirmwares');
    }
    if(Session.get("TypeEdict") == "AUTH"){
      var firmwareUpdated = getValuesFromFormForEdit();
      var firmware = Session.get("FirmwareForEdit");
      firmwareUpdated.inputter = Session.get("UserLogged")._id;
      firmwareUpdated._id = firmware._id;
      Firmwares_Authorization.remove(firmware._id);
      Firmwares_Authorization.insert(firmwareUpdated);
      if(Session.get("UserLogged").language == "en"){
        toastr.success('With success','Edict done !');
      }else {
        toastr.success('Avec succès','Modification fait !');
      }
      Router.go('allFirmwares');
    }

  },
  'click .validateUpdate'() {
    if(Session.get("TypeEdict") == "LIVE"){
      var firmwareUpdated = getValuesFromFormForEdit();
      var firmware = Session.get("FirmwareForEdit");
      firmwareUpdated.inputter = Session.get("UserLogged")._id;
      firmwareUpdated._id = firmware._id;
      firmwareUpdated.status = "INAU";
      firmwareUpdated.currentNumber = firmware.currentNumber+1;
      Firmwares_Authorization.insert(firmwareUpdated);
      if(Session.get("UserLogged").language == "en"){
        toastr.success('With success','Edict done !');
      }else {
        toastr.success('Avec succès','Modification fait !');
      }
      Router.go('allFirmwares');
    }
    if(Session.get("TypeEdict") == "AUTH"){
      var firmwareUpdated = getValuesFromFormForEdit();
      var firmware = Session.get("FirmwareForEdit");
      firmwareUpdated.inputter = Session.get("UserLogged")._id;
      firmwareUpdated._id = firmware._id;
      firmwareUpdated.status = "INAU";
      Firmwares_Authorization.remove(firmware._id);
      Firmwares_Authorization.insert(firmwareUpdated);
      if(Session.get("UserLogged").language == "en"){
        toastr.success('With success','Edict done !');
      }else {
        toastr.success('Avec succès','Modification fait !');
      }
      Router.go('allFirmwares');
    }
  },
});
Template.firmware.helpers({
  firmware(){
    return Session.get("FirmwareForEdit");
  },
  screens(){
    return Session.get("ScreensList");
  },
  equals: function(v1, v2) {
    return (v1 == v2);
  },
});
