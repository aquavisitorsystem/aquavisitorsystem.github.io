var firebaseConfig = {
    apiKey: "AIzaSyC_Wl1RgIWazRk3OhodD5QQTykOcIyZMNs",
    authDomain: "aquacheckin-e0b0b.firebaseapp.com",
    projectId: "aquacheckin-e0b0b",
    storageBucket: "aquacheckin-e0b0b.appspot.com",
    messagingSenderId: "606092531450",
    appId: "1:606092531450:web:0cb5aa1499296eae14db43",
    measurementId: "G-T2LP2MT4DG"
};

firebase.initializeApp(firebaseConfig);


      
    document.getElementById("update_db").disabled = true;
    document.getElementById('update_db').style.visibility = 'hidden';
      
    //Add Log File
    var fldlogin;
    var fldfirstname;
    var fldlastname;
    var fldcompany;
    var flddate;
    var fldemail;
    var fldmessage;
    var fldtimestamp;
    var fldcheckin;
    var fldcheckout;
    var fldremove;
    var fldkey;
    var flddailycheckin;
    var flddailycheckout;


    var varfrom_name = "";
    var varto_email = "";
    var varto_name = "";
    var cc_email = "ckonkol@gmail.com;ckonkol@aqua-aerobic.com;SArbisi@aqua-aerobic.com";
    var key_checkin = "";
    var key_checkout = "";
    var gbit = "";
    var myResponse;

    function getDateXDaysAgo(numOfDays, date = new Date()) {
        var daysAgo = new Date(date.getTime());

        daysAgo.setDate(date.getDate() - numOfDays);
        daysAgo = daysAgo.toLocaleDateString('en-US');   
        return daysAgo;
    }
  
        function createbitly(web){
            var url = web["web"]; 
            var accessToken = "fca44606568a64c736093bf2404ad2e4048b1d51";

            var params = {
                "long_url" : url           
            };

            $.ajax({
                url: "https://api-ssl.bitly.com/v4/shorten",
                cache: false,
                dataType: "json",
                method: "POST",
                contentType: "application/json",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
                },
                data: JSON.stringify(params)
            }).done(function(data) {
                document.getElementById("bitly").value =  data.link;
            }).fail(function(ex) {
                document.getElementById("bitly").value =  url;
                //  alert(ex.responseText);
                //alert("ShoppingList URL Copied");
            });
        }
      
        var push_to_firebase = function(data){
            var db = firebase.firestore();
            var key = data["fname"] + data["lname"] + data["date"];
            var SaveDoc = db.collection("messages").doc(key);  
            var login = data["login"];
            SaveDoc.set({
                login: data["login"],
                firstname: data["fname"],
                lastname: data["lname"],
                company: data["cname"],
                date: data["date"],   date2: data["date2"],   date3: data["date3"],   date4: data["date4"],   date5: data["date5"],   date6: data["date6"],   date7: data["date7"],   date8: data["date8"],   date9: data["date9"],   date10: data["date10"],   date11: data["date11"],   date12: data["date12"],   
                email: data["email"],
                message: data["msg"],
                timestamp: Date.now(),
                key: data["key"],
                checkin: '',
                checkout: '',
                remove:'No'
            })
            .then(function(doc) {  
                //alert("Schedule was created successfully!")
                console.log("doc added");
                if (login != 'walkin'){
                    window.location.href = 'https://aquavisitorsystem.github.io/?id=' + key;
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        }
      
        var update = function(data){
            var db = firebase.firestore();
            var key = data["id"];
            db.collection("messages").doc(key).update({
                login: data["login"],
                firstname: data["fname"],
                lastname: data["lname"],
                company: data["cname"],
                date: data["date"], date2: data["date2"],   date3: data["date3"],   date4: data["date4"],   date5: data["date5"],   date6: data["date6"],   date7: data["date7"],   date8: data["date8"],   date9: data["date9"],   date10: data["date10"],   date11: data["date11"],   date12: data["date12"],   
                email: data["email"],
                message: data["msg"],
                timestamp: Date.now()
            }) .then(function(doc) {
                console.log("doc updated");
                location.reload();
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        }
      
        var updatecheckin = function(data){
            var db = firebase.firestore();
            var key = data["id"];
            db.collection("messages").doc(key).update({
                login: data["login"],
                firstname: data["fname"],
                lastname: data["lname"],
                company: data["cname"],
                date: data["date"],
                email: data["email"],
                message: data["msg"],
                timestamp: Date.now()
            }) .then(function(doc) {
                console.log("doc updated");
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        }
      
        var updatereset = function(data){
            var db = firebase.firestore();
            var key = data["id"];
            db.collection("messages").doc(key).update({
                checkin: "",
                checkout:""
            }) .then(function(doc) {
                console.log("doc updated");
                window.location = "https://aquavisitorsystem.github.io/?id=" + key;
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        }
	 
        var updateallcheckindata = function(){
            var db = firebase.firestore();
            db.collection("messages").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    doc.ref.update({
                        checkin: "",
                        checkout:""
                    })
                })
            });
        }
	 
        var updateresetvisit = function(data){
            clear()
            var db = firebase.firestore();
            var key = data["id"];
            db.collection("messages").doc(key).update({
                checkin: "",
                checkout:""
            }) .then(function(doc) {
                console.log("doc updated");
                alert("\nTHANK YOU!\n____________________________________________________\n\n***REMINDER***\n- CONFIRM FUTURE DATE(s) & TIME(s) (If guest is visiting again)\n\n\nClick 'OK' to exit.");
                setTimeout(function(){window.location = "https://aquavisitorsystem.github.io/?id=" + key;},500);
                // window.location = "https://aquavisitorsystem.github.io/resetsuccess.html";
                //window.location = "https://aquavisitorsystem.github.io/resetsuccess.html";
            }).catch(function(error) {
                console.log("Error getting document:", error);
            }); 
        }
	 
        var sendcheckedin = function(){
            if (varto_name === 'walkin@aqua-aerobic.com'){
                varto_name = 'ckonkol@aqua-aerobic.com';   
            }
            var templateParams = {
                "from_name" : varfrom_name,
                "to_name" : varto_name,
                "to_email" : varto_email,
                "cc_email" : cc_email
            };
            emailjs.send('service_aqua', 'template_checkedin', templateParams)
             .then(function(response) {
                 console.log('SUCCESS!', response.status, response.text);
             }, function(error) {
                 console.log('FAILED...', error);
             });
		
        }
   
        var sendcheckedout = function(){
            if (varto_name === 'walkin@aqua-aerobic.com'){
                varto_name = 'ckonkol@aqua-aerobic.com';   
            }
            var reset = "https://aquavisitorsystem.github.io/?resetid=" + fldkey + "&Remove=Return";
            var changedate = "https://aquavisitorsystem.github.io/?id=" + fldkey;
            var templateParams = {
                "from_name" : varfrom_name,
                "to_name" : varto_name,
                "to_email" : varto_email,
                "cc_email" : cc_email,
                "reset" : reset
            };
            emailjs.send('service_aqua', 'template_checkedout', templateParams)
             .then(function(response) {
                 console.log('SUCCESS!', response.status, response.text);
             }, function(error) {
                 console.log('FAILED...', error);
             });
		
        }
      
        var updateremoveYes = function(data){
            var db = firebase.firestore();
            var key = data["id"];
            db.collection("messages").doc(key).update({
                remove: 'Yes'
            }) .then(function(doc) {
                console.log("doc updated");
                window.location = "https://aquavisitorsystem.github.io/?id=" + key;
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        }
        
        var updateremoveNO = function(data){
            var db = firebase.firestore();
            var key = data["id"];
            db.collection("messages").doc(key).update({
                remove: 'No'
            }) .then(function(doc) {
                console.log("doc updated");
                window.location = "https://aquavisitorsystem.github.io/?id=" + key;
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        }
      
        var get_firebase = function(){
            var db = firebase.firestore();
            var get_fname = document.getElementById("fname").value ;
            var get_lname = document.getElementById("lname").value ;
            var get_date = document.getElementById("date").value ;
            get_fname  = get_fname.toString();
            get_lname  = get_lname.toString();
            get_date  = get_date.toString();
            if (get_fname != null &&  get_fname != '' && get_lname != null &&  get_lname != '' && get_date  != null &&  get_date  != '') {
                console.log(get_fname);
                console.log(get_lname);
                console.log(get_date);
                db.collection("messages").where("lastname", "==",get_lname).where("firstname", "==",get_fname).where("date", "==", get_date )
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                document.getElementById("login").value = doc.data().login;
                document.getElementById("login").readOnly = true;
                document.getElementById("fname").value = doc.data().firstname;
                document.getElementById("lname").value = doc.data().lastname;
                document.getElementById("cname").value = doc.data().company;
                var dates = new Date(doc.data().date).toISOString();
                document.getElementById("date").value = dates;
                document.getElementById("date2").value = new Date(doc.data().date2).toISOString();
                document.getElementById("date3").value = new Date(doc.data().date3).toISOString();
                document.getElementById("date4").value = new Date(doc.data().date4).toISOString();
                document.getElementById("date5").value = new Date(doc.data().date5).toISOString();
                document.getElementById("date6").value = new Date(doc.data().date6).toISOString();
                document.getElementById("date7").value = new Date(doc.data().date7).toISOString();
                document.getElementById("date8").value = new Date(doc.data().date8).toISOString();
                document.getElementById("date9").value = new Date(doc.data().date9).toISOString();
                document.getElementById("date10").value = new Date(doc.data().date10).toISOString();
                document.getElementById("date11").value = new Date(doc.data().date11).toISOString();
                document.getElementById("date12").value = new Date(doc.data().date12).toISOString();
                document.getElementById("email").value = doc.data().email;
                document.getElementById("message").value = doc.data().message;
            });
            document.getElementById('update_db').style.visibility = 'visible';
            document.getElementById('submit_msg').style.visibility = 'hidden';
            document.getElementById("update_db").disabled = false;
            document.getElementById("submit_msg").disabled = true;
            document.getElementById('back').style.display = 'block';
        })
        .catch((error) => {
            document.getElementById("update_db").disabled = true;
        console.log("Error getting documents: ", error);
    });
} else {
    alert("All fields required!")
}

}
      
       var get_data = function(data){
           var db = firebase.firestore();
           var get_id = data["id"];
           console.log("get_data207:" + get_id)
           var get_iPad = data["iPad"];
           console.log("get_data209:" + get_iPad)
           var website = get_id  + '&checkin=Now';	
           console.log("get_data211:" + website)
           var cwebsite = "https://aquavisitorsystem.github.io/?key=" + website;
           console.log(get_id);
           console.log("get_data214:" + cwebsite)
           db.collection("messages").where("key", "==",get_id)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
	     
              // doc.data() is never undefined for query doc snapshots
           //   console.log(doc.id, " => ", doc.data());
           document.getElementById("id").value = doc.data().key;
           document.getElementById("login").value = doc.data().login;
        
           //document.getElementById("login").readOnly = true;
           document.getElementById("fname").value = doc.data().firstname;
           document.getElementById("lname").value = doc.data().lastname;
           document.getElementById("cname").value = doc.data().company;
           document.getElementById("date").value = doc.data().date;
           document.getElementById("date2").value = doc.data().date2;
           document.getElementById("date3").value = doc.data().date3;
           document.getElementById("date4").value = doc.data().date4;
           document.getElementById("date5").value = doc.data().date5;
           document.getElementById("date6").value = doc.data().date6;
           document.getElementById("date7").value = doc.data().date7;
           document.getElementById("date8").value = doc.data().date8;
           document.getElementById("date9").value = doc.data().date9;
           document.getElementById("date10").value = doc.data().date10;
           document.getElementById("date11").value = doc.data().date11;
           document.getElementById("date12").value = doc.data().date12;
           document.getElementById("email").value = doc.data().email;
           document.getElementById("message").value = doc.data().message;
           var reset = "https://aquavisitorsystem.github.io/?id=" + doc.data().key + "&Remove=Reset";
           document.getElementById("reset").innerHTML = "<a href='" + reset + "'>Click here to reset check-in/check-out data</a>";
           var removewebsiteYes = "https://aquavisitorsystem.github.io/?id=" + doc.data().key + "&Remove=Yes";
           var removewebsiteNo = "https://aquavisitorsystem.github.io/?id=" + doc.data().key + "&Remove=No";
           var video = "https://youtu.be/6hxZn-wAfwY";
           var options = {
               year: "numeric",
               month: "2-digit",
               day: "2-digit",
               hour: "2-digit",
               minute: "2-digit"
           };
           var dates = new Date(doc.data().date).toLocaleString("en", options);
           if (typeof doc.data().date2 !== 'undefined' && doc.data().date2 !=="") {
               dates = dates + "%0D%0A" + new Date(doc.data().date2).toLocaleDateString("en", options)
           }
           if (typeof doc.data().date3 !== 'undefined' && doc.data().date3 !=="") {
               dates = dates + "%0D%0A"+ new Date(doc.data().date3).toLocaleDateString("en", options)
           }
           if (typeof doc.data().date4 !== 'undefined' && doc.data().date4 !=="") {
               dates = dates + "%0D%0A" + new Date(doc.data().date4).toLocaleDateString("en", options)
           }
           if (typeof doc.data().date5 !== 'undefined' && doc.data().date5 !=="") {
               dates = dates + "%0D%0A" + new Date(doc.data().date5).toLocaleDateString("en", options)
           }
           if (typeof doc.data().date6 !== 'undefined' && doc.data().date6 !=="") {
               dates = dates + "%0D%0A" + new Date(doc.data().date6).toLocaleDateString("en", options)
           }
           if (typeof doc.data().date7 !== 'undefined' && doc.data().date7 !=="") {
               dates = dates + "%0D%0A" + new Date(doc.data().date7).toLocaleDateString("en", options)
           }
           if (typeof doc.data().date8 !== 'undefined' && doc.data().date8 !=="") {
               dates = dates + "%0D%0A" + new Date(doc.data().date8).toLocaleDateString("en", options)
           }
           if (typeof doc.data().date9 !== 'undefined' && doc.data().date9 !=="") {
               dates = dates + "%0D%0A" + new Date(doc.data().date9).toLocaleDateString("en", options)
           }
           if (typeof doc.data().date10 !== 'undefined' && doc.data().date10 !=="") {
               dates = dates + "%0D%0A" + new Date(doc.data().date10).toLocaleDateString("en", options)
           }
           if (typeof doc.data().date11 !== 'undefined' && doc.data().date11 !=="") {
               dates = dates + "%0D%0A" + new Date(doc.data().date11).toLocaleDateString("en", options)
           }
           if (typeof doc.data().date12 !== 'undefined' && doc.data().date12 !=="") {
               dates = dates + "%0D%0A" + new Date(doc.data().date12).toLocaleDateString("en", options)
           }
           document.getElementById("emaillink").innerHTML = "<a href='mailto:" + doc.data().email + "?subject=Upcoming Meeting at Aqua-Aerobic Systems" + "&body=" + doc.data().firstname + " " + doc.data().lastname + ",%0D%0A%0D%0AMeeting Date/Time(s): %0D%0A" + dates + "%0D%0A%0D%0AMeeting with employee: " + doc.data().message + "%0D%0A%0D%0AA unique QR code can be used to Check-in at the iPad stand in our lobby.%0D%0A%0D%0APlease use the below link to get your QR code.%0D%0A" + document.getElementById("bitly").value + "%0D%0A%0D%0AWatch below video to learn how to use our check-in/check-out system:%0D%0A" + video + "'>Click here to create email to guest...</a>";
           console.log("Remove:" + doc.data().remove);
           if (doc.data().remove === 'Yes'){
		
               document.getElementById('qrcode').style.display = 'none';
               document.getElementById('emaillink').style.display = 'none';
               document.getElementById('removeYes').style.display = 'none';
               document.getElementById("remove").innerHTML  = "Status: InActive";
               document.getElementById("removeNo").innerHTML = "<a href='" + removewebsiteNo + "'>Click here to update status to: Active</a>";
               document.getElementById("removeYes").innerHTML = "";
               document.getElementById('back').style.display = 'block';
           }
           if (doc.data().remove === 'X'){
		
               document.getElementById('qrcode').style.display = 'none';
               document.getElementById('emaillink').style.display = 'none';
               document.getElementById('removeYes').style.display = 'none';
               document.getElementById("remove").innerHTML  = "Status: Removed";
               document.getElementById("removeNo").innerHTML = "<a href='" + removewebsiteNo + "'>Click here to update status to: Active</a>";
               document.getElementById("removeYes").innerHTML = "";
               document.getElementById('back').style.display = 'block';
           }
           if (doc.data().remove === 'No'){
		
               document.getElementById('removeNo').style.display = 'none';
               document.getElementById("remove").innerHTML  = "Status: Active";
               document.getElementById("removeNo").innerHTML = "";
               document.getElementById("removeYes").innerHTML = "<a href='" + removewebsiteYes + "'>Click here to update status to: InActive</a><br>";
               document.getElementById('back').style.display = 'block';
           }
           if (get_iPad === 'Yes'){
		
               document.getElementById("date").readOnly = false;
               document.getElementById("message").readOnly = false;
               document.getElementById('qrcode').style.display = 'none';
               document.getElementById('logins').style.display = 'none';
               document.getElementById('emaillabel').style.display = 'none';
               document.getElementById('removeYes').style.display = 'none';
               document.getElementById('removeNo').style.display = 'none'
               document.getElementById('get_id').style.display = 'none';
               document.getElementById('get_id2').style.display = 'none';
               document.getElementById('get_msg').style.display = 'none';
               document.getElementById('update_db').innerText = 'Update';
               document.getElementById("emaillink").innerHTML = "";
               document.getElementById("remove").innerHTML = "<b style='color: red;'>1) If needed, update your information above 2) Tap green button below to check-in/out</b>";
               document.getElementById('remove').style.fontWeight = 'normal';
               document.getElementById('update_db').style.width = 'min-content';
               document.getElementById('checkin').style.display = 'block';
               document.getElementById('back').style.display = 'none';
               document.getElementById('update_db').style.backgroundColor = 'CORNFLOWERBLUE';
               document.getElementById('checkin').innerText = 'TAP HERE TO CHECK-IN/OUT...';
               document.getElementById('checkin').style.fontWeight = '700';		  
           }
           var website = doc.data().key + '&checkin=Now';
           // var emailwebsite2 = document.getElementById("bitly").value; //document.getElementById("bitly").value;
           // console.log("bitly: " + document.getElementById("bitly").value);
           //createbitly
           // var emailwebsite1 = "<a href=" + document.getElementById("bitly").value + ">Click Here for QR Code</a>";
           var qrcode = new QRious({
               element: document.getElementById("qrcode"),
               background: '#ffffff',
               backgroundAlpha: 1,
               foreground: '#5868bf',
               foregroundAlpha: 1,
               level: 'H',
               padding: 0,
               size: 128,
               value: website
           });
       }); 
document.getElementById('update_db').style.visibility = 'visible';
document.getElementById('submit_msg').style.visibility = 'hidden';
document.getElementById("update_db").disabled = false;
document.getElementById("submit_msg").disabled = true;
	
})
    .catch((error) => {
        console.log("Error getting documents: ", error);
});
}
       
    var log_create = function(){
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var d = new Date(Date.now() - tzoffset);
        d.setSeconds(0, 0);
        let newdates = d.toISOString().replace('Z', '').replace(/:00.000/, "");
        console.log("newdates " + newdates);
    console.log("log_create started");
    var db = firebase.firestore();
    var newdate = new Date().toISOString(); 
    var key = fldfirstname + fldlastname + newdate;
    var SaveDoc = db.collection("log").doc(key); 
    SaveDoc.set({
        key: key, 
        sourcekey: fldkey,
        login: fldlogin,
        firstname: fldfirstname,
        lastname: fldlastname,
        company: fldcompany,
        date: newdates,
        email: fldemail,
        message: fldmessage,
        timestamp: Date.now(),
        checkin: fldcheckin,
        checkout: fldcheckout,
        remove:fldremove
    })
    .then(function(doc) {  
        //alert("Schedule was created successfully!")
        console.log("log_create end");
    }).catch(function(error) {
        console.log("Error creating log:", error);
    });
    }

   

    var error_log_create = function(data){
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var d = new Date(Date.now() - tzoffset);
        d.setSeconds(0, 0);
        let newdates = d.toISOString().replace('Z', '').replace(/:00.000/, "");
        var db = firebase.firestore();
        var newdate = new Date().toISOString(); 
        var SaveDoc = db.collection("error").doc(newdate); 
        var err = data["errormsg"];
        SaveDoc.set({
            error: err, 
            date: newdates,
            timestamp: Date.now()
        })
        .then(function(doc) {  
            //alert("Schedule was created successfully!")
            console.log("log_create end");
        }).catch(function(error) {
            console.log("Error creating log:", error);
        });
    }


       
var get_checkin_data = function(data){
    var d = new Date();
    var todaysdate = false;
    var choosedate  = new Date();
    choosedate = d.toDateString();
    var NowTime = new Date(d).toLocaleString();
    var db = firebase.firestore();
    var get_id = data["id"];
    var datapass = {
        "id": get_id
    }
    db.collection("messages").where("key", "==",get_id)
.get()
.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        key_checkin = doc.data().checkin;
    key_checkout = doc.data().checkout;
    varFName = doc.data().firstname;
    varLName = doc.data().lastname;
    var dates = new Date(doc.data().date).toLocaleString();
    varwebsite = doc.data().key + '&checkin=Now';
    varDT = dates;
    varAqua = doc.data().login;
    varcp =  doc.data().company;
    //Send email data
    varfrom_name = varFName + ' ' + varLName;
    varto_email = varAqua + '@aqua-aerobic.com';
    varto_name = doc.data().message;
    //Get log variables
    fldlogin = doc.data().login;
    fldfirstname = doc.data().firstname;
    fldlastname = doc.data().lastname;
    fldcompany = doc.data().company;
    flddate = doc.data().date;
    fldemail = doc.data().email;
    fldmessage = doc.data().message;
    fldtimestamp = Date.now();
    fldcheckin = doc.data().checkin;
    fldcheckout = doc.data().checkout;
    fldremove =  doc.data().remove;
    fldkey = doc.data().key;
    if (typeof doc.data().date !== 'undefined' && doc.data().date !=="") {
        if (choosedate  === new Date(doc.data().date).toDateString()) {
            todaysdate = true;
        }
    }
    if (typeof doc.data().date2 !== 'undefined' && doc.data().date2 !=="") {
        if (choosedate  === new Date(doc.data().date2).toDateString()) {
            todaysdate = true;
        }
    }
    if (typeof doc.data().date3 !== 'undefined' && doc.data().date3 !=="") {
        if (choosedate  === new Date(doc.data().date3).toDateString()) {
            todaysdate = true;
        }
    }
    if (typeof doc.data().date4 !== 'undefined' && doc.data().date4 !=="") {
        if (choosedate  === new Date(doc.data().date4).toDateString()) {
            todaysdate = true;
        }
    }
    if (typeof doc.data().date5 !== 'undefined' && doc.data().date5 !=="") {
        if (choosedate  === new Date(doc.data().date5).toDateString()) {
            todaysdate = true;
        }
    }
    if (typeof doc.data().date6 !== 'undefined' && doc.data().date6 !=="") {
        if (choosedate  === new Date(doc.data().date6).toDateString()) {
            todaysdate = true;
        }
    }
    if (typeof doc.data().date7 !== 'undefined' && doc.data().date7 !=="") {
        if (choosedate  === new Date(doc.data().date7).toDateString()) {
            todaysdate = true;
        }
    }
    if (typeof doc.data().date8 !== 'undefined' && doc.data().date8 !=="") {
        if (choosedate  === new Date(doc.data().date8).toDateString()) {
            todaysdate = true;
        }
    }
    if (typeof doc.data().date9 !== 'undefined' && doc.data().date9 !=="") {
        if (choosedate  === new Date(doc.data().date9).toDateString()) {
            todaysdate = true;
        }
    }
    if (typeof doc.data().date10 !== 'undefined' && doc.data().date10 !=="") {
        if (choosedate  === new Date(doc.data().date10).toDateString()) {
            todaysdate = true;
        }
    }
    if (typeof doc.data().date11 !== 'undefined' && doc.data().date11 !=="") {
        if (choosedate  === new Date(doc.data().date11).toDateString()) {
            todaysdate = true;
        }
    }
    if (typeof doc.data().date12 !== 'undefined' && doc.data().date12 !=="") {
        if (choosedate  === new Date(doc.data().date12).toDateString()) {
            todaysdate = true;
        }
    }
    //console.log("data" + data);
}); 
console.log("key_checkin:" + key_checkin);
console.log("key_checkout:" + key_checkout);
console.log("keyid" + get_id);
console.log("varfrom_name" + varfrom_name);
console.log("varto_email" + varto_email);
console.log("varto_name" + varto_name);
console.log("cc_email" + cc_email);
//console.log("data" + data);
//check dates
if ((key_checkin === null || key_checkin === '') && (key_checkout === null || key_checkout === '') && (todaysdate === true)){
    document.getElementById("checkedin").value = 'No';
    console.log("checkedin ID: No");
    set_checkin(datapass);	
    document.write('<body style="font-family: sans-serif;color: black;">');
    var timeToAdd = 1000 * 60 * 60 * 24 * 7 * 4 * 6;
    var date = new Date();
    var expiryTime = parseInt(date.getTime()) + timeToAdd;
    date.setTime(expiryTime);
    var utcTime = date.toUTCString();
    document.cookie = "checkin=" + get_id + "; expires=" + utcTime + ";";
    //document.cookie = "YOUR_COOKIE=yes; expires=" + utcTime + ";";
    document.write("<center>");
    document.write('<img id="logo" src="aqua.jpg" width="750px">');
    document.write("<p style='font-size:47px;line-height: 0.9;margin: 15;'>Guest: <b>" + varFName + " " + varLName + "</b></p>");
    document.write('<canvas id="qrcodes"></canvas>');
    document.write("<p style='font-size:30px;color: black;margin: 15;'>Company: " + varcp + "</p>");
    // document.write("<p style='font-size:16px;color: black;'><br><br><br>printed: " + NowTime + "</p></center>");
    var qrcode = new QRious({
        element: document.getElementById("qrcodes"),
        background: '#ffffff',
        backgroundAlpha: 1,
        foreground: '#000000',
        foregroundAlpha: 1,
        level: 'L',
        size: 230,
        value: varwebsite
    });
    document.write("</center>");
    document.write('</body>');
    console.log("checkin successful");
   sendcheckedin();
    log_create();
}else if ((key_checkin !=null && key_checkin != '') && (key_checkout === null || key_checkout === '') && (todaysdate === true)){
    console.log("checkedin ID: Yes");
    document.getElementById("checkedin").value = 'Yes';
    set_checkout(datapass);
    document.write('<body style="font-family: sans-serif;color: blue;">');
    document.write("<center>");
    document.write('<img id="logo" src="aqua.jpg" width="550px">');
    document.write("<p style='font-size:47px;'>Thank you, " + varFName + " " + varLName + "</p>");
    document.write("<p style='font-size:25px;color: black;'>You have been successfully checked out!</p>");
    document.write("<p style='font-size:20px;color: black;'>Please dispose of your badge before leaving reception/lobby!</p>");
    document.write("<p style='font-size:20px;color: blue;'>Have a great day!</p>");
    document.write("<p style='font-size:15px;color: black;'><br><br><br>current date/time: " + NowTime + "</p>");
    document.write("</center>");
    document.write('</body>');
    console.log("checkout successful");
   sendcheckedout();
    log_create();
}else if ((key_checkin !=null && key_checkin != '') && (key_checkout !=null && key_checkout != '') && (todaysdate === true)){
    //qr code used already
    console.log("checkedin ID: Yes");
    document.getElementById("checkedin").value = 'Yes';
    console.log("already used");
    document.write('<body style="font-family: sans-serif;color: blue;">');
    document.write("<center>");
    document.write('<img id="logo" src="aqua.jpg" width="500px">');
    document.write("<p style='font-size:47px;'>Hello, " + varFName + " " + varLName + "</p>");
    document.write("<p style='font-size:25px;color: black;'>This QR code has expired or we are having technical issues!</p>");
    document.write("<p style='font-size:20px;color: black;'>Please check-out using iPad!<br>Please dispose of your badge before leaving reception/lobby!</p>");
    document.write("<p style='font-size:20px;color: blue;'>Have a great day!</p>");
    document.write("<p style='font-size:15px;color: black;'><br><br><br>current date/time: " + NowTime + "</p></center>");
    document.write("</center>");
    document.write('</body>');
    var data = {
        "errormsg": varFName + " " + varLName 
    }
    error_log_create(data);
}else{
    //qr code used already
    if (varFName != '' && varFName !=null){
        
    }else{
        varFName = "Aqua"
    }
    if (varLName != '' && varLName !=null){
       
    }else{
        varLName = "Aqua"
    }
    var data = {
        "errormsg": "No Checkin Date for: " + varFName + ' ' + varLName
    }
    error_log_create(data);
    console.log("checkedin ID: Yes");
    document.getElementById("checkedin").value = 'Yes';
    console.log("already used");
    document.write('<body style="font-family: sans-serif;color: blue;">');
    document.write("<center>");
    document.write('<img id="logo" src="aqua.jpg" width="500px">');
    document.write("<p style='font-size:47px;'>Hello, " + varFName + " " + varLName + "</p>");
    document.write("<p style='font-size:25px;color: black;'>This QR code is invalid or for another date!</p>");
    document.write("<p style='font-size:20px;color: black;'>Please dispose of your badge before leaving reception/lobby!</p>");
    document.write("<p style='font-size:20px;color: blue;'>Have a great day!</p>");
    document.write("<p style='font-size:15px;color: black;'><br><br><br>current date/time: " + NowTime + "</p></center>");
    document.write("</center>");
    document.write('</body>');
}
}).catch((error) => {
    var data = {
        "errormsg": "Error catch " + error
    }
    error_log_create(data);
console.log("Error getting documents: ", error);
document.write('<body style="font-family: sans-serif;color: blue;">');
document.write("<center>");
document.write('<img id="logo" src="aqua.jpg" width="500px">');
document.write("<p style='font-size:20px;color: blue;'>This QR code is invalid!</p>");
document.write("<p style='font-size:20px;color: black;'>Please dispose of your badge before leaving reception/lobby!</p>");
document.write("<p style='font-size:20px;color: blue;'>Have a great day!</p>");
document.write("<p style='font-size:15px;color: black;'><br><br><br>current date/time: " + NowTime + "</p>");
document.write("</center>");
document.write('</body>');
});
}
       
