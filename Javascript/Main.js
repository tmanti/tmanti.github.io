var profile;
var uid;
var data;
var email;
var username;
var database;
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

window.onload = function(){
  console.log("loaded")
}

firebase.auth().onAuthStateChanged(function(user){
  if(user){
    profile = firebase.auth().currentUser;
    uid = firebase.auth().currentUser.uid;
    email = firebase.auth().currentUser.email;
    database = firebase.firestore()
    USER = user
    DB = database
    firestore.collection("users").doc(firebase.auth().currentUser.email).onSnapshot(function(doc) {
      //console.log("check")
    });
    database.collection("users").doc(email).get().then(function(doc){
      if(!doc.exists){
        init();
      } else {
        docData = doc.data();
        username = docData["username"];
        document.getElementById("user").innerHTML = username;
      }
    });
  } else {
    window.assign.location("home.html");
  }
});

function init(name){
  if(USER&&DB){
    if(name === null){
      var progress = newUser();
      DB.collection("users").doc(email).set(progress).then(function(doc){
        loction.reload();
      }).catch(function(error){
        console.log(error.message);
      });
    }
  }
}

function checkAuth(){
  alert(username);
}

function newUser(name){
  if(name === null){
    return {
      "todo": [],
      "username": name
    } 
  }else {
      return{
        "todo": [],
        "username": name
      }
  }
}