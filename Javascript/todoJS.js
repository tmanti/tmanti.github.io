firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    database = firebase.firestore()
    USER = user
    DB = database
    firestore.collection("users").doc(firebase.auth().currentUser.email).onSnapshot(function(doc) {
      console.log("check")
    });
    database.collection("users").doc(email).get().then(function(doc){
      if(doc.exists){
        data = doc.data();
        DB = database.collection("users").doc(user.email);
        if(data["todo"].length > 0){
          for(i = 0; i<data["todo"].length; i++){
            document.getElementById("list").innerHTML += data["todo"][i] + "<button id=" + i + " style='float: right;' onClick='remove(" + i + ")'>X</button>" + "</br></br>"
          }
        }
      }
    });
  } else {
    window.assign.location("index.html");
  }
});

function remove(x){
  var arr = data["todo"];
  arr.splice(x, 1);
  data["todo"] = arr;
  database.collection("users").doc(email).set(data).then(function(){
    console.log("Written!")
  });
  document.getElementById("list").innerHTML = ""
  if(data["todo"].length > 0){
    for(i = 0; i<data["todo"].length; i++){
      document.getElementById("list").innerHTML += data["todo"][i] + "<button id=" + i + " style='float: right;' onClick='remove(" + i + ")'>X</button>" + "</br></br>"
    }
  }
}

function searchKeyPress(e)
{
    // look for window.event in case event isn't passed in
    e = e || window.event;
    
    var input = document.getElementById("addTo").value;
    
    if(input.length > 0){
      if (e.keyCode == 13)
      {
          document.getElementById("addToButton").click();
          return false;
      } 
    }
    return true;
}


function addToList(){
  var input = document.getElementById("addTo").value;
  if(input.length > 0){
   //input + "<br />";
    data["todo"].push(input)
    database.collection("users").doc(email).set(data).then(function(){
      console.log("Written!")
    });
    document.getElementById("addTo").value = "";
    document.getElementById("list").innerHTML = ""
    if(data["todo"].length > 0){
      for(i = 0; i<data["todo"].length; i++){
        document.getElementById("list").innerHTML += data["todo"][i] + "<button id=" + i + " style='float: right;' onClick='remove(" + i + ")'>X</button>" + "</br></br>"
      }
    }
  }
}