function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
}
       
var set_checkin = function(data){
    var db = firebase.firestore();
    var key = data["id"];
    var d = new Date();
    myTime = new Date(d).toLocaleString();
    fldcheckin = myTime;
    flddailycheckin = myTime;          
    db.collection("messages").doc(key).update({
        checkin: myTime
    }) .then(function(doc) {
        console.log("doc updated");
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}
	     
function ConvertUTCTimeToLocalTime(UTCDateString)
{
    var convertdLocalTime = new Date(UTCDateString);

    var hourOffset = convertdLocalTime.getTimezoneOffset() / 60;

    convertdLocalTime.setHours( convertdLocalTime.getHours() + hourOffset ); 

    return convertdLocalTime;
}
             
var set_checkout = function(data){
    var db = firebase.firestore();
    var key = data["id"];
    var d = new Date();
    myTime = new Date(d).toLocaleString();
    fldcheckout = myTime;
    flddailycheckout = myTime;  
    db.collection("messages").doc(key).update({
        checkout: myTime
    }) .then(function(doc) {
        console.log("doc updated");
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}
       
var loadweb = function(){
    window.location.href = window.location.pathname;
}
      
var loadfromid = function(data){
    var db = firebase.firestore();
    db.collection("messages").where("lastname", "==",data["lname"]).where("firstname", "==",data["fname"]).where("date", "==", data["date"])
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
    document.getElementById("login").value = doc.data().login;
    document.getElementById("login").readOnly = true;
    document.getElementById("fname").value = doc.data().firstname;
    document.getElementById("lname").value = doc.data().lastname;
    document.getElementById("cname").value = doc.data().company;
    document.getElementById("date").value = doc.data().date;
    document.getElementById("email").value = doc.data().email;
    document.getElementById("message").value = doc.data().message;
});
document.getElementById('update_db').style.visibility = 'visible';
document.getElementById('submit_msg').style.visibility = 'hidden';
document.getElementById('back').style.display = 'block';
})
    .catch((error) => {
        console.log("Error getting documents: ", error);
});
}
      
