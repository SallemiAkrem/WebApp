Meteor.subscribe('contractsLive');
Meteor.subscribe('contractsAuthorization');

function authorize(contract){
  if(contract._id.indexOf("#") > 0){
    contract._id = contract._id.replace("#D", "");
  }
  var contractX = Contracts_Live.findOne({ "_id" : contract._id });
  var d = new Date().toString();
  var res = d.split(" ");
  var dat = res[0]+" "+res[1]+" "+res[2]+" "+res[4]+" "+res[3];
  // entry validated and new entry
  if(contractX !== undefined && contract.status == "INAU"){
    contract.status = "LIVE";
    contract.authorizer = Session.get("UserLogged")._id;
    contract.dateTime = getDateNow();
    contractX.status = 'HIS';
    contractX.dateTime = getDateNow();
    contractX.currentNumber = contract.currentNumber;
    contractX._id = contract._id+"#"+(contract.currentNumber-1);
    Contracts_History.insert(contractX);
    Contracts_Live.remove(contract._id);
    Contracts_Live.insert(contract);
    Contracts_Authorization.remove(contract._id);
  // Authorise deleting contract
  }else if(contractX !== undefined && contract.status == "RNAU"){
    contract.authorizer= Session.get("UserLogged")._id;
    contract.status = 'DEL';
    contract.dateTime = getDateNow();
    Contracts_History.insert(contract);
    Contracts_Live.remove(contractX._id);
    Contracts_Authorization.remove(contract._id);
    Contracts_Authorization.remove(contract._id+"#D");
  }else{
    contract.status = "LIVE";
    contract.authorizer = Session.get("UserLogged")._id;
    contract.dateTime = getDateNow();
    Contracts_Live.insert(contract);
    Contracts_Authorization.remove(contract._id);
  }
}
function verifyDelete(id){
  var contract = Contracts_Authorization.findOne({ "_id" : id+"#D" });
  if( contract == undefined ){
    return true;
  }
  return false;
}
function verifyEdit(id){
  var contract = Contracts_Authorization.findOne({ "_id" : id });
  if(contract == undefined){
    return true;
  }
  return false;
}
// A function which return true if the param existing in all Languages_Live.languagePivot
function verifyPivotLanguage(idLanguage){
  var art = Articles_Live.find({ "languagePivot": idLanguage });
  return art == undefined;
}
// A function which returns a list of articles without subSection (just article list, subsection not included) with a filter languageID
function getAllArticles(idLanguageChoosed){

  /*if (verifyPivotLanguage(idLanguageChoosed)) {
    var art = Articles_Live.find({ "languagePivot": idLanguageChoosed });
  }*/
  var articles = Articles_Live.find();
  var articlesLive = [];
  articles.forEach(function(doc){
    // In case the language choosed is equal to the languagePivot ID
    if (idLanguageChoosed == doc.languagePivot && doc.subSection.length == 0 && doc.activated == "true" ) {
      var article =
        {
          '_id' : doc._id,
          'title': doc.titlePivot,
          'content': doc.contentPivot
        };
      articlesLive.push(article);
    }
    // In case the language choosed is between languageSelected IDs
    if (idLanguageChoosed != doc.languagePivot){
      var listLanguages = doc.languageSelected.split("#");
      var arrayTitles = doc.titles.split("#");
      var arrayContents = doc.contents.split("#");
      // listLanguages : an array contains all ID of language (Languages_Live.languageSelected)
      if (listLanguages.indexOf(idLanguageChoosed) > -1 ) {
        var index = listLanguages.indexOf(idLanguageChoosed);
        var article =
          {
            '_id' : doc._id,
            'title': arrayTitles[index],
            'content': arrayContents[index]
          };
        articlesLive.push(article);
      }
    }
  });
  return articlesLive;
}
function getSelectedArticles(contract){
  // Set into session list of selected articles
  var artsId = contract.articlesList.split("#");
  // Get all articles from Articles_Live where the language is equal to the language of contract (passed in argument)
  var articles = getAllArticles(contract.language);
  var articlesSelected = [];
  for (var i = 0; i < articles.length; i++) {
    if (artsId.indexOf(articles[i]._id) < 0 ){
      var article =
        {
          '_id' : articles[i]._id,
          'title': articles[i].title,
        };
      articlesSelected.push(article);
    }
  }
  return articlesSelected;
}
function getNotSelectedArticles(contract){
  // Set into session list of not selected articles
  var artsId = contract.articlesList.split("#");
  // Get all articles from Articles_Live where the language is equal to the language of contract (passed in argument)
  var articles = getAllArticles(contract.language);
  var articlesNotSelected = [];
  for (var i = 0; i < articles.length; i++) {
    if (artsId.indexOf(articles[i]._id) > -1){
      var article =
        {
          '_id' : articles[i]._id,
          'title': articles[i].title,
        };
      articlesNotSelected.push(article);
    }
  }
  return articlesNotSelected;
}
function getListOfArticles(list, languageID){
  // Return an array of articles(id + titles)
  var res = list.split("#"); // res contains now list of articles ID
  var articles = Articles_Live.find();
  var arts = [];
  var i = 0;
  articles.forEach(function(doc){
    if (res.indexOf(doc._id) > -1 ){
      i = i+1;
      // In case the language choosed is equal to the languagePivot ID
      if (languageID == doc.languagePivot && doc.subSection.length == 0 && doc.activated == "true" ) {
        var article = {
            '_id' : i,
            'title': doc.titlePivot
        };
        arts.push(article);
      }

      if (languageID != doc.languagePivot){
        var listLanguages = doc.languageSelected.split("#");
        var arrayTitles = doc.titles.split("#");
        var arrayContents = doc.contents.split("#");
        // listLanguages : an array contains all ID of language (Languages_Live.languageSelected)
        if (listLanguages.indexOf(languageID) > -1 ) {
          var index = listLanguages.indexOf(languageID);
          var article =
            {
              '_id' : i,
              'title': arrayTitles[index]
            };
          arts.push(article);
        }
      }
    }
  });
  return arts;
}

