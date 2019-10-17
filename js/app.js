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

    $("#clickrecomended").click(function () {
      $("#content").load("listmenu.html");      
    });

    $("#carouselpro").empty();
    db.collection("promotion").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          
        var item = `
        <ons-carousel-item modifier="nodivider" id="${doc.data().id}" class="recomended_item">
            <div class="thumbnail" style="background-image: url('${doc.data().photoUrl}')">
            </div>
            <div class="recomended_item_title" id="item1_name">${doc.data().name}</div>
        </ons-carousel-item>`
        $("#carouselpro").append(item);
      });
    });

    $("#clickpro").click(function () {
      $("#content").load("restaurant.html");      
    });
  }

  if (page.id === 'homePage') {
    console.log("homePage");
    $("#clickfood").click(function () {
      $("#content").load("restaurant.html");      
    });
    
    $("#clickbav").click(function () {
      $("#content").load("restaurant.html");      
    });

    $("#clickdessert").click(function () {
      $("#content").load("restaurant.html");      
    });

    $("#clicklocal").click(function () {
      $("#content").load("restaurant.html");      
    });
  }

  if (page.id === 'restaurantPage') {
    console.log("restaurantPage");
    $("#card").empty();
    db.collection("restaurant").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          
        var item = `
        <ons-card id="${doc.data().id}">
        <ons-row>
        <img class="thumbnail" src="${doc.data().photoUrl}" > 
        <div>
        <br><br>
        &emsp;<B><h class="name">${doc.data().name}</h></B><br>
        &emsp;&nbsp;&nbsp<I><span class="name">${doc.data().type}</span></I><br>
        &emsp;&nbsp;&nbsp<ons-icon icon="fa-star" fixed-width="false"></ons-icon>
        <span class="name">${doc.data().rank}</span><br>
        </div>
        <ons-row>
        </ons-card>`

        $("#card").append(item);
      });
    });   
  
    $("#backtohome").click(function () {
      $("#content").load("home.html");      
    });

    $("#clickmenu").click(function () {
      $("#content").load("listmenu.html");      
    });
  }

  if (page.id === 'listmenuPage') {
    console.log("listmenuPage");
    $("#card").empty();
    db.collection("menulist").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          
        var item = `
        <ons-card id="${doc.data().id}">
        <ons-row>
        <img class="thumbnail" src="${doc.data().photoUrl}" > 
        <div>
        <br><br>
        &emsp;<B><h class="name">${doc.data().name}</h></B><br>
        &emsp;&nbsp;&nbsp;<span class="name">${doc.data().price}</span>&nbsp;&nbsp<B>Bhat<B>
        <br><br>
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        <ons-fab>
        <ons-icon icon="md-plus"></ons-icon>
        </ons-fab>
        <ons-row>
        </ons-card>`

        $("#card").append(item);
      });
    });   

    $("#backtorest").click(function () {
      $("#content").load("restaurant.html");      
    });

    $("#clickadd").click(function () {
      $("#content").load("order.html");      
    });
  }
  
  if (page.id === 'orderPage') {
    console.log("orderPage");
    $("#card").empty();
    db.collection("order").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          
        var item = `
        <ons-card id="${doc.data().id}">
        <ons-row>
        <img class="thumbnail" src="${doc.data().photoUrl}" > 
        <div>
        &emsp;<B><h class="name">${doc.data().name}</h></B><br>
        &emsp;&nbsp;&nbsp;<span class="name">Amount : ${doc.data().how}</span><br>
        &emsp;&nbsp;&nbsp;<span class="name">Price : ${doc.data().price}</span>&nbsp;&nbsp<B>Bhat<B>
        `

        $("#card").append(item);
      });
    });  
    
    $("#backtomenu").click(function () {
      $("#content").load("listmenu.html");      
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
    $("#signin").click(function () {
      var email = $("#email").val();
      var password = $("#password").val();
      firebase.auth().signInWithEmailAndPassword(email, password).then(function (){
        $("#content")[0].load("home.html"); 
      }
      )
      .catch(function (error) {
        ons.notification.alert('Please check your Email or Password again')
        console.log(error.message);
      });
    
    });

    $("#regis").click(function () {
      $("#content")[0].load("register.html");      
    });

    $("#logingoogle").click(function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        content.load('home.html');
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
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

    $("#signup").click(function () {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
              firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              
              if(errorCode === 'auth/weak-password'){
                ons.notification.alert('your Password is too weak')
               
              }else{
                ons.notification.alert(errorMessage)
                content.load('login.html');
              }
              console.log(error);
          });
        });
  }
});