var loaddb =  function(data){
    var cnt = 0;
    var db = firebase.firestore();
    var get_login  = data["userid"];
   
    if (get_login  === null || get_login === '') {
        alert("Enter your Network Login ID above & try again!");
    }else{
        get_login  = get_login.toString();
        console.log(get_login);
        var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;}</style><script src='sorttable.js'></script></head>";
        var lines = "";
        let today = new Date().toISOString().slice(0, 10);
     
        db.collection("messages").where("login", "==",get_login).where("remove", "==","No").orderBy("date","desc")
   .get()
   .then((querySnapshot) => {
       cnt = querySnapshot.size;
        var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule</h1><h2>" + cnt + " Active Visitor Schedule(s) for: " + get_login + "</h2><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br><br></center>";
        document.write(title);
            if (cnt === 0){
            var nodata = "<center><br>No visitor data found<br></center>";
            document.write(nodata);
        }else{
            //document.write("<table id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th  style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th  style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
            document.write("<table id='report' style='font-size: small;'>  <thead><tr>    <th>UserID</th>    <th>First Name</th>    <th  style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th>Date/Time(s)</th><th  style='cursor: pointer; color: red;' onclick='sortTable(5)'>ClosestDate<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th><th>Email</th>       <th>Visiting</th><th>Edit</th></tr></thead>");
            document.write("<tbody>");
        }
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        var options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        };
        var options1 = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        };
        var options2 = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        };
        var datesort;
        var Datex = [];
        var dates = new Date(doc.data().date).toLocaleDateString("en", options)
        datesort = new Date(doc.data().date).toLocaleDateString('fr-CA',options1);
        Datex.push(datesort);
        console.log("loaddb:" + dates);
        if (typeof doc.data().date2 !== 'undefined' && doc.data().date2 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date2).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date2).toLocaleDateString("fr-CA", options1)
            Datex.push(datesort);
        }
        if (typeof doc.data().date3 !== 'undefined' && doc.data().date3 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date3).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date3).toLocaleDateString('fr-CA',options1);
            Datex.push(datesort);
        }
        if (typeof doc.data().date4 !== 'undefined' && doc.data().date4 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date4).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date4).toLocaleDateString('fr-CA',options1);
            Datex.push(datesort);
        }
        if (typeof doc.data().date5 !== 'undefined' && doc.data().date5 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date5).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date5).toLocaleDateString('fr-CA',options1);
            Datex.push(datesort);
        }
        if (typeof doc.data().date6 !== 'undefined' && doc.data().date6 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date6).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date6).toLocaleDateString('fr-CA',options1);
            Datex.push(datesort);
        }
        if (typeof doc.data().date7 !== 'undefined' && doc.data().date7 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date7).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date7).toLocaleDateString('fr-CA',options1);
            Datex.push(datesort);
        }
        if (typeof doc.data().date8 !== 'undefined' && doc.data().date8 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date8).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date8).toLocaleDateString('fr-CA',options1);
            Datex.push(datesort);
        }
        if (typeof doc.data().date9 !== 'undefined' && doc.data().date9 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date9).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date9).toLocaleDateString('fr-CA',options1);
            Datex.push(datesort);
        }
        if (typeof doc.data().date10 !== 'undefined' && doc.data().date10 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date10).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date10).toLocaleDateString('fr-CA',options1);
            Datex.push(datesort);
        }
        if (typeof doc.data().date11 !== 'undefined' && doc.data().date11 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date11).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date11).toLocaleDateString('fr-CA',options1);
            Datex.push(datesort);
        }
        if (typeof doc.data().date12 !== 'undefined' && doc.data().date12 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date12).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date12).toLocaleDateString('fr-CA',options1);
            Datex.push(datesort);
        }
        Datex.sort((a, b) => new Date(b) - new Date(a)).reverse()
        var todays = new Date().toLocaleDateString("fr-CA", options2);
        console.log("todays: " + todays);
        for(var i=0; i<Datex.length; i++){
            console.log("Datex[i]: " + Datex[i]);
            if(Datex[i] === todays){
                datesort = Datex[i]
                break;
            }else if (Datex[i] > todays){
                datesort = Datex[i]
                break;
            }
        }
        //datesort = Dates.reduce((a, b) => (a.MeasureDate > b.MeasureDate ? a : b));
        //console.log("DateSort: " + Dates.reduce((a, b) => (a.MeasureDate > b.MeasureDate ? a : b)));
        // document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
        document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
    });
    document.head.innerHTML = header;
})
    .catch((error) => {
        console.log("Error getting documents: ", error);
});
}
    document.write("</tbody></table>");
    setTimeout("sortByDate2(5)", 3000);
    //setTimeout("sortTable(5)", 2000);
   // setTimeout("sortTable(5)", 2000);
//sortdate
   
}
       
var loaddbeverything =  function(){
    var db = firebase.firestore();
    var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;}</style></head>";
    var lines = "";
    var RecordIDs = [];
    var cnt1;
    var datesort;
   


    let today = new Date().toISOString().slice(0, 10);
    db.collection("messages").where("remove", "==","No").orderBy("date","desc")
.get()
.then((querySnapshot) => {
    var cnt = querySnapshot.size;
    var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (all)</h1><h2>" + cnt + " Active Visitor Schedule(s) </h2><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br><br></center>";

    document.write(title);
    if (cnt === 0){
        var nodata = "<center><br>No visitor data found<br></center>";
        document.write(nodata);
    }else{
        //	  document.write("<table  id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th>Date/Time</th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
       // document.write("<table  id='report' style='font-size: small;'>  <tr>    <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th>Date/Time</th>      <th>Email</th>       <th>Visiting</th><th>Edit</th>  </tr>");
        document.write("<table id='report' style='font-size: small;'>  <thead><tr>    <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th  style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th>Date/Time(s)</th><th  style='cursor: pointer; color: red;' onclick='sortTable(5)'>ClosestDate<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th><th>Email</th>       <th>Visiting</th><th>Edit</th></tr></thead>");
        document.write("<tbody>");

    }
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    var options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    };
    var options2 = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    };

    var d = new Date();
    var dates = new Date(doc.data().date).toLocaleDateString("en", options)
    var Datex = [];
     datesort = new Date(doc.data().date).toLocaleDateString("fr-CA", options2)
     Datex.push(datesort);
    console.log("date2: " + doc.data().date2);
    //  var todays = new Date().toDateString();
    if (typeof doc.data().date2 !== 'undefined' && doc.data().date2 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date2).toLocaleDateString("en", options)
        datesort = new Date(doc.data().date2).toLocaleDateString("fr-CA", options2)
        Datex.push(datesort);
    }
    if (typeof doc.data().date3 !== 'undefined' && doc.data().date3 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date3).toLocaleDateString("en", options)
        datesort = new Date(doc.data().date3).toLocaleDateString("fr-CA", options2)
        Datex.push(datesort);
    }
    if (typeof doc.data().date4 !== 'undefined' && doc.data().date4 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date4).toLocaleDateString("en", options)
        datesort = new Date(doc.data().date4).toLocaleDateString("fr-CA", options2)
        Datex.push(datesort);
    }
    if (typeof doc.data().date5 !== 'undefined' && doc.data().date5 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date5).toLocaleDateString("en", options)
        datesort = new Date(doc.data().date5).toLocaleDateString("fr-CA", options2)
        Datex.push(datesort);
    }
    if (typeof doc.data().date6 !== 'undefined' && doc.data().date6 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date6).toLocaleDateString("en", options)
        datesort = new Date(doc.data().date6).toLocaleDateString("fr-CA", options2)
        Datex.push(datesort);
    }
    if (typeof doc.data().date7 !== 'undefined' && doc.data().date7 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date7).toLocaleDateString("en", options)
        datesort = new Date(doc.data().date7).toLocaleDateString("fr-CA", options2)
        Datex.push(datesort);

    }
    if (typeof doc.data().date8 !== 'undefined' && doc.data().date8 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date8).toLocaleDateString("en", options)
        datesort = new Date(doc.data().date8).toLocaleDateString("fr-CA", options2);
        Datex.push(datesort);
    }
    if (typeof doc.data().date9 !== 'undefined' && doc.data().date9 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date9).toLocaleDateString("en", options)
        datesort = new Date(doc.data().date9).toLocaleDateString("fr-CA", options2)
        Datex.push(datesort);
    }
    if (typeof doc.data().date10 !== 'undefined' && doc.data().date10 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date10).toLocaleDateString("en", options)
        datesort = new Date(doc.data().date10).toLocaleDateString("fr-CA", options2)
        Datex.push(datesort);
    }
    if (typeof doc.data().date11 !== 'undefined' && doc.data().date11 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date11).toLocaleDateString("en", options)
        datesort = new Date(doc.data().date11).toLocaleDateString("fr-CA", options2)
        Datex.push(datesort);
    }
    if (typeof doc.data().date12 !== 'undefined' && doc.data().date12 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date12).toLocaleDateString("en", options)
        datesort = new Date(doc.data().date12).toLocaleDateString("fr-CA", options2);
        Datex.push(datesort);
    }
    Datex.sort((a, b) => new Date(b) - new Date(a)).reverse()
    var todays = new Date().toLocaleDateString("fr-CA", options2);
    console.log("todays: " + todays);
    for(var i=0; i<Datex.length; i++){
        console.log("Datex[i]: " + Datex[i]);
        if(Datex[i] === todays){
            datesort = Datex[i]
            break;
        }else if (Datex[i] > todays){
            datesort = Datex[i]
            break;
        }
    }


   // datesort = next_dates;

    //datesort = Datex.reduce((a, b) => (a.MeasureDate > b.MeasureDate ? a : b));
    //console.log("DateSort: " + Datex.reduce((a, b) => (a.MeasureDate > b.MeasureDate ? a : b)));
    //console.log("loaddbeverything:" + dates);
    //document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
    //document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
    document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
});
//document.write("</table>");
document.head.innerHTML = header;
})
    .catch((error) => {
        console.log("Error getting documents: ", error);
});
    document.write("</tbody></table>");
    setTimeout("sortTable(5)", 2000);
    setTimeout("sortTable(5)", 2000);
   // setTimeout("sortByDate(5)", 6000);
}
       
var loaddbeverythings =  function(){
    var db = firebase.firestore();
    var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;}</style></head>";
    var lines = "";
    var RecordIDs = [];
    var cnt1;
    let today = new Date().toISOString().slice(0, 10);
    db.collection("messages").where("remove", "==","No").orderBy("date","desc")
.get()
.then((querySnapshot) => {
    var cnt = querySnapshot.size;
    var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (all)</h1><h2>" + cnt + " Active Visitor Schedule(s) </h2><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br><br></center>";

    document.write(title);
    if (cnt === 0){
        var nodata = "<center><br>No visitor data found<br></center>";
        document.write(nodata);
    }else{
        document.write("<table  id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
        //	  document.write("<table  id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th>Date/Time</th>      <th>Email</th>       <th>Visiting</th><th>Edit</th>  </tr>");

    }
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    var options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    };
    var dates = new Date(doc.data().date).toLocaleDateString("en", options)
    console.log("date2: " + doc.data().date2);
    //  var todays = new Date().toDateString();
    if (typeof doc.data().date2 !== 'undefined' && doc.data().date2 !=="") {
        dates = dates + "<hr>" + new Date(doc.data().date2).toLocaleDateString("en", options)
    }
    if (typeof doc.data().date3 !== 'undefined' && doc.data().date3 !=="") {
        dates = dates + "<hr>" + new Date(doc.data().date3).toLocaleDateString("en", options)
    }
    if (typeof doc.data().date4 !== 'undefined' && doc.data().date4 !=="") {
        dates = dates + "<hr>" + new Date(doc.data().date4).toLocaleDateString("en", options)
    }
    if (typeof doc.data().date5 !== 'undefined' && doc.data().date5 !=="") {
        dates = dates + "<hr>" + new Date(doc.data().date5).toLocaleDateString("en", options)
    }
    if (typeof doc.data().date6 !== 'undefined' && doc.data().date6 !=="") {
        dates = dates + "<hr>" + new Date(doc.data().date6).toLocaleDateString("en", options)
    }
    if (typeof doc.data().date7 !== 'undefined' && doc.data().date7 !=="") {
        dates = dates + "<hr>" + new Date(doc.data().date7).toLocaleDateString("en", options)
    }
    if (typeof doc.data().date8 !== 'undefined' && doc.data().date8 !=="") {
        dates = dates + "<hr>" + new Date(doc.data().date8).toLocaleDateString("en", options)
    }
    if (typeof doc.data().date9 !== 'undefined' && doc.data().date9 !=="") {
        dates = dates + "<hr>" + new Date(doc.data().date9).toLocaleDateString("en", options)
    }
    if (typeof doc.data().date10 !== 'undefined' && doc.data().date10 !=="") {
        dates = dates + "<hr>" + new Date(doc.data().date10).toLocaleDateString("en", options)
    }
    if (typeof doc.data().date11 !== 'undefined' && doc.data().date11 !=="") {
        dates = dates + "<hr>" + new Date(doc.data().date11).toLocaleDateString("en", options)
    }
    if (typeof doc.data().date12 !== 'undefined' && doc.data().date12 !=="") {
        dates = dates + "<hr>" + new Date(doc.data().date12).toLocaleDateString("en", options)
    }

    console.log("loaddbeverything:" + dates);
    document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
    //document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');

});
document.write("</table>");
document.head.innerHTML = header;
})
    .catch((error) => {
        console.log("Error getting documents: ", error);
});
}
       