Template.allContracts.rendered = function(){
  settingLanguage();
  $('.footable').footable();
  $('.footable2').footable();
  $(".touchspin3").TouchSpin({
      verticalbuttons: true,
      buttondown_class: 'btn btn-white',
      buttonup_class: 'btn btn-white'
  });
  $('.i-checks').iCheck({
      checkboxClass: 'icheckbox_square-green',
      radioClass: 'iradio_square-green'
  });
};
Template.allContracts.events({
  'click .confirm'() {
    // Get configuration of contract
    var configuration = {
      "language": $('input[name="language"]:checked').val(),
      "languageName": Languages_Live.findOne({ "_id": $('input[name="language"]:checked').val() }).languageName,
      "clientsNumber": document.getElementById('clientNumber').value,
      "currency": document.getElementById('currency').value,
      "rate": document.getElementById('rate').value,
    };
    console.log(configuration);
    // Put the array in the session
    var array = [];
    array[0] = configuration;
    Session.set("CONFIGURATION", configuration);
    Session.set("LANGUAGE", configuration.language);
    Session.set("CURRENCY", configuration.currency);
    var array = getAllArticles(configuration.language);
    
    console.log("ARRAY -> " ,array);
    Session.set("Articles", array);
    Session.set("NumberOfArticles", array.length);
    setTimeout(function () {
      Router.go('contract');
    }, 500);
  },
  'click .newContract'() {
    settingLanguage();
    $('#configuration').modal();
  },
  'click .newType'() {
    Router.go('contractsType');
  },
  'click .validateAu'() {
    var contract = Contracts_Authorization.findOne({ "_id" : this._id });
    Contracts_Authorization.update({'_id' : contract._id }, {'$set':{ 'status' : 'INAU', 'inputter' : Session.get("UserLogged")._id , 'dateTime' : getDateNow() }});
  },
  'click .authorizeAu'() {
    settingLanguage();
    var oldContract = Contracts_Live.findOne({ "_id" : this._id });
    var newContract = Contracts_Authorization.findOne({ "_id" : this._id });
    Session.set("Contract_Authorization", newContract);
    if(oldContract == undefined){
      Session.set("OldContract",null);
    }else {
      // Trait contracts objects to dsiplay them in "checkAuthorising" modal
      var d = oldContract.dateTime.toString();
      var res = d.split(" ");
      var dat = res[0]+" "+res[1]+" "+res[2]+" "+res[4]+" "+res[3];
      var clients = "";
      if(oldContract.client.length > 17){
        var clientsID = oldContract.client.split("#");
        for (var i = 0; i < clientsID.length; i++) {
          if(clientsID[i].length > 5){
            var clt = Clients_Live.findOne({ "_id": clientsID[i] });
            clients = clt.name+", "+clients;
          }
        }
      }else {
        var clt = Clients_Live.findOne({ "_id": oldContract.client });
        clients = clt.name;
      }
      var lang = Languages_Live.findOne({ "_id": oldContract.language });
      var contract1 = {
          'client' : clients,
          'typeContract' : oldContract.typeContract,
          'startDate': oldContract.startDate,
          'endDate': oldContract.endDate,
          'language': lang.languageName,
          'amount': oldContract.amount,
          'currency': oldContract.currency,
          'articlesList': getListOfArticles(oldContract.articlesList, oldContract.language),
          'inputter': oldContract.inputter,
          'authorizer': oldContract.authorizer,
          'dateTime': dat
      };
      Session.set("OldContract", contract1);
    }
    var clients = "";
    if(newContract.client.length > 17){
      var clientsID = newContract.client.split("#");
      for (var i = 0; i < clientsID.length; i++) {
        if(clientsID[i].length > 5){
          var clt = Clients_Live.findOne({ "_id": clientsID[i] });
          clients = clt.name+", "+clients;
        }
      }
    }else {
      var clt = Clients_Live.findOne({ "_id": newContract.client });
      clients = clt.name;
    }
    var lang = Languages_Live.findOne({ "_id": newContract.language });
    var contract2 = {
        '_id': newContract._id,
        'client' : clients,
        'typeContract' : newContract.typeContract,
        'startDate': newContract.startDate,
        'endDate': newContract.endDate,
        'language': lang.languageName,
        'amount': newContract.amount,
        'currency': newContract.currency,
        'articlesList': getListOfArticles(newContract.articlesList , newContract.language),
        'inputter': newContract.inputter,
        'authorizer': newContract.authorizer,
        'dateTime': newContract.dateTime
    };
    Session.set("NewContract", contract2);
    $('#checkAuthorising').modal();
  },
  'click .BtnAuthorize'() {
    authorize(Session.get("Contract_Authorization"));
    if(Session.get("UserLogged").language == "en"){
      toastr.success('With success','Authorization done !');
    }else {
      toastr.success('Avec succès','Autorisation fait !');
    }
  },
  'click .btn-delete'() {
    var article = Articles_Live.findOne({ "_id" : this._id });
    if (verifyDelete(article._id)){
      $('#checkDeleting').modal();
      Session.set("ArticleForDelete", article);
    }else{
      $('#deletionState').modal();
    }
  },
  'click .BtnDelete'() {
    var article = Session.get("ArticleForDelete");
    article._id = article._id+"#D"
    article.status = "RNAU";
    article.inputter = Session.get("UserLogged")._id;
    article.dateTime = new Date();
    article.authorizer = null;
    Articles_Authorization.insert(article);
    if(Session.get("UserLogged").language == "en"){
      toastr.success('With success','Deletion done !');
    }else {
      toastr.success('Avec succès','Suppression fait !');
    }
  },
  'click .btn-edit'() {
    Session.set("LIVE_OR_AUTH", "LIVE");
    var contract = Contracts_Live.findOne({ "_id" : this._id });
    if (verifyEdit(this._id)){
      var clients = "";
      var clts = [];
      if (contract.client.indexOf("#") > -1) {
        var clientsID = contract.client.split("#");
        for (var i = 0; i < clientsID.length; i++) {
          if(clientsID[i].length > 1){
            var clt = Clients_Live.findOne({ "_id": clientsID[i] });
            clients = clt.name+", "+clients;
          }
        }
        clients = clients.substring(0, clients.length-2);
      }else {
        var clt = Clients_Live.findOne({ "_id": contract.client });
        clients = clt.name;
      }
      Session.set("ARTICLES_SELECTED", getSelectedArticles(contract));
      Session.set("ARTICLES_NOT_SELECTED", getNotSelectedArticles(contract));
      Session.set("CLIENTS", clients);
      Session.set("contractSelected", contract);
      Router.go('editContract');
    }else{
      $('#edictState').modal();
    }
  },
  'click .detailsAu'() {
    var article = Articles_Authorization.findOne({ "_id" : this._id });
    var artTitle = "";
    if(this.subSection.length > 0){
      var articleX = Articles_Live.findOne({ "_id" : this.subSection });
      artTitle = articleX.title;
    }
    var usr1 = Users_Live.findOne({ "_id" : this.inputter });
    var art =
      {
        'title' : article.title,
        'content' : article.content,
        'subSection': artTitle,
        'inputter': usr1.fname+" "+usr1.surname,
        'authorizer': " ",
        'dateTime': article.dateTime
      };
    Session.set("ArticleDetails", art);
    $('#ArticleDetails').modal();
  },
  'click .editAu'() {
    Session.set("LIVE_OR_AUTH", "AUTH");
    var contract = Contracts_Authorization.findOne({ "_id" : this._id });
    var clients = "";
    var clts = [];
    var clientsID = contract.client.split("#");
    for (var i = 0; i < clientsID.length; i++) {
      if(clientsID[i].length > 1){
        var clt = Clients_Live.findOne({ "_id": clientsID[i] });
        clients = clt.name+", "+clients;
      }
    }
    clients = clients.substring(0, clients.length-2);
    Session.set("ARTICLES_SELECTED", getSelectedArticles(contract));
    Session.set("ARTICLES_NOT_SELECTED", getNotSelectedArticles(contract));
    Session.set("CLIENTS", clients);
    Session.set("contractSelected", contract);
    Router.go('editContract');
  },
  'click .cancelAu'() {
    var contract = Contracts_Authorization.findOne({ "_id" : this._id });
    Session.set("contractDeletingAuth", contract);
    $('#checkCancel').modal();
  },
  'click .BtnCancel'() {
    var contract = Session.get("contractDeletingAuth");
    Contracts_Authorization.remove(contract._id);
    if(Session.get("UserLogged").language == "en"){
      toastr.success('With success','Deletion operation done ');
    }else {
      toastr.success('Avec succès','Suppression fait !');
    }
  },
  'click .btn-details'() {
    $('#ContractDetails').modal();
  },

});
Template.allContracts.helpers({
  languagesLive (){
    return Languages_Live.find();
  },
  contractsLive (){
    var contracts = Contracts_Live.find();
    var contractsLive = [];
    contracts.forEach(function(doc){
      var clients = "";
      if(doc.client.length > 17){
        var clientsID = doc.client.split("#");
        for (var i = 0; i < clientsID.length; i++) {
          if(clientsID[i].length > 5){
            var clt = Clients_Live.findOne({ "_id": clientsID[i] });
            clients = clt.name+", "+clients;
          }
        }
        clients = clients.substring(0, clients.length-2);
      }else {
        var clt = Clients_Live.findOne({ "_id": doc.client });
        clients = clt.name;
      }
      var contract =
        {
          '_id' : doc._id,
          'client' : clients,
          'typeContract' : doc.typeContract,
          'startDate': doc.startDate,
          'endDate': doc.endDate,
          'language': doc.language,
          'amount': doc.amount,
          'currency': doc.currency,
          'clientNumber': doc.clientNumber,
          'articlesList': doc.articlesList,
          'currentNumber': doc.currentNumber,
          'status': doc.status,
          'inputter': doc.inputter,
          'authorizer': doc.authorizer,
          'dateTime': doc.dateTime,
        };
      contractsLive.push(contract);
    });
    return contractsLive;
  },
  contractsAuthorization (){
    var contracts = Contracts_Authorization.find();
    var contractsAuthorization = [];
    contracts.forEach(function(doc){
      var buttonDetails = true;
      if (doc._id.indexOf("#D") == -1){
        var buttonDetails = false;
      }
      var array = nextState(doc.status);
      var button = getButtonsAu(array);
      var clients = "";
      if(doc.client.length > 17){
        var clientsID = doc.client.split("#");
        for (var i = 0; i < clientsID.length; i++) {
          if(clientsID[i].length > 5){
            var clt = Clients_Live.findOne({ "_id": clientsID[i] });
            clients = clt.name+", "+clients;
          }
        }
        clients = clients.substring(0, clients.length-2);
      }else {
        var clt = Clients_Live.findOne({ "_id": doc.client });
        clients = clt.name;
      }
      var contract =
        {
          '_id' : doc._id,
          'client' : clients,
          'typeContract' : doc.typeContract,
          'startDate': doc.startDate,
          'endDate': doc.endDate,
          'language': doc.language,
          'amount': doc.amount,
          'currency': doc.currency,
          'clientNumber': doc.clientNumber,
          'articlesList': doc.articlesList,
          'currentNumber': doc.currentNumber,
          'status': doc.status,
          'inputter': doc.inputter,
          'authorizer': doc.authorizer,
          'dateTime': doc.dateTime,
          'buttonEdit' : button.editAu,
          'buttonValidate' : button.validateAu,
          'buttonAuthorize' : button.authorizeAu,
          'buttonDetail' : buttonDetails
        };
      contractsAuthorization.push(contract);
    });
    return contractsAuthorization;
  },
  currencies(){
    return Currencies_Live.find();
  },
  contractDetails(){
    return Session.get("ArticleDetails");
  },
  newContract() {
    return Session.get("NewContract");
  },
  oldContract() {
    return Session.get("OldContract");;
  },
  role(){
    return Session.get("USER_ROLE_XX");
  },
  equals: function(v1, v2) {
    return (v1 == v2);
  },
  notEquals: function(v1, v2) {
    return (v1 != v2);
  },
});
