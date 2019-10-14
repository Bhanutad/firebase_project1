  //initial firebase
  var firebaseConfig = {
    apiKey: "AIzaSyCKq4RohgjtKq85_nuEFW0t9esnv0jOhF4",
    authDomain: "fastfood-d742f.firebaseapp.com",
    databaseURL: "https://fastfood-d742f.firebaseio.com",
    projectId: "fastfood-d742f",
    storageBucket: "fastfood-d742f.appspot.com",
    messagingSenderId: "959087323418",
    appId: "1:959087323418:web:c926ea3dd9d34a2f64a4a3"
   };
   firebase.initializeApp(firebaseConfig);

   var db = firebase.firestore();


// ดูสถานะการ login
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    //var displayName = user.displayName;
    var email = user.email;
    console.log(email + "signed in");
    // var emailVerified = user.emailVerified;
    // var photoURL = user.photoURL;
    // var isAnonymous = user.isAnonymous;
    // var uid = user.uid;
    // var providerData = user.providerData;
    // ...
  } else {
    console.log("sign out");
    // User is signed out.
    // ...
  }
});


document.addEventListener('init', function (event) {
  var page = event.target;
 


  if (page.id === 'homePage') {
    console.log("homePage");

    $("#menubtn").click(function () {
      $("#sidemenu")[0].open();      
    });

    $("#carousel").empty();
    db.collection("recommended").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          
        var item = `
        <ons-carousel-item modifier="nodivider" id="${doc.data().id}" class="recomended_item">
            <div class="thumbnail" style="background-image: url('${doc.data().photoUrl}')">
            </div>
            <div class="recomended_item_title" id="item1_name">${doc.data().name}</div>
        </ons-carousel-item>`

        $("#carousel").append(item);


      });
    });

  }

  if (page.id === 'menuPage') {
    console.log("menuPage");

    $("#login").click(function () {
      $("#content")[0].load("login.html");  
      $("#sidemenu")[0].close();   
    });

    $("#logout").click(function () {
      //firebase sign out
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        $("#content")[0].load("login.html");  
        $("#sidemenu")[0].close();   
      }).catch(function(error) {
        // An error happened.
        console.log(error.message);
      });
    });

    $("#home").click(function () {
      $("#content")[0].load("home.html");  
      $("#sidemenu")[0].close();   
    });

    $("#setting").click(function () {
      $("#content")[0].load("setting.html");  
      $("#sidemenu")[0].close();   
    });
  }

  if (page.id === 'settingPage') {
    console.log("settingPage");
    $("#save").click(function () {
      $("#content")[0].load("home.html");      
    });
  }

  if (page.id === 'loginPage') {
    console.log("loginPage");

    $("#login").click(function(){
      var username = $("#username").val();
      var password = $("#password").val();
      firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {

        console.log(error.message);
      });

    })

    $("#regis").click(function () {
      $("#content")[0].load("register.html");      
    });

    $("#backhomebtn").click(function () {
      $("#content")[0].load("home.html");      
    });
  }

  if (page.id === 'registerPage') {
    console.log("registerPage");
    $("#backtologin").click(function () {
      $("#content")[0].load("login.html");      
    });
  }
});