var loadname =  function(){
    var db = firebase.firestore();
		
    var get_login=prompt("Enter Guest Last Name To Search","Enter Guest Last Name");
    if (get_login  === null || get_login === "Enter Guest Last Name") {
        alert("Please Try Again! Enter Guest Last Name.");
    }else{
        get_login  = get_login.toString();
        get_login = get_login.trim().toUpperCase();
        console.log(get_login);
        var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;}</style></head>";
        var lines = "";
        let today = new Date().toISOString().slice(0, 10);
        db.collection("messages").where("lastname", "==",get_login).where("remove", "==","No").orderBy("date","desc")
   .get()
   .then((querySnapshot) => {
       var cnt = querySnapshot.size;
        var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (name)</h1><h2>" + cnt + " Active Visitor Schedule(s) for: " + get_login + "</h2><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br><br></center>";
        document.write(title);
        if (cnt === 0){
            var nodata = "<center><br>No visitor data found<br></center>";
            document.write(nodata);
        }else{
            //document.write("<table id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
            document.write("<table id='report' style='font-size: small;'>  <tr>    <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortByDate2(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>Edit</th>  </tr>");
        }
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        var options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        };
        var options2 = {
            hour: "2-digit",
            minute: "2-digit"
        };
        var dates = new Date(doc.data().date).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date).toLocaleTimeString("en", options2)
        console.log("loadinactive:" + dates);
        if (typeof doc.data().date2 !== 'undefined' && doc.data().date2 !=="") {
            dates = dates + "<hr>" + new Date(doc.data().date2).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date2).toLocaleTimeString("en", options2)
        }
        if (typeof doc.data().date3 !== 'undefined' && doc.data().date3 !=="") {
            dates = dates + "<hr>" + new Date(doc.data().date3).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date3).toLocaleTimeString("en", options2)
        }
        if (typeof doc.data().date4 !== 'undefined' && doc.data().date4 !=="") {
            dates = dates + "<hr>" + new Date(doc.data().date4).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date4).toLocaleTimeString("en", options2)
        }
        if (typeof doc.data().date5 !== 'undefined' && doc.data().date5 !=="") {
            dates = dates + "<hr>" + new Date(doc.data().date5).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date5).toLocaleTimeString("en", options2)
        }
        if (typeof doc.data().date6 !== 'undefined' && doc.data().date6 !=="") {
            dates = dates + "<hr>" + new Date(doc.data().date6).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date6).toLocaleTimeString("en", options2)
        }
        if (typeof doc.data().date7 !== 'undefined' && doc.data().date7 !=="") {
            dates = dates + "<hr>" + new Date(doc.data().date7).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date7).toLocaleTimeString("en", options2)
        }
        if (typeof doc.data().date8 !== 'undefined' && doc.data().date8 !=="") {
            dates = dates + "<hr>" + new Date(doc.data().date8).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date8).toLocaleTimeString("en", options2)
        }
        if (typeof doc.data().date9 !== 'undefined' && doc.data().date9 !=="") {
            dates = dates + "<hr>" + new Date(doc.data().date9).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date9).toLocaleTimeString("en", options2)
        }
        if (typeof doc.data().date10 !== 'undefined' && doc.data().date10 !=="") {
            dates = dates + "<hr>" + new Date(doc.data().date10).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date10).toLocaleTimeString("en", options2)
        }
        if (typeof doc.data().date11 !== 'undefined' && doc.data().date11 !=="") {
            dates = dates + "<hr>" + new Date(doc.data().date11).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date11).toLocaleTimeString("en", options2)
        }
        if (typeof doc.data().date12 !== 'undefined' && doc.data().date12 !=="") {
            dates = dates + "<hr>" + new Date(doc.data().date12).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date12).toLocaleTimeString("en", options2)
        }
        console.log("loadname:" + dates);
        //  document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
        document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
 
    });
    document.write("</table>");
    document.head.innerHTML = header;
    setTimeout("sortByDate2(2)", 2000);
})
    .catch((error) => {
        console.log("Error getting documents: ", error);
});
}
}
	
    var loadlogname =  function(){
        var Visitors = [];
    var db = firebase.firestore();
    var get_login=prompt("Enter Guest Last Name To Search","Enter Guest Last Name");
    if (get_login  === null || get_login === "Enter Guest Last Name") {
        alert("Please Try Again! Enter Guest Last Name.");
    }else{
        get_login  = get_login.toString();
        get_login = get_login.trim().toUpperCase();
        console.log(get_login);
        var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}a{display:none;}@page{size: landscape;}}</style></head>";
        var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>";
        var lines = "";
        let today = new Date().toISOString().slice(0, 10);
        db.collection("log").where("lastname", "==",get_login).orderBy("date","desc")
   .get()
   .then((querySnapshot) => {
       var cnt = querySnapshot.size;
        var title = "<center><h1>Aqua-Aerobic Systems Visitor Check-in/out Log (logname)</h1><h2>Check-in/Check-out logs (" +  "<label id='numcount'></label>" + " visits) for: " + get_login + "</h2><br><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br><br></center>";
        document.write(title);
        document.write(printnow);
        if (cnt === 0){
            var nodata = "<center><br>No visitor data found<br></center>";
            document.write(nodata);
        }else{
            document.write("<table id='report' style='font-size: small;'>  <tr>     <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th style='cursor: pointer; color: red;' onclick='sortByDate2(7)'>CheckIn<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th><th>CheckOut</th><th>Edit</th>  </tr>");
        }
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        var options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        };
        var options2 = {
            hour: "2-digit",
            minute: "2-digit"
        };
        var dates = new Date(doc.data().date).toLocaleDateString("fr-CA", options) + ' ' + new Date(doc.data().date).toLocaleTimeString("en", options2)
        Visitors.push(doc.data().firstname + ' ' + doc.data().lastname + ' '  + doc.data().checkin);
        console.log("loadlogname:" + dates);
        if ((doc.data().checkin !== "") && (doc.data().checkout !== ""))
        {
            document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td style="color: transparent;">' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
 
        }else{
            document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
        }
        document.getElementById("numcount").innerHTML = countUnique(Visitors);
        document.getElementById("numcount").setAttribute("value", countUnique(Visitors));
        // document.getElementById("numcount").innerHTML = Math.ceil(cnt / 2);
        //document.getElementById("numcount").setAttribute("value", Math.ceil((cnt / 2)));
    });
   
    document.head.innerHTML = header;
    document.write("</table>");
    setTimeout("sortByDate2(7)", 3000);

})
    .catch((error) => {
        console.log("Error getting documents: ", error);
});
}
}

var loadloguserid =  function(){
    var db = firebase.firestore();
    var Visitors = [];
    var get_login=prompt("Enter Aqua UserID To Search","Enter Aqua UserID");
    if (get_login  === null || get_login === "Enter Aqua UserID") {
        alert("Please Try Again! Enter Guest Last Name.");
    }else{
        get_login  = get_login.toString();
        get_login = get_login.trim().toLowerCase();
        console.log(get_login);
        var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}a{display:none;}@page{size: landscape;}}</style></head>";
        var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>";
        var lines = "";
        let today = new Date().toISOString().slice(0, 10);
        db.collection("log").where("login", "==",get_login).orderBy("checkin","desc")
   .get()
   .then((querySnapshot) => {
       var cnt = querySnapshot.size;
        var title = "<center><h1>Aqua-Aerobic Systems Visitor Check-in/out Log (loguserid)</h1><h2>Check-in/Check-out logs (" + "<label id='numcount'></label>"  + " visits) for: " + get_login + "</h2><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br><br></center>";
        document.write(title);
        document.write(printnow);
        if (cnt === 0){
            var nodata = "<center><br>No visitor data found<br></center>";
            document.write(nodata);
        }else{
            document.write("<table id='report' style='font-size: small;'>  <tr>     <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th style='cursor: pointer; color: red;' onclick='sortByDate2(7)'>CheckIn<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th><th>CheckOut</th><th>Edit</th>  </tr>");
        }
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        var options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        };
        var options2 = {
             hour: "2-digit",
            minute: "2-digit"
        };
        var dates = new Date(doc.data().date).toLocaleDateString("fr-CA", options) + ' ' + new Date(doc.data().date).toLocaleTimeString("en", options2)
        Visitors.push(doc.data().firstname + ' ' + doc.data().lastname + ' '  + doc.data().checkin);
   
        console.log("Visitors:" + Visitors.length);
        console.log("loadlogname:" + dates);
        if ((doc.data().checkin !== "") && (doc.data().checkout !== ""))
        {
            document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td style="color: transparent;">' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
 
        }else{
            document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
        }
        document.getElementById("numcount").innerHTML = countUnique(Visitors);
        document.getElementById("numcount").setAttribute("value", countUnique(Visitors));
    });
    document.head.innerHTML = header;
    document.write("</table>");
    setTimeout("sortByDate2(7)", 3000);
})
    .catch((error) => {
        console.log("Error getting documents: ", error);
});
}
}

function countUnique(iterable) {
    return new Set(iterable).size;
}
var strValueCount;
function Lookup(){
        var strValue = ""
        var db = firebase.firestore();
        var RecordIDs = [];
        var start = new Date();
        start.setHours(0,0,0,0);
        var end = new Date(start.getTime());
        end.setHours(23,59,59,999);
        start = new Date(start.getTime() - (start.getTimezoneOffset() * 60000)).toISOString();
        end = new Date(end.getTime() - (end.getTimezoneOffset() * 60000)).toISOString();
         db.collection("log").where("date", ">=",start).where("date", "<=",end).orderBy("date","desc").get().then((querySnapshot) => {
         console.log("SnapshotPromise:" + querySnapshot.size); 
        cnt1 = querySnapshot.size;
        querySnapshot.forEach(doc => {
            console.log(doc.data().lastname);
        RecordIDs.push(doc.data().lastname);
        strValue = countUnique(RecordIDs);
        strValueCount = countUnique(RecordIDs);
});
});
    return strValue;
}
	  
    var loadlogtoday =  function(){
        var db = firebase.firestore();
        var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}a{display:none;}@page{size: landscape;}}</style></head>";
        var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>";
        var lines = "";
        var Dates = [];
        var Visitors = [];
        var datesort;
        let today = new Date().toISOString();
        console.log("ISO Today: " + today);
        var  todays = new Date().toLocaleDateString('en-US');  
        var start = new Date();
        start.setHours(0,0,0,0);
        var end = new Date(start.getTime());
        end.setHours(23,59,59,999);
        start = new Date(start.getTime() - (start.getTimezoneOffset() * 60000)).toISOString();
        end = new Date(end.getTime() - (end.getTimezoneOffset() * 60000)).toISOString();	
        db.collection("log").where("date", ">=",start).where("date", "<=",end).orderBy("date","desc")
    .get()
    .then((querySnapshot) => {
        var cnt = querySnapshot.size;
        var title = "<center><h1>Aqua-Aerobic Systems Visitor Check-in/out Log (logtoday)</h1><h2>Check-in/Check-out logs  for  " +  "<label id='numcount'></label>"   + "  guest(s)<br>Date: " + todays + "</h2><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br><br></center>";
        document.write(title);
        //document.write("<center><div id='numcount'></div></center>");
        document.write(printnow);
        if (cnt === 0){
            var nodata = "<center><br>No visitor data found<br></center>";
            document.write(nodata);
        }else{
            document.write("<table id='report' style='font-size: small;'>  <tr>     <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th style='cursor: pointer; color: red;' onclick='sortByDate2(7)'>CheckIn<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th><th>CheckOut</th><th>Edit</th>  </tr>");
        }
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        var options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        };
        var options2 = {
            hour: "2-digit",
            minute: "2-digit"
        };
        var dates = new Date(doc.data().date).toLocaleDateString("fr-CA", options) + ' ' + new Date(doc.data().date).toLocaleTimeString("en", options2)
        Visitors.push(doc.data().firstname + ' ' + doc.data().lastname + ' '  + doc.data().checkin);
        console.log("loadlogtoday:" + dates);
        console.log("cnt count:" + cnt);
        console.log("array count:" + Visitors.length);
        //dates = countUnique(Visitors);
        console.log("Visitors:" + countUnique(Visitors));
        if ((doc.data().checkin !== "") && (doc.data().checkout !== ""))
        {
            document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td style="color: transparent;">' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
 
        }else{
            document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
        }
     document.getElementById("numcount").innerHTML = countUnique(Visitors);
     document.getElementById("numcount").setAttribute("value", countUnique(Visitors));
});
document.head.innerHTML = header;
document.write("</table>");
setTimeout("sortByDate2(7)", 3000);
})
    .catch((error) => {
        console.log("Error getting documents: ", error);
});
}

    var loadlogdate =  function(){
        var db = firebase.firestore();
        var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}a{display:none;}@page{size: landscape;}}</style></head>";
        var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>";
        var lines = "";
        var Dates = [];
        var Visitors = [];
        var datesort;
        let today = new Date().toISOString();
        var choosedate  = new Date();
        var start = new Date();
        var end = new Date();
        var strStart = new Date();
        var strEnd = new Date();
        var name=prompt("Please choose one of the following\r\n1) Enter date to search (Example: 10/12/2022) > Click [Ok]\r\n2) Click [Ok] for today's date","Enter Date");
        if (name!="Enter Date"){
            start = new Date(name);
            choosedate   = new Date(name).toDateString();
            start.setHours(0,0,0,0);
            end = new Date(start.getTime());
            end.setHours(23,59,59,999);
            strStart =  start.toISOString();
            strEnd =  end.toISOString();
            start = start.toISOString();
            end = end.toISOString();
        }else{
            start = new Date();
            start.setHours(0,0,0,0);
            end = new Date(start.getTime());
            end.setHours(23,59,59,999);
            strStart =  start.toISOString();
            strEnd =  end.toISOString();
            start = start.toISOString();
            end = end.toISOString();
            var d = new Date();
            choosedate = d.toDateString();
            var myDate = new Date(d).toLocaleDateString('en-US');   
            name = myDate.toString();
        }	
        console.log(name);
        var  todays = new Date().toLocaleDateString('en-US'); 
        db.collection("log").where("date", ">=",start).where("date", "<=",end).orderBy("date","desc")
    .get()
    .then((querySnapshot) => {
        var cnt = querySnapshot.size;
        var title = "<center><h1>Aqua-Aerobic Systems Visitor Check-in/out Log (logdate)</h1><h2>Check-in/Check-out logs for  " +  "<label id='numcount'></label>"   + "  visits(s)<br>" + name + "</h2><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br><br></center>";
        document.write(title);
        //document.write("<center><div id='numcount'></div></center>");
        document.write(printnow);
        if (cnt === 0){
            var nodata = "<center><br>No visitor data found<br></center>";
            document.write(nodata);
        }else{
            document.write("<table id='report' style='font-size: small;'>  <tr>     <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th style='cursor: pointer; color: red;' onclick='sortByDate2(7)'>CheckIn<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th><th>CheckOut</th><th>Edit</th>  </tr>");     
        }
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        var options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        };
        var options2 = {
            hour: "2-digit",
            minute: "2-digit"
        };
        var dates = new Date(doc.data().date).toLocaleDateString("fr-CA", options) + ' ' + new Date(doc.data().date).toLocaleTimeString("en", options2)
        Visitors.push(doc.data().firstname + ' ' + doc.data().lastname + ' '  + doc.data().checkin);
        console.log("loadlogtoday:" + dates);
    
        console.log("Visitors:" + countUnique(Visitors));
        if ((doc.data().checkin !== "") && (doc.data().checkout !== ""))
        {
            document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td style="color: transparent;">' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
 
        }else{
            document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
        }      // document.getElementById("numcount").innerHTML = Math.ceil(cnt / 2);
        //document.getElementById("numcount").setAttribute("value", Math.ceil((cnt / 2)));
        document.getElementById("numcount").innerHTML = countUnique(Visitors);
        document.getElementById("numcount").setAttribute("value", countUnique(Visitors));
    });
    document.write("</table>");
    document.head.innerHTML = header;
    setTimeout("sortByDate2(7)", 3000);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    }
		
    var loadlogall =  function(){
        var Visitors = [];
    var db = firebase.firestore();
    var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}a{display:none;}@page{size: landscape;}}</style></head>";
    var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>";
    var lines = "";
    let today = new Date().toISOString().slice(0, 10);
    db.collection("log").orderBy("date","desc")
.get()
.then((querySnapshot) => {
    var cnt = querySnapshot.size;
    var title = "<center><h1>Aqua-Aerobic Systems Visitor Check-in/out Log (logall)</h1><h2>Check-in/Check-out logs for " + "<label id='numcount'></label>"   + " visits(s)</h2><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br><br></center>";
    document.write(title);
    document.write(printnow);
    if (cnt === 0){
        var nodata = "<center><br>No visitor data found<br></center>";
        document.write(nodata);
    }else{
        document.write("<table id='report' style='font-size: small;'>  <tr>     <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th style='cursor: pointer; color: red;' onclick='sortByDate2(7)'>CheckIn<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th><th>CheckOut</th><th>Edit</th>  </tr>");
    }
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    var options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };
    var options2 = {
        hour: "2-digit",
        minute: "2-digit"
    };
    var dates = new Date(doc.data().date).toLocaleDateString("fr-CA", options) + ' ' + new Date(doc.data().date).toLocaleTimeString("en", options2)
    Visitors.push(doc.data().firstname + ' ' + doc.data().lastname + ' '  + doc.data().checkin);
    console.log("loadlogall:" + dates);
    if ((doc.data().checkin !== "") && (doc.data().checkout !== ""))
    {
        document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td style="color: transparent;">' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
 
    }else{
        document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
    }
     document.getElementById("numcount").innerHTML = countUnique(Visitors);
        document.getElementById("numcount").setAttribute("value", countUnique(Visitors));
        // document.getElementById("numcount").innerHTML = Math.ceil(cnt / 2);
        //document.getElementById("numcount").setAttribute("value", Math.ceil((cnt / 2)));
    });
document.write("</table>");
document.head.innerHTML = header;
setTimeout("sortByDate2(7)", 3000);
})
    .catch((error) => {
        console.log("Error getting documents: ", error);
});
}
       
var loadinactive =  function(){
    var db = firebase.firestore();
    var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;}</style></head>";
    var lines = "";
    let today = new Date().toISOString().slice(0, 10);
    db.collection("messages").where("remove", "==","Yes").orderBy("date","desc")
 .get()
 .then((querySnapshot) => {
     var cnt = querySnapshot.size;
    var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (inactive)</h1><small>**Inactive schedules will be removed every 30 days</small><h2>" + cnt + " In-Active Visitor Schedule(s) </h2><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br><br></center>";
    document.write(title);
    if (cnt === 0){
        var nodata = "<center><br>No visitor data found<br></center>";
        document.write(nodata);
    }else{
        // document.write("<table id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
        document.write("<table id='report' style='font-size: small;'>  <tr>    <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>      <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>       <th>Email</th>       <th>Visiting</th><th>Edit</th>  </tr>");
    }
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    var options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };
    var options2 = {
        hour: "2-digit",
        minute: "2-digit"
    };
    var dates = new Date(doc.data().date).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date).toLocaleTimeString("en", options2)
    console.log("loadinactive:" + dates);
    if (typeof doc.data().date2 !== 'undefined' && doc.data().date2 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date2).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date2).toLocaleTimeString("en", options2)
    }
    if (typeof doc.data().date3 !== 'undefined' && doc.data().date3 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date3).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date3).toLocaleTimeString("en", options2)
    }
    if (typeof doc.data().date4 !== 'undefined' && doc.data().date4 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date4).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date4).toLocaleTimeString("en", options2)
    }
    if (typeof doc.data().date5 !== 'undefined' && doc.data().date5 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date5).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date5).toLocaleTimeString("en", options2)
    }
    if (typeof doc.data().date6 !== 'undefined' && doc.data().date6 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date6).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date6).toLocaleTimeString("en", options2)
    }
    if (typeof doc.data().date7 !== 'undefined' && doc.data().date7 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date7).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date7).toLocaleTimeString("en", options2)
    }
    if (typeof doc.data().date8 !== 'undefined' && doc.data().date8 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date8).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date8).toLocaleTimeString("en", options2)
    }
    if (typeof doc.data().date9 !== 'undefined' && doc.data().date9 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date9).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date9).toLocaleTimeString("en", options2)
    }
    if (typeof doc.data().date10 !== 'undefined' && doc.data().date10 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date10).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date10).toLocaleTimeString("en", options2)
    }
    if (typeof doc.data().date11 !== 'undefined' && doc.data().date11 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date11).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date11).toLocaleTimeString("en", options2)
    }
    if (typeof doc.data().date12 !== 'undefined' && doc.data().date12 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date12).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date12).toLocaleTimeString("en", options2)
    }
    //  document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
    document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');

});
document.write("</table>");
document.head.innerHTML = header;
})
    .catch((error) => {
        console.log("Error getting documents: ", error);
});
    setTimeout("sortTable(4)", 2000);
    setTimeout("sortTable(4)", 2000);
}


    var loadremoved =  function(){
        var db = firebase.firestore();
        var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;}</style></head>";
        var lines = "";
        let today = new Date().toISOString().slice(0, 10);
        db.collection("messages").where("remove", "==","X").orderBy("date","desc")
     .get()
     .then((querySnapshot) => {
         var cnt = querySnapshot.size;
        var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (removed)</h1><h2>" + cnt + " Removed Schedule(s) </h2><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br><br></center>";
        document.write(title);
        if (cnt === 0){
            var nodata = "<center><br>No visitor data found<br></center>";
            document.write(nodata);
        }else{
            // document.write("<table id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
            document.write("<table id='report' style='font-size: small;'>  <tr>    <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>      <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>       <th>Email</th>       <th>Visiting</th><th>Edit</th>  </tr>");
        }
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        var options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        };
        var options2 = {
            hour: "2-digit",
            minute: "2-digit"
        };
        var dates = new Date(doc.data().date).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date).toLocaleTimeString("en", options2)
        console.log("loadinactive:" + dates);
        if (typeof doc.data().date2 !== 'undefined' && doc.data().date2 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date2).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date2).toLocaleTimeString("en", options2)
        }
        if (typeof doc.data().date3 !== 'undefined' && doc.data().date3 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date3).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date3).toLocaleTimeString("en", options2)
        }
        if (typeof doc.data().date4 !== 'undefined' && doc.data().date4 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date4).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date4).toLocaleTimeString("en", options2)
        }
        if (typeof doc.data().date5 !== 'undefined' && doc.data().date5 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date5).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date5).toLocaleTimeString("en", options2)
        }
        if (typeof doc.data().date6 !== 'undefined' && doc.data().date6 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date6).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date6).toLocaleTimeString("en", options2)
        }
        if (typeof doc.data().date7 !== 'undefined' && doc.data().date7 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date7).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date7).toLocaleTimeString("en", options2)
        }
        if (typeof doc.data().date8 !== 'undefined' && doc.data().date8 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date8).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date8).toLocaleTimeString("en", options2)
        }
        if (typeof doc.data().date9 !== 'undefined' && doc.data().date9 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date9).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date9).toLocaleTimeString("en", options2)
        }
        if (typeof doc.data().date10 !== 'undefined' && doc.data().date10 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date10).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date10).toLocaleTimeString("en", options2)
        }
        if (typeof doc.data().date11 !== 'undefined' && doc.data().date11 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date11).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date11).toLocaleTimeString("en", options2)
        }
        if (typeof doc.data().date12 !== 'undefined' && doc.data().date12 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date12).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date12).toLocaleTimeString("en", options2)
        }
        //  document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
        document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');

    });
    document.write("</table>");
    document.head.innerHTML = header;
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    setTimeout("sortTable(4)", 2000);
    setTimeout("sortTable(4)", 2000);
    }



       
var loadtoday =  function(){
    var db = firebase.firestore();
    let todaysdate = new Date();
    var count = 0;
    var lines = "";
    var today = new Date();
    var x;
    document.write("");
    var choosedate  = new Date();
    var name=prompt("Please choose one of the following\r\n1) Enter date to search (Example: 10/12/2022) > Click [Ok]\r\n2) Click [Ok] for today's date","Enter Date");
    if (name!="Enter Date"){
        start = new Date(name);
        choosedate   = new Date(name).toDateString();
        start.setHours(0,0,0,0);
        end = new Date(start.getTime());
        end.setHours(23,59,59,999);
        strStart =  start.toISOString();
        strEnd =  end.toISOString();
        start = start.toISOString();
        end = end.toISOString();
    }else{
        start = new Date();
        start.setHours(0,0,0,0);
        end = new Date(start.getTime());
        end.setHours(23,59,59,999);
        strStart =  start.toISOString();
        strEnd =  end.toISOString();
        start = start.toISOString();
        end = end.toISOString();
        var d = new Date();
        choosedate = d.toDateString();
        var myDate = new Date(d).toLocaleDateString('en-US');   
        name = myDate.toString();
    }	
    console.log(name);
    var  todays = new Date().toLocaleDateString('en-US');  
    var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}a{display:none;}@page{size: landscape;}}</style></head>";
    var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>";
    var RecordIDs = [];
    var cnt1;
  const promise = new Promise((resolve, reject) => {
      db.collection("messages").where("date", ">=",start).where("date", "<=",end).where("remove", "==","No").orderBy("date","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
          console.log("SnapshotPromise:" + querySnapshot.size); 
    cnt1 = querySnapshot.size;
    querySnapshot.forEach(doc => {
        console.log("docid:" + doc.id, ' => ', doc.data());
    RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//START
db.collection("messages").where("date2", ">=",start).where("date2", "<=",end).where("remove", "==","No").orderBy("date2","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date3", ">=",start).where("date3", "<=",end).where("remove", "==","No").orderBy("date3","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date4", ">=",start).where("date4", "<=",end).where("remove", "==","No").orderBy("date4","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date5", ">=",start).where("date5", "<=",end).where("remove", "==","No").orderBy("date5","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date6", ">=",start).where("date6", "<=",end).where("remove", "==","No").orderBy("date6","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date7", ">=",start).where("date7", "<=",end).where("remove", "==","No").orderBy("date7","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date8", ">=",start).where("date8", "<=",end).where("remove", "==","No").orderBy("date8","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date9", ">=",start).where("date9", "<=",end).where("remove", "==","No").orderBy("date9","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date10", ">=",start).where("date10", "<=",end).where("remove", "==","No").orderBy("date10","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date11", ">=",start).where("date11", "<=",end).where("remove", "==","No").orderBy("date11","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date12", ">=",start).where("date12", "<=",end).where("remove", "==","No").orderBy("date12","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
resolve(RecordIDs);
});
//END
}); 

var docs;
promise.then(values => {
    console.log("values:" + values);
docs = values;
console.log("docs:" + docs);
const chunkSize = 10;
var chunk;
var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (date)</h1><h2>" + cnt1 + " Visitor(s) for: " + name + "</h2></center><center><a href='https://aquavisitorsystem.github.io/'>Go Home</a></center><br>";         
document.write(title);
document.write(printnow);
if (cnt1 === 0){
    var nodata = "<center><br>No visitor data found<br></center>";
    document.write(nodata);
}else{
    //        document.write("<table id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");	
    document.write("<table id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortByDate(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>Edit</th>  </tr>");	
}
for (let i = 0; i < docs.length; i += chunkSize) {
    chunk = docs.slice(i, i + chunkSize);
    db.collection("messages").where("key", "in",chunk).orderBy("date","asc").orderBy("lastname","asc")
    .get()
    .then((querySnapshot) => {
     console.log("Snapshot:" + querySnapshot.size); 
        var cnt = querySnapshot.size;
if (cnt === 0){
     var nodata = "<center><br>No visitor data found<br></center>";
      document.write(nodata);
}else{
    //document.write("<table id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");	
}
         querySnapshot.forEach((doc) => {
        var nodata = "";
    // doc.data() is never undefined for query doc snapshots
                  var options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
};
       var dates = new Date(doc.data().date).toLocaleDateString("en", options)
    //if (todaysdate === new Date(doc.data().date).toLocaleDateString){
    var todays = new Date().toDateString();
    //choosedate = choosedate.toDateString();
       console.log("todaysdate: " + todays);
     
if (choosedate === new Date(doc.data().date2).toDateString()) {
   dates = new Date(doc.data().date2).toLocaleDateString("en", options)
}
if (choosedate === new Date(doc.data().date3).toDateString()) {
   dates = new Date(doc.data().date3).toLocaleDateString("en", options)
}
if (choosedate === new Date(doc.data().date4).toDateString()) {
   dates = new Date(doc.data().date4).toLocaleDateString("en", options)
}
if (choosedate === new Date(doc.data().date5).toDateString()) {
   dates = new Date(doc.data().date5).toLocaleDateString("en", options)
}
if (choosedate === new Date(doc.data().date6).toDateString()) {
   dates = new Date(doc.data().date6).toLocaleDateString("en", options)
}
if (choosedate === new Date(doc.data().date7).toDateString()) {
   dates = new Date(doc.data().date7).toLocaleDateString("en", options)
}
if (choosedate === new Date(doc.data().date8).toDateString()) {
   dates = new Date(doc.data().date8).toLocaleDateString("en", options)
}
if (choosedate === new Date(doc.data().date9).toDateString()) {
   dates = new Date(doc.data().date9).toLocaleDateString("en", options)
}
if (choosedate === new Date(doc.data().date10).toDateString()) {
   dates = new Date(doc.data().date10).toLocaleDateString("en", options)
}
if (choosedate === new Date(doc.data().date11).toDateString()) {
   dates = new Date(doc.data().date11).toLocaleDateString("en", options)
}
if (choosedate === new Date(doc.data().date12).toDateString()) {
   dates = new Date(doc.data().date12).toLocaleDateString("en", options)
}
           console.log("choosedate: " + choosedate);
        console.log("date1: " + new Date(doc.data().date).toDateString());
        console.log("date2: " + new Date(doc.data().date2).toDateString());
        console.log("date3: " + new Date(doc.data().date3).toDateString());
        console.log("date4: " + new Date(doc.data().date4).toDateString());
        console.log("date5: " + new Date(doc.data().date5).toDateString());
        console.log("date6: " + new Date(doc.data().date6).toDateString());
        console.log("date7: " + new Date(doc.data().date7).toDateString());
        console.log("date8: " + new Date(doc.data().date8).toDateString());
        console.log("date9: " + new Date(doc.data().date9).toDateString());
        console.log("date10: " + new Date(doc.data().date10).toDateString());
        console.log("date11: " + new Date(doc.data().date11).toDateString());
        console.log("date12: " + new Date(doc.data().date12).toDateString());
    // }
    //var dates = new Date(doc.data().date).toLocaleTimeString()
    //console.log("loadtodayschedule:" + dates);
    // document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
       document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
});
    //  document.write("</table>");
    document.head.innerHTML = header;
}) 
    .catch((error) => {
         console.log("Error getting documents: ", error);
          document.write(title);
      var nodata = "<center><br>No visitor data found<br></center>";
      document.write(nodata);
      document.head.innerHTML = header;
});
}
});
     document.write("</table>");
       setTimeout("sortByDate(4)", 3000);
}
  
var loadtodayschedule =  function(){
var x = 0;
    var db = firebase.firestore();
let todaysdate = new Date();
var count = 0;
var lines = "";
var today = new Date();
var x;
document.write("");
 var start = new Date();
  start.setHours(0,0,0,0);
  var end = new Date(start.getTime());
  end.setHours(23,59,59,999);
  start = new Date(start.getTime() - (start.getTimezoneOffset() * 60000)).toISOString();
  end = new Date(end.getTime() - (end.getTimezoneOffset() * 60000)).toISOString();	 
var d = new Date();
var myDate = new Date(d).toLocaleDateString('en-US');   
name = myDate.toString();
console.log(name);
var  todays = new Date().toLocaleDateString('en-US');  
  var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}a{display:none;}@page{size: landscape;}}</style></head>";
  var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>";
  var RecordIDs = [];
  var cnt1;
const promise = new Promise((resolve, reject) => {
 db.collection("messages").where("date", ">=",start).where("date", "<=",end).where("remove", "==","No").orderBy("date","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
     console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size;
        querySnapshot.forEach(doc => {
        console.log("docid:" + doc.id, ' => ', doc.data());
        RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//START
db.collection("messages").where("date2", ">=",start).where("date2", "<=",end).where("remove", "==","No").orderBy("date2","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date3", ">=",start).where("date3", "<=",end).where("remove", "==","No").orderBy("date3","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date4", ">=",start).where("date4", "<=",end).where("remove", "==","No").orderBy("date4","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date5", ">=",start).where("date5", "<=",end).where("remove", "==","No").orderBy("date5","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date6", ">=",start).where("date6", "<=",end).where("remove", "==","No").orderBy("date6","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date7", ">=",start).where("date7", "<=",end).where("remove", "==","No").orderBy("date7","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date8", ">=",start).where("date8", "<=",end).where("remove", "==","No").orderBy("date8","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date9", ">=",start).where("date9", "<=",end).where("remove", "==","No").orderBy("date9","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
db.collection("messages").where("date10", ">=",start).where("date10", "<=",end).where("remove", "==","No").orderBy("date10","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date11", ">=",start).where("date11", "<=",end).where("remove", "==","No").orderBy("date11","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date12", ">=",start).where("date12", "<=",end).where("remove", "==","No").orderBy("date12","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
resolve(RecordIDs);
});
//END
}); 

var docs;
promise.then(values => {
    console.log("values:" + values);
docs = values;
console.log("docs:" + docs);
const chunkSize = 10;
var chunk;
var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (today)</h1><h2>" + cnt1 + " Visitor(s) for: " + name + "</h2></center><center><a href='https://aquavisitorsystem.github.io/'>Go Home</a></center><br>";         
document.write(title);
document.write(printnow);
if (cnt1 === 0){
    var nodata = "<center><br>No visitor data found<br></center>";
    document.write(nodata);
}else{
    document.write("<table id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortByDate(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");	
}
for (let i = 0; i < docs.length; i += chunkSize) {
    chunk = docs.slice(i, i + chunkSize);
    db.collection("messages").where("key", "in",chunk).orderBy("date","asc").orderBy("lastname","asc")
    .get()
    .then((querySnapshot) => {
	 console.log("Snapshot:" + querySnapshot.size); 
        var cnt = querySnapshot.size;
if (cnt === 0){
	 var nodata = "<center><br>No visitor data found<br></center>";
	  document.write(nodata);
}else{
    //document.write("<table id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");	
}
         querySnapshot.forEach((doc) => {
var nodata = "";
    // doc.data() is never undefined for query doc snapshots
   console.log(doc.id, " => ", doc.data());
                var options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
};
var dates = new Date(doc.data().date).toLocaleDateString("en", options)
var todays = new Date().toDateString();

console.log("todaysdate: " + todays);
console.log("date2: " + new Date(doc.data().date2).toDateString());
if (todays === new Date(doc.data().date2).toDateString()) {
dates = new Date(doc.data().date2).toLocaleDateString("en", options)
    //setTimeout("sortTable(3)", 2000);
}
if (todays === new Date(doc.data().date3).toDateString()) {
dates = new Date(doc.data().date3).toLocaleDateString("en", options)
    //setTimeout("sortTable(3)", 2000);
}
if (todays === new Date(doc.data().date4).toDateString()) {
dates = new Date(doc.data().date4).toLocaleDateString("en", options)
    //setTimeout("sortTable(3)", 2000);
}
if (todays === new Date(doc.data().date5).toDateString()) {
dates = new Date(doc.data().date5).toLocaleDateString("en", options)
    //setTimeout("sortTable(3)", 2000);
}
if (todays === new Date(doc.data().date6).toDateString()) {
dates = new Date(doc.data().date6).toLocaleDateString("en", options)
    //setTimeout("sortTable(3)", 2000);
}
if (todays === new Date(doc.data().date7).toDateString()) {
dates = new Date(doc.data().date7).toLocaleDateString("en", options)
    //setTimeout("sortTable(3)", 2000);
}
if (todays === new Date(doc.data().date8).toDateString()) {
dates = new Date(doc.data().date8).toLocaleDateString("en", options)
    //setTimeout("sortTable(3)", 2000);
}
if (todays === new Date(doc.data().date9).toDateString()) {
dates = new Date(doc.data().date9).toLocaleDateString("en", options)
    //setTimeout("sortTable(3)", 2000);
}
if (todays === new Date(doc.data().date10).toDateString()) {
dates = new Date(doc.data().date10).toLocaleDateString("en", options)
    //setTimeout("sortTable(3)", 2000);
}
if (todays === new Date(doc.data().date11).toDateString()) {
dates = new Date(doc.data().date11).toLocaleDateString("en", options)
    //setTimeout("sortTable(3)", 2000);
}
if (todays === new Date(doc.data().date12).toDateString()) {
dates = new Date(doc.data().date12).toLocaleDateString("en", options)
    //setTimeout("sortTable(3)", 2000);
}


    // }
    //var dates = new Date(doc.data().date).toLocaleTimeString()
    console.log("loadtodayschedule:" + dates);
     document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
});
    //  document.write("</table>");
	document.head.innerHTML = header;
}) 
    .catch((error) => {
         console.log("Error getting documents: ", error);
          document.write(title);
	  var nodata = "<center><br>No visitor data found<br></center>";
	  document.write(nodata);
      document.head.innerHTML = header;
});
}
});
     document.write("</table>");
   setTimeout("sortByDate(4)", 3000);
    // setTimeout("sortTable(4)", 2000);
    //setTimeout("sortTable(4)", 3000);
}

var loadweekschedule =  function(){
           var db = firebase.firestore();
            var Visitors = [];
	 let todaysdate = new Date();
	 var count = 0;
	 var lines = "";
	var today = new Date();
	 var x;
   document.write("");
        var date = new Date();
    // date.setHours(0,0,0,0);
    // var start = new Date();
    // start.setDate(date.getDate() - 7);
    //  start.setHours(0,0,0,0);
    //  var end = new Date(date.getTime());
    //  end.setHours(23,59,59,999);
	
    //start new 1/16/2023
	var start = new Date();
var end = new Date();
 var d = new Date();
var name=prompt("Please choose one of the following\r\n1) Enter end search date > Click [Ok]\r\n2) Click [Ok] for today's date","Enter Date");
    if (name!="Enter Date"){
	  d = new Date(name);
          var enddate = new Date(name);
	  start = new Date(name);
         start.setDate(start.getDate() - 7);
         start.setHours(0,0,0,0);
        end = new Date(enddate.getTime());
         end.setHours(23,59,59,999);
}else{
          start.setDate(date.getDate() - 7);
         start.setHours(0,0,0,0);
        end = new Date(date.getTime());
         end.setHours(23,59,59,999);
}	
    //end new 1/16/2023
         start = new Date(start.getTime() - (start.getTimezoneOffset() * 60000)).toISOString();
	  
         end = new Date(end.getTime() - (end.getTimezoneOffset() * 60000)).toISOString();	 
    // var d = new Date();
     var myDate = new Date(d).toLocaleDateString('en-US');   
         let sevendays = getDateXDaysAgo(7, d);
	  var smyDate = sevendays;
	console.log("start:" + smyDate);
     name = smyDate + ' - ' + myDate.toString();
	console.log(name);
	var  todays = new Date().toLocaleDateString('en-US');  
         var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}a{display:none;}@page{size: landscape;}}</style></head>";
	 var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>";
	console.log("Start Date: " + start);
	console.log("End Date: " + end);
	 db.collection("log").where("date", ">=",start).where("date", "<=",end).where("remove", "==","No").orderBy("date","desc").orderBy("lastname","asc")
    .get()
    .then((querySnapshot) => {
	 console.log("Snapshot:" + querySnapshot.size); 
        var cnt = querySnapshot.size;
	 var title = "<center><h1>Aqua-Aerobic Systems Visitor Check-in/out Log (logweek)</h1><h2>Check-in/Check-out logs for " + "<label id='numcount'></label>"  + " visit(s)<br>" + name + "</h2></center><center><a href='https://aquavisitorsystem.github.io/'>Go Home</a></center><br>";         
	document.write(title);
	document.write(printnow);
    //document.write("<center><h3>Find your name and Tap 'Check-In'</b></center></h3>If your name is not found below, click <a href='" +  "https://ignitemeeting.github.io/?ipad=Yes"   + "'>here</a> to continue!<br><br><center>");
        if (cnt === 0){
	 var nodata = "<center><br>No visitor data found<br></center>";
	  document.write(nodata);
}else{
document.write("<table id='report' style='font-size: small;'>  <tr>     <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th style='cursor: pointer; color: red;' onclick='sortByDate2(7)'>CheckIn<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th><th>CheckOut</th><th>Edit</th>  </tr>");
}
         querySnapshot.forEach((doc) => {
		var nodata = "";
    // doc.data() is never undefined for query doc snapshots
  var options = {
             year: "numeric",
             month: "2-digit",
             day: "2-digit",
         };
    var options2 = {
             hour: "2-digit",
             minute: "2-digit"
         };
    var dates = new Date(doc.data().date).toLocaleDateString("fr-CA", options) + ' ' + new Date(doc.data().date).toLocaleTimeString("en", options2)
     Visitors.push(doc.data().firstname + ' ' + doc.data().lastname + ' ' + doc.data().checkin);

	   console.log("loadtodayschedule:" + dates);
       console.log("Visitors Array:" + Visitors.length);
        console.log("cnt:" + cnt);
         console.log("cnt / 2:" + cnt / 2);
          console.log("loadtodayschedule:" + dates);
    if ((doc.data().checkin !== "") && (doc.data().checkout !== ""))
          {
            document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td style="color: transparent;">' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
 
          }else{
            document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
          }
   document.getElementById("numcount").innerHTML = Math.ceil((cnt / 2));
        document.getElementById("numcount").setAttribute("value", Math.ceil((cnt / 2)));
});

// let sendingText = "https://ignitemeeting.github.io/?ipad=Yes"
document.head.innerHTML = header;
document.write("</table>");
setTimeout("sortByDate2(7)", 3000);
}) 
    .catch((error) => {
        console.log("Error getting documents: ", error);
document.write(title);
var nodata = "<center><br>No visitor data found<br></center>";
document.write(nodata);
document.head.innerHTML = header;
});
}
  
var loaddbtoday =  function(){
    var db = firebase.firestore();
    let todaysdate = new Date().toISOString().slice(0, 10);
    var count = 0;
    var start = new Date();
    start.setHours(0,0,0,0);
    var end = new Date(start.getTime());
    end.setHours(23,59,59,999);
    start = new Date(start.getTime() - (start.getTimezoneOffset() * 60000)).toISOString();
    end = new Date(end.getTime() - (end.getTimezoneOffset() * 60000)).toISOString();	 
    console.log(start);
    console.log(end);		  
    var lines = "";
    var RecordIDs = [];
    var cnt1;
     const promise = new Promise((resolve, reject) => {
         //START
         db.collection("messages").where("date", ">=",start).where("date", "<=",end).where("remove", "==","No").orderBy("date","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
             console.log("SnapshotPromise:" + querySnapshot.size); 
    cnt1 = querySnapshot.size;
    querySnapshot.forEach(doc => {
        console.log("docid:" + doc.id, ' => ', doc.data());
    RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date2", ">=",start).where("date2", "<=",end).where("remove", "==","No").orderBy("date2","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date3", ">=",start).where("date3", "<=",end).where("remove", "==","No").orderBy("date3","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date4", ">=",start).where("date4", "<=",end).where("remove", "==","No").orderBy("date4","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date5", ">=",start).where("date5", "<=",end).where("remove", "==","No").orderBy("date5","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date6", ">=",start).where("date6", "<=",end).where("remove", "==","No").orderBy("date6","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date7", ">=",start).where("date7", "<=",end).where("remove", "==","No").orderBy("date7","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date8", ">=",start).where("date8", "<=",end).where("remove", "==","No").orderBy("date8","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
//START
db.collection("messages").where("date9", ">=",start).where("date9", "<=",end).where("remove", "==","No").orderBy("date9","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
db.collection("messages").where("date10", ">=",start).where("date10", "<=",end).where("remove", "==","No").orderBy("date10","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date11", ">=",start).where("date11", "<=",end).where("remove", "==","No").orderBy("date11","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("date12", ">=",start).where("date12", "<=",end).where("remove", "==","No").orderBy("date12","asc").orderBy("lastname","asc").get().then((querySnapshot) => {
    console.log("SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
resolve(RecordIDs);
});
//END
}); 
var docs;
promise.then(values => {
    console.log("values:" + values);
docs = values;
console.log("docs:" + docs);
const chunkSize = 10;
var chunk;
let todays = new Date().toLocaleDateString();
var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;}</style></head>";
var title = "<center><h2>Active Visitor Schedule(s) for: " + todays + "</h2></center>";      
document.write(title);
var links = "'https://aquameeting.github.io/?ipad=Yes'";
var buttons =  '<button onclick="window.location.href=' + links + ';" style="background-color: yellow;font-weight: bold;border-color: black;font-size: small;">tap here</button>';
document.write("<center><h3>Find your schedule below and tap 'HERE'</b></h3>If your schedule is not found below, " + buttons + "<br><br></center>"); 
 
if (cnt1 === 0){
    var nodata = "<center><br>No visitor data found<br></center>";
    document.write(nodata);
}else{
    document.write("<table id='report' style='font-size: small;'>  <tr>   <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(1)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortByDate(3)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Visiting</th><th></th>  </tr>");
}
for (let i = 0; i < docs.length; i += chunkSize) {
    chunk = docs.slice(i, i + chunkSize);
    // db.collection("messages").where("date", ">=",start).where("date", "<=",end).where("remove", "==","No").orderBy("date","asc")
    db.collection("messages").where("key", "in",chunk).orderBy("date","asc").orderBy("lastname","asc")
.get()
.then((querySnapshot) => {
console.log("Snapshot:" + querySnapshot.size); 
var cnt = querySnapshot.size;
	
    // "https://aquameeting.github.io/?ipad=Yes"   + "'>here</a> to continue!<br><br>");
if (cnt === 0){
var nodata = "<center><br>No visitor data found<br></center>";
document.write(nodata);
}else{
    // document.write("<table id='report' style='font-size: small;'>  <tr>   <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(1)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(3)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Visiting</th><th></th>  </tr>");
   
}
querySnapshot.forEach((doc) => {
var nodata = "";
    // doc.data() is never undefined for query doc snapshots
   console.log(doc.id, " => ", doc.data());
                var options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
};
var dates = new Date(doc.data().date).toLocaleDateString("en", options)
var todays = new Date().toDateString();

console.log("todaysdate: " + todays);
console.log("date2: " + new Date(doc.data().date2).toDateString());
if (todays === new Date(doc.data().date2).toDateString()) {
dates = new Date(doc.data().date2).toLocaleDateString("en", options)
//setTimeout("sortTable(3)", 2000);
}
if (todays === new Date(doc.data().date3).toDateString()) {
dates = new Date(doc.data().date3).toLocaleDateString("en", options)
//setTimeout("sortTable(3)", 2000);
}
if (todays === new Date(doc.data().date4).toDateString()) {
dates = new Date(doc.data().date4).toLocaleDateString("en", options)
//setTimeout("sortTable(3)", 2000);
}
if (todays === new Date(doc.data().date5).toDateString()) {
dates = new Date(doc.data().date5).toLocaleDateString("en", options)
//setTimeout("sortTable(3)", 2000);
}
if (todays === new Date(doc.data().date6).toDateString()) {
dates = new Date(doc.data().date6).toLocaleDateString("en", options)
//setTimeout("sortTable(3)", 2000);
}
if (todays === new Date(doc.data().date7).toDateString()) {
dates = new Date(doc.data().date7).toLocaleDateString("en", options)
//setTimeout("sortTable(3)", 2000);
}
if (todays === new Date(doc.data().date8).toDateString()) {
dates = new Date(doc.data().date8).toLocaleDateString("en", options)
//setTimeout("sortTable(3)", 2000);
}
if (todays === new Date(doc.data().date9).toDateString()) {
dates = new Date(doc.data().date9).toLocaleDateString("en", options)
//setTimeout("sortTable(3)", 2000);
}
if (todays === new Date(doc.data().date10).toDateString()) {
dates = new Date(doc.data().date10).toLocaleDateString("en", options)
//setTimeout("sortTable(3)", 2000);
}
if (todays === new Date(doc.data().date11).toDateString()) {
dates = new Date(doc.data().date11).toLocaleDateString("en", options)
//setTimeout("sortTable(3)", 2000);
}
if (todays === new Date(doc.data().date12).toDateString()) {
dates = new Date(doc.data().date12).toLocaleDateString("en", options)
   setTimeout("sortByDate(3)", 2000);
}

console.log("loaddbtoday:" + dates);
var links = "'https://aquavisitorsystem.github.io/?iPadid=" + doc.data().key + "'";
  var buttons =  '<button onclick="window.location.href=' + links + ';" style="background-color: yellow;font-weight: bold;border-color: black;font-size: medium;">HERE</button>';
	
document.write('<tr><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().message + '</td><td>' + buttons + '</td></tr>');
});
    // let sendingText = "https://aquameeting.github.io/?ipad=Yes"
      document.head.innerHTML = header;
}) 
.catch((error) => {
console.log("Error getting documents: ", error);
 document.write(title);
 document.write("<br>If schedule not found below, click <a href='" +  "https://aquameeting.github.io"   + "'>here</a> to continue<br>");
var nodata = "<br>No visitor data found<br>";
document.write(nodata);
 document.head.innerHTML = header;
});
}
});
   document.write("</table>");
   setTimeout("sortByDate(3)", 2000);       
}
       
       
       
var loaddball =  function(data){
var db = firebase.firestore();
var get_login = data["userid"];
if (get_login  === null || get_login === '') {
      alert("Enter your Network Login ID above & try again!");
}else{
get_login  = get_login.toString();
console.log(get_login);
var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;}</style></head>";
var title = "<center><h1>Aqua-Aerobic Systems Visitor System Schedule</h1><h2>In-Active Visitor Schedule(s) for: " + get_login + "</h2><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br></center>";      
     
 var lines = "";
   let today = new Date().toISOString().slice(0, 10);
db.collection("messages").where("login", "==",get_login).where("remove", "==","Yes").orderBy("date","desc")
.get()
.then((querySnapshot) => {
  var cnt = querySnapshot.size;
document.write(title);
if (cnt === 0){
var nodata = "<center><br>No visitor data found<br></center>";
document.write(nodata);
}else{
document.write("<table id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
 
}
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
   console.log(doc.id, " => ", doc.data());
 document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + doc.data().date.replace("T", " ") + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
});
      document.write("</table>");
      document.head.innerHTML = header;
})
    .catch((error) => {
        document.write("</table>");
document.write("<p>No visitor data found for today's date</p>");
console.log("Error getting documents: ", error);
});
}
}
	 
var getall = function(data){
    var data = {
        "userid": 'walkin'
    }
    console.log('Getall');
    loaddbeverything(data);
}
       
var getloginname = function(){
    var username = document.getElementById("login").value;
    console.log("LoginName: " + username.toLowerCase());
    if (username.toLowerCase()  === null || username === '') {
        alert("Please enter Network Login ID or keyword above & try again!");	  
    }else if (username.toLowerCase()  === 'all') {
        loaddbeverything();
    }else if (username.toLowerCase()  === 'alls') {
        loaddbeverythings();
    }else if (username.toLowerCase()  === 'date') {
        loadtoday();
    }else if (username.toLowerCase()  === 'inactive') {
        loadinactive();
    }else if (username.toLowerCase()  === 'active') {
        loaddbeverything();
    }else if (username.toLowerCase()  === 'today') {
        loadtodayschedule();
    }else if (username.toLowerCase()  === 'name') {
        loadname();
    }else if (username.toLowerCase()  === 'logname') {
        loadlogname();
    }else if (username.toLowerCase()  === 'logall') {
        loadlogall();
    }else if (username.toLowerCase()  === 'logtoday') {
        loadlogtoday();
    }else if (username.toLowerCase()  === 'logweek') {
        loadweekschedule();
    }else if (username.toLowerCase()  === 'loguserid') {
        loadloguserid();
    }else if (username.toLowerCase()  === 'logdate') {
        loadlogdate();
    }else if (username.toLowerCase()  === 'restore') {
        loadremoved();
    }else{
        var data = {
            "userid": username
        }
        loaddb(data);
    }
    //loadlogdate
}

//loadloguserid
       
var gocheckin = function(){
    update_submit2();
    var get_id = document.getElementById("id").value;
    var website = get_id  + '&checkin=Now';	
    var cwebsite = "https://aquavisitorsystem.github.io/?key=" + website;
    window.location = cwebsite;
}
       
var getloginname2 = function(){
    var username = document.getElementById("login").value;
    console.log("LoginName: " + username);
    if (username  === null || username === '') {
        alert("Enter your Network Login ID above & try again!");
    }else{
        var data = {
            "userid": username
        }
        loaddball(data);
    }
}


var contact_submit = function(){
    var login = document.getElementById("login");
    var fname = document.getElementById("fname");
    var lname = document.getElementById("lname");
    var cname = document.getElementById("cname");
    var date = document.getElementById("date");
    var date2 = document.getElementById("date2");
    var date3 = document.getElementById("date3");
    var date4 = document.getElementById("date4");
    var date5 = document.getElementById("date5");
    var date6 = document.getElementById("date6");
    var date7 = document.getElementById("date7");
    var date8 = document.getElementById("date8");
    var date9 = document.getElementById("date9");
    var date10 = document.getElementById("date10");
    var date11 = document.getElementById("date11");
    var date12 = document.getElementById("date12");
    var email = document.getElementById("email");
    var msg = document.getElementById("message");
    var data = {
        "login": login.value.trim().toLowerCase(),
        "fname": fname.value.trim().toUpperCase(),
        "lname": lname.value.trim().toUpperCase(),
        "cname": cname.value.trim().toUpperCase(),
        "email": email.value.trim().toUpperCase(),
        "msg": msg.value.trim().toUpperCase(),
        "date": date.value,
        "date2": date2.value,
        "date3": date3.value,
        "date4": date4.value,
        "date5": date5.value,
        "date6": date6.value,
        "date7": date7.value,
        "date8": date8.value,
        "date9": date9.value,
        "date10": date10.value,
        "date11": date11.value,
        "date12": date12.value,
        "key": fname.value.trim().toUpperCase() + lname.value.trim().toUpperCase() + date.value
    }
    let result = login.value.includes("@");
    // empty string
    if (result != true && login.value != null &&  login.value != '' && fname.value != null &&  fname.value != '' && lname.value != null &&  lname.value != '' && cname.value != null &&  cname.value != '' && email.value != null &&  email.value != ''  && msg.value != null &&  msg.value != ''   && date.value != null &&  date.value != '') {
        push_to_firebase(data);
    } else if (result === true){
        alert("Enter Aqua UserID Only. The @ symbol is not allowed.")
    }else {
        alert("All fields required!")
    }}
	      
	      
var contact_walkup = function(data){
    var login = 'walkin';
    var fname =  data["fname"];
    var lname =  data["lname"];
    var cname =  data["cname"];
    var date =  data["date"];
    var email =  data["email"];
    var msg =  data["message"];
    var data = {
        "login": login.value.trim().toLowerCase(),
        "fname": fname.value.trim().toUpperCase(),
        "lname": lname.value.trim().toUpperCase(),
        "cname": cname.value.trim().toUpperCase(),
        "email": email.value.trim().toUpperCase(),
        "msg": msg.value.trim().toUpperCase(),
        "date": date.value,
        "key": fname.value.trim().toUpperCase() + lname.value.trim().toUpperCase() + date.value
    }
    push_to_firebase(data);
}
      
     
      
var update_submit = function(){
    var id = document.getElementById("id");
    var login = document.getElementById("login");
    var fname = document.getElementById("fname");
    var lname = document.getElementById("lname");
    var cname = document.getElementById("cname");
    var date = document.getElementById("date");
    var email = document.getElementById("email");
    var msg = document.getElementById("message");
    var dates = new Date(date.value).toLocaleString();
    var date2 = document.getElementById("date2");
    var date3 = document.getElementById("date3");
    var date4 = document.getElementById("date4");
    var date5 = document.getElementById("date5");
    var date6 = document.getElementById("date6");
    var date7 = document.getElementById("date7");
    var date8 = document.getElementById("date8");
    var date9 = document.getElementById("date9");
    var date10 = document.getElementById("date10");
    var date11 = document.getElementById("date11");
    var date12 = document.getElementById("date12");
    var data = {
        "id": id.value,
        "login": login.value.trim().toLowerCase(),
        "fname": fname.value.trim().toUpperCase(),
        "lname": lname.value.trim().toUpperCase(),
        "cname": cname.value.trim().toUpperCase(),
        "email": email.value.trim().toUpperCase(),
        "msg": msg.value.trim().toUpperCase(),
        "date": date.value,
        "date2": date2.value,
        "date3": date3.value,
        "date4": date4.value,
        "date5": date5.value,
        "date6": date6.value,
        "date7": date7.value,
        "date8": date8.value,
        "date9": date9.value,
        "date10": date10.value,
        "date11": date11.value,
        "date12": date12.value
    }
    let result = login.value.includes("@");
    if (result != true) {
        update(data);
    }else {
        alert("Enter Aqua UserID Only. The @ symbol is not allowed.")
    }

}
       
var update_submit2 = function(){
    var id = document.getElementById("id");
    var login = document.getElementById("login");
    var fname = document.getElementById("fname");
    var lname = document.getElementById("lname");
    var cname = document.getElementById("cname");
    var date = document.getElementById("date");
    var email = document.getElementById("email");
    var msg = document.getElementById("message");
    var dates = new Date(date.value).toLocaleString();
    var data = {
        "id": id.value,
        "login": login.value.trim().toLowerCase(),
        "fname": fname.value.trim().toUpperCase(),
        "lname": lname.value.trim().toUpperCase(),
        "cname": cname.value.trim().toUpperCase(),
        "email": email.value.trim().toUpperCase(),
        "msg": msg.value.trim().toUpperCase(),
        "date": date.value
    }
    updatecheckin(data);

}
       
var schedule = function(){
    document.getElementById("login").addEventListener("keypress", getSchedule);
    document.getElementById('logins').style.display = 'contents';
    document.getElementById('logins').style.display = 'block';
    document.getElementById('schedule').style.display = 'none';
    document.getElementById('getall').style.display = 'none';
    document.getElementById('meetingfields').style.display = 'block';
    document.getElementById('submit_msg').style.display = 'block';
    document.getElementById('update_db').style.display = 'none';
    document.getElementById('get_id').style.display = 'none';
    document.getElementById('get_msg').style.display = 'block';
    document.getElementById('get_id2').style.display = 'none';
    document.getElementById('qrcode').style.display = 'none';      
    document.getElementById("login").style.width = "250px";
	       
}
       
var updateschedule = function(){
    document.getElementById('logins').style.display = 'contents';
    document.getElementById('logins').style.display = 'block';
    document.getElementById('schedule').style.display = 'none';
    document.getElementById('getall').style.display = 'none';
    document.getElementById('meetingfields').style.display = 'block';
    document.getElementById('submit_msg').style.display = 'none';
    document.getElementById('update_db').style.display = 'none';
    document.getElementById('get_msg').style.display = 'block';
    document.getElementById('get_id').style.display = 'none';
    document.getElementById('get_id2').style.display = 'none';
    document.getElementById('datedetails').style.display = 'none';
}
	 
var clear = function(){
    document.getElementById('logins').style.display = 'none';
    document.getElementById('logins').style.display = 'none';
    document.getElementById('schedule').style.display = 'none';
    document.getElementById('getall').style.display = 'none';
    document.getElementById('meetingfields').style.display = 'none';
    document.getElementById('submit_msg').style.display = 'none';
    document.getElementById('update_db').style.display = 'none';
    document.getElementById('get_msg').style.display = 'none';
    document.getElementById('get_id').style.display = 'none';
    document.getElementById('get_id2').style.display = 'none';
    document.getElementById('header').style.display = 'none';
    document.getElementById('logo').style.display = 'none';
    document.getElementById('reset').style.display = 'none';
    document.getElementById('help').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
}
	 
var updatescheduleshome = function(){
    document.getElementById('logins').style.display = 'contents';
    document.getElementById('logins').style.display = 'block';
    document.getElementById('schedule').style.display = 'none';
    document.getElementById('getall').style.display = 'none';
    document.getElementById('meetingfields').style.display = 'block';
    document.getElementById('submit_msg').style.display = 'none';
    document.getElementById('update_db').style.display = 'block';
    document.getElementById('get_msg').style.display = 'block';
    document.getElementById('get_id').style.display = 'none';
    document.getElementById('get_id2').style.display = 'none';
    document.getElementById("login").addEventListener("keypress", getSchedule);
}
       
var getall = function(){
           
    document.getElementById('logins').style.display = 'contents';
    document.getElementById('logins').style.display = 'block';
    document.getElementById('schedule').style.display = 'none';
    document.getElementById('getall').style.display = 'none';
    document.getElementById('meetingfields').style.display = 'none';
    document.getElementById('submit_msg').style.display = 'none';
    document.getElementById('update_db').style.display = 'none';
    document.getElementById('get_id').style.display = 'block';
    document.getElementById('get_msg').style.display = 'block';
    document.getElementById('get_id2').style.display = 'none';
    document.getElementById('loginlabel').innerText = 'Aqua Employee User ID OR Keyword';
    document.getElementsByName('login')[0].placeholder = '[KEYWORDS] today, name, date, all, inactive, loguserid, logname, logall, logtoday, logweek, logdate';
    document.getElementById('emaillabel').style.display = 'none';
    document.getElementById("login").style.width = "600px";
    document.getElementById("login").addEventListener("keypress", getSchedule2);
    document.getElementById("login").focus();
}
       
// <button id="checkin" type="button">Everything look ok? Tap Here to Check-In</button>
       
document.getElementById('schedule').style.display = 'block';
document.getElementById('getall').style.display = 'block';
document.getElementById('meetingfields').style.display = 'none';
document.getElementById('submit_msg').style.display = 'none';
document.getElementById('update_db').style.display = 'none';
document.getElementById('get_msg').style.display = 'none';
document.getElementById('logins').style.display = 'none';
document.getElementById('get_id').style.display = 'none';
document.getElementById('get_id2').style.display = 'none';
document.getElementById('checkin').style.display = 'none';
document.getElementById('back').style.display = 'none';

document.getElementById("submit_msg").addEventListener("click", contact_submit);
document.getElementById("update_db").addEventListener("click",update_submit);
document.getElementById("get_id").addEventListener("click",getloginname);
//document.getElementById("login").addEventListener("keypress", getSchedule);
document.getElementById("get_msg").addEventListener("click", loadweb);
document.getElementById("get_id2").addEventListener("click", getloginname2);
document.getElementById("schedule").addEventListener("click", schedule);
document.getElementById("getall").addEventListener("click", getall);
document.getElementById("checkin").addEventListener("click", gocheckin);

function getSchedule(e) {
    console.log(e.keyCode);
    var key = e.keyCode;
    if (key >= 48 && key <= 57 || key >= 65 && key <= 90 || key >= 97 && key <= 122 || key === 46){
        console.log("allow")
    }else{
        e.preventDefault();
        console.log("block")
    }
}

function getSchedule2(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        getloginname();      
    }
	
	
}

var dailycheckin =  function(){
    var db = firebase.firestore();
    let todaysdate = new Date();
    var count = 0;
    var lines = "";
    var today = new Date();
    var x;
    var start = new Date();
    start.setHours(0,0,0,0);
    var end = new Date(start.getTime());
    end.setHours(23,59,59,999);
    start = new Date(start.getTime() - (start.getTimezoneOffset() * 60000)).toISOString();
    end = new Date(end.getTime() - (end.getTimezoneOffset() * 60000)).toISOString();	 
    var d = new Date();
    var myDate = new Date(d).toLocaleDateString('en-US');   
    name = myDate.toString();
    var  todays = new Date().toLocaleDateString('en-US');  
    db.collection("messages").where("date", ">=",start).where("date", "<=",end).where("remove", "==","No").where("checkin", "==","").orderBy("date","asc").orderBy("lastname","asc")
.get()
.then((querySnapshot) => {
    console.log("Snapshot:" + querySnapshot.size); 
    var cnt = querySnapshot.size;
    console.log("found:" + cnt);
    if (cnt === 0){
    }else{
        querySnapshot.forEach((doc) => {
            var data3 = {
                "id": doc.data().key
            }
             set_checkin(data3);	
        fldlogin = doc.data().login;
        fldfirstname = doc.data().firstname;
        fldlastname = doc.data().lastname;
        fldcompany = doc.data().company;
        flddate = doc.data().date;
        fldemail = doc.data().email;
        fldmessage = doc.data().message;
        fldtimestamp = Date.now();
        fldcheckin = flddailycheckin;
        fldcheckout = doc.data().checkout;
        fldremove =  doc.data().remove;
        fldkey = doc.data().key;
       // log_create();
    });
}
}) 
    .catch((error) => {
        console.log("error:" + error);
});
}

var dailycheckout =  function(){
    var db = firebase.firestore();
    let todaysdate = new Date();
    var count = 0;
    var lines = "";
    var today = new Date();
    var x;
    var start = new Date();
    start.setHours(0,0,0,0);
    var end = new Date(start.getTime());
    end.setHours(23,59,59,999);
    start = new Date(start.getTime() - (start.getTimezoneOffset() * 60000)).toISOString();
    end = new Date(end.getTime() - (end.getTimezoneOffset() * 60000)).toISOString();	 
    var d = new Date();
    var myDate = new Date(d).toLocaleDateString('en-US');   
    name = myDate.toString();
    var  todays = new Date().toLocaleDateString('en-US');  
    db.collection("messages").where("date", ">=",start).where("date", "<=",end).where("remove", "==","No").where("checkout", "==","").orderBy("date","asc").orderBy("lastname","asc")
.get()
.then((querySnapshot) => {
    console.log("Snapshot:" + querySnapshot.size); 
    var cnt = querySnapshot.size;
    console.log("found:" + cnt);
    if (cnt === 0){
    }else{
        querySnapshot.forEach((doc) => {
            var data3 = {
                "id": doc.data().key
            }
             set_checkout(data3);	
        fldlogin = doc.data().login;
        fldfirstname = doc.data().firstname;
        fldlastname = doc.data().lastname;
        fldcompany = doc.data().company;
        flddate = doc.data().date;
        fldemail = doc.data().email;
        fldmessage = doc.data().message;
        fldtimestamp = Date.now();
        fldcheckin = doc.data().checkin;
        fldcheckout = flddailycheckout;
        fldremove =  doc.data().remove;
        fldkey = doc.data().key;
       // log_create();	  
    });
}
}) 
    .catch((error) => {
        console.log("error:" + error);
});
}


//iPadid
	    
var queryString = window.location.search;
console.log(queryString);
var urlParams = new URLSearchParams(queryString);
var g_load = urlParams.get('')
console.log("g_load:" + g_load);
var g_all= urlParams.get('all')
console.log(g_all);

var g_report = urlParams.get('report')
console.log(g_report);
	    
var g_fname = urlParams.get('fname')
console.log(g_fname);
	    
var g_iPadid = urlParams.get('iPadid')
console.log(g_iPadid);
	    
var g_lname = urlParams.get('lname')
console.log(g_lname);
	    
var g_cname = urlParams.get('company')
console.log(g_cname);
	    
var g_email = urlParams.get('email')
console.log(g_email);
	    
var g_message = urlParams.get('message')
console.log(g_message);
	    
var g_date = urlParams.get('date')
console.log(g_date);
	    
	    
var id_remove = urlParams.get('Remove')
console.log("Remove:" + id_remove);
      
var id_active = urlParams.get('Active')
console.log(id_active);
      
var id = urlParams.get('id')
console.log(id);

var resetid = urlParams.get('resetid')
console.log(resetid);
      
var userid = urlParams.get('userid')
console.log(userid);
      
var keyid = urlParams.get('key')
console.log(keyid);
      
var checkin = urlParams.get('checkin')
console.log(checkin);
      
var checkout = urlParams.get('checkout')
console.log(checkout);
	    
var g_today = urlParams.get('today')
console.log(g_today);
	    
//loaddbtoday
	    
	    
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
	    
if (g_today != null && g_today != '') {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('schedule').style.display = 'none';
    document.getElementById('getall').style.display = 'none';
    document.getElementById('header').style.display = 'none';
    document.getElementById('logo').style.display = 'none';
    loaddbtoday();
}	    
	
// empty string
if (g_load === null) {
    try {
        console.log("username: " + "visitor");
    }
    catch(err) {
        console.log(err.message);
    }
       
} else {
    console.log(g_load);
}  
if (g_report === 'checkins') {
    dailycheckin();
} else {
    console.log('string IS empty');
}  

if (g_report === 'checkouts') {
    dailycheckout();
} else {
    console.log('string IS empty');
}  
if (g_report === 'today') {
    loadtodayschedule();
} else {
    console.log('string IS empty');
}
if (g_report === 'updateallcheckins') {
    updateallcheckindata();
} else {
    console.log('string IS empty');
}  
// empty string
if (g_all === 'yes') {
    loaddbeverything();
} else {
    console.log('string IS empty');
}   

if (g_all === 'no') {
    loadinactive();
} else {
    console.log('string IS empty');
}   

if (g_all === 'today') {
    loadtoday();
    //setTimeout("sortTable(5)", 3000);
} else {
    console.log('string IS empty');
}  

// empty string
if ((id_active === 'No') && (userid != null && userid != '')) {
    var data = {
        "userid": userid,
    }
    loaddball(data);
} else {
    console.log('string IS empty');
}     
      
if ((id_active === 'Yes') && (userid != null && userid != '')) {
    var data = {
        "userid": userid,
    }
    loaddb(data);
} else {
    console.log('string IS empty');
}    
      
if ((id_remove === 'Yes') && (id != null && id != '')) {
    var data = {
        "id": id
    }
    updateremoveYes(data);
} else {
    console.log('string IS empty');
}      
      
if ((id_remove === 'No') && (id != null && id != '')) {
    var data = {
        "id": id
    }
    updateremoveNO(data);
} else {
    console.log('string IS empty');
}      

if ((id != null && id != '') && (id_remove === null)) {
    document.getElementById('schedule').style.display = 'none';
    document.getElementById('getall').style.display = 'none';
    document.getElementById('header').style.display = 'none';
    document.getElementById('logo').style.display = 'none';
    console.log('string is NOT empty');
    var website = id + '&checkin=Now';	
    var emailwebsite = "https://aquameeting.github.io/?key=" + website;
    var data2 = {
        "web": emailwebsite
    }
    createbitly(data2);
    sleep(1000).then(() => {
        var data = {
            "id": id,
            "iPad": 'No'
        }
        key_id="";
    updatescheduleshome();
    get_data(data);
});
} else {
    console.log('string IS empty');
}
	    
if (g_iPadid != null && g_iPadid != '') {
    document.getElementById('schedule').style.display = 'none';
    document.getElementById('getall').style.display = 'none';
    document.getElementById('header').style.display = 'none';
    document.getElementById('logo').style.display = 'none';
    document.getElementById('reset').style.display = 'none';
    console.log('string is NOT empty');
    var website = g_iPadid + '&checkin=Now';	
    var cwebsite = "https://aquameeting.github.io/?key=" + website;
    var emailwebsite = website; //"https://aquameeting.github.io/?key=" + website;
    var data2 = {
        "web": emailwebsite
    }
    // createbitly(data2);
    //sleep(1000).then(() => {
    var data = {
        "id": g_iPadid,
        "iPad": 'Yes'
    }
    key_id="";
    updateschedule();
    get_data(data);
		    
    console.log("loaded g_iPadid");
    //  });
} else {
    console.log('string IS empty');
}
      
// empty string
if ((checkin != null && checkin != '') &&  (keyid != null && keyid != '')) {
    console.log('string is NOT empty');	
    if (checkin === 'walkin'){
        document.getElementById('schedule').style.display = 'none';
        document.getElementById('getall').style.display = 'none';
        document.getElementById('header').style.display = 'none';
        document.getElementById('logo').style.display = 'none';
        var data = {
            "login": 'walkin',
            "key": g_fname.trim().toUpperCase() + g_lname.trim().toUpperCase() + g_date,
            "fname": g_fname.trim().toUpperCase(),
            "lname": g_lname.trim().toUpperCase(),
            "email": g_email.trim().toUpperCase(),
            "cname": g_cname.trim().toUpperCase(),
            "msg": g_message.trim().toUpperCase(), 
            "date": g_date
        }
        push_to_firebase(data);
        sleep(3000).then(() => {
            var data1 = {
                "checkin": checkin,
                "id": g_fname.trim().toUpperCase() + g_lname.trim().toUpperCase() + g_date
            }
  get_checkin_data(data1);
    });
}else{
    document.getElementById('schedule').style.display = 'none';
    document.getElementById('getall').style.display = 'none';
    document.getElementById('header').style.display = 'none';
    document.getElementById('logo').style.display = 'none';
    var data3 = {
        "checkin": checkin,
        "id": keyid
    }
    get_checkin_data(data3);
}
 
} else {
    console.log('string IS empty');
}

// empty string
if ((checkin === null || checkin === '') &&  (keyid != null && keyid != '')) {
    document.getElementById('schedule').style.display = 'none';
    document.getElementById('getall').style.display = 'none';
    document.getElementById('header').style.display = 'none';
    document.getElementById('logo').style.display = 'none';
    document.write('<body style="font-family: sans-serif;color: blue;">');
    document.write("<center>");
    document.write('<img id="logo" src="aqua.jpg" width="550px">');
    document.write("<p style='font-size:20px;color: blue;'>This QR code is invalid!</p>");
    document.write("<p style='font-size:20px;color: black;'>Please try again!</p>");
    document.write("<p style='font-size:20px;color: blue;'>Have a great day!</p>");
    document.write("<p style='font-size:15px;color: black;'><br><br><br>current date/time: " + NowTime + "</p>");
    document.write("</center>");
    document.write('</body>');
}

if ((id_remove === 'Reset') && (id != null && id != '')) {
    var data = {
        "id": id
    }
    let text = "Are you sure you want to reset check-in/check-out data?\n\nThis cannot be undone!\n\nClick 'OK' to reset data\nClick 'Cancel' to go back!";
    if (confirm(text) == true) {
        updatereset(data);
        alert("Success!\nCheck-in/check-out data has been reset!");
    } else {
        alert("Cancelled!\nCheck-in/check-out reset has been cancelled!");
    }
     
} else {
    console.log('string IS empty');
}     

if ((id_remove === 'Return') && (resetid != null && resetid != '')) {
    clear();
    var data = {
        "id": resetid
    }
    updateresetvisit(data);
     
} else {
    console.log('string IS empty');
}     

function sortTable(n) {
    try {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("report");
        switching = true;
        //Set the sorting direction to ascending:
        dir = "asc"; 
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            for (i = 1; i < (rows.length - 1); i++) {
                //start by saying there should be no switching:
                shouldSwitch = false;
                /*Get the two elements you want to compare,
                one from current row and one from the next:*/
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                /*check if the two rows should switch place,
                based on the direction, asc or desc:*/
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch= true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        //if so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                /*If a switch has been marked, make the switch
                and mark that a switch has been done:*/
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                //Each time a switch is done, increase this count by 1:
                switchcount ++;      
            } else {
                /*If no switching has been done AND the direction is "asc",
                set the direction to "desc" and run the while loop again.*/
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    } catch (error) {
        console.log(error);
        // Expected output: ReferenceError: nonExistentFunction is not defined
        // (Note: the exact output may be browser-dependent)
    }
}
function convertDate(d) {
    var p = d.split("/");
    return +(p[2]+p[1]+p[0]);
}

function sortByDate(n) {
    console.log(n);
    //document.getElementById("report").value = "";
    //document.querySelectorAll("#report tbody").forEach(el => el.remove());
    var tbody = document.querySelector("#report tbody");
    // get trs as array for ease of use
    var rows = [].slice.call(tbody.querySelectorAll("tr"));
 
    rows.sort(function(a,b) {
        console.log(new Date(a.cells[n].innerHTML) - new Date(b.cells[n].innerHTML));
        return new Date(a.cells[n].innerHTML) - new Date(b.cells[n].innerHTML);
       // return convertDate(a.cells[n].innerHTML) - convertDate(b.cells[n].innerHTML);
    });
  
    rows.forEach(function(v) {
        tbody.appendChild(v); // note that .appendChild() *moves* elements
        //console.log(v); 
    });

   
}

function sortdates()
{
    sortTable(4)
    sortByDate2(7)
}

function sortByDate2(n) {
    console.log(n);
    //document.getElementById("report").value = "";
    //document.querySelectorAll("#report tbody").forEach(el => el.remove());
    var tbody = document.querySelector("#report tbody");
    // get trs as array for ease of use
    var rows = [].slice.call(tbody.querySelectorAll("tr"));
 
    rows.sort(function(a,b) {
        console.log(new Date(b.cells[n].innerHTML) - new Date(a.cells[n].innerHTML));
        return new Date(b.cells[n].innerHTML) - new Date(a.cells[n].innerHTML);
        // return convertDate(a.cells[n].innerHTML) - convertDate(b.cells[n].innerHTML);
    });
  
    rows.forEach(function(v) {
        tbody.appendChild(v); // note that .appendChild() *moves* elements
        //console.log(v); 
    });

   
}

function parseDate(input) {
    var parts = input.split('-');
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
}