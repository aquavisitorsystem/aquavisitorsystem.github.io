//04/03/2025
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
    var datelabelchanged;
    var cntsend = [];
    var datelabels="";
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
    

    var fldloginID;
    var varto_username = "";
    var varfrom_name = "";
    var varto_email = "";
    var varto_name = "";
    var cc_email = "ckonkol@gmail.com;ckonkol@aqua-aerobic.com;SArbisi@aqua-aerobic.com";
    //var cc_email = "ckonkol@gmail.com;ckonkol@aqua-aerobic.com";
    var key_checkin = "";
    var key_checkout = "";
    var gbit = "";
    var myResponse;
    var arrayuserid=[];
    var arrayfullname=[];

    var removeolderrorlogs = function(){
        var TwoYrsFromNow = new Date(new Date().setFullYear(new Date().getFullYear() - 2))
        const twoyrsago = +new Date(TwoYrsFromNow);
        var db = firebase.firestore();

        if (confirm('Are you sure you want to remove records older then: ' + TwoYrsFromNow)) {
            // Save it!
            var ErrorRemove_query = db.collection('error').where('timestamp','<=',twoyrsago);
            ErrorRemove_query.get().then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                doc.ref.delete();
              });
            }) .then(function(doc) {
                console.log("doc updated");
                alert("removeolderrorlogs!\nError logs older than 2 years have been removed!");
                sleep(1000).then(() => {
                    window.location.replace("https://aquavisitorsystem.github.io");
                      });
            }).catch(function(error) {
                console.log("Error getting document:", error);
                alert("Error removeolderrorlogs\n" + error);
                sleep(1000).then(() => {
                    window.location.replace("https://aquavisitorsystem.github.io");
                      });
            });
          } else {
            // Do nothing!
            alert("removeolderrorlogs\n" + "Cancelled");
            sleep(1000).then(() => {
                window.location.replace("https://aquavisitorsystem.github.io");
                  });
          }
    }

    var removeoldmessages = function(){
        var TwoYrsFromNow = new Date(new Date().setFullYear(new Date().getFullYear() - 2))
        const twoyrsago = +new Date(TwoYrsFromNow);
        var db = firebase.firestore();

        if (confirm('Are you sure you want to remove records older then: ' + TwoYrsFromNow)) {
            // Save it!
            var ErrorRemove_query = db.collection('messages').where('timestamp','<=',twoyrsago);
            ErrorRemove_query.get().then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                doc.ref.delete();
              });
            }) .then(function(doc) {
                console.log("docs removed from: " + twoyrsago);
                alert("removeoldmessages!\nmessages older than 2 years have been removed!");
                sleep(1000).then(() => {
                    window.location.replace("https://aquavisitorsystem.github.io");
                      });
            }).catch(function(error) {
                console.log("Error getting document:", error);
                alert("Error removeoldmessages\n" + error);
                sleep(1000).then(() => {
                    window.location.replace("https://aquavisitorsystem.github.io");
                      });
            });
          } else {
            // Do nothing!
            alert("removeoldmessages\n" + "Cancelled");
            sleep(1000).then(() => {
                window.location.replace("https://aquavisitorsystem.github.io");
                  });
          }
    }

    var removeoldlogs = function(){
        var TwoYrsFromNow = new Date(new Date().setFullYear(new Date().getFullYear() - 2))
        const twoyrsago = +new Date(TwoYrsFromNow);
        var db = firebase.firestore();

        if (confirm('Are you sure you want to remove records older then: ' + TwoYrsFromNow)) {
            // Save it!
            var ErrorRemove_query = db.collection('log').where('timestamp','<=',twoyrsago);
            ErrorRemove_query.get().then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                doc.ref.delete();
              });
            }) .then(function(doc) {
                console.log("docs removed from: " + twoyrsago);
                alert("removeoldlogs!\logs older than 2 years have been removed!");
                sleep(1000).then(() => {
                    window.location.replace("https://aquavisitorsystem.github.io");
                      });
            }).catch(function(error) {
                console.log("Error getting document:", error);
                alert("Error removeoldlogs\n" + error);
                sleep(1000).then(() => {
                    window.location.replace("https://aquavisitorsystem.github.io");
                      });
            });
          } else {
            // Do nothing!
            alert("removeoldlogs\n" + "Cancelled");
            sleep(1000).then(() => {
                window.location.replace("https://aquavisitorsystem.github.io");
                  });
          }
    }

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
            var key =  data["key"];
            var SaveDoc = db.collection("messages").doc(key);  
            var login = data["login"];
	  if (login != 'walkin'){
                     SaveDoc.set({
                login: data["login"],
                firstname: data["fname"],
                lastname: data["lname"],
                company: data["cname"],
                date: data["date"],   date2: data["date2"],   date3: data["date3"],   date4: data["date4"],   date5: data["date5"],   date6: data["date6"],   date7: data["date7"],   date8: data["date8"],   date9: data["date9"],   date10: data["date10"],   date11: data["date11"],   date12: data["date12"],   
                date13: data["date13"],date14: data["date14"],rectime: data["rectime"],mon: data["mon"],tue: data["tue"],wed: data["wed"],thu: data["thu"],fri: data["fri"],
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
                window.location.href = 'https://aquavisitorsystem.github.io/?id=' + key;
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
                }
	   if (login === 'walkin'){
                     SaveDoc.set({
                login: data["login"],
                firstname: data["fname"],
                lastname: data["lname"],
                company: data["cname"],
                date: data["date"],
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
                date13: data["date13"],date14: data["date14"],rectime: data["rectime"],mon: data["mon"],tue: data["tue"],wed: data["wed"],thu: data["thu"],fri: data["fri"],
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

        var resetvisittoday = function(data){
            var db = firebase.firestore();
            var key = data["id"];
            db.collection("messages").doc(key).update({
                checkin: "",
                checkout:""
            }) .then(function(doc) {
                console.log("doc updated");
            }).catch(function(error) {
                console.log("Error getting document:", error);
            }); 
        }
       
        function searchStringInArray (str, strArray) {
            for (var j=0; j<strArray.length; j++) {
                if (strArray[j].match(str)) return false;
            }
            return true;
        }
        var senddaily = function(){
            console.log("varto_name:  " + varto_name);
            console.log("cntsend:  " + cntsend);
            console.log("cntsend results:  " + searchStringInArray(varto_name,cntsend));
            if (searchStringInArray(varto_name,cntsend)){
                
                var link = "https://aquavisitorsystem.github.io/?userid=" + varto_username + "&report=active";
                var templateParams = {
                    "to_name" : varto_name,
                    "to_email" : varto_email,
                    "to_link" : link
                };
                console.log("to_name: " + varto_name);
                console.log("to_email: " + varto_email);
                console.log("to_link: " + "https://aquavisitorsystem.github.io/?userid=" + varto_username + "&report=activecc_email");
                emailjs.send('service_aqua', 'template_daily', templateParams)
                 .then(function(response) {
                     console.log('SUCCESS!', response.status, response.text);
                 }, function(error) {
                     console.log('FAILED...', error);
                 });
               
            }else{
                console.log('dup senddaily');
            }
        }

        var sendcheckedin = function(data){
            var key = data["gkey"];
            var from_name = data["gfrom_name"]; 
            var to_email = data["gto_email"];
            var to_name = data["gto_name"];
            if (to_email  === 'walkin@aqua-aerobic.com'){
                to_email  = 'ckonkol@aqua-aerobic.com';   
            }
            var templateParams = {
		         "from_name" : from_name,
                "to_name" : to_name,
                "to_email" :  to_email,
                "cc_email" : cc_email
            };
            emailjs.send('service_aqua', 'template_checkedin', templateParams)
             .then(function(response) {
                 console.log('SUCCESS!', response.status, response.text);
             }, function(error) {
                 console.log('FAILED...', error);
             });
        }
   
        var sendcheckedout = function(data){
            // var key = data["gkey"];
            var from_name = data["gfrom_name"]; 
            var to_email = data["gto_email"];
            var to_name = data["gto_name"];
            if (to_email === 'walkin@aqua-aerobic.com'){
                to_email = 'ckonkol@aqua-aerobic.com';   
            }
            var reset = "https://aquavisitorsystem.github.io/?resetid=" + key + "&Remove=Return";
            var templateParams = {
                "from_name" : from_name,
                "to_name" : to_name,
                "to_email" :  to_email,
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
           document.getElementById("date13").value = doc.data().date13;
           document.getElementById("date14").value = doc.data().date14;
           document.getElementById("rectime").value = doc.data().rectime;
           document.getElementById("mon").checked = doc.data().mon;
           document.getElementById("tue").checked = doc.data().tue;
           document.getElementById("wed").checked = doc.data().wed;
           document.getElementById("thu").checked = doc.data().thu;
           document.getElementById("fri").checked = doc.data().fri;
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
           var options2 = {
               year: "numeric",
               month: "2-digit",
               day: "2-digit"
           };
           var datea = new Date(doc.data().date13);
           var dateb = new Date(doc.data().date14);

           var date13 = addOneDay(datea).toLocaleDateString("en", options2);
           var date14 = addOneDay(dateb).toLocaleDateString("en", options2);
           var h;
           var dates = new Date(doc.data().date).toLocaleString("en", options);
           var days = "";
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
           if (typeof doc.data().date13 !== 'undefined' && doc.data().date13 !=="") {

               h  =  tConvert (doc.data().rectime);
               if (doc.data().mon === true) {
                   days = "Monday";
                   document.getElementById("mon").checked = true;
               }
               if (doc.data().tue === true) {
                   if (days === ""){
                       days = "Tuesday";
                   }else{
                    days = days + "," + "Tuesday";
                   }         
                   document.getElementById("tue").checked = true;
               }
               if (doc.data().wed  === true) {
                   if (days === ""){
                       days = "Wednesday";
                   }else{
                       days = days + "," + "Wednesday";
                   }      
                   document.getElementById("wed").checked = true;
               }
               if (doc.data().thu  === true) {
                   if (days === ""){
                       days = "Thursday";
                   }else{
                       days = days + "," + "Thursday";
                   }   
                   document.getElementById("thu").checked = true;
               }
               if (doc.data().fri  === true) {
                   if (days === ""){
                       days = "Friday";
                   }else{
                       days = days + "," + "Friday";
                   }  
                   document.getElementById("fri").checked = true;
               }

               dates = "Recurring Meeting Date Range: " + date13  + " - " + date14 + "%0D%0A" + "Meeting day(s): " + days + "%0D%0A" + "Meeting time: " + h 
           }
           var SetOutlook = "<br><small style='font-size: xx-small;font-style: normal;'> **If clicking the above link doesn't open Outlook, <a href='https://support.microsoft.com/en-us/office/make-outlook-the-default-program-for-email-contacts-and-calendar-ff7990c4-54c4-4390-8fe3-c0285226f021' target='_blank'><span style='color:#0563C1'>click here </span></a> to learn how to set Outlook as default app for email & then try link again.</small>"; 

           document.getElementById("emaillink").innerHTML = "<a href='mailto:" + doc.data().email + "?subject=Upcoming Meeting at Aqua-Aerobic Systems" + "&body=" + doc.data().firstname + " " + doc.data().lastname + ",%0D%0A%0D%0AMeeting Date/Time(s): %0D%0A" + dates + "%0D%0A%0D%0AMeeting with employee: " + doc.data().message + "%0D%0A%0D%0AA unique QR code can be used to Check-in at the iPad stand in our lobby.%0D%0A%0D%0APlease use the below link to get your QR code.%0D%0A" + document.getElementById("bitly").value + "%0D%0A%0D%0AWatch below video to learn how to use our check-in/check-out system:%0D%0A" + video + "'>**Click here to create email to guest...</a>" + SetOutlook;
           console.log("Remove:" + doc.data().remove);
           if (doc.data().remove === 'Yes'){
		
               document.getElementById('qrcode').style.display = 'none';
               document.getElementById('emaillink').style.display = 'none';
               document.getElementById('removeYes').style.display = 'none';
               document.getElementById("remove").innerHTML  = "Status: InActive";
               document.getElementById("removeNo").innerHTML = "<a href='" + removewebsiteNo + "'>Click here to update status to: Active</a>";
               document.getElementById("removeYes").innerHTML = "";
               document.getElementById('back').style.display = 'block';
               document.getElementById("login").style.width = "275px";
               document.getElementById("login").style.textAlign = "right"; 
           }
           if (doc.data().remove === 'X'){
		
               document.getElementById('qrcode').style.display = 'none';
               document.getElementById('emaillink').style.display = 'none';
               document.getElementById('removeYes').style.display = 'none';
               document.getElementById("remove").innerHTML  = "Status: Removed";
               document.getElementById("removeNo").innerHTML = "<a href='" + removewebsiteNo + "'>Click here to update status to: Active</a>";
               document.getElementById("removeYes").innerHTML = "";
               document.getElementById('back').style.display = 'block';
               document.getElementById("login").style.width = "275px";
               document.getElementById("login").style.textAlign = "right"; 
           }
           if (doc.data().remove === 'No'){
		
               document.getElementById('removeNo').style.display = 'none';
               document.getElementById("remove").innerHTML  = "Status: Active";
               document.getElementById("removeNo").innerHTML = "";
               document.getElementById("removeYes").innerHTML = "<a href='" + removewebsiteYes + "'>Click here to update status to: InActive</a><br>";
               document.getElementById('back').style.display = 'block';
               document.getElementById("login").style.width = "275px";
               document.getElementById("login").style.textAlign = "right"; 
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
        var sendemaildata={};
        var todaysdate = false;
        var choosedate  = new Date();
        choosedate = d.toDateString();
        var NowTime = new Date(d).toLocaleString();
        var db = firebase.firestore();
        var get_id = data["id"];
        var datapass = {
            "id": get_id
        }
        var options2 = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        };
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
        sendemaildata = {
            "gkey": doc.data().key,  
            "gfrom_name": varFName + ' ' + varLName,
            "gto_email": varAqua + '@aqua-aerobic.com',
            "gto_name": doc.data().message
        }
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
        const datea = new Date(doc.data().date13);
         const dateb = new Date(doc.data().date14);

        var date13 = addOneDay(datea).toLocaleDateString("en", options2);
        var date14 = addOneDay(dateb).toLocaleDateString("en", options2);
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
        if (typeof doc.data().date13 !== 'undefined' && doc.data().date13 !=="") {
            var dt1 = new Date(choosedate).toLocaleDateString("en", options2);
            var dt = new Date(dt1);
            var ndt = dt.getDay();
            console.log("ndt" + ndt);
            console.log("date13" + date13);
            console.log("date14" + date14);
            console.log("datedt1 >= date13: " + dt1 >= date13);
            console.log("dt1 <= date14: " + dt1 <= date14);
            var ggdate13 = new Date(date13).toLocaleDateString("fr-CA", options2);
            var ggdt1 = new Date().toLocaleDateString("fr-CA", options2);
            var ggdate14 = new Date(date14).toLocaleDateString("fr-CA", options2);
            var dgg = new Date();
            let daygg = dgg.getDay();
            if (doc.data().mon === true) {
                if (ggdt1 >= ggdate13 && ggdt1 <= ggdate14 && daygg === 1){
                    todaysdate = true;
                }
            }
            if (doc.data().tue === true) {
                if (ggdt1 >= ggdate13 && ggdt1 <= ggdate14 && daygg === 2){
                    todaysdate = true;
                }
            }
            if (doc.data().wed === true) {
                if (ggdt1 >= ggdate13 && ggdt1 <= ggdate14 && daygg === 3){
                    todaysdate = true;
                }
            }
            if (doc.data().thu === true) {
                if (ggdt1 >= ggdate13 && ggdt1 <= ggdate14 && daygg === 4){
                    todaysdate = true;
                }
            }
            if (doc.data().fri === true) {
                if (ggdt1 >= ggdate13 && ggdt1 <= ggdate14 && daygg === 5){
                    todaysdate = true;
                }
            }
        }
        //console.log("data" + data);
    }); 
  
    var dt1 = new Date(choosedate).toLocaleDateString("en", options2);
    console.log("choosedate:" + dt1);
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
        sleep(500).then(() => {
            sendcheckedin(sendemaildata);
             });
      //  sendcheckedin();
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
        sleep(500).then(() => {
            sendcheckedout(sendemaildata);
             });
       //sendcheckedout();
        log_create();
    }else if ((key_checkin !=null && key_checkin != '') && (key_checkout !=null && key_checkout != '') && (todaysdate === true)){
        //qr code used already old code removed to have check-in again if same day
        //02/17/2023 CK
        resetvisittoday(datapass);	
        fldcheckout = "";
        document.getElementById("checkedin").value = 'No';
        console.log("checkedin ID: No");
        setTimeout(set_checkin(datapass), 1000);	
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
        var d = new Date();
        myTime = new Date(d).toLocaleString();
        fldcheckin = myTime;
        flddailycheckin = myTime; 
        sleep(500).then(() => {
            sendcheckedin(sendemaildata);
             });
        //sendcheckedin();	
        log_create();	
        var data = {
            "errormsg": "Reset and Checkedin again at:" + myTime + " for: " + varFName + " " + varLName 
        }
        error_log_create(data);
    }else{
        var fldkeys;
        var messageipad;
        var messageipad2;
        //qr code used already
        if ((varFName != '' && varFName !=null) && (varLName != '' && varLName !=null)){
            messageipad = "This QR code is invalid and for another date"
            messageipad2 = "Please check-in/out on iPad or try another QR Code!"
        }else{
            messageipad2 = "Please let front desk person know!"
            messageipad = "This QR code is invalid"
            varFName = "Aqua"
            varLName = "Guest"
        }
   
        try{
            fldkeys = fldkey;
        }catch (eror){
            fldkeys = "No Key"; 
        }

        var data = {
            "errormsg": "Wrong date for: " + varFName + ' ' + varLName + " key: " + fldkeys
        }
        error_log_create(data);
        console.log("checkedin ID: Yes");
        document.getElementById("checkedin").value = 'Yes';
        console.log("already used");
        document.write('<body style="font-family: sans-serif;color: blue;">');
        document.write("<center>");
        document.write('<img id="logo" src="aqua.jpg" width="500px">');
        document.write("<p style='font-size:47px;'>Hello, " + varFName + " " + varLName + "</p>");
        document.write("<p style='font-size:25px;color: black;'>"  + messageipad + "</p>");
        document.write("<p style='font-size:20px;color: black;'>" + messageipad2 + "</p>");
        document.write("<p style='font-size:20px;color: blue;'>Have a great day!</p>");
        document.write("<p style='font-size:15px;color: black;'><br><br><br>current date/time: " + NowTime + "</p></center>");
        document.write("</center>");
        document.write('</body>');
    }
    }).catch((error) => {
        var qrid;
    try{
        qrid = get_id;
    }catch (eror){
        qrid = "No Key ID"; 
    }
   
    var data = {
        "errormsg": "No active key exist for: " + qrid 
    }
    error_log_create(data);
    console.log("Error getting documents: ", qrid );
    document.write('<body style="font-family: sans-serif;color: blue;">');
    document.write("<center>");
    document.write('<img id="logo" src="aqua.jpg" width="500px">');
    document.write("<p style='font-size:47px;'>Hello, " + "Aqua" + " " + "Guest" + "</p>");
    document.write("<p style='font-size:20px;color: blue;'>This QR code is invalid!</p>");
    document.write("<p style='font-size:20px;color: black;'>Please let front desk person know!</p>");
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

var set_remove = function(data){
    var db = firebase.firestore();
    var key = data["id"];          
    db.collection("messages").doc(key).update({
        remove: 'X'
    }) .then(function(doc) {
        console.log("doc updated");
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
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

    var loaddbactive =  function(data){
        var cntrecdays = 0;
        var db = firebase.firestore();
       // var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}a{display:none;}#report tr > *:nth-child(8){display: none;}#report tr > *:nth-child(9){display: none;}#report tr > *:nth-child(10){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
      //  var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}a{display:none;}#report tr > *:nth-child(1){display: none;}#report tr > *:nth-child(9){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
        var printnow = "<div id='printbtn'><center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br></div>"; 
        var lines = "";
        var RecordIDs = [];
        var cnt1;
        var count1;
        var datesorts;
        var Visitors = [];
        var seleceteddate;
        var mydata = data;
        fldloginID = data["userid"];
        let today = new Date().toISOString().slice(0, 10);
        var get_login  = data["userid"];
   
        if (get_login  === null || get_login === '') {
            alert("Enter your Network Login ID above & try again!");
        }else{
            var gd = new Date();
            //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
            var gmyDate = new Date(gd).toLocaleString('en-US');   
            var gtodaysdate = gmyDate.toString();
            get_login  = get_login.trim().toLowerCase();
            //https://aquavisitorsystem.github.io/?userid=maylward&report=active
            //get_login.trim().toLowerCase();
            console.log(get_login);
          //  var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;}</style><script src='sorttable.js'></script></head>";
            var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}#report tr > *:nth-child(1){display: none;}#report tr > *:nth-child(9){display: none;}#homes{display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
      
            var lines = "";
            let today = new Date().toISOString().slice(0, 10);
     
            db.collection("messages").where("login", "==",get_login).where("remove", "==","No").orderBy("date","desc")
        .get()
        .then((querySnapshot) => {
            var cnt = querySnapshot.size;
            //(" +  "<label id='numcount'></label>" + " visits)
            //var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (active report)</h1><h2>" +  "<label id='numcount'></label>" + + " Active Visitor Schedule(s) for: " + get_login + "</h2><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br><br></center>";
            //var msg = '<button  onclick="loaddb(' + username + ')"><u>Example button</u></button>';
      
            var msg = "<input type='button' id='btnPrint' onclick='loaddb();' value='Show All Schedules for: " + fldloginID  + "'/>";


            var goback = ' | <a href="javascript:history.go(-1);">Go Back</a>';
            //var goback = ' | <a href="javascript:window.location=document.referrer;">Go Back</a>';
           // var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (My VMS Report)</h1><h2>" + "<label id='numcount'></label>" + " Active Visitor Schedule(s) for: <a href='https://aquavisitorsystem.github.io/?userid=" + get_login + "&report=active'>" + get_login + "</a><br><small style='font-size: 17px;color: grey;'>(showing all present & future schedules for: " + get_login + ")</small><br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small></h2><div id='homes'><a href='https://aquavisitorsystem.github.io/'>Go Home</a>" + goback + "<br></div><br>" + msg  +   "<br><br></center>";
          
            var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (My VMS Report)</h1><h2>" + "<label id='numcount'></label>" + " Active Visitor Schedule(s) for: <a href='https://aquavisitorsystem.github.io/?userid=" + get_login + "&report=active'>" + get_login + "</a><br><small style='font-size: 17px;color: grey;'>(showing all present & future schedules for: " + get_login + ")</small><br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small></h2><div id='homes'><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br></div><br>" + msg  +   "<br><br></center>";
            var goback = ' | <a href="javascript:history.go(-1);">Go Back</a>';
            var logo = '<a href="https://aquavisitorsystem.github.io/"><img id="logo" src="aqua.png" width="250px" alt="Go Home"></a>'
            document.write(logo);
            document.write(title);
          //  document.write(printnow);
            document.write(printnow);
            if (cnt === 0){
                var nodata = "<center><br>No visitor data found<br></center>";
                document.write(nodata);
            }else{
                //	  document.write("<table  id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th>Date/Time</th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
                // document.write("<table  id='report' style='font-size: small;'>  <tr>    <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th>Date/Time</th>      <th>Email</th>       <th>Visiting</th><th>Edit</th>  </tr>");
                document.write("<table id='report' style='font-size: small;'>  <thead><tr>    <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th  style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th  style='cursor: pointer; color: red;' onclick='sortTable(5)'>Date/Time(s)<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th><th>MeetingDate</th><th>Email</th>       <th>Visiting</th><th>Edit</th></tr></thead>");
                document.write("<tbody>");
            }
            document.getElementsByTagName("body")[0].style.display = "none";
            var d = new Date();
            dates = "";
            var Datex = [];
            var options2 = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            };
            var todaysdate = new Date();
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
            var options = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            };
          

        
            var date01 = new Date(doc.data().date)
            var date02 = new Date(doc.data().date2)
            var date03 = new Date(doc.data().date3)
            var date04 = new Date(doc.data().date4)
            var date05 = new Date(doc.data().date5)
            var date06 = new Date(doc.data().date6)
            var date07 = new Date(doc.data().date7)
            var date08 = new Date(doc.data().date8)
            var date09 = new Date(doc.data().date9)
            var date10 = new Date(doc.data().date10)
            var date11 = new Date(doc.data().date11)
            var date12 = new Date(doc.data().date12)
            var startdates = new Date(doc.data().date13)
            var enddates = new Date(doc.data().date14)
            var rectime = new Date(doc.data().rectime)
            var mon = new Date(doc.data().mon)
            var tue = new Date(doc.data().tue)
            var wed = new Date(doc.data().wed)
            var thu = new Date(doc.data().thu)
            var fri = new Date(doc.data().fri)
            todaysdate.setHours(0,0,0,0);
            console.log("9999 date01: " + date01);
            console.log("9999 todaysdate: " + todaysdate);

            if ((date01 >= todaysdate) || (date02 >= todaysdate) || (date03 >= todaysdate) || (date04 >= todaysdate) || (date05 >= todaysdate) || (date06 >= todaysdate) || (date07 >= todaysdate) || (date08 >= todaysdate) || (date09 >= todaysdate) || (date10 >= todaysdate) || (date11 >= todaysdate) || (date12 >= todaysdate)  || (enddates >= todaysdate)){
                seleceteddate = "";
                datesorts = "";
                Datex.length = 0;
                //  var todays = new Date().toDateString();
                if (typeof doc.data().date !== 'undefined' && doc.data().date !==""  && new Date(doc.data().date) >= todaysdate) {
                    seleceteddate = new Date(doc.data().date).toLocaleDateString("en", options)
                    datesorts = new Date(doc.data().date).toLocaleDateString("fr-CA", options2)
                    Datex.push(datesorts);
                    Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
                }
                if (typeof doc.data().date2 !== 'undefined' && doc.data().date2 !==""  && new Date(doc.data().date2) >= todaysdate) {
                    seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date2).toLocaleDateString("en", options)
                    datesorts = new Date(doc.data().date2).toLocaleDateString("fr-CA", options2)
                    Datex.push(datesorts);
                    Visitors.push(doc.data().login + new Date(doc.data().date2).toLocaleDateString("en", options));
                }
                if (typeof doc.data().date3 !== 'undefined' && doc.data().date3 !==""  && new Date(doc.data().date3) >= todaysdate) {
                    seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date3).toLocaleDateString("en", options)
                    datesorts = new Date(doc.data().date3).toLocaleDateString("fr-CA", options2)
                    Datex.push(datesorts);
                    Visitors.push(doc.data().login + new Date(doc.data().date3).toLocaleDateString("en", options));
                }
                if (typeof doc.data().date4 !== 'undefined' && doc.data().date4 !=="" && new Date(doc.data().date4) >= todaysdate) {
                    seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date4).toLocaleDateString("en", options)
                    datesorts = new Date(doc.data().date4).toLocaleDateString("fr-CA", options2)
                    Datex.push(datesorts);
                    Visitors.push(doc.data().login + new Date(doc.data().date4).toLocaleDateString("en", options));
                }
                if (typeof doc.data().date5 !== 'undefined' && doc.data().date5 !=="" && new Date(doc.data().date5) >= todaysdate) {
                    seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date5).toLocaleDateString("en", options)
                    datesorts = new Date(doc.data().date5).toLocaleDateString("fr-CA", options2)
                    Datex.push(datesorts);
                    Visitors.push(doc.data().login + new Date(doc.data().date5).toLocaleDateString("en", options));
                }
                if (typeof doc.data().date6 !== 'undefined' && doc.data().date6 !=="" && new Date(doc.data().date6) >= todaysdate) {
                    seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date6).toLocaleDateString("en", options)
                    datesort = new Date(doc.data().date6).toLocaleDateString("fr-CA", options2)
                    Datex.push(datesort);
                    Visitors.push(doc.data().login + new Date(doc.data().date6).toLocaleDateString("en", options));
                }
                if (typeof doc.data().date7 !== 'undefined' && doc.data().date7 !=="" && new Date(doc.data().date7) >= todaysdate) {
                    seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date7).toLocaleDateString("en", options)
                    datesorts = new Date(doc.data().date7).toLocaleDateString("fr-CA", options2)
                    Datex.push(datesorts);
                    Visitors.push(doc.data().login + new Date(doc.data().date7).toLocaleDateString("en", options));

                }
                if (typeof doc.data().date8 !== 'undefined' && doc.data().date8 !=="" && new Date(doc.data().date8) >= todaysdate) {
                    seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date8).toLocaleDateString("en", options)
                    datesorts = new Date(doc.data().date8).toLocaleDateString("fr-CA", options2);
                    Datex.push(datesorts);
                    Visitors.push(doc.data().login + new Date(doc.data().date8).toLocaleDateString("en", options));
                }
                if (typeof doc.data().date9 !== 'undefined' && doc.data().date9 !=="" && new Date(doc.data().date9) >= todaysdate) {
                    seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date9).toLocaleDateString("en", options)
                    datesorts = new Date(doc.data().date9).toLocaleDateString("fr-CA", options2)
                    Datex.push(datesorts);
                    Visitors.push(doc.data().login + new Date(doc.data().date9).toLocaleDateString("en", options));
                }
                if (typeof doc.data().date10 !== 'undefined' && doc.data().date10 !=="" && new Date(doc.data().date10) >= todaysdate) {
                    seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date10).toLocaleDateString("en", options)
                    datesorts = new Date(doc.data().date10).toLocaleDateString("fr-CA", options2)
                    Datex.push(datesorts);
                    Visitors.push(doc.data().login + new Date(doc.data().date110).toLocaleDateString("en", options));
                }
                if (typeof doc.data().date11 !== 'undefined' && doc.data().date11 !=="" && new Date(doc.data().date11) >= todaysdate) {
                    seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date11).toLocaleDateString("en", options)
                    datesorts = new Date(doc.data().date11).toLocaleDateString("fr-CA", options2)
                    Datex.push(datesorts);
                    Visitors.push(doc.data().login + new Date(doc.data().date11).toLocaleDateString("en", options));
                }
                if (typeof doc.data().date12 !== 'undefined' && doc.data().date12 !=="" && new Date(doc.data().date12) >= todaysdate) {
                    seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date12).toLocaleDateString("en", options)
                    datesorts = new Date(doc.data().date12).toLocaleDateString("fr-CA", options2);
                    Datex.push(datesorts);
                    Visitors.push(doc.data().login + new Date(doc.data().date12).toLocaleDateString("en", options));
                }
                if (typeof doc.data().date14 !== 'undefined' && doc.data().date14 !=="" && new Date(doc.data().date14) >= todaysdate) {
                    cntrecdays = 0;
                    h  =  tConvert (doc.data().rectime);
                    var days = "";
            const datea = new Date(doc.data().date13);
            const dateb = new Date(doc.data().date14);
                    var date13 = addOneDay(datea).toLocaleDateString("en", options2);
                    var date14 = addOneDay(dateb).toLocaleDateString("en", options2);
                    console.log("date13: " + date13);
                    console.log("date14: " + date14);
                    var mdays = [];
                    if (doc.data().mon === true) {
                        mdays.push(1);
                        days = "Mon";
                        cntrecdays = RecCount(date13,date14,1);
                    }
                    if (doc.data().tue === true) {
                        mdays.push(2);
                        if (days === ""){
                            days = "Tue";
                        }else{
                            days = days + "," + "Tue";
                        }    
                        cntrecdays = cntrecdays + RecCount(date13,date14,2);
                    }
                    if (doc.data().wed === true) {
                        mdays.push(3);
                        if (days === ""){
                            days = "Wed";
                        }else{
                            days = days + "," + "Wed";
                        } 
                        cntrecdays = cntrecdays + RecCount(date13,date14,3);
                    }
                    if (doc.data().thu === true) {
                        mdays.push(4);
                        if (days === ""){
                            days = "Thu";
                        }else{
                            days = days + "," + "Thu";
                        }   
                        cntrecdays = cntrecdays + RecCount(date13,date14,4);
                    }
                    if (doc.data().fri === true) {
                        mdays.push(5);
                        if (days === ""){
                            days = "Fri";
                        }else{
                            days = days + "," + "Fri";
                        }  
                        cntrecdays = cntrecdays + RecCount(date13,date14,4);
                    }
                    //seleceteddate = cntrecdays + " Recurring Until: " + "<br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h
                    seleceteddate = "Recurring Until: " + "<br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h
                       const date = new Date();
                    const thisistodayday = date.getDay();
                    if (mdays.includes(thisistodayday)){
                        datesorts = new Date().toLocaleDateString("fr-CA", options2);
                    }else{
                        datesorts = nextDate(mdays[0]);
                    }
                    Datex.push(datesorts);
                    //Visitors.push(doc.data().login + new Date(doc.data().date14).toLocaleDateString("en", options2) + rectime);
                }
       


       

                console.log("todaysdate: " + todaysdate);
                // count1 = count1 + dates.find('<br>').length
          
                console.log(seleceteddate);
            
                Datex.sort((a, b) => new Date(b) - new Date(a)).reverse()
                //Datex.sort((a, b) => new Date(b) - new Date(a))
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
                var namelinks = "<a href='https://aquavisitorsystem.github.io/?lname=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
                var companylinks = "<a href='https://aquavisitorsystem.github.io/?company=" + doc.data().company + "' target='_blank'>" + doc.data().company + "</a>";
                document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + seleceteddate + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
           
            }
        });
        var count = 0;
        try {
            var table = document.getElementById("report");
            count  = table.tBodies[0].rows.length;
        } catch (error) {
            count = 0;
        }
        console.log("count: " +  count);
        document.getElementById("numcount").innerHTML = count;
        document.getElementById("numcount").setAttribute("value",  count);
        document.head.innerHTML = header;
        document.write("</tbody></table>");
       document.getElementsByTagName("body")[0].style.display = "none";
        if (count === 0){
            document.getElementById("printbtn").style.display = "none";
            // document.getElementById("report").style.display = "none";
        }
        if (count === 0){
            document.getElementById("report").style.display = "none";
            // document.getElementById("btnPrint").style.display = "none";
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}
    spinnow(3000);
       //alert("test");
    setTimeout("sortByDate(5)", 3000);
    //spinnow(3000);
   // spinnow(3000);
    //spinnow(3000);
}

    var loaddbactivereport =  function(){
        var get_login=prompt("Enter Aqua UserID To View Report","Enter Aqua UserID");
        if (get_login  === null) {
            setTimeout("window.location.reload();", 1000);
            spinnow(3000);
            //setTimeout(() => {window.location.href = 'https://aquavisitorsystem.github.io/';}, 1000);
    }else if (get_login === "Enter Aqua UserID"){
        alert("Please Try Again! Enter Aqua UserID");
        loaddbactivereport();
        //setTimeout("window.location.reload();", 1000);
        //setTimeout(() => {window.location.href = 'https://aquavisitorsystem.github.io/';}, 1000);
    }else{
        var gd = new Date();
        //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
        var gmyDate = new Date(gd).toLocaleString('en-US');   
        var gtodaysdate = gmyDate.toString()
        get_login  = get_login.toString();
        get_login = get_login.trim().toLowerCase();
        console.log(get_login);
        var cntrecdays = 0;
        var db = firebase.firestore();
        // var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}a{display:none;}#report tr > *:nth-child(8){display: none;}#report tr > *:nth-child(9){display: none;}#report tr > *:nth-child(10){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
        //  var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}a{display:none;}#report tr > *:nth-child(1){display: none;}#report tr > *:nth-child(9){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
        var printnow = "<div id='printbtn'><center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br></div>"; 
        var lines = "";
        var RecordIDs = [];
        var cnt1;
        var count1;
        var datesorts;
        var Visitors = [];
        var seleceteddate;
        // var mydata = data;
        fldloginID = get_login;//data["userid"];
        let today = new Date().toISOString().slice(0, 10);
        var get_login  = get_login;// data["userid"];
   
        if (get_login  === null || get_login === '') {
            alert("Enter your Network Login ID above & try again!");
        }else{
            get_login  = get_login.trim().toLowerCase();
            //https://aquavisitorsystem.github.io/?userid=maylward&report=active
            //get_login.trim().toLowerCase();
            console.log(get_login);
            //  var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;}</style><script src='sorttable.js'></script></head>";
            var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}#report tr > *:nth-child(1){display: none;}#report tr > *:nth-child(9){display: none;}#homes{display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
      
            var lines = "";
            let today = new Date().toISOString().slice(0, 10);
     
            db.collection("messages").where("login", "==",get_login).where("remove", "==","No").orderBy("date","desc")
        .get()
        .then((querySnapshot) => {
            var cnt = querySnapshot.size;
            //(" +  "<label id='numcount'></label>" + " visits)
            //var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (active report)</h1><h2>" +  "<label id='numcount'></label>" + + " Active Visitor Schedule(s) for: " + get_login + "</h2><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br><br></center>";
            //var msg = '<button  onclick="loaddb(' + username + ')"><u>Example button</u></button>';
      
            var msg = "<input type='button' id='btnPrint' onclick='loaddb();' value='Show All Schedules for: " + fldloginID  + "'/>";

            var goback = ' | <a href="javascript:history.go(-1);">Go Back</a>';
            // var goback = ' | <a href="javascript:window.location=document.referrer;">Go Back</a>';
            var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (My VMS Report)</h1><h2>" + "<label id='numcount'></label>" + " Active Visitor Schedule(s) for: <a href='https://aquavisitorsystem.github.io/?userid=" + get_login + "&report=active'>" + get_login + "</a><br><small style='font-size: 17px;color: grey;'>(showing all present & future schedules for: " + get_login + ")</small><br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small></h2><div id='homes'><a href='https://aquavisitorsystem.github.io/'>Go Home</a>" + "<br></div><br>" + msg  +   "<br><br></center>";
            var logo = '<a href="https://aquavisitorsystem.github.io/"><img id="logo" src="aqua.png" width="250px" alt="Go Home"></a>'
            document.write(logo);
            document.write(title);
            document.write(printnow);
            if (cnt === 0){
                var nodata = "<center><br>No visitor data found<br></center>";
                document.write(nodata);
            }else{
                //	  document.write("<table  id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th>Date/Time</th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
                // document.write("<table  id='report' style='font-size: small;'>  <tr>    <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th>Date/Time</th>      <th>Email</th>       <th>Visiting</th><th>Edit</th>  </tr>");
                document.write("<table id='report' style='font-size: small;'>  <thead><tr>    <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th  style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th>Date/Time(s)</th><th  style='cursor: pointer; color: red;' onclick='sortTable(5)'>MeetingDate<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th><th>Email</th>       <th>Visiting</th><th>Edit</th></tr></thead>");
                document.write("<tbody>");
            }
            document.getElementsByTagName("body")[0].style.display = "none";
            var d = new Date();
            dates = "";
            var Datex = [];
            var todaysdate = new Date();
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

        
            var date01 = new Date(doc.data().date)
            var date02 = new Date(doc.data().date2)
            var date03 = new Date(doc.data().date3)
            var date04 = new Date(doc.data().date4)
            var date05 = new Date(doc.data().date5)
            var date06 = new Date(doc.data().date6)
            var date07 = new Date(doc.data().date7)
            var date08 = new Date(doc.data().date8)
            var date09 = new Date(doc.data().date9)
            var date10 = new Date(doc.data().date10)
            var date11 = new Date(doc.data().date11)
            var date12 = new Date(doc.data().date12)
            var startdates = new Date(doc.data().date13)
            var enddates = new Date(doc.data().date14)
            var rectime = new Date(doc.data().rectime)
            var mon = new Date(doc.data().mon)
            var tue = new Date(doc.data().tue)
            var wed = new Date(doc.data().wed)
            var thu = new Date(doc.data().thu)
            var fri = new Date(doc.data().fri)
            todaysdate.setHours(0,0,0,0);
            if ((date01 >= todaysdate) || (date02 >= todaysdate) || (date03 >= todaysdate) || (date04 >= todaysdate) || (date05 >= todaysdate) || (date06 >= todaysdate) || (date07 >= todaysdate) || (date08 >= todaysdate) || (date09 >= todaysdate) || (date10 >= todaysdate) || (date11 >= todaysdate) || (date12 >= todaysdate)  || (enddates >= todaysdate)){
                seleceteddate = "";
                datesorts = "";
                Datex.length = 0;
                //  var todays = new Date().toDateString();
                if (typeof doc.data().date !== 'undefined' && doc.data().date !==""  && new Date(doc.data().date) >= todaysdate) {
                    seleceteddate = new Date(doc.data().date).toLocaleDateString("en", options)
                    datesorts = new Date(doc.data().date).toLocaleDateString("fr-CA", options2)
                    Datex.push(datesorts);
                    Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
                }
                if (typeof doc.data().date2 !== 'undefined' && doc.data().date2 !==""  && new Date(doc.data().date2) >= todaysdate) {
                    seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date2).toLocaleDateString("en", options)
                    datesorts = new Date(doc.data().date2).toLocaleDateString("fr-CA", options2)
                    Datex.push(datesorts);
                    Visitors.push(doc.data().login + new Date(doc.data().date2).toLocaleDateString("en", options));
                }
                if (typeof doc.data().date3 !== 'undefined' && doc.data().date3 !==""  && new Date(doc.data().date3) >= todaysdate) {
                    seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date3).toLocaleDateString("en", options)
                    datesorts = new Date(doc.data().date3).toLocaleDateString("fr-CA", options2)
                    Datex.push(datesorts);
                    Visitors.push(doc.data().login + new Date(doc.data().date3).toLocaleDateString("en", options));
                }
                if (typeof doc.data().date4 !== 'undefined' && doc.data().date4 !=="" && new Date(doc.data().date4) >= todaysdate) {
                    seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date4).toLocaleDateString("en", options)
                    datesorts = new Date(doc.data().date4).toLocaleDateString("fr-CA", options2)
                    Datex.push(datesorts);
                    Visitors.push(doc.data().login + new Date(doc.data().date4).toLocaleDateString("en", options));
                }
                if (typeof doc.data().date5 !== 'undefined' && doc.data().date5 !=="" && new Date(doc.data().date5) >= todaysdate) {
                    seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date5).toLocaleDateString("en", options)
                    datesorts = new Date(doc.data().date5).toLocaleDateString("fr-CA", options2)
                    Datex.push(datesorts);
                    Visitors.push(doc.data().login + new Date(doc.data().date5).toLocaleDateString("en", options));
                }
                if (typeof doc.data().date6 !== 'undefined' && doc.data().date6 !=="" && new Date(doc.data().date6) >= todaysdate) {
                    seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date6).toLocaleDateString("en", options)
                    datesort = new Date(doc.data().date6).toLocaleDateString("fr-CA", options2)
                    Datex.push(datesort);
                    Visitors.push(doc.data().login + new Date(doc.data().date6).toLocaleDateString("en", options));
                }
                if (typeof doc.data().date7 !== 'undefined' && doc.data().date7 !=="" && new Date(doc.data().date7) >= todaysdate) {
                    seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date7).toLocaleDateString("en", options)
                    datesorts = new Date(doc.data().date7).toLocaleDateString("fr-CA", options2)
                    Datex.push(datesorts);
                    Visitors.push(doc.data().login + new Date(doc.data().date7).toLocaleDateString("en", options));

                }
                if (typeof doc.data().date8 !== 'undefined' && doc.data().date8 !=="" && new Date(doc.data().date8) >= todaysdate) {
                    seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date8).toLocaleDateString("en", options)
                    datesorts = new Date(doc.data().date8).toLocaleDateString("fr-CA", options2);
                    Datex.push(datesorts);
                    Visitors.push(doc.data().login + new Date(doc.data().date8).toLocaleDateString("en", options));
                }
                if (typeof doc.data().date9 !== 'undefined' && doc.data().date9 !=="" && new Date(doc.data().date9) >= todaysdate) {
                    seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date9).toLocaleDateString("en", options)
                    datesorts = new Date(doc.data().date9).toLocaleDateString("fr-CA", options2)
                    Datex.push(datesorts);
                    Visitors.push(doc.data().login + new Date(doc.data().date9).toLocaleDateString("en", options));
                }
                if (typeof doc.data().date10 !== 'undefined' && doc.data().date10 !=="" && new Date(doc.data().date10) >= todaysdate) {
                    seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date10).toLocaleDateString("en", options)
                    datesorts = new Date(doc.data().date10).toLocaleDateString("fr-CA", options2)
                    Datex.push(datesorts);
                    Visitors.push(doc.data().login + new Date(doc.data().date110).toLocaleDateString("en", options));
                }
                if (typeof doc.data().date11 !== 'undefined' && doc.data().date11 !=="" && new Date(doc.data().date11) >= todaysdate) {
                    seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date11).toLocaleDateString("en", options)
                    datesorts = new Date(doc.data().date11).toLocaleDateString("fr-CA", options2)
                    Datex.push(datesorts);
                    Visitors.push(doc.data().login + new Date(doc.data().date11).toLocaleDateString("en", options));
                }
                if (typeof doc.data().date12 !== 'undefined' && doc.data().date12 !=="" && new Date(doc.data().date12) >= todaysdate) {
                    seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date12).toLocaleDateString("en", options)
                    datesorts = new Date(doc.data().date12).toLocaleDateString("fr-CA", options2);
                    Datex.push(datesorts);
                    Visitors.push(doc.data().login + new Date(doc.data().date12).toLocaleDateString("en", options));
                }
                if (typeof doc.data().date14 !== 'undefined' && doc.data().date14 !=="" && new Date(doc.data().date14) >= todaysdate) {
                    cntrecdays = 0;
                    h  =  tConvert (doc.data().rectime);
                    var days = "";
            const datea = new Date(doc.data().date13);
            const dateb = new Date(doc.data().date14);
                    var date13 = addOneDay(datea).toLocaleDateString("en", options2);
                    var date14 = addOneDay(dateb).toLocaleDateString("en", options2);
                    console.log("date13: " + date13);
                    console.log("date14: " + date14);
                    var mdays = [];
                    if (doc.data().mon === true) {
                        mdays.push(1);
                        days = "Mon";
                        cntrecdays = RecCount(date13,date14,1);
                    }
                    if (doc.data().tue === true) {
                        mdays.push(2);
                        if (days === ""){
                            days = "Tue";
                        }else{
                            days = days + "," + "Tue";
                        }    
                        cntrecdays = cntrecdays + RecCount(date13,date14,2);
                    }
                    if (doc.data().wed === true) {
                        mdays.push(3);
                        if (days === ""){
                            days = "Wed";
                        }else{
                            days = days + "," + "Wed";
                        } 
                        cntrecdays = cntrecdays + RecCount(date13,date14,3);
                    }
                    if (doc.data().thu === true) {
                        mdays.push(4);
                        if (days === ""){
                            days = "Thu";
                        }else{
                            days = days + "," + "Thu";
                        }   
                        cntrecdays = cntrecdays + RecCount(date13,date14,4);
                    }
                    if (doc.data().fri === true) {
                        mdays.push(5);
                        if (days === ""){
                            days = "Fri";
                        }else{
                            days = days + "," + "Fri";
                        }  
                        cntrecdays = cntrecdays + RecCount(date13,date14,4);
                    }
                    //seleceteddate = cntrecdays + " Recurring Until: " + "<br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h

                    seleceteddate = "Recurring Until: " + "<br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h
                     const date = new Date();
                    const thisistodayday = date.getDay();
                    if (mdays.includes(thisistodayday)){
                        datesorts = new Date().toLocaleDateString("fr-CA", options2);
                    }else{
                        datesorts = nextDate(mdays[0]);
                    }
                    // datesorts = nextDate(mdays[0]); //new Date().toLocaleDateString("fr-CA", options2);
                    Datex.push(datesorts);
                    //Visitors.push(doc.data().login + new Date(doc.data().date14).toLocaleDateString("en", options2) + rectime);
                }
       


       

                console.log("todaysdate: " + todaysdate);
                // count1 = count1 + dates.find('<br>').length
          
                console.log(seleceteddate);
            
                //   Datex.sort((a, b) => new Date(b) - new Date(a)).reverse()
                
                Datex.sort((a, b) => new Date(b) - new Date(a))
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
                var namelinks = "<a href='https://aquavisitorsystem.github.io/?lname=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
                var companylinks = "<a href='https://aquavisitorsystem.github.io/?company=" + doc.data().company + "' target='_blank'>" + doc.data().company + "</a>";
                document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + seleceteddate + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
                
            }
        });
        var count = 0;
        try {
            var table = document.getElementById("report");
            count  = table.tBodies[0].rows.length;
        } catch (error) {
            count = 0;
        }
        console.log("count: " +  count);
        document.getElementById("numcount").innerHTML = count;
        document.getElementById("numcount").setAttribute("value",  count);
        document.head.innerHTML = header;
        document.write("</tbody></table>");
        document.getElementsByTagName("body")[0].style.display = "none";
        //spinnow(3000);
        //setTimeout("sortByDate(5)", 3000);
        if (count === 0){
            document.getElementById("printbtn").style.display = "none";
            // document.getElementById("report").style.display = "none";
        }
        if (count === 0){
            document.getElementById("report").style.display = "none";
            // document.getElementById("btnPrint").style.display = "none";
        }
       
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}
    spinnow(3000);
    setTimeout("sortByDate(5)", 3000);
}

    }
      
    var loaddb =  function(data){
        var cntrecdays = 0;
    var cnt = 0;
    var db = firebase.firestore();
    var get_login = "";
    var Visitors = [];
    try {
        get_login  = data["userid"];
    }
    catch(err) {
        document.body.innerHTML = "";
        get_login  = fldloginID;
    }

    if (get_login  === null || get_login === '') {
        alert("Enter your Network Login ID above & try again!");
    }else{
        var gd = new Date();
        //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
        var gmyDate = new Date(gd).toLocaleString('en-US');   
        var gtodaysdate = gmyDate.toString()
        var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>";
        get_login  = get_login.trim().toLowerCase();
     
        //get_login.trim().toLowerCase();
        console.log(get_login);
        //var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;}</style><script src='sorttable.js'></script></head>";
        var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}#report tr > *:nth-child(1){display: none;}#report tr > *:nth-child(9){display: none;}#home{display:none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
        var lines = "";
        let today = new Date().toISOString().slice(0, 10);
     
        db.collection("messages").where("login", "==",get_login).where("remove", "==","No").orderBy("date","desc")
   .get()
   .then((querySnapshot) => {
       cnt = querySnapshot.size;
        var msg = "<input type='button' id='btnPrint' onclick='loaddb();' value='Show All Schedules for: " + fldloginID  + "'/>";
       var goback = ' | <a href="javascript:history.go(-1);">Go Back</a>';
       // var goback = ' | <a href="javascript:window.location=document.referrer;">Go Back</a>';
        //var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (My VMS Report)</h1><h2>" + "<label id='numcount'></label>" + " Visitor Schedule(s) for: <a href='https://aquavisitorsystem.github.io/?userid=" + get_login + "&report=active'>" + get_login + "</a><br><small style='font-size: 17px;color: grey;'>(showing all future,present & past schedules for: " + get_login + ")</small><br><small style='font-size: 16px;color: blue;'>report created on " +  gtodaysdate + "</small><br></h2><div id='home'><a href='https://aquavisitorsystem.github.io/'>Go Home</a>" + goback + "<br></div><br></center>";
        var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (My VMS Report)</h1><h2>" + "<label id='numcount'></label>" + " Visitor Schedule(s) for: <a href='https://aquavisitorsystem.github.io/?userid=" + get_login + "&report=active'>" + get_login + "</a><br><small style='font-size: 17px;color: grey;'>(showing all future,present & past schedules for: " + get_login + ")</small><br><small style='font-size: 16px;color: blue;'>report created on " +  gtodaysdate + "</small><br></h2><div id='home'><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br></div><br></center>";
        var logo = '<a href="https://aquavisitorsystem.github.io/"><img id="logo" src="aqua.png" width="250px" alt="Go Home"></a>'
        document.write(logo);
        document.write(title);
        document.write(printnow);
            if (cnt === 0){
            var nodata = "<center><br>No visitor data found<br></center>";
            document.write(nodata);
        }else{
            //document.write("<table id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th  style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th  style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
                document.write("<table id='report' style='font-size: small;'>  <thead><tr>    <th>UserID</th>    <th>First Name</th>    <th  style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th>Date/Time(s)</th><th  style='cursor: pointer; color: red;' onclick='sortTable(5)'>MeetingDate<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th><th>Email</th>       <th>Visiting</th><th>Edit</th></tr></thead>");
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
        var dates;
        if (typeof doc.data().date !== 'undefined' && doc.data().date !=="") {
            dates = new Date(doc.data().date).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date).toLocaleDateString("fr-CA", options1)
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date2 !== 'undefined' && doc.data().date2 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date2).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date2).toLocaleDateString("fr-CA", options1)
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date3 !== 'undefined' && doc.data().date3 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date3).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date3).toLocaleDateString('fr-CA',options1);
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date4 !== 'undefined' && doc.data().date4 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date4).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date4).toLocaleDateString('fr-CA',options1);
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date5 !== 'undefined' && doc.data().date5 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date5).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date5).toLocaleDateString('fr-CA',options1);
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date6 !== 'undefined' && doc.data().date6 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date6).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date6).toLocaleDateString('fr-CA',options1);
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date7 !== 'undefined' && doc.data().date7 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date7).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date7).toLocaleDateString('fr-CA',options1);
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
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
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date10 !== 'undefined' && doc.data().date10 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date10).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date10).toLocaleDateString('fr-CA',options1);
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date11 !== 'undefined' && doc.data().date11 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date11).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date11).toLocaleDateString('fr-CA',options1);
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date12 !== 'undefined' && doc.data().date12 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date12).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date12).toLocaleDateString('fr-CA',options1);
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date13 !== 'undefined' && doc.data().date13 !=="") {
            cntrecdays = 0;
            h  =  tConvert (doc.data().rectime);
            var days = "";
            const datea = new Date(doc.data().date13);
           const dateb = new Date(doc.data().date14);
            var date13 = addOneDay(datea).toLocaleDateString("en", options2);
            var date14 = addOneDay(dateb).toLocaleDateString("en", options2);
            console.log("date13: " + date13);
            console.log("date14: " + date14);
            var mdays = [];
            if (doc.data().mon === true) {
                mdays.push(1);
                days = "Mon";
                cntrecdays = RecCount(date13,date14,1);
            }
            if (doc.data().tue === true) {
                mdays.push(2);
                if (days === ""){
                    days = "Tue";
                }else{
                    days = days + "," + "Tue";
                }    
                cntrecdays = cntrecdays + RecCount(date13,date14,2);
            }
            if (doc.data().wed === true) {
                mdays.push(3);
                if (days === ""){
                    days = "Wed";
                }else{
                    days = days + "," + "Wed";
                } 
                cntrecdays = cntrecdays + RecCount(date13,date14,3);
            }
            if (doc.data().thu === true) {
                mdays.push(4);
                if (days === ""){
                    days = "Thu";
                }else{
                    days = days + "," + "Thu";
                }   
                cntrecdays = cntrecdays + RecCount(date13,date14,4);
            }
            if (doc.data().fri === true) {
                mdays.push(5);
                if (days === ""){
                    days = "Fri";
                }else{
                    days = days + "," + "Fri";
                }  
                cntrecdays = cntrecdays + RecCount(date13,date14,4);
            }
            
            if (dates)
            {
                console.log("777 dates: " + dates);
                //dates = dates + "<hr>" + cntrecdays + " Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h
                dates = dates + "<hr>" + "Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h
            }else{
                console.log("888 dates:" + dates);

               // dates = cntrecdays + " Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h
                dates = "Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h
            }
            var todaysdate77 = new Date().toLocaleDateString("en", options2);
            var range = date14
            range = new Date(range);
            todaysdate77 = new Date(todaysdate77);
            console.log("7777 date14:" + range);
            console.log("7777 todaysdate:" + todaysdate77);
            if (range < todaysdate77){
         const dateb = new Date(doc.data().date14);
                datesorts = addOneDay(dateb).toLocaleDateString("fr-CA", options2);
                console.log("out of range:" + datesorts);
                Datex.push(datesorts);
            }else{
          const date = new Date();
             const thisistodayday = date.getDay();
                console.log("thisistodayday" + thisistodayday);
                console.log("mdays.includes(thisistodayday)" + mdays.includes(thisistodayday));
                if (mdays.includes(thisistodayday)){
                    datesorts = new Date().toLocaleDateString("fr-CA", options2);
                }else{
                    datesorts = nextDate(mdays[0]);
                }
                console.log("in range:" + datesorts);
                Datex.push(datesorts);
            }
            //datesorts = new Date().toLocaleDateString("fr-CA", options2);;
            Datex.push(datesorts);
        }




        Datex.sort((a, b) => new Date(b) - new Date(a)).reverse()
        var todays = new Date().toLocaleDateString("fr-CA", options2);
        console.log("todays: " + todays);
        for(var i=0; i<Datex.length; i++){
            console.log("Datex[i]: " + Datex[i]);
            if(Datex[i] === todays){
                datesort = Datex[i]
                console.log("Datex[i] === todays " + datesort);
                break;
            }else if (Datex[i] > todays){
                datesort = Datex[i]
                console.log("Datex[i] > todays " + datesort);
                break;
            }else if (Datex[i] < todays){
                datesort = Datex[i]
                console.log("Datex[i] < todays" + datesort);
                //break;
            }
        }
        var namelinks = "<a href='https://aquavisitorsystem.github.io/?lname=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
        var companylinks = "<a href='https://aquavisitorsystem.github.io/?company=" + doc.data().company + "' target='_blank'>" + doc.data().company + "</a>";
        document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
    });
    var count = 0;
        try {
            var table = document.getElementById("report");
            count  = table.tBodies[0].rows.length;
        } catch (error) {
            count = 0;
        }

    //var table = document.getElementById("report");
    //var tbodyRowCount = table.tBodies[0].rows.length;
    //let count = tbodyRowCount; //Visitors.length + cntrecdays;
    console.log("count: " +  count);
    document.getElementById("numcount").innerHTML = count;
    document.getElementById("numcount").setAttribute("value",  count);
    document.head.innerHTML = header;
    document.write("</tbody></table>");
    document.getElementsByTagName("body")[0].style.display = "none";
    //spinnow(3000);
    //setTimeout("sortByDate2(5)", 3000);
})
    .catch((error) => {
        console.log("Error getting documents: ", error);
});
}
    //setTimeout("sortTable(5)", 2000);
   // setTimeout("sortTable(5)", 2000);
//sortdate
    spinnow(3000);
    setTimeout("sortByDate2(5)", 3000);
}
       
    var loaddbeverything =  function(){
        var cntrecdays = 0;
    var db = firebase.firestore();
    var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}#gohome{display:none;}#report tr > *:nth-child(9){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
    var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>"; var lines = "";
    var RecordIDs = [];
    var cnt1;



    let today = new Date().toISOString().slice(0, 10);
    db.collection("messages").where("remove", "==","No").orderBy("date","desc")
.get()
.then((querySnapshot) => {
    var cnt = querySnapshot.size;
    var gd = new Date();
    var datesort;
    var Visitors = [];
    //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
    var gmyDate = new Date(gd).toLocaleString('en-US');   
    var gtodaysdate = gmyDate.toString();
    var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (all report)</h1><h2>" + "<label id='numcount'></label>" + " Visitor Schedule(s)<br><small>(showing all future, present & past schedules)</small><br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small><br></h2><div id='gohome'><a href='https://aquavisitorsystem.github.io/'>Go Home</a></div><br><br></center>";
    var logo = '<a href="https://aquavisitorsystem.github.io/"><img id="logo" src="aqua.png" width="250px" alt="Go Home"></a>'
    document.write(logo);
    document.write(title);
    document.write(printnow);

    if (cnt === 0){
        var nodata = "<center><br>No visitor data found<br></center>";
        document.write(nodata);
    }else{
        //	  document.write("<table  id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th>Date/Time</th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
       // document.write("<table  id='report' style='font-size: small;'>  <tr>    <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th>Date/Time</th>      <th>Email</th>       <th>Visiting</th><th>Edit</th>  </tr>");
        document.write("<table id='report' style='font-size: small;'>  <thead><tr>    <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th  style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th>Date/Time(s)</th><th  style='cursor: pointer; color: red;' onclick='sortByDate2(5)'>MeetingDate<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th><th>Email</th>       <th>Visiting</th><th>Edit</th></tr></thead>");
        document.write("<tbody>");
    }
    document.getElementsByTagName("body")[0].style.display = "none";
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
    var dates;
    var Datex = [];
    console.log("date2: " + doc.data().date2);
    //  var todays = new Date().toDateString();
    if (typeof doc.data().date !== 'undefined' && doc.data().date !=="") {
        dates = new Date(doc.data().date).toLocaleDateString("en", options)
        datesort = new Date(doc.data().date).toLocaleDateString("fr-CA", options2)
        Datex.push(datesort);
        Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
    }
    if (typeof doc.data().date2 !== 'undefined' && doc.data().date2 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date2).toLocaleDateString("en", options)
        datesort = new Date(doc.data().date2).toLocaleDateString("fr-CA", options2)
        Datex.push(datesort);
        Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
    }
    if (typeof doc.data().date3 !== 'undefined' && doc.data().date3 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date3).toLocaleDateString("en", options)
        datesort = new Date(doc.data().date3).toLocaleDateString("fr-CA", options2)
        Datex.push(datesort);
        Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
    }
    if (typeof doc.data().date4 !== 'undefined' && doc.data().date4 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date4).toLocaleDateString("en", options)
        datesort = new Date(doc.data().date4).toLocaleDateString("fr-CA", options2)
        Datex.push(datesort);
        Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
    }
    if (typeof doc.data().date5 !== 'undefined' && doc.data().date5 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date5).toLocaleDateString("en", options)
        datesort = new Date(doc.data().date5).toLocaleDateString("fr-CA", options2)
        Datex.push(datesort);
        Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
    }
    if (typeof doc.data().date6 !== 'undefined' && doc.data().date6 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date6).toLocaleDateString("en", options)
        datesort = new Date(doc.data().date6).toLocaleDateString("fr-CA", options2)
        Datex.push(datesort);
        Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
    }
    if (typeof doc.data().date7 !== 'undefined' && doc.data().date7 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date7).toLocaleDateString("en", options)
        datesort = new Date(doc.data().date7).toLocaleDateString("fr-CA", options2)
        Datex.push(datesort);
        Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));

    }
    if (typeof doc.data().date8 !== 'undefined' && doc.data().date8 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date8).toLocaleDateString("en", options)
        datesort = new Date(doc.data().date8).toLocaleDateString("fr-CA", options2);
        Datex.push(datesort);
        Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
    }
    if (typeof doc.data().date9 !== 'undefined' && doc.data().date9 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date9).toLocaleDateString("en", options)
        datesort = new Date(doc.data().date9).toLocaleDateString("fr-CA", options2)
        Datex.push(datesort);
        Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
    }
    if (typeof doc.data().date10 !== 'undefined' && doc.data().date10 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date10).toLocaleDateString("en", options)
        datesort = new Date(doc.data().date10).toLocaleDateString("fr-CA", options2)
        Datex.push(datesort);
        Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
    }
    if (typeof doc.data().date11 !== 'undefined' && doc.data().date11 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date11).toLocaleDateString("en", options)
        datesort = new Date(doc.data().date11).toLocaleDateString("fr-CA", options2)
        Datex.push(datesort);
        Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
    }
    if (typeof doc.data().date12 !== 'undefined' && doc.data().date12 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date12).toLocaleDateString("en", options)
        datesort = new Date(doc.data().date12).toLocaleDateString("fr-CA", options2);
        Datex.push(datesort);
        Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
    }
    if (typeof doc.data().date14 !== 'undefined' && doc.data().date14 !=="") {
        cntrecdays = 0;
        h  =  tConvert (doc.data().rectime);
        var days = "";
        const datea = new Date(doc.data().date13);
        const dateb = new Date(doc.data().date14);
        var date13 = addOneDay(datea).toLocaleDateString("en", options2);
        var date14 = addOneDay(dateb).toLocaleDateString("en", options2);
        console.log("date13: " + date13);
        console.log("date14: " + date14);
        var mdays = []; 
        if (doc.data().mon === true) {
            mdays.push(1);
            days = "Mon";
            cntrecdays = RecCount(date13,date14,1);
        }
        if (doc.data().tue === true) {
            mdays.push(2);
            if (days === ""){
                days = "Tue";
            }else{
                days = days + "," + "Tue";
            }
            cntrecdays = cntrecdays + RecCount(date13,date14,2);
        }
        if (doc.data().wed === true) {
            mdays.push(3);
            if (days === ""){
                days = "Wed";
            }else{
                days = days + "," + "Wed";
            } 
            cntrecdays = cntrecdays + RecCount(date13,date14,3);
        }
        if (doc.data().thu === true) {
            mdays.push(4);
            if (days === ""){
                days = "Thu";
            }else{
                days = days + "," + "Thu";
            }   
            cntrecdays = cntrecdays + RecCount(date13,date14,4);
        }
        if (doc.data().fri === true) {
            mdays.push(5);
            if (days === ""){
                days = "Fri";
            }else{
                days = days + "," + "Fri";
            }  
            cntrecdays = cntrecdays + RecCount(date13,date14,4);
        }
        if (dates)
        {
            console.log("777 dates: " + dates);
            //dates = dates + "<hr>" + cntrecdays + " Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h
            dates = dates + "<hr>" + "Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h
        }else{
            console.log("888 dates:" + dates);

            // dates = cntrecdays + " Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h
            dates = "Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h
        }
        var todaysdate77 = new Date().toLocaleDateString("en", options2);
        var range = date14
        console.log("range: " + range);
        console.log("todaysdate77:" + todaysdate77);
        range = new Date(range);
        todaysdate77 = new Date(todaysdate77);
        console.log("(range < todaysdate77):" + (range < todaysdate77));
        if (range < todaysdate77){
            const dateb = new Date(doc.data().date14);
            datesorts = addOneDay(dateb).toLocaleDateString("fr-CA", options2);
            console.log("out of range:" + datesorts);
            Datex.push(datesorts);
        }else{
             const date = new Date();
                const thisistodayday = date.getDay();
                console.log("thisistodayday" + thisistodayday);
                console.log("mdays.includes(thisistodayday)" + mdays.includes(thisistodayday));
            if (mdays.includes(thisistodayday)){
                datesorts = new Date().toLocaleDateString("fr-CA", options2);
            }else{
                datesorts = nextDate(mdays[0]);
            }
            console.log("in range:" + datesorts);
            Datex.push(datesorts);
        }
        //datesorts = new Date().toLocaleDateString("fr-CA", options2);;
        Datex.push(datesorts);
        Visitors.push(doc.data().login + new Date(doc.data().date14).toLocaleDateString("en", options2) + doc.data().rectime);
    }
        //Datex.sort((a, b) => new Date(b) - new Date(a)).reverse()
   // Datex.sort((a, b) => new Date(b) - new Date(a))
   // var todays = new Date().toLocaleDateString("fr-CA", options2);
  //  console.log("todays: " + todays);
    
    Datex.sort((a, b) => new Date(b) - new Date(a)).reverse()
    var todays = new Date().toLocaleDateString("fr-CA", options2);
    console.log("todays: " + todays);
    for(var i=0; i<Datex.length; i++){
        console.log("Datex[i]: " + Datex[i]);
        if(Datex[i] === todays){
            datesort = Datex[i]
            console.log("Datex[i] === todays " + datesort);
            break;
        }else if (Datex[i] > todays){
            datesort = Datex[i]
            console.log("Datex[i] > todays " + datesort);
            break;
        }else if (Datex[i] < todays){
            datesort = Datex[i]
            console.log("Datex[i] < todays" + datesort);
            //break;
        }
    }
    //document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
    var start = new Date();
    start.setHours(0,0,0,0);
    start = new Date(start.getTime() - (start.getTimezoneOffset() * 60000)).toISOString();
    var datechosen = new Date(datesort).toLocaleDateString("fr-CA", options2);
    var starts = new Date(start).toLocaleDateString("fr-CA", options2);
    console.log("starts :" + starts);
    console.log("datechosen :" + datechosen);
    if (datechosen >= starts){
    var namelinks = "<a href='https://aquavisitorsystem.github.io/?lname=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
    var companylinks = "<a href='https://aquavisitorsystem.github.io/?company=" + doc.data().company + "' target='_blank'>" + doc.data().company + "</a>";
    var glinks = "<a href='https://aquavisitorsystem.github.io/?userid=" + doc.data().login + "&report=active' target='_blank'>" + doc.data().login + "</a>";
    document.write('<tr title="ACTIVE SCHEDULE(S)"><td>' + glinks  + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
    }else{
        var namelinks = "<a href='https://aquavisitorsystem.github.io/?lname=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
        var companylinks = "<a href='https://aquavisitorsystem.github.io/?company=" + doc.data().company + "' target='_blank'>" + doc.data().company + "</a>";
        var glinks = "<a href='https://aquavisitorsystem.github.io/?userid=" + doc.data().login + "&report=active' target='_blank'>" + doc.data().login + "</a>";
        document.write('<tr style="opacity:0.2;background-color: lightgray;" title="INACTIVE SCHEDULE(S)"><td>' + glinks  + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
    }

     });
    var count = 0;
    try {
        var table = document.getElementById("report");
        count  = table.tBodies[0].rows.length;
    } catch (error) {
        count = 0;
    }
    //var table = document.getElementById("report");
    //var tbodyRowCount = table.tBodies[0].rows.length;
//let count = tbodyRowCount; //Visitors.length;
    
console.log("count: " +  count);
document.getElementById("numcount").innerHTML = count ;
document.getElementById("numcount").setAttribute("value",  count );
document.head.innerHTML = header;
document.write("</tbody></table>");
document.getElementsByTagName("body")[0].style.display = "none";
//spinnow(3000);
//setTimeout("sortByDate2(5)", 3000);
// setTimeout("sortByDate(5)", 6000);
})
    .catch((error) => {
        console.log("Error getting documents: ", error);
});
    console.log("arrayuserid: " +  arrayuserid);
    spinnow(3000);
    setTimeout("sortByDate2(5)", 3000);
}

    var loaduseridreport =  function(){
        var cntrecdays = 0;
        var db = firebase.firestore();
        var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: center;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
        var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>"; var lines = "";
        var RecordIDs = [];
        var cnt1;
        var datesort;
        var datesorts;
        var Visitors = [];


        let today = new Date().toISOString().slice(0, 10);
        db.collection("messages").where("remove", "==","No").orderBy("date","desc")
    .get()
    .then((querySnapshot) => {
        var cnt = querySnapshot.size;
        var gd = new Date();
        //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
        var gmyDate = new Date(gd).toLocaleString('en-US');   
        var gtodaysdate = gmyDate.toString();
        var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (Aqua UserID Report)</h1><h2><small>(click on UserID to view active VMS report)</small><br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small><br></h2><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br><br></center>";
        var logo = '<a href="https://aquavisitorsystem.github.io/"><img id="logo" src="aqua.png" width="250px" alt="Go Home"></a>'
        document.write(logo);
        document.write(title);
        document.write(printnow);

        if (cnt === 0){
            var nodata = "<center><br>No visitor data found<br></center>";
            document.write(nodata);
        }else{
            //	  document.write("<table  id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th>Date/Time</th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
            // document.write("<table  id='report' style='font-size: small;'>  <tr>    <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th>Date/Time</th>      <th>Email</th>       <th>Visiting</th><th>Edit</th>  </tr>");
            document.write("<table id='report' style='font-size: medium;'>  <thead><tr>    <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th></tr></thead>");
            document.write("<tbody>");
        }
        document.getElementsByTagName("body")[0].style.display = "none";
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
        var dates;
        var Datex = [];
        console.log("date2: " + doc.data().date2);
        //  var todays = new Date().toDateString();
        if (typeof doc.data().date !== 'undefined' && doc.data().date !=="") {
            dates = new Date(doc.data().date).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date).toLocaleDateString("fr-CA", options2)
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date2 !== 'undefined' && doc.data().date2 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date2).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date2).toLocaleDateString("fr-CA", options2)
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date3 !== 'undefined' && doc.data().date3 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date3).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date3).toLocaleDateString("fr-CA", options2)
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date4 !== 'undefined' && doc.data().date4 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date4).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date4).toLocaleDateString("fr-CA", options2)
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date5 !== 'undefined' && doc.data().date5 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date5).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date5).toLocaleDateString("fr-CA", options2)
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date6 !== 'undefined' && doc.data().date6 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date6).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date6).toLocaleDateString("fr-CA", options2)
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date7 !== 'undefined' && doc.data().date7 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date7).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date7).toLocaleDateString("fr-CA", options2)
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));

        }
        if (typeof doc.data().date8 !== 'undefined' && doc.data().date8 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date8).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date8).toLocaleDateString("fr-CA", options2);
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date9 !== 'undefined' && doc.data().date9 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date9).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date9).toLocaleDateString("fr-CA", options2)
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date10 !== 'undefined' && doc.data().date10 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date10).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date10).toLocaleDateString("fr-CA", options2)
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date11 !== 'undefined' && doc.data().date11 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date11).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date11).toLocaleDateString("fr-CA", options2)
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date12 !== 'undefined' && doc.data().date12 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date12).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date12).toLocaleDateString("fr-CA", options2);
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date14 !== 'undefined' && doc.data().date14 !=="") {
            cntrecdays = 0;
            h  =  tConvert (doc.data().rectime);
            var days = "";
            const datea = new Date(doc.data().date13);
            const dateb = new Date(doc.data().date14);
            var date13 = addOneDay(datea).toLocaleDateString("en", options2);
            var date14 = addOneDay(dateb).toLocaleDateString("en", options2);
            console.log("date13: " + date13);
            console.log("date14: " + date14);
            var mdays = []; 
            if (doc.data().mon === true) {
                mdays.push(1);
                days = "Mon";
                cntrecdays = RecCount(date13,date14,1);
            }
            if (doc.data().tue === true) {
                mdays.push(2);
                if (days === ""){
                    days = "Tue";
                }else{
                    days = days + "," + "Tue";
                }
                cntrecdays = cntrecdays + RecCount(date13,date14,2);
            }
            if (doc.data().wed === true) {
                mdays.push(3);
                if (days === ""){
                    days = "Wed";
                }else{
                    days = days + "," + "Wed";
                } 
                cntrecdays = cntrecdays + RecCount(date13,date14,3);
            }
            if (doc.data().thu === true) {
                mdays.push(4);
                if (days === ""){
                    days = "Thu";
                }else{
                    days = days + "," + "Thu";
                }   
                cntrecdays = cntrecdays + RecCount(date13,date14,4);
            }
            if (doc.data().fri === true) {
                mdays.push(5);
                if (days === ""){
                    days = "Fri";
                }else{
                    days = days + "," + "Fri";
                }  
                cntrecdays = cntrecdays + RecCount(date13,date14,4);
            }
            //dates = cntrecdays + " Recurring Until: " + "<br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h
            dates = "Recurring Until: " + "<br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h
            const date = new Date();
            const thisistodayday = date.getDay();
            var todaysdate77 = new Date().toLocaleDateString("en", options2);
            var range = date14
            range = new Date(range);
            todaysdate77 = new Date(todaysdate77);
            console.log("range:" + range);
            console.log("todaysdate77:" + todaysdate77);
            if (range < todaysdate77){
                datesorts = new Date(date14).toLocaleDateString("fr-CA", options2); //addOneDay(dateb).toLocaleDateString("fr-CA", options2);
                console.log("out of range: dateb: " + dateb + " datesorts: " + datesorts);
            }else{
                console.log("in range:" + datesorts);
                if (mdays.includes(thisistodayday)){
                    datesorts = new Date().toLocaleDateString("fr-CA", options2);
                }else{
                    datesorts = nextDate(mdays[0]);
                }
            }
            //datesorts = new Date().toLocaleDateString("fr-CA", options2);;
            Datex.push(datesorts);
            Visitors.push(doc.data().login + new Date(doc.data().date14).toLocaleDateString("en", options2) + doc.data().rectime);
        }
        //Datex.sort((a, b) => new Date(b) - new Date(a)).reverse()
        Datex.sort((a, b) => new Date(b) - new Date(a))
        var todays = new Date().toLocaleDateString("fr-CA", options2);
        console.log("todays: " + todays);
        for(var i=0; i<Datex.length; i++){
            console.log("Datex[i]: " + Datex[i]);
            //if(Datex[i] === todays){
            //    datesort = Datex[i]
            //    break;
            //}else if (Datex[i] > todays){
            //    datesort = Datex[i]
            //    break;
            //}
            if(Datex[i] === todays){
                datesort = Datex[i]
                console.log("Datex[i] === todays " + datesort);
                break;
            }else if (Datex[i] > todays){
                datesort = Datex[i]
                console.log("Datex[i] > todays " + datesort);
                break;
            }else if (Datex[i] < todays){
                datesort = Datex[i]
                console.log("Datex[i] < todays" + datesort);
                break;
            }
        }


        // datesort = next_dates;

        //datesort = Datex.reduce((a, b) => (a.MeasureDate > b.MeasureDate ? a : b));
        //console.log("DateSort: " + Datex.reduce((a, b) => (a.MeasureDate > b.MeasureDate ? a : b)));
        //console.log("loaddbeverything:" + dates);
        //document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
        //document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
       // document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
        arrayuserid.push(doc.data().login);
    });
    var count = 0;
    try {
        var table = document.getElementById("report");
        count  = table.tBodies[0].rows.length;
    } catch (error) {
        count = 0;
    }
    //var table = document.getElementById("report");
    //var tbodyRowCount = table.tBodies[0].rows.length;
    //let count = tbodyRowCount; //Visitors.length;
    arrayuserid = [...new Set(arrayuserid)];
    arrayuserid.sort();
    console.log("arrayuserid: " +  arrayuserid);
    for (var i = 0; i < arrayuserid.length; i++) {
        //console.log(arrayuserid[i]);
        //Do something
        var glinks = "<a href='https://aquavisitorsystem.github.io/?userid=" + arrayuserid[i] + "&report=active' target='_blank'>" + arrayuserid[i] + "</a>";
        document.write('<tr><td>' + glinks + '</td></tr>');
    }
    console.log("count: " +  count);
   // document.getElementById("numcount").innerHTML = count ;
    //document.getElementById("numcount").setAttribute("value",  count );
    document.head.innerHTML = header;
    document.write("</tbody></table>");
    document.getElementsByTagName("body")[0].style.display = "none";
    //spinnow(3000);
    //setTimeout("sortByDate2(5)", 3000);
    // setTimeout("sortByDate(5)", 6000);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    console.log("arrayuserid: " +  arrayuserid);
    spinnow(3000);
    setTimeout("sortByDate2(5)", 3000);
    }

    var loaddbeverythingall =  function(){
        var cntrecdays = 0;
        var db = firebase.firestore();
        var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}#gohome{display:none;}#report tr > *:nth-child(9){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
        var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>"; var lines = "";
        var RecordIDs = [];
        var cnt1;
        var count1;
        var datesorts;
        var Visitors = [];
        var seleceteddate;
        let today = new Date().toISOString().slice(0, 10);
        db.collection("messages").where("remove", "==","No").orderBy("date","desc")
    .get()
    .then((querySnapshot) => {

        var cnt = querySnapshot.size;
        //(+  "<label id='numcount'></label>" + )
        var gd = new Date();
        //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
        var gmyDate = new Date(gd).toLocaleString('en-US');   
        var gtodaysdate = gmyDate.toString()
        var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (active report)</h1><h2>" +   "<label id='numcount'></label>" + " Active Visitor Schedule(s)<br><small style='font-size: 17px;color: grey;'>(showing all present & future schedules)</small><br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small></h2><div id='gohome'><a href='https://aquavisitorsystem.github.io/'>Go Home</a></div><br><br></center>";
        var goback = '<br><center><a href="javascript:history.go(-1);">[Go Back]</a></center><br>';
        //var goback = ' | <a href="javascript:window.location=document.referrer;">Go Back</a>';
        var logo = '<a href="https://aquavisitorsystem.github.io/"><img id="logo" src="aqua.png" width="250px" alt="Go Home"></a>'
        document.write(logo);
        document.write(title);
        document.write(printnow);
        if (cnt === 0){
            var nodata = "<center><br>No visitor data found<br></center>";
            document.write(nodata);
        }else{
            //	  document.write("<table  id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th>Date/Time</th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
            // document.write("<table  id='report' style='font-size: small;'>  <tr>    <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th>Date/Time</th>      <th>Email</th>       <th>Visiting</th><th>Edit</th>  </tr>");
            document.write("<table id='report' style='font-size: small;'>  <thead><tr>    <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th  style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th>Date/Time(s)</th><th  style='cursor: pointer; color: red;' onclick='sortTable(5)'>MeetingDate<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th><th>Email</th>       <th>Visiting</th><th>Edit</th></tr></thead>");
            document.write("<tbody>");
        }
        document.getElementsByTagName("body")[0].style.display = "none";
        var d = new Date();
        dates = "";
        var Datex = [];
        var todaysdate = new Date();
        todaysdate.setHours(0,0,0,0);
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
        var options3 = {
            hour: "2-digit",
            minute: "2-digit"
        };

        
        var date01 = new Date(doc.data().date)
        var date02 = new Date(doc.data().date2)
        var date03 = new Date(doc.data().date3)
        var date04 = new Date(doc.data().date4)
        var date05 = new Date(doc.data().date5)
        var date06 = new Date(doc.data().date6)
        var date07 = new Date(doc.data().date7)
        var date08 = new Date(doc.data().date8)
        var date09 = new Date(doc.data().date9)
        var date10 = new Date(doc.data().date10)
        var date11 = new Date(doc.data().date11)
        var date12 = new Date(doc.data().date12)
        var startdates = new Date(doc.data().date13)
        var enddates = new Date(doc.data().date14)
        var rectime = new Date(doc.data().rectime)
        var mon = new Date(doc.data().mon)
        var tue = new Date(doc.data().tue)
        var wed = new Date(doc.data().wed)
        var thu = new Date(doc.data().thu)
        var fri = new Date(doc.data().fri)
        if ((date01 >= todaysdate) || (date02 >= todaysdate) || (date03 >= todaysdate) || (date04 >= todaysdate) || (date05 >= todaysdate) || (date06 >= todaysdate) || (date07 >= todaysdate) || (date08 >= todaysdate) || (date09 >= todaysdate) || (date10 >= todaysdate) || (date11 >= todaysdate) || (date12 >= todaysdate) || (enddates >= todaysdate)){
    seleceteddate = "";
    datesorts = "";
    Datex.length = 0;
        //  var todays = new Date().toDateString();
        if (typeof doc.data().date !== 'undefined' && doc.data().date !==""  && new Date(doc.data().date) >= todaysdate) {
            seleceteddate = new Date(doc.data().date).toLocaleDateString("en", options)
            datesorts = new Date(doc.data().date).toLocaleDateString("fr-CA", options2)
            Datex.push(datesorts);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date2 !== 'undefined' && doc.data().date2 !==""  && new Date(doc.data().date2) >= todaysdate) {
            seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date2).toLocaleDateString("en", options)
            datesorts = new Date(doc.data().date2).toLocaleDateString("fr-CA", options2)
            Datex.push(datesorts);
            Visitors.push(doc.data().login + new Date(doc.data().date2).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date3 !== 'undefined' && doc.data().date3 !==""  && new Date(doc.data().date3) >= todaysdate) {
            seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date3).toLocaleDateString("en", options)
            datesorts = new Date(doc.data().date3).toLocaleDateString("fr-CA", options2)
            Datex.push(datesorts);
            Visitors.push(doc.data().login + new Date(doc.data().date3).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date4 !== 'undefined' && doc.data().date4 !=="" && new Date(doc.data().date4) >= todaysdate) {
            seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date4).toLocaleDateString("en", options)
            datesorts = new Date(doc.data().date4).toLocaleDateString("fr-CA", options2)
            Datex.push(datesorts);
            Visitors.push(doc.data().login + new Date(doc.data().date4).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date5 !== 'undefined' && doc.data().date5 !=="" && new Date(doc.data().date5) >= todaysdate) {
            seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date5).toLocaleDateString("en", options)
            datesorts = new Date(doc.data().date5).toLocaleDateString("fr-CA", options2)
            Datex.push(datesorts);
            Visitors.push(doc.data().login + new Date(doc.data().date5).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date6 !== 'undefined' && doc.data().date6 !=="" && new Date(doc.data().date6) >= todaysdate) {
            seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date6).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date6).toLocaleDateString("fr-CA", options2)
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date6).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date7 !== 'undefined' && doc.data().date7 !=="" && new Date(doc.data().date7) >= todaysdate) {
            seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date7).toLocaleDateString("en", options)
            datesorts = new Date(doc.data().date7).toLocaleDateString("fr-CA", options2)
            Datex.push(datesorts);
            Visitors.push(doc.data().login + new Date(doc.data().date7).toLocaleDateString("en", options));

        }
        if (typeof doc.data().date8 !== 'undefined' && doc.data().date8 !=="" && new Date(doc.data().date8) >= todaysdate) {
            seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date8).toLocaleDateString("en", options)
            datesorts = new Date(doc.data().date8).toLocaleDateString("fr-CA", options2);
            Datex.push(datesorts);
            Visitors.push(doc.data().login + new Date(doc.data().date8).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date9 !== 'undefined' && doc.data().date9 !=="" && new Date(doc.data().date9) >= todaysdate) {
            seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date9).toLocaleDateString("en", options)
            datesorts = new Date(doc.data().date9).toLocaleDateString("fr-CA", options2)
            Datex.push(datesorts);
           Visitors.push(doc.data().login + new Date(doc.data().date9).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date10 !== 'undefined' && doc.data().date10 !=="" && new Date(doc.data().date10) >= todaysdate) {
            seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date10).toLocaleDateString("en", options)
            datesorts = new Date(doc.data().date10).toLocaleDateString("fr-CA", options2)
            Datex.push(datesorts);
            Visitors.push(doc.data().login + new Date(doc.data().date110).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date11 !== 'undefined' && doc.data().date11 !=="" && new Date(doc.data().date11) >= todaysdate) {
            seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date11).toLocaleDateString("en", options)
            datesorts = new Date(doc.data().date11).toLocaleDateString("fr-CA", options2)
            Datex.push(datesorts);
          Visitors.push(doc.data().login + new Date(doc.data().date11).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date12 !== 'undefined' && doc.data().date12 !=="" && new Date(doc.data().date12) >= todaysdate) {
            seleceteddate = seleceteddate + "<br>" + new Date(doc.data().date12).toLocaleDateString("en", options)
            datesorts = new Date(doc.data().date12).toLocaleDateString("fr-CA", options2);
            Datex.push(datesorts);
            Visitors.push(doc.data().login + new Date(doc.data().date12).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date14 !== 'undefined' && doc.data().date14 !=="" && new Date(doc.data().date14) >= todaysdate) {
            cntrecdays = 0;
            h  =  tConvert (doc.data().rectime);
          //  h = new Date(doc.data().rectime).toLocaleTimeString("en", options3);
            var days = "";
            const datea = new Date(doc.data().date13);
            const dateb = new Date(doc.data().date14);
            var date13 = addOneDay(datea).toLocaleDateString("en", options2);
            var date14 = addOneDay(dateb).toLocaleDateString("en", options2);
            console.log("date13: " + date13);
            console.log("date14: " + date14);
            var mdays = []; 
            if (doc.data().mon === true) {
                mdays.push(1);
                days = "Mon";
                cntrecdays = RecCount(date13,date14,1);
            }
            if (doc.data().tue === true) {
                mdays.push(2);
                if (days === ""){
                    days = "Tue";
                }else{
                    days = days + "," + "Tue";
                }    
                cntrecdays = cntrecdays + RecCount(date13,date14,2);
            }
            if (doc.data().wed === true) {
                mdays.push(3);
                if (days === ""){
                    days = "Wed";
                }else{
                    days = days + "," + "Wed";
                } 
                cntrecdays = cntrecdays + RecCount(date13,date14,3);
            }
            if (doc.data().thu === true) {
                mdays.push(4);
                if (days === ""){
                    days = "Thu";
                }else{
                    days = days + "," + "Thu";
                }   
                cntrecdays = cntrecdays + RecCount(date13,date14,4);
            }
            if (doc.data().fri === true) {
                mdays.push(5);
                if (days === ""){
                    days = "Fri";
                }else{
                    days = days + "," + "Fri";
                }  
                cntrecdays = cntrecdays + RecCount(date13,date14,5);
            }
            //seleceteddate = cntrecdays + " Recurring Until: " + "<br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h
            seleceteddate = "Recurring Until: " + "<br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h
              const date = new Date();
                    const thisistodayday = date.getDay();
            if (mdays.includes(thisistodayday)){
                datesorts = new Date().toLocaleDateString("fr-CA", options2);
            }else{
                datesorts = nextDate(mdays[0]);
            }
            //datesorts = new Date().toLocaleDateString("fr-CA", options2);;
            Datex.push(datesorts);
          
            Visitors.push(doc.data().login + new Date(doc.data().date14).toLocaleDateString("en", options2) + rectime);
        }
        console.log("cntrecdays: " + cntrecdays);
            // count1 = count1 + dates.find('<br>').length
          
            console.log(seleceteddate);
            
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
            var namelinks = "<a href='https://aquavisitorsystem.github.io/?lname=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
            var companylinks = "<a href='https://aquavisitorsystem.github.io/?company=" + doc.data().company + "' target='_blank'>" + doc.data().company + "</a>";
            var glinks = "<a href='https://aquavisitorsystem.github.io/?userid=" + doc.data().login + "&report=active' target='_blank'>" + doc.data().login + "</a>";
            document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + seleceteddate + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
           //document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + seleceteddate + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');

        }
     
    });
    var count = 0;
    try {
        var table = document.getElementById("report");
        count  = table.tBodies[0].rows.length;
    } catch (error) {
        count = 0;
    }
    //var table = document.getElementById("report");
    //var tbodyRowCount = table.tBodies[0].rows.length;
    //let count = tbodyRowCount; //Visitors.length;
console.log("count: " +  count);
document.getElementById("numcount").innerHTML = count ;
document.getElementById("numcount").setAttribute("value", count );
    document.head.innerHTML = header;
    document.write("</tbody></table>");
    document.getElementsByTagName("body")[0].style.display = "none";
   // spinnow(3000);
   // setTimeout("sortTable(5)", 3000);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    spinnow(3000);
    setTimeout("sortTable(5)", 3000);
}
       
    var loaddbeverythings =  function(){
        var cntrecdays = 0;
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
    if (typeof doc.data().date14 !== 'undefined' && doc.data().date14 !=="") {
       cntrecdays = 0;
	    const datea = new Date(doc.data().date13);
           const dateb = new Date(doc.data().date14);
        var date13 = addOneDay(datea).toLocaleDateString("en", options2);
        var date14 = addOneDay(dateb).toLocaleDateString("en", options2);
        console.log("date13: " + date13);
        console.log("date14: " + date14);
        if (doc.data().mon === true) {
            cntrecdays = RecCount(date13,date14,1);
        }
        if (doc.data().tue === true) {
            cntrecdays = cntrecdays + RecCount(date13,date14,2);
        }
        if (doc.data().wed === true) {
            cntrecdays = cntrecdays + RecCount(date13,date14,3);
        }
        if (doc.data().thu === true) {
            cntrecdays = cntrecdays + RecCount(date13,date14,4);
        }
        if (doc.data().fri === true) {
            cntrecdays = cntrecdays + RecCount(date13,date14,4);
        }
      //  dates = cntrecdays + " Recurring Until: " + "<br>" + new Date(doc.data().date14).toLocaleDateString("en", options2
            dates = "Recurring Until: " + "<br>" + new Date(doc.data().date14).toLocaleDateString("en", options2)
        //datesorts = new Date().toLocaleDateString("fr-CA", options2);;
       // Datex.push(datesorts);
        Visitors.push(doc.data().login + new Date(doc.data().date14).toLocaleDateString("en", options2) + doc.data().rectime);
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
// var get_login=prompt("Search Company Name","Type Here Full or Start of Guest Last Name");
    var loadname =  function(){
        var cntrecdays = 0;
        var datesorts;
       
    var db = firebase.firestore();
    var Visitors = [];	
    //var get_login=prompt("Search Guest Last Name","Type Here Full or Start of Guest Last Name");
    var get_login=prompt("Search Guest Last Name\r\n1) Enter Full or Start of Guest Last Name\r\n    Example: Smith or Sm\r\n2) Click [Ok] or [Enter] key", "Enter Guest Last Name Here");
    if (get_login === "Enter Guest Last Name Here") {
        alert("Please Try Again! Enter Guest Last Name.");
        loadname();
    }else if (get_login  === null){
        clear();
        spinnow(3000);
        setTimeout("window.location.reload();", 3000);
    }else{
        var gd = new Date();
        //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
        var gmyDate = new Date(gd).toLocaleString('en-US');   
        var gtodaysdate = gmyDate.toString()
        get_login  = get_login.toString();
        get_login = get_login.trim().toUpperCase();
        console.log(get_login);
        var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}#gohome{display:none;}#report tr > *:nth-child(8){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
        var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>"; var lines = "";  var lines = "";
        let today = new Date().toISOString().slice(0, 10);
        //db.collection("messages").where("lastname", "==",get_login).where("remove", "==","No").orderBy("date","desc")
        db.collection("messages").where("remove", "==","No").orderBy('lastname').startAt(get_login).endAt(get_login+'\uf8ff')
      .get()
   .then((querySnapshot) => {
       var cnt = querySnapshot.size;
        var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (name report)</h1><h2>" + "<label id='numcount'></label>" + " Active Visitor Schedule(s) for Last name(s) starting with: " + get_login + "<br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small><br></h2><div id='gohome'><a href='https://aquavisitorsystem.github.io/'>Go Home</a></div><br><br></center>";
        //var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (name report)</h1><h2>" + "Visitor Schedule(s) for: " + get_login + "</h2><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br><br></center>";
        var logo = '<a href="https://aquavisitorsystem.github.io/"><img id="logo" src="aqua.png" width="250px" alt="Go Home"></a>'
        document.write(logo);
        document.write(title);
        document.write(printnow);
        if (cnt === 0){
            var nodata = "<center><br>No visitor data found<br></center>";
            document.write(nodata);
        }else{
            //document.write("<table id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
            document.write("<table id='report' style='font-size: small;'>  <thead><tr>    <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortByDate2(4)'>Date/Time<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>Edit</th>  </tr></thead>");
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
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        };
        var options3= {
            hour: "2-digit",
            minute: "2-digit"
        };
        var options99 = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        };
        var dates;// = new Date(doc.data().date).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date).toLocaleTimeString("en", options2)
        console.log("loadinactive:" + dates);
        var Datex = [];
        //Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        if (typeof doc.data().date !== 'undefined' && doc.data().date !=="") {
            dates = new Date(doc.data().date).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date).toLocaleTimeString("en", options3);
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date2 !== 'undefined' && doc.data().date2 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date2).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date2).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date2).toLocaleTimeString("en", options3);
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date3 !== 'undefined' && doc.data().date3 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date3).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date3).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date3).toLocaleTimeString("en", options3);
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date4 !== 'undefined' && doc.data().date4 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date4).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date4).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date4).toLocaleTimeString("en", options3);
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date5 !== 'undefined' && doc.data().date5 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date5).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date5).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date5).toLocaleTimeString("en", options3);
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date6 !== 'undefined' && doc.data().date6 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date6).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date6).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date6).toLocaleTimeString("en", options3);
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date7 !== 'undefined' && doc.data().date7 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date7).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date7).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date7).toLocaleTimeString("en", options3);
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));

        }
        if (typeof doc.data().date8 !== 'undefined' && doc.data().date8 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date8).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date8).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date8).toLocaleTimeString("en", options3);
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date9 !== 'undefined' && doc.data().date9 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date9).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date9).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date9).toLocaleTimeString("en", options3);
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date10 !== 'undefined' && doc.data().date10 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date10).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date10).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date10).toLocaleTimeString("en", options3);
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date11 !== 'undefined' && doc.data().date11 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date11).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date11).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date11).toLocaleTimeString("en", options3);
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date12 !== 'undefined' && doc.data().date12 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date12).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date12).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date12).toLocaleTimeString("en", options3);
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date13 !== 'undefined' && doc.data().date13 !=="") {
            cntrecdays= 0;
            h  =  tConvert (doc.data().rectime);
            var days = "";
             const datea = new Date(doc.data().date13);
            const dateb = new Date(doc.data().date14);
            var date13 = addOneDay(datea).toLocaleDateString("en", options);
            var date14 = addOneDay(dateb).toLocaleDateString("en", options);
            console.log("date13: " + date13);
            console.log("date14: " + date14);
            var mdays = []; 
            if (doc.data().mon === true) {
                mdays.push(1);
                days = "Mon";
                cntrecdays = RecCount(date13,date14,1);
            }
            if (doc.data().tue === true) {
                mdays.push(2);
                if (days === ""){
                    days = "Tue";
                }else{
                    days = days + "," + "Tue";
                }    
                cntrecdays = cntrecdays + RecCount(date13,date14,2);
            }
            if (doc.data().wed === true) {
                mdays.push(3);
                if (days === ""){
                    days = "Wed";
                }else{
                    days = days + "," + "Wed";
                } 
                cntrecdays = cntrecdays + RecCount(date13,date14,3);
            }
            if (doc.data().thu === true) {
                mdays.push(4);
                if (days === ""){
                    days = "Thu";
                }else{
                    days = days + "," + "Thu";
                }   
                cntrecdays = cntrecdays + RecCount(date13,date14,4);
            }
            if (doc.data().fri === true) {
                mdays.push(5);
                if (days === ""){
                    days = "Fri";
                }else{
                    days = days + "," + "Fri";
                }  
                cntrecdays = cntrecdays + RecCount(date13,date14,5);
            }
            
            if (dates)
            {
                //dates = dates + "<hr>" + cntrecdays + " Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h;
                dates = dates + "<hr>" + "Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h;
            }else{
                console.log("dates:" + dates);
                //dates = cntrecdays + " Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h;
                dates = "Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h;
            }

            var todaysdate77 = new Date().toLocaleDateString("en", options2);
            var range = date14
            console.log("range: " + range);
            console.log("todaysdate77:" + todaysdate77);
            range = new Date(range);
            todaysdate77 = new Date(todaysdate77);
            console.log("(range < todaysdate77):" + (range < todaysdate77));
            var hh  =  tConvert (doc.data().rectime);
            if (range < todaysdate77){
                const dateb = new Date(doc.data().date14);
                datesorts = addOneDay(dateb).toLocaleDateString("fr-CA", options2) + "," + addOneDay(dateb).toLocaleTimeString("en", options3);
                console.log("out of range:" + datesorts);
                Datex.push(datesorts);
            }else{
                 const date = new Date();
                    const thisistodayday = date.getDay();
                console.log("thisistodayday" + thisistodayday);
                console.log("mdays.includes(thisistodayday)" + mdays.includes(thisistodayday));
                if (mdays.includes(thisistodayday)){
                    datesorts = new Date().toLocaleDateString("fr-CA", options2) + "," + hh;
                }else{
                    datesorts = nextDate(mdays[0]) + "," + hh;;
                }
                console.log("in range:" + datesorts);
                Datex.push(datesorts);
            }
            //datesorts = new Date().toLocaleDateString("fr-CA", options2);;
            Datex.push(datesorts);
            Visitors.push(doc.data().login + new Date(doc.data().date13).toLocaleDateString("en", options));
        }
        console.log("loadname:" + dates);

        Datex.sort((a, b) => new Date(b) - new Date(a)).reverse()
        var todays = new Date().toLocaleDateString("fr-CA", options2);
        console.log("todays: " + todays);
        for(var i=0; i<Datex.length; i++){
            console.log("Datex[i]: " + Datex[i]);
            if(Datex[i] === todays){
                datesort = Datex[i]
                console.log("Datex[i] === todays " + datesort);
                break;
            }else if (Datex[i] > todays){
                datesort = Datex[i]
                console.log("Datex[i] > todays " + datesort);
                break;
            }else if (Datex[i] < todays){
                datesort = Datex[i]
                console.log("Datex[i] < todays" + datesort);
                //break;
            }
        }
        //var namelinks = "<a href='https://aquavisitorsystem.github.io/?lname=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
        //var companylinks = "<a href='https://aquavisitorsystem.github.io/?company=" + doc.data().company + "' target='_blank'>" + doc.data().company + "</a>";
        //var glinks = "<a href='https://aquavisitorsystem.github.io/?userid=" + doc.data().login + "&report=active' target='_blank'>" + doc.data().login + "</a>";
        ////  document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
        //document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
        var start = new Date();
        start.setHours(0,0,0,0);
        start = new Date(start.getTime() - (start.getTimezoneOffset() * 60000)).toISOString();

        var datechosen = new Date(datesort).toLocaleDateString("fr-CA", options2);
        var starts = new Date(start).toLocaleDateString("fr-CA", options2);
        console.log("starts :" + starts);
        console.log("datechosen :" + datechosen);
        if (datechosen >= starts){
            var companylinks = "<a href='https://aquavisitorsystem.github.io/?company=" + doc.data().company + "' target='_blank'>" + doc.data().company + "</a>";
            var namelinks = "<a href='https://aquavisitorsystem.github.io/?lname=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
            var glinks = "<a href='https://aquavisitorsystem.github.io/?userid=" + doc.data().login + "&report=active' target='_blank'>" + doc.data().login + "</a>";
            //  document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
            document.write('<tr title="ACTIVE SCHEDULE(S)"><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
        }else{
            var companylinks = "<a href='https://aquavisitorsystem.github.io/?company=" + doc.data().company + "' target='_blank'>" + doc.data().company + "</a>";
            var namelinks = "<a href='https://aquavisitorsystem.github.io/?lname=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
            var glinks = "<a href='https://aquavisitorsystem.github.io/?userid=" + doc.data().login + "&report=active' target='_blank'>" + doc.data().login + "</a>";
            document.write('<tr style="opacity:0.2;background-color: lightgray;" title="INACTIVE SCHEDULE(S)"><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
        }
    });
    var count = 0;
        try {
            var table = document.getElementById("report");
            count  = table.tBodies[0].rows.length;
        } catch (error) {
            count = 0;
        }
    //var table = document.getElementById("report");
    //var tbodyRowCount = table.tBodies[0].rows.length;
    //let count = tbodyRowCount; //Visitors.length;
        console.log("count: " +  count);
        const rows = document.querySelectorAll('[title="ACTIVE SCHEDULE(S)"]');
        count =  rows.length

    document.getElementById("numcount").innerHTML = count;
    document.getElementById("numcount").setAttribute("value",  count);
    document.head.innerHTML = header;
    document.write("</table>");
    document.getElementsByTagName("body")[0].style.display = "none";
    //spinnow(3000);
    //setTimeout("sortByDate2(4)", 3000);
})
    .catch((error) => {
        console.log("Error getting documents: ", error);
});
    spinnow(3000);
    setTimeout("sortByDate2(4)", 3000);
}
    //spinnow(3000);
    //setTimeout("sortByDate2(4)", 3000);
}

    var loadnamelink =  function(){
        var cntrecdays = 0;
        var datesorts;
       
        var db = firebase.firestore();
        var Visitors = [];	
        //var get_login=prompt("Search Guest Last Name","Type Here Full or Start of Guest Last Name");
        //var get_login=prompt("Search Guest Last Name\r\n1) Enter Full or Start of Guest Last Name\r\n    Example: Smith or Sm\r\n2) Click [Ok] or [Enter] key", "Enter Guest Last Name Here");
        var get_login=data["lastname"];
      
        if (get_login  === null || get_login === "Enter Guest Last Name Here") {
            alert("Please Try Again! Enter Guest Last Name.");
        }else{
            var gd = new Date();
            //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
            var gmyDate = new Date(gd).toLocaleString('en-US');   
            var gtodaysdate = gmyDate.toString()
            get_login  = get_login.toString();
            get_login = get_login.trim().toUpperCase();
            console.log(get_login);
            var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}#gohome{display:none;}#report tr > *:nth-child(8){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
            var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>"; var lines = "";  var lines = "";
            let today = new Date().toISOString().slice(0, 10);
            //db.collection("messages").where("lastname", "==",get_login).where("remove", "==","No").orderBy("date","desc")
            db.collection("messages").where("remove", "==","No").orderBy('lastname').startAt(get_login).endAt(get_login+'\uf8ff')
          .get()
       .then((querySnapshot) => {
           var cnt = querySnapshot.size;
            var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (name report)</h1><h2>" + "<label id='numcount'></label>" + " Active Visitor Schedule(s) for Last name(s) starting with: " + get_login + "<br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small><br></h2><div id='gohome'><a href='https://aquavisitorsystem.github.io/'>Go Home</a></div><br><br></center>";
            //var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (name report)</h1><h2>" + "Visitor Schedule(s) for: " + get_login + "</h2><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br><br></center>";
            var logo = '<a href="https://aquavisitorsystem.github.io/"><img id="logo" src="aqua.png" width="250px" alt="Go Home"></a>'
            document.write(logo);
            document.write(title);
            document.write(printnow);
            if (cnt === 0){
                var nodata = "<center><br>No visitor data found<br></center>";
                document.write(nodata);
            }else{
                //document.write("<table id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
                document.write("<table id='report' style='font-size: small;'>  <thead><tr>    <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortByDate2(4)'>Date/Time<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>Edit</th>  </tr></thead>");
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
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            };
            var options3= {
                hour: "2-digit",
                minute: "2-digit"
            };

            var dates;// = new Date(doc.data().date).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date).toLocaleTimeString("en", options2)
            console.log("loadinactive:" + dates);
            var Datex = [];
            //Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            if (typeof doc.data().date !== 'undefined' && doc.data().date !=="") {
                dates = new Date(doc.data().date).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date2 !== 'undefined' && doc.data().date2 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date2).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date2).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date2).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date3 !== 'undefined' && doc.data().date3 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date3).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date3).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date3).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date4 !== 'undefined' && doc.data().date4 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date4).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date4).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date4).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date5 !== 'undefined' && doc.data().date5 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date5).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date5).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date5).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date6 !== 'undefined' && doc.data().date6 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date6).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date6).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date6).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date7 !== 'undefined' && doc.data().date7 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date7).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date7).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date7).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));

            }
            if (typeof doc.data().date8 !== 'undefined' && doc.data().date8 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date8).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date8).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date8).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date9 !== 'undefined' && doc.data().date9 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date9).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date9).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date9).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date10 !== 'undefined' && doc.data().date10 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date10).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date10).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date10).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date11 !== 'undefined' && doc.data().date11 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date11).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date11).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date11).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date12 !== 'undefined' && doc.data().date12 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date12).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date12).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date12).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date13 !== 'undefined' && doc.data().date13 !=="") {
                cntrecdays= 0;
                h  =  tConvert (doc.data().rectime);
                var days = "";
                 const datea = new Date(doc.data().date13);
                const dateb = new Date(doc.data().date14);
                var date13 = addOneDay(datea).toLocaleDateString("en", options);
                var date14 = addOneDay(dateb).toLocaleDateString("en", options);
                console.log("date13: " + date13);
                console.log("date14: " + date14);
                var mdays = []; 
                if (doc.data().mon === true) {
                    mdays.push(1);
                    days = "Mon";
                    cntrecdays = RecCount(date13,date14,1);
                }
                if (doc.data().tue === true) {
                    mdays.push(2);
                    if (days === ""){
                        days = "Tue";
                    }else{
                        days = days + "," + "Tue";
                    }    
                    cntrecdays = cntrecdays + RecCount(date13,date14,2);
                }
                if (doc.data().wed === true) {
                    mdays.push(3);
                    if (days === ""){
                        days = "Wed";
                    }else{
                        days = days + "," + "Wed";
                    } 
                    cntrecdays = cntrecdays + RecCount(date13,date14,3);
                }
                if (doc.data().thu === true) {
                    mdays.push(4);
                    if (days === ""){
                        days = "Thu";
                    }else{
                        days = days + "," + "Thu";
                    }   
                    cntrecdays = cntrecdays + RecCount(date13,date14,4);
                }
                if (doc.data().fri === true) {
                    mdays.push(5);
                    if (days === ""){
                        days = "Fri";
                    }else{
                        days = days + "," + "Fri";
                    }  
                    cntrecdays = cntrecdays + RecCount(date13,date14,5);
                }
            
                if (dates)
                {
                    //dates = dates + "<hr>" + cntrecdays + " Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h;
                    dates = dates + "<hr>" + "Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h;
                }else{
                    console.log("dates:" + dates);
                    //dates = cntrecdays + " Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h;
                    dates = "Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h;
                }

                var todaysdate77 = new Date().toLocaleDateString("en", options2);
                var range = date14
                console.log("range: " + range);
                console.log("todaysdate77:" + todaysdate77);
                range = new Date(range);
                todaysdate77 = new Date(todaysdate77);
                console.log("(range < todaysdate77):" + (range < todaysdate77));
                var hh  =  tConvert (doc.data().rectime);
                if (range < todaysdate77){
                    const dateb = new Date(doc.data().date14);
                    datesorts = addOneDay(dateb).toLocaleDateString("fr-CA", options2) + "," + addOneDay(dateb).toLocaleTimeString("en", options3);
                    console.log("out of range:" + datesorts);
                    Datex.push(datesorts);
                }else{
                     const date = new Date();
                        const thisistodayday = date.getDay();
                    console.log("thisistodayday" + thisistodayday);
                    console.log("mdays.includes(thisistodayday)" + mdays.includes(thisistodayday));
                    if (mdays.includes(thisistodayday)){
                        datesorts = new Date().toLocaleDateString("fr-CA", options2) + "," + hh;
                    }else{
                        datesorts = nextDate(mdays[0]) + "," + hh;;
                    }
                    console.log("in range:" + datesorts);
                    Datex.push(datesorts);
                }
                //datesorts = new Date().toLocaleDateString("fr-CA", options2);;
                Datex.push(datesorts);
                Visitors.push(doc.data().login + new Date(doc.data().date13).toLocaleDateString("en", options));
            }
            console.log("loadname:" + dates);

            Datex.sort((a, b) => new Date(b) - new Date(a)).reverse()
            var todays = new Date().toLocaleDateString("fr-CA", options2);
            console.log("todays: " + todays);
            for(var i=0; i<Datex.length; i++){
                console.log("Datex[i]: " + Datex[i]);
                if(Datex[i] === todays){
                    datesort = Datex[i]
                    console.log("Datex[i] === todays " + datesort);
                    break;
                }else if (Datex[i] > todays){
                    datesort = Datex[i]
                    console.log("Datex[i] > todays " + datesort);
                    break;
                }else if (Datex[i] < todays){
                    datesort = Datex[i]
                    console.log("Datex[i] < todays" + datesort);
                    //break;
                }
            }
            //var namelinks = "<a href='https://aquavisitorsystem.github.io/?lname=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
            //var companylinks = "<a href='https://aquavisitorsystem.github.io/?company=" + doc.data().company + "' target='_blank'>" + doc.data().company + "</a>";
            //var glinks = "<a href='https://aquavisitorsystem.github.io/?userid=" + doc.data().login + "&report=active' target='_blank'>" + doc.data().login + "</a>";
            ////  document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
            //document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
            var start = new Date();
            start.setHours(0,0,0,0);
            start = new Date(start.getTime() - (start.getTimezoneOffset() * 60000)).toISOString();

            var datechosen = new Date(datesort).toLocaleDateString("fr-CA", options2);
            var starts = new Date(start).toLocaleDateString("fr-CA", options2);
            console.log("starts :" + starts);
            console.log("datechosen :" + datechosen);
            if (datechosen >= starts){
                var companylinks = "<a href='https://aquavisitorsystem.github.io/?company=" + doc.data().company + "' target='_blank'>" + doc.data().company + "</a>";
                var namelinks = "<a href='https://aquavisitorsystem.github.io/?lname=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
                var glinks = "<a href='https://aquavisitorsystem.github.io/?userid=" + doc.data().login + "&report=active' target='_blank'>" + doc.data().login + "</a>";
                //  document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
                document.write('<tr title="ACTIVE SCHEDULE(S)"><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
            }else{
                var companylinks = "<a href='https://aquavisitorsystem.github.io/?company=" + doc.data().company + "' target='_blank'>" + doc.data().company + "</a>";
                var namelinks = "<a href='https://aquavisitorsystem.github.io/?lname=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
                var glinks = "<a href='https://aquavisitorsystem.github.io/?userid=" + doc.data().login + "&report=active' target='_blank'>" + doc.data().login + "</a>";
                document.write('<tr style="opacity:0.2;background-color: lightgray;" title="INACTIVE SCHEDULE(S)"><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
       
            }

        });
        var count = 0;
        try {
            var table = document.getElementById("report");
            count  = table.tBodies[0].rows.length;
        } catch (error) {
            count = 0;
        }
        //var table = document.getElementById("report");
        //var tbodyRowCount = table.tBodies[0].rows.length;
        //let count = tbodyRowCount; //Visitors.length;
        console.log("count: " +  count);
        const rows = document.querySelectorAll('[title="ACTIVE SCHEDULE(S)"]');
        count =  rows.length

        document.getElementById("numcount").innerHTML = count;
        document.getElementById("numcount").setAttribute("value",  count);
        document.head.innerHTML = header;
        document.write("</table>");
        document.getElementsByTagName("body")[0].style.display = "none";
        //spinnow(3000);
        //setTimeout("sortByDate2(4)", 3000);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    }
    spinnow(3000);
    setTimeout("sortByDate2(4)", 3000);
    spinnow(3000);
    }


    var mycompanylink =  function(data){
        var cntrecdays = 0;
        var db = firebase.firestore();
        var Visitors = [];	
        var datesorts;
       

        // var get_login=prompt("Search Company Name","Type Here Full or Start of Company Name");
        //var get_login=prompt("Search Guest Company Name\r\n1) Enter Full or Start of Guest Company Name\r\n    Example: ABC Company or ABC\r\n2) Click [Ok] or [Enter] key", "Enter Guest Company Name Here");
    
        var get_login=data["companyname"];
        if (get_login  === null || get_login === "Enter Guest Company Name Here") {
            alert("Please Try Again! Enter Guest Company Name.");
        }else{
            var gd = new Date();
            //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
            var gmyDate = new Date(gd).toLocaleString('en-US');   
            var gtodaysdate = gmyDate.toString()
            get_login  = get_login.toString();
            get_login = get_login.trim().toUpperCase();
            console.log(get_login);
            var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}#gohome{display:none;}#report tr > *:nth-child(8){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
            var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>"; var lines = "";  var lines = "";
            let today = new Date().toISOString().slice(0, 10);
            //db.collection("messages").where("company", "==",get_login).where("remove", "==","No").orderBy("date","desc")
            db.collection("messages").where("remove", "==","No").orderBy('company').startAt(get_login).endAt(get_login+'\uf8ff')
       .get()
       .then((querySnapshot) => {
           var cnt = querySnapshot.size;
            var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (company report)</h1><h2>" + "<label id='numcount'></label>" + " Active Visitor Schedule(s) for Company names(s) starting with: " + get_login + "<br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small><br></h2><div id='gohome'><a href='https://aquavisitorsystem.github.io/'>Go Home</a></div><br><br></center>";
            //var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (name report)</h1><h2>" + "Visitor Schedule(s) for: " + get_login + "</h2><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br><br></center>";
            var logo = '<a href="https://aquavisitorsystem.github.io/"><img id="logo" src="aqua.png" width="250px" alt="Go Home"></a>'
            document.write(logo);
            document.write(title);
            document.write(printnow);
            if (cnt === 0){
                var nodata = "<center><br>No visitor data found<br></center>";
                document.write(nodata);
            }else{
                //document.write("<table id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
                document.write("<table id='report' style='font-size: small;'>  <thead><tr>    <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortByDate2(4)'>Date/Time<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>Edit</th>  </tr></thead>");
            }
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            var options = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            };
            var options2 = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            };
            var options3= {
                hour: "2-digit",
                minute: "2-digit"
            };
            var options99 = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            };
            var dates;// = new Date(doc.data().date).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date).toLocaleTimeString("en", options2)
            var Datex = [];
            console.log("loadinactive:" + dates);
            //Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            if (typeof doc.data().date !== 'undefined' && doc.data().date !=="") {
                dates = new Date(doc.data().date).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date2 !== 'undefined' && doc.data().date2 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date2).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date2).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date2).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date3 !== 'undefined' && doc.data().date3 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date3).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date3).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date3).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date4 !== 'undefined' && doc.data().date4 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date4).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date4).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date4).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date5 !== 'undefined' && doc.data().date5 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date5).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date5).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date5).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date6 !== 'undefined' && doc.data().date6 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date6).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date6).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date6).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date7 !== 'undefined' && doc.data().date7 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date7).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date7).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date7).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));

            }
            if (typeof doc.data().date8 !== 'undefined' && doc.data().date8 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date8).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date8).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date8).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date9 !== 'undefined' && doc.data().date9 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date9).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date9).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date9).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date10 !== 'undefined' && doc.data().date10 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date10).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date10).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date10).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date11 !== 'undefined' && doc.data().date11 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date11).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date11).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date11).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date12 !== 'undefined' && doc.data().date12 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date12).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date12).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date12).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date13 !== 'undefined' && doc.data().date13 !=="") {
                cntrecdays= 0;
                h  =  tConvert (doc.data().rectime);
                var days = "";
                 const datea = new Date(doc.data().date13);
                const dateb = new Date(doc.data().date14);
                var date13 = addOneDay(datea).toLocaleDateString("en", options);
                var date14 = addOneDay(dateb).toLocaleDateString("en", options);
                console.log("date13: " + date13);
                console.log("date14: " + date14);
                var mdays = []; 
                if (doc.data().mon === true) {
                    mdays.push(1);
                    days = "Mon";
                    cntrecdays = RecCount(date13,date14,1);
                }
                if (doc.data().tue === true) {
                    mdays.push(2);
                    if (days === ""){
                        days = "Tue";
                    }else{
                        days = days + "," + "Tue";
                    }    
                    cntrecdays = cntrecdays + RecCount(date13,date14,2);
                }
                if (doc.data().wed === true) {
                    mdays.push(3);
                    if (days === ""){
                        days = "Wed";
                    }else{
                        days = days + "," + "Wed";
                    } 
                    cntrecdays = cntrecdays + RecCount(date13,date14,3);
                }
                if (doc.data().thu === true) {
                    mdays.push(4);
                    if (days === ""){
                        days = "Thu";
                    }else{
                        days = days + "," + "Thu";
                    }   
                    cntrecdays = cntrecdays + RecCount(date13,date14,4);
                }
                if (doc.data().fri === true) {
                    mdays.push(5);
                    if (days === ""){
                        days = "Fri";
                    }else{
                        days = days + "," + "Fri";
                    }  
                    cntrecdays = cntrecdays + RecCount(date13,date14,5);
                }
            
                if (dates)
                {
                    //dates = dates + "<hr>" + cntrecdays + " Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h;
                    dates = dates + "<hr>" + "Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h;
                }else{
                    console.log("dates:" + dates);
                    //dates = cntrecdays + " Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h;
                    dates = "Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h;
                }

                var todaysdate77 = new Date().toLocaleDateString("en", options2);
                var range = date14
                console.log("range: " + range);
                console.log("todaysdate77:" + todaysdate77);
                range = new Date(range);
                todaysdate77 = new Date(todaysdate77);
                console.log("(range < todaysdate77):" + (range < todaysdate77));
                var hh  =  tConvert (doc.data().rectime);
                
                console.log("hh :" + hh);
                console.log("todaysdate77 :" + todaysdate77);
                console.log("range :" + range);
                var options99 = {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit"
                };
                if (range < todaysdate77){
                    console.log("3827");
                    const dateb = new Date(doc.data().date14);
                    console.log("dateb :" + dateb);
                    datesorts = addOneDay(dateb).toLocaleDateString("fr-CA", options2) + "," + addOneDay(dateb).toLocaleTimeString("en", options3);
                    console.log("out of range:" + datesorts);
                    Datex.push(datesorts);
                }else{
                    console.log("3834");
                    console.log("in range:" + datesorts);
                     const date = new Date();
                        const thisistodayday = date.getDay();
                    console.log("thisistodayday" + thisistodayday);
                    console.log("mdays.includes(thisistodayday)" + mdays.includes(thisistodayday));
                    if (mdays.includes(thisistodayday)){
                        console.log("line 3838");
                        datesorts = new Date().toLocaleDateString("fr-CA", options2) + "," + hh;
                    }else{
                        console.log("line 3842");
                        datesorts = nextDate(mdays[0])  + "," + hh;
                       
                        datesorts = datesorts;
                        console.log("datesorts3850:" + datesorts);
                    }
                    console.log("in range:" + datesorts);
                    Datex.push(datesorts);
                }
                //datesorts = new Date().toLocaleDateString("fr-CA", options2);;
                Datex.push(datesorts);
          
                Visitors.push(doc.data().login + new Date(doc.data().date13).toLocaleDateString("en", options));
            }
            console.log("loadname:" + dates);
            Datex.sort((a, b) => new Date(b) - new Date(a)).reverse()
            var todays = new Date().toLocaleDateString("fr-CA", options2);
            console.log("todays: " + todays);
            for(var i=0; i<Datex.length; i++){
                console.log("Datex[i]: " + Datex[i]);
                if(Datex[i] === todays){
                    datesort = Datex[i]
                    console.log("Datex[i] === todays " + datesort);
                    break;
                }else if (Datex[i] > todays){
                    datesort = Datex[i]
                    console.log("Datex[i] > todays " + datesort);
                    break;
                }else if (Datex[i] < todays){
                    datesort = Datex[i]
                    console.log("Datex[i] < todays" + datesort);
                    //break;
                }
            }
            //var namelinks = "<a href='https://aquavisitorsystem.github.io/?lname=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
            //var companylinks = "<a href='https://aquavisitorsystem.github.io/?company=" + doc.data().company + "' target='_blank'>" + doc.data().company + "</a>";
            //var glinks = "<a href='https://aquavisitorsystem.github.io/?userid=" + doc.data().login + "&report=active' target='_blank'>" + doc.data().login + "</a>";
            ////  document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
            //document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
            var start = new Date();
            start.setHours(0,0,0,0);
            start = new Date(start.getTime() - (start.getTimezoneOffset() * 60000)).toISOString();

            var datechosen = new Date(datesort).toLocaleDateString("fr-CA", options2);
            var starts = new Date(start).toLocaleDateString("fr-CA", options2);
            console.log("starts :" + starts);
            console.log("datechosen :" + datechosen);
            console.log("datesort :" + datesort);
            if (datechosen >= starts){
                var companylinks = "<a href='https://aquavisitorsystem.github.io/?company=" + doc.data().company + "' target='_blank'>" + doc.data().company + "</a>";
                var namelinks = "<a href='https://aquavisitorsystem.github.io/?lname=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
                var glinks = "<a href='https://aquavisitorsystem.github.io/?userid=" + doc.data().login + "&report=active' target='_blank'>" + doc.data().login + "</a>";
                //  document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
                document.write('<tr title="ACTIVE SCHEDULE(S)"><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
            }else{
                var companylinks = "<a href='https://aquavisitorsystem.github.io/?company=" + doc.data().company + "' target='_blank'>" + doc.data().company + "</a>";
                var namelinks = "<a href='https://aquavisitorsystem.github.io/?lname=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
                var glinks = "<a href='https://aquavisitorsystem.github.io/?userid=" + doc.data().login + "&report=active' target='_blank'>" + doc.data().login + "</a>";
                document.write('<tr style="opacity:0.2;background-color: lightgray;" title="INACTIVE SCHEDULE(S)"><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
       
            }

        });
        var count = 0;
        try {
            var table = document.getElementById("report");
            count  = table.tBodies[0].rows.length;
        } catch (error) {
            count = 0;
        }
        //var table = document.getElementById("report");
        //var tbodyRowCount = table.tBodies[0].rows.length;
        //let count = tbodyRowCount; //Visitors.length;
        console.log("count: " +  count);
        const rows = document.querySelectorAll('[title="ACTIVE SCHEDULE(S)"]');
        count =  rows.length

        document.getElementById("numcount").innerHTML = count;
        document.getElementById("numcount").setAttribute("value",  count);
        document.head.innerHTML = header;
        document.write("</table>");
        document.getElementsByTagName("body")[0].style.display = "none";
        //spinnow(3000);
        //setTimeout("sortByDate2(4)", 3000);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    }
    spinnow(3000);
    setTimeout("sortByDate2(4)", 3000);
    spinnow(3000);
    }

    var mycompany =  function(){
        var cntrecdays = 0;
        var db = firebase.firestore();
        var Visitors = [];	
        var datesorts;
       

       // var get_login=prompt("Search Company Name","Type Here Full or Start of Company Name");
        var get_login=prompt("Search Guest Company Name\r\n1) Enter Full or Start of Guest Company Name\r\n    Example: ABC Company or ABC\r\n2) Click [Ok] or [Enter] key", "Enter Guest Company Name Here");
        if (get_login === "Enter Guest Company Name Here") {
            clear();
            alert("Please Try Again! Enter Guest Company Name.");
            mycompany();
        }else if (get_login  === null){
            clear();
            spinnow(3000);
            setTimeout("window.location.reload();", 3000);
        }else{
            var gd = new Date();
            //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
            var gmyDate = new Date(gd).toLocaleString('en-US');   
            var gtodaysdate = gmyDate.toString()
            get_login  = get_login.toString();
            get_login = get_login.trim().toUpperCase();
            console.log(get_login);
            var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}#gohome{display:none;}#report tr > *:nth-child(8){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
            var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>"; var lines = "";  var lines = "";
            let today = new Date().toISOString().slice(0, 10);
            //db.collection("messages").where("company", "==",get_login).where("remove", "==","No").orderBy("date","desc")
            db.collection("messages").where("remove", "==","No").orderBy('company').startAt(get_login).endAt(get_login+'\uf8ff')
       .get()
       .then((querySnapshot) => {
           var cnt = querySnapshot.size;
            var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (company report)</h1><h2>" + "<label id='numcount'></label>" + " Active Visitor Schedule(s) for Company names(s) starting with: " + get_login + "<br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small><br></h2><div id='gohome'><a href='https://aquavisitorsystem.github.io/'>Go Home</a></div><br><br></center>";
            //var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (name report)</h1><h2>" + "Visitor Schedule(s) for: " + get_login + "</h2><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br><br></center>";
            var logo = '<a href="https://aquavisitorsystem.github.io/"><img id="logo" src="aqua.png" width="250px" alt="Go Home"></a>'
            document.write(logo);
            document.write(title);
            document.write(printnow);
            if (cnt === 0){
                var nodata = "<center><br>No visitor data found<br></center>";
                document.write(nodata);
            }else{
                //document.write("<table id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
                document.write("<table id='report' style='font-size: small;'>  <thead><tr>    <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortByDate2(4)'>Date/Time<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>Edit</th>  </tr></thead>");
            }
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            var options = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            };
            var options2 = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            };
            var options3= {
                hour: "2-digit",
                minute: "2-digit"
            };
            var options99 = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            };
            var dates;// = new Date(doc.data().date).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date).toLocaleTimeString("en", options2)
            var Datex = [];
            console.log("loadinactive:" + dates);
            //Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            if (typeof doc.data().date !== 'undefined' && doc.data().date !=="") {
                dates = new Date(doc.data().date).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date2 !== 'undefined' && doc.data().date2 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date2).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date2).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date2).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date3 !== 'undefined' && doc.data().date3 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date3).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date3).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date3).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date4 !== 'undefined' && doc.data().date4 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date4).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date4).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date4).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date5 !== 'undefined' && doc.data().date5 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date5).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date5).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date5).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date6 !== 'undefined' && doc.data().date6 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date6).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date6).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date6).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date7 !== 'undefined' && doc.data().date7 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date7).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date7).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date7).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));

            }
            if (typeof doc.data().date8 !== 'undefined' && doc.data().date8 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date8).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date8).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date8).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date9 !== 'undefined' && doc.data().date9 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date9).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date9).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date9).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date10 !== 'undefined' && doc.data().date10 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date10).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date10).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date10).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date11 !== 'undefined' && doc.data().date11 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date11).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date11).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date11).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date12 !== 'undefined' && doc.data().date12 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date12).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date12).toLocaleDateString("fr-CA", options2) + "," + new Date(doc.data().date12).toLocaleTimeString("en", options3);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date13 !== 'undefined' && doc.data().date13 !=="") {
                cntrecdays= 0;
                h  =  tConvert (doc.data().rectime);
                var days = "";
                 const datea = new Date(doc.data().date13);
                const dateb = new Date(doc.data().date14);
                var date13 = addOneDay(datea).toLocaleDateString("en", options);
                var date14 = addOneDay(dateb).toLocaleDateString("en", options);
                console.log("date13: " + date13);
                console.log("date14: " + date14);
                var mdays = []; 
                if (doc.data().mon === true) {
                    mdays.push(1);
                    days = "Mon";
                    cntrecdays = RecCount(date13,date14,1);
                }
                if (doc.data().tue === true) {
                    mdays.push(2);
                    if (days === ""){
                        days = "Tue";
                    }else{
                        days = days + "," + "Tue";
                    }    
                    cntrecdays = cntrecdays + RecCount(date13,date14,2);
                }
                if (doc.data().wed === true) {
                    mdays.push(3);
                    if (days === ""){
                        days = "Wed";
                    }else{
                        days = days + "," + "Wed";
                    } 
                    cntrecdays = cntrecdays + RecCount(date13,date14,3);
                }
                if (doc.data().thu === true) {
                    mdays.push(4);
                    if (days === ""){
                        days = "Thu";
                    }else{
                        days = days + "," + "Thu";
                    }   
                    cntrecdays = cntrecdays + RecCount(date13,date14,4);
                }
                if (doc.data().fri === true) {
                    mdays.push(5);
                    if (days === ""){
                        days = "Fri";
                    }else{
                        days = days + "," + "Fri";
                    }  
                    cntrecdays = cntrecdays + RecCount(date13,date14,5);
                }
            
                if (dates)
                {
                    //dates = dates + "<hr>" + cntrecdays + " Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h;
                    dates = dates + "<hr>" + "Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h;
                }else{
                    console.log("dates:" + dates);
                    //dates = cntrecdays + " Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h;
                    dates = "Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h;
                }

                var todaysdate77 = new Date().toLocaleDateString("en", options2);
                var range = date14
                console.log("range: " + range);
                console.log("todaysdate77:" + todaysdate77);
                range = new Date(range);
                todaysdate77 = new Date(todaysdate77);
                console.log("(range < todaysdate77):" + (range < todaysdate77));
                var hh  =  tConvert (doc.data().rectime);
                console.log("hh :" + hh);
                if (range < todaysdate77){
                    const dateb = new Date(doc.data().date14);
                    datesorts = addOneDay(dateb).toLocaleDateString("fr-CA", options2) + "," + addOneDay(dateb).toLocaleTimeString("en", options3);
                    console.log("out of range:" + datesorts);
                    Datex.push(datesorts);
                }else{
                     const date = new Date();
                        const thisistodayday = date.getDay();
                    console.log("thisistodayday" + thisistodayday);
                    console.log("mdays.includes(thisistodayday)" + mdays.includes(thisistodayday));
                    if (mdays.includes(thisistodayday)){
                        datesorts = new Date().toLocaleDateString("fr-CA", options2) + "," + hh;
                    }else{
                        datesorts = nextDate(mdays[0]) + "," + hh;;
                    }
                    console.log("in range:" + datesorts);
                    Datex.push(datesorts);
                }
                //datesorts = new Date().toLocaleDateString("fr-CA", options2);;
                Datex.push(datesorts);
          
                Visitors.push(doc.data().login + new Date(doc.data().date13).toLocaleDateString("en", options));
            }
            console.log("loadname:" + dates);
            Datex.sort((a, b) => new Date(b) - new Date(a)).reverse()
            var todays = new Date().toLocaleDateString("fr-CA", options2);
            console.log("todays: " + todays);
            for(var i=0; i<Datex.length; i++){
                console.log("Datex[i]: " + Datex[i]);
                if(Datex[i] === todays){
                    datesort = Datex[i]
                    console.log("Datex[i] === todays " + datesort);
                    break;
                }else if (Datex[i] > todays){
                    datesort = Datex[i]
                    console.log("Datex[i] > todays " + datesort);
                   break;
                }else if (Datex[i] < todays){
                    datesort = Datex[i]
                    console.log("Datex[i] < todays" + datesort);
                    //break;
                }
            }

            //var companylinks = "<a href='https://aquavisitorsystem.github.io/?company=" + doc.data().company + "' target='_blank'>" + doc.data().company + "</a>";
            //var namelinks = "<a href='https://aquavisitorsystem.github.io/?lname=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
            //var glinks = "<a href='https://aquavisitorsystem.github.io/?userid=" + doc.data().login + "&report=active' target='_blank'>" + doc.data().login + "</a>";
            ////  document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
            //document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
            var start = new Date();
            start.setHours(0,0,0,0);
            start = new Date(start.getTime() - (start.getTimezoneOffset() * 60000)).toISOString();
            var datechosen = new Date(datesort).toLocaleDateString("fr-CA", options2);
            var starts = new Date(start).toLocaleDateString("fr-CA", options2);
            console.log("starts :" + starts);
            console.log("datechosen :" + datechosen);
            if (datechosen >= starts){
                var companylinks = "<a href='https://aquavisitorsystem.github.io/?company=" + doc.data().company + "' target='_blank'>" + doc.data().company + "</a>";
                var namelinks = "<a href='https://aquavisitorsystem.github.io/?lname=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
                var glinks = "<a href='https://aquavisitorsystem.github.io/?userid=" + doc.data().login + "&report=active' target='_blank'>" + doc.data().login + "</a>";
                //  document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
                document.write('<tr title="ACTIVE SCHEDULE(S)"><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
            }else{
                var companylinks = "<a href='https://aquavisitorsystem.github.io/?company=" + doc.data().company + "' target='_blank'>" + doc.data().company + "</a>";
                var namelinks = "<a href='https://aquavisitorsystem.github.io/?lname=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
                var glinks = "<a href='https://aquavisitorsystem.github.io/?userid=" + doc.data().login + "&report=active' target='_blank'>" + doc.data().login + "</a>";
                document.write('<tr style="opacity:0.2;background-color: lightgray;" title="INACTIVE SCHEDULE(S)"><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
       
            }
        });
        var count = 0;
        try {
            var table = document.getElementById("report");
            count  = table.tBodies[0].rows.length;
        } catch (error) {
            count = 0;
        }
        //var table = document.getElementById("report");
        //var tbodyRowCount = table.tBodies[0].rows.length;
        //let count = tbodyRowCount; //Visitors.length;
        console.log("count: " +  count);

        const rows = document.querySelectorAll('[title="ACTIVE SCHEDULE(S)"]');
        count =  rows.length
        document.getElementById("numcount").innerHTML = count;
        document.getElementById("numcount").setAttribute("value",  count);
        document.head.innerHTML = header;
        document.write("</table>");
        document.getElementsByTagName("body")[0].style.display = "none";
       
         console.log(" rows.value: " +  rows);
         console.log(" rows.length: " +   rows.length);
        //spinnow(3000);
        //setTimeout("sortByDate2(4)", 3000);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    spinnow(3000);
    setTimeout("sortByDate2(4)", 3000);
}
    //spinnow(3000);
    //setTimeout("sortByDate2(4)", 3000);
}

    var loadlognamelink =  function(data){
        var gd = new Date();
        //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
        var gmyDate = new Date(gd).toLocaleString('en-US');   
        var gtodaysdate = gmyDate.toString()
        var Visitors = [];
        var db = firebase.firestore();
        //var get_login=prompt("Enter Guest Last Name To Search","Enter Guest Last Name");
        var get_login=data["logvalue"];//prompt("Search Guest Last Name\r\n1) Enter Full or Start of Guest Last Name\r\n    Example: Smith or Sm\r\n2) Click [Ok] or [Enter] key", "Enter Guest Last Name Here");
        if (get_login  === null || get_login === "Enter Guest Last Name") {
            alert("Please Try Again! Enter Guest Last Name.");
        }else{
            get_login  = get_login.toString();
            get_login = get_login.trim().toUpperCase();
            console.log(get_login);
            var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}#gohome{display:none;}#report tr > *:nth-child(5){display: none;}#report tr > *:nth-child(10){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
            var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>";
            var lines = "";
            let today = new Date().toISOString().slice(0, 10);
            //db.collection("log").where("lastname", "==",get_login).orderBy("date","desc")
            db.collection("log").orderBy("lastname").orderBy("date","desc").startAt(get_login).endAt(get_login+'\uf8ff')
       .get()
       .then((querySnapshot) => {
           var cnt = querySnapshot.size;
            var title = "<center><h1>Aqua-Aerobic Systems Visitor Check-in/out Log (logname report)</h1><h2><label id='numcount'></label>" + " visitor log(s) for Last names(s) starting with:  " + get_login + "<br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small><br></h2><br><div id='gohome'><a href='https://aquavisitorsystem.github.io/'>Go Home</a></div><br><br></center>";
            var logo = '<a href="https://aquavisitorsystem.github.io/"><img id="logo" src="aqua.png" width="250px" alt="Go Home"></a>'
            document.write(logo);
            document.write(title);
            document.write(printnow);
            if (cnt === 0){
                var nodata = "<center><br>No visitor data found<br></center>";
                document.write(nodata);
            }else{
                document.write("<table id='report' style='font-size: small;'>  <tr>     <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
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
            var companylinks = "<a href='https://aquavisitorsystem.github.io/?logreport=logcompany" + "&logvalue=" + doc.data().company+ "' target='_blank'>" + doc.data().company + "</a>";
            var namelinks = "<a href='https://aquavisitorsystem.github.io/?logreport=logname" + "&logvalue=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
            var glinks = "<a href='https://aquavisitorsystem.github.io/?logreport=loguserid" + "&logvalue=" + doc.data().login + "' target='_blank'>" + doc.data().login + "</a>";   
  
            if ((doc.data().checkin !== "") && (doc.data().checkout !== ""))
            {
                document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td style="opacity: 0;">' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
 
            }else{
                document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
            }
            var growCount = document.getElementById('report').rows.length;
            if (growCount > 0){
                growCount = Math.ceil((growCount - 1));
            }
            //countUnique(Visitors);
            growCount = countUnique(Visitors);
            //growCount = Math.ceil(growCount / 2);
            document.getElementById("numcount").innerHTML = growCount; //uniqueSet2.size;
            document.getElementById("numcount").setAttribute("value", growCount);
        });
   
        document.head.innerHTML = header;
        document.write("</table>");
        document.getElementsByTagName("body")[0].style.display = "none";
        //spinnow(3000);
        //setTimeout("sortByDate2(7)", 3000);

    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    }
    spinnow(3000);
    setTimeout("sortByDate2(7)", 3000);
    spinnow(3000);
    }
	
    var loadlogname =  function(){
        var gd = new Date();
        //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
        var gmyDate = new Date(gd).toLocaleString('en-US');   
        var gtodaysdate = gmyDate.toString()
        var Visitors = [];
    var db = firebase.firestore();
        //var get_login=prompt("Enter Guest Last Name To Search","Enter Guest Last Name");
    var get_login=prompt("Search Guest Last Name\r\n1) Enter Full or Start of Guest Last Name\r\n    Example: Smith or Sm\r\n2) Click [Ok] or [Enter] key", "Enter Guest Last Name Here");
    if (get_login === "Enter Guest Last Name Here") {
        alert("Please Try Again! Enter Guest Last Name.");
        loadlogname();
    }else if (get_login  === null){
        clear();
        spinnow(3000);
        setTimeout("window.location.reload();", 3000);
    }else{
        get_login  = get_login.toString();
        get_login = get_login.trim().toUpperCase();
        console.log(get_login);
        var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}#gohome{display:none;}#report tr > *:nth-child(5){display: none;}#report tr > *:nth-child(10){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
        var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>";
        var lines = "";
        let today = new Date().toISOString().slice(0, 10);
        //db.collection("log").where("lastname", "==",get_login).orderBy("date","desc")
        db.collection("log").orderBy("lastname").orderBy("date","desc").startAt(get_login).endAt(get_login+'\uf8ff')
   .get()
   .then((querySnapshot) => {
       var cnt = querySnapshot.size;
        var title = "<center><h1>Aqua-Aerobic Systems Visitor Check-in/out Log (logname report)</h1><h2><label id='numcount'></label>" + " visitor log(s) for Last names(s) starting with:  " + get_login + "<br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small><br></h2><br><div id='gohome'><a href='https://aquavisitorsystem.github.io/'>Go Home</a></div><br><br></center>";
        var logo = '<a href="https://aquavisitorsystem.github.io/"><img id="logo" src="aqua.png" width="250px" alt="Go Home"></a>'
        document.write(logo);
        document.write(title);
        document.write(printnow);
        if (cnt === 0){
            var nodata = "<center><br>No visitor data found<br></center>";
            document.write(nodata);
        }else{
            document.write("<table id='report' style='font-size: small;'>  <tr>     <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
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
        var companylinks = "<a href='https://aquavisitorsystem.github.io/?logreport=logcompany" + "&logvalue=" + doc.data().company+ "' target='_blank'>" + doc.data().company + "</a>";
        var namelinks = "<a href='https://aquavisitorsystem.github.io/?logreport=logname" + "&logvalue=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
        var glinks = "<a href='https://aquavisitorsystem.github.io/?logreport=loguserid" + "&logvalue=" + doc.data().login + "' target='_blank'>" + doc.data().login + "</a>";   
        
        if ((doc.data().checkin !== "") && (doc.data().checkout !== ""))
        {
            document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td style="opacity: 0;">' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
 
        }else{
            document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
        }
        //document.getElementById("numcount").innerHTML = countUnique(Visitors);
        //document.getElementById("numcount").setAttribute("value", countUnique(Visitors));
        var growCount = document.getElementById('report').rows.length;
        if (growCount > 0){
            growCount = Math.ceil((growCount - 1));
        }
        growCount = Math.ceil(growCount / 2);
        document.getElementById("numcount").innerHTML = growCount; //uniqueSet2.size;
        document.getElementById("numcount").setAttribute("value", growCount);
    });
   
    document.head.innerHTML = header;
    document.write("</table>");
    document.getElementsByTagName("body")[0].style.display = "none";
    //spinnow(3000);
    //setTimeout("sortByDate2(7)", 3000);

})
    .catch((error) => {
        console.log("Error getting documents: ", error);
});
spinnow(3000);
setTimeout("sortByDate2(7)", 3000);
}
    // spinnow(3000);
    // setTimeout("sortByDate2(7)", 3000);
}

    var loadlogcompanylink =  function(data){
        var gd = new Date();
        //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
        var gmyDate = new Date(gd).toLocaleString('en-US');   
        var gtodaysdate = gmyDate.toString()
        var Visitors = [];
        var db = firebase.firestore();
        //var get_login=prompt("Enter Guest Company Name To Search","Enter Guest Company Name");
        var get_login=data["logvalue"];//prompt("Search Guest Company Name\r\n1) Enter Full or Start of Guest Company Name\r\n    Example: ABC Company or ABC\r\n2) Click [Ok] or [Enter] key", "Enter Guest Company Name Here");
        if (get_login  === null || get_login === "Enter Guest Company Name") {
            alert("Please Try Again! Enter Guest Company Name.");
        }else{
            get_login  = get_login.toString();
            get_login = get_login.trim().toUpperCase();
            console.log(get_login);
            var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}#gohome{display:none;}#report tr > *:nth-child(5){display: none;}#report tr > *:nth-child(10){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
            var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>";
            var lines = "";
            let today = new Date().toISOString().slice(0, 10);
            //db.collection("log").where("company", "==",get_login).orderBy("date","desc")
            db.collection("log").orderBy("company").orderBy("date","desc").startAt(get_login).endAt(get_login+'\uf8ff')
       .get()
       .then((querySnapshot) => {
           var cnt = querySnapshot.size;
            var title = "<center><h1>Aqua-Aerobic Systems Visitor Check-in/out Log (logcompany report)</h1><h2><label id='numcount'></label>" + " visitor log(s) for Company names(s) starting with:  " + get_login + "<br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small><br></h2><br><div id='gohome'><a href='https://aquavisitorsystem.github.io/'>Go Home</a></div><br><br></center>";
            var logo = '<a href="https://aquavisitorsystem.github.io/"><img id="logo" src="aqua.png" width="250px" alt="Go Home"></a>'
            document.write(logo);
            document.write(title);
            document.write(printnow);
            if (cnt === 0){
                var nodata = "<center><br>No visitor data found<br></center>";
                document.write(nodata);
            }else{
                document.write("<table id='report' style='font-size: small;'>  <tr>     <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
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
            var companylinks = "<a href='https://aquavisitorsystem.github.io/?logreport=logcompany" + "&logvalue=" + doc.data().company+ "' target='_blank'>" + doc.data().company + "</a>";
            var namelinks = "<a href='https://aquavisitorsystem.github.io/?logreport=logname" + "&logvalue=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
            var glinks = "<a href='https://aquavisitorsystem.github.io/?logreport=loguserid" + "&logvalue=" + doc.data().login + "' target='_blank'>" + doc.data().login + "</a>";   
      
  
            if ((doc.data().checkin !== "") && (doc.data().checkout !== ""))
            {
                document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td style="opacity: 0;">' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
 
            }else{
                document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
            }
            var growCount = document.getElementById('report').rows.length;
            if (growCount > 0){
                growCount = Math.ceil((growCount - 1));
            }
            //growCount = Math.ceil(growCount / 2);
            //countUnique(Visitors);
            growCount = countUnique(Visitors);
            //growCount = Math.ceil(growCount / 2);
            document.getElementById("numcount").innerHTML = growCount; //uniqueSet2.size;
            document.getElementById("numcount").setAttribute("value", growCount);
        });
   
        document.head.innerHTML = header;
        document.write("</table>");
        document.getElementsByTagName("body")[0].style.display = "none";
        //spinnow(3000);
        //setTimeout("sortByDate2(7)", 3000);

    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    }
    spinnow(3000);
    setTimeout("sortByDate2(7)", 3000);
    spinnow(3000);
    }

    var loadlogcompany =  function(){
        var gd = new Date();
        //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
        var gmyDate = new Date(gd).toLocaleString('en-US');   
        var gtodaysdate = gmyDate.toString()
        var Visitors = [];
        var db = firebase.firestore();
        //var get_login=prompt("Enter Guest Company Name To Search","Enter Guest Company Name");
        var get_login=prompt("Search Guest Company Name\r\n1) Enter Full or Start of Guest Company Name\r\n    Example: ABC Company or ABC\r\n2) Click [Ok] or [Enter] key", "Enter Guest Company Name Here");
        if (get_login === "Enter Guest Company Name Here") {
            alert("Please Try Again! Enter Guest Company Name.");
            loadlogcompany();
        }else if (get_login  === null){
            clear();
            spinnow(3000);
            setTimeout("window.location.reload();", 3000);    
        }else{
            get_login  = get_login.toString();
            get_login = get_login.trim().toUpperCase();
            console.log(get_login);
            var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}#gohome{display:none;}#report tr > *:nth-child(5){display: none;}#report tr > *:nth-child(10){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
            var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>";
            var lines = "";
            let today = new Date().toISOString().slice(0, 10);
            //db.collection("log").where("company", "==",get_login).orderBy("date","desc")
           // db.collection("log").orderBy("company").orderBy("date","desc").startAt(get_login).endAt(get_login+'\uf8ff')
            db.collection("log").orderBy("company").orderBy("date","desc").startAt(get_login).endAt(get_login+'\uf8ff')
       .get()
       .then((querySnapshot) => {
           var cnt = querySnapshot.size;
            var title = "<center><h1>Aqua-Aerobic Systems Visitor Check-in/out Log (logcompany report)</h1><h2><label id='numcount'></label>" + " visitor log(s) for Company names(s) starting with:  " + get_login + "<br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small><br></h2><br><div id='gohome'><a href='https://aquavisitorsystem.github.io/'>Go Home</a></div><br><br></center>";
            var logo = '<a href="https://aquavisitorsystem.github.io/"><img id="logo" src="aqua.png" width="250px" alt="Go Home"></a>'
            document.write(logo);
            document.write(title);
            document.write(printnow);
            if (cnt === 0){
                var nodata = "<center><br>No visitor data found<br></center>";
                document.write(nodata);
            }else{
                document.write("<table id='report' style='font-size: small;'>  <tr>     <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
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
            var companylinks = "<a href='https://aquavisitorsystem.github.io/?logreport=logcompany" + "&logvalue=" + doc.data().company+ "' target='_blank'>" + doc.data().company + "</a>";
            var namelinks = "<a href='https://aquavisitorsystem.github.io/?logreport=logname" + "&logvalue=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
            var glinks = "<a href='https://aquavisitorsystem.github.io/?logreport=loguserid" + "&logvalue=" + doc.data().login + "' target='_blank'>" + doc.data().login + "</a>";   
          
  
            if ((doc.data().checkin !== "") && (doc.data().checkout !== ""))
            {
                document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td style="opacity: 0;">' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
 
            }else{
                document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
            }
            var growCount = document.getElementById('report').rows.length;
            if (growCount > 0){
                growCount = Math.ceil((growCount - 1));
            }
            //growCount = Math.ceil(growCount / 2);
            //countUnique(Visitors);
            growCount = countUnique(Visitors);
            //growCount = Math.ceil(growCount / 2);
            document.getElementById("numcount").innerHTML = growCount; //uniqueSet2.size;
            document.getElementById("numcount").setAttribute("value", growCount);
        });
   
        document.head.innerHTML = header;
        document.write("</table>");
        document.getElementsByTagName("body")[0].style.display = "none";
        //spinnow(3000);
        //setTimeout("sortByDate2(7)", 3000);

    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    spinnow(3000);
    setTimeout("sortByDate2(7)", 3000);
    }
    // spinnow(3000);
    // setTimeout("sortByDate2(7)", 3000);
}

    var loadloguseridlink =  function(data){
        var db = firebase.firestore();
        var Visitors = [];
        var get_login=data["logvalue"];//prompt("Enter Aqua UserID To Search","Enter Aqua UserID");
        if (get_login  === null || get_login === "Enter Aqua UserID") {
            alert("Please Try Again! Enter Guest Last Name.");
        }else{
            get_login  = get_login.toString();
            get_login = get_login.trim().toLowerCase();
            console.log(get_login);
            var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}#gohome{display:none;}#report tr > *:nth-child(1){display: none;}#report tr > *:nth-child(5){display: none;}#report tr > *:nth-child(10){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
            var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>";
            var lines = "";
            let today = new Date().toISOString().slice(0, 10);
            db.collection("log").where("login", "==",get_login).orderBy("checkin","desc")
       .get()
       .then((querySnapshot) => {
           var cnt = querySnapshot.size;
            var gd = new Date();
            //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
            var gmyDate = new Date(gd).toLocaleString('en-US');   
            var gtodaysdate = gmyDate.toString();
            var title = "<center><h1>Aqua-Aerobic Systems Visitor Check-in/out Log (loguserid)</h1><h2>Check-in/Check-out logs (" + "<label id='numcount'></label>"  + " visits) for: " + get_login + "<br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small><br></h2><div id='gohome'><a href='https://aquavisitorsystem.github.io/'>Go Home</a></div><br><br></center>";
            var logo = '<a href="https://aquavisitorsystem.github.io/"><img id="logo" src="aqua.png" width="250px" alt="Go Home"></a>'
            document.write(logo);
            document.write(title);
            document.write(printnow);
            if (cnt === 0){
                var nodata = "<center><br>No visitor data found<br></center>";
                document.write(nodata);
            }else{
                document.write("<table id='report' style='font-size: small;'>  <tr>     <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
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
            var companylinks = "<a href='https://aquavisitorsystem.github.io/?logreport=logcompany" + "&logvalue=" + doc.data().company+ "' target='_blank'>" + doc.data().company + "</a>";
            var namelinks = "<a href='https://aquavisitorsystem.github.io/?logreport=logname" + "&logvalue=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
            var glinks = "<a href='https://aquavisitorsystem.github.io/?logreport=loguserid" + "&logvalue=" + doc.data().login + "' target='_blank'>" + doc.data().login + "</a>";   
      
            if ((doc.data().checkin !== "") && (doc.data().checkout !== ""))
            {
                document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td style="opacity: 0;">' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
 
            }else{
                document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
            }
            var growCount = document.getElementById('report').rows.length;
            if (growCount > 0){
                growCount = Math.ceil((growCount - 1));
            }
            //growCount = Math.ceil(growCount / 2);
            //countUnique(Visitors);
            growCount = countUnique(Visitors);
            //growCount = Math.ceil(growCount / 2);
            document.getElementById("numcount").innerHTML = growCount; //uniqueSet2.size;
            document.getElementById("numcount").setAttribute("value", growCount);
        });
        document.head.innerHTML = header;
        document.write("</table>");
        document.getElementsByTagName("body")[0].style.display = "none";
        //spinnow(3000);
        //setTimeout("sortByDate2(7)",3000);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
});

    }
    spinnow(3000);
    setTimeout("sortByDate2(7)",3000);
    spinnow(3000);
    }


var loadloguserid =  function(){
    var db = firebase.firestore();
    var Visitors = [];
    var get_login=prompt("Enter Aqua UserID To Search","Enter Aqua UserID");
    if (get_login === "Enter Aqua UserID") {
        alert("Please Try Again! Enter Guest Last Name.");
        loadloguserid();
    }else if (get_login  === null){
        clear();
        spinnow(3000);
        setTimeout("window.location.reload();", 3000);
    }else{
        get_login  = get_login.toString();
        get_login = get_login.trim().toLowerCase();
        console.log(get_login);
        var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}#gohome{display:none;}#report tr > *:nth-child(1){display: none;}#report tr > *:nth-child(5){display: none;}#report tr > *:nth-child(10){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
        var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>";
        var lines = "";
        let today = new Date().toISOString().slice(0, 10);
        db.collection("log").where("login", "==",get_login).orderBy("checkin","desc")
   .get()
   .then((querySnapshot) => {
       var cnt = querySnapshot.size;
        var gd = new Date();
        //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
        var gmyDate = new Date(gd).toLocaleString('en-US');   
        var gtodaysdate = gmyDate.toString();
        var title = "<center><h1>Aqua-Aerobic Systems Visitor Check-in/out Log (loguserid)</h1><h2>Check-in/Check-out logs (" + "<label id='numcount'></label>"  + " visits) for: " + get_login + "<br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small><br></h2><div id='gohome'><a href='https://aquavisitorsystem.github.io/'>Go Home</a></div><br><br></center>";
        var logo = '<a href="https://aquavisitorsystem.github.io/"><img id="logo" src="aqua.png" width="250px" alt="Go Home"></a>'
        document.write(logo);
        document.write(title);
        document.write(printnow);
        if (cnt === 0){
            var nodata = "<center><br>No visitor data found<br></center>";
            document.write(nodata);
        }else{
            document.write("<table id='report' style='font-size: small;'>  <tr>     <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
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
        var companylinks = "<a href='https://aquavisitorsystem.github.io/?logreport=logcompany" + "&logvalue=" + doc.data().company+ "' target='_blank'>" + doc.data().company + "</a>";
        var namelinks = "<a href='https://aquavisitorsystem.github.io/?logreport=logname" + "&logvalue=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
        var glinks = "<a href='https://aquavisitorsystem.github.io/?logreport=loguserid" + "&logvalue=" + doc.data().login + "' target='_blank'>" + doc.data().login + "</a>";   
        
         if ((doc.data().checkin !== "") && (doc.data().checkout !== ""))
        {
             document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td style="opacity: 0;">' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
        }else {
            document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
        }
        var growCount = document.getElementById('report').rows.length;
        if (growCount > 0){
            growCount = Math.ceil((growCount - 1));
        }
        //growCount = Math.ceil(growCount / 2);
        //countUnique(Visitors);
        growCount = countUnique(Visitors);
        //growCount = Math.ceil(growCount / 2);
        document.getElementById("numcount").innerHTML = growCount; //uniqueSet2.size;
        document.getElementById("numcount").setAttribute("value", growCount);
    });
    document.head.innerHTML = header;
    document.write("</table>");
    document.getElementsByTagName("body")[0].style.display = "none";
})
    .catch((error) => {
        console.log("Error getting documents: ", error);
});
spinnow(3000);
setTimeout("sortByDate2(7)",3000);
}
    // spinnow(3000);
    // setTimeout("sortByDate2(7)",3000);
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
        var gd = new Date();
        //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
        var gmyDate = new Date(gd).toLocaleString('en-US');   
        var gtodaysdate = gmyDate.toString();
        var db = firebase.firestore();
        var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}#gohome{display:none;}#report tr > *:nth-child(5){display: none;}#report tr > *:nth-child(10){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
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
        var title = "<center><h1>Aqua-Aerobic Systems Visitor Check-in/out Log (logtoday report)</h1><h2>Check-in/Check-out logs  for  " +  "<label id='numcount'></label>"   + "  guest(s)<br>Date: " + todays + "<br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small><br></h2><div id='gohome'><a href='https://aquavisitorsystem.github.io/'>Go Home</a></div><br><br></center>";
        var logo = '<a href="https://aquavisitorsystem.github.io/"><img id="logo" src="aqua.png" width="250px" alt="Go Home"></a>'
        document.write(logo);
        document.write(title);
        //document.write("<center><div id='numcount'></div></center>");
        document.write(printnow);
        if (cnt === 0){
            var nodata = "<center><br>No visitor data found<br></center>";
            document.write(nodata);
        }else{
            document.write("<table id='report' style='font-size: small;'>  <tr>     <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
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
        var companylinks = "<a href='https://aquavisitorsystem.github.io/?logreport=logcompany" + "&logvalue=" + doc.data().company+ "' target='_blank'>" + doc.data().company + "</a>";
        var namelinks = "<a href='https://aquavisitorsystem.github.io/?logreport=logname" + "&logvalue=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
        var glinks = "<a href='https://aquavisitorsystem.github.io/?logreport=loguserid" + "&logvalue=" + doc.data().login + "' target='_blank'>" + doc.data().login + "</a>";
        if ((doc.data().checkin !== "") && (doc.data().checkout !== ""))
        {
            document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks  + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td style="color: transparent;">' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
 
        }else{
            document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
        }
        var growCount = document.getElementById('report').rows.length;
        if (growCount > 0){
            growCount = Math.ceil((growCount - 1));
        }
        //growCount = Math.ceil(growCount / 2);
        //countUnique(Visitors);
        growCount = countUnique(Visitors);
        //growCount = Math.ceil(growCount / 2);
        document.getElementById("numcount").innerHTML = growCount; //uniqueSet2.size;
        document.getElementById("numcount").setAttribute("value", growCount);
});
document.head.innerHTML = header;
document.write("</table>");
document.getElementsByTagName("body")[0].style.display = "none";
//spinnow(3000);
//setTimeout("sortByDate2(7)", 3000);
})
    .catch((error) => {
        console.log("Error getting documents: ", error);
});
    spinnow(3000);
    setTimeout("sortByDate2(7)", 3000);
}

    var loadlogdate =  function(){
        try 
        {
            var db = firebase.firestore();
            var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}#gohome{display:none;}#report tr > *:nth-child(5){display: none;}#report tr > *:nth-child(10){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
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
            var name=prompt("Please choose one of the following\r\n1) Enter date to search (Example: 05/01/2024) > Click [Ok]\r\n2) Click [Ok] for today's date","Enter Date");
            if (name!="Enter Date" && name!=null){
                start = new Date(name);
                choosedate   = new Date(name).toDateString();
                start.setHours(0,0,0,0);
                end = new Date(start.getTime());
                end.setHours(23,59,59,999);
                strStart =  start.toISOString();
                strEnd =  end.toISOString();
                start = start.toISOString();
                end = end.toISOString();
            }else if (name  === null){
                clear();
                spinnow(3000);
                setTimeout("window.location.reload();", 3000);  
                return;
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
            var gd = new Date();
            //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
            var gmyDate = new Date(gd).toLocaleString('en-US');   
            var gtodaysdate = gmyDate.toString();
            var logo = '<a href="https://aquavisitorsystem.github.io/"><img id="logo" src="aqua.png" width="250px" alt="Go Home"></a>'
            document.write(logo);
            var title = "<center><h1>Aqua-Aerobic Systems Visitor Check-in/out Log (logdate report)</h1><h2>Check-in/Check-out logs for  " +  "<label id='numcount'></label>"   + "  visits(s)<br>" + name + "<br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small><br></h2><div id='gohome'><a href='https://aquavisitorsystem.github.io/'>Go Home</a></div><br><br></center>";
            document.write(title);
            //document.write("<center><div id='numcount'></div></center>");
            document.write(printnow);
            if (cnt === 0){
                var nodata = "<center><br>No visitor data found<br></center>";
                document.write(nodata);
            }else{
                document.write("<table id='report' style='font-size: small;'>  <tr>     <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");     
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
            var companylinks = "<a href='https://aquavisitorsystem.github.io/?logreport=logcompany" + "&logvalue=" + doc.data().company+ "' target='_blank'>" + doc.data().company + "</a>";
            var namelinks = "<a href='https://aquavisitorsystem.github.io/?logreport=logname" + "&logvalue=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
            var glinks = "<a href='https://aquavisitorsystem.github.io/?logreport=loguserid" + "&logvalue=" + doc.data().login + "' target='_blank'>" + doc.data().login + "</a>";
            if ((doc.data().checkin !== "") && (doc.data().checkout !== ""))
            {
                document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks  + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td style="opacity: 0;">' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
 
            }else{
                document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks  + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
            }      // document.getElementById("numcount").innerHTML = Math.ceil(cnt / 2);
            var growCount = document.getElementById('report').rows.length;
            if (growCount > 0){
                growCount = Math.ceil((growCount - 1));
            }
            //growCount = Math.ceil(growCount / 2);
            //countUnique(Visitors);
            growCount = countUnique(Visitors);
            //growCount = Math.ceil(growCount / 2);
            document.getElementById("numcount").innerHTML = growCount; //uniqueSet2.size;
            document.getElementById("numcount").setAttribute("value", growCount);
        });
        document.write("</table>");
        document.head.innerHTML = header;
        document.getElementsByTagName("body")[0].style.display = "none";
        //spinnow(3000);
        //setTimeout("sortByDate2(7)", 3000);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    spinnow(3000);
    setTimeout("sortByDate2(7)", 3000);
    }catch(err) {
        var nodata = "<center><br>Incorrect Date Format. Please try again.<br><br> <a href='https://aquavisitorsystem.github.io/'>Go Home</a><br></center>";
        document.write(nodata);
        // loadlogdate();
       
    }
    // spinnow(3000);
    // setTimeout("sortByDate2(7)", 3000);
    }
		
    var loadlogall_OLD =  function(){
        var Visitors = [];
        var db = firebase.firestore();
        var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}a{display:none;}#report tr > *:nth-child(5){display: none;}#report tr > *:nth-child(10){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
        var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>";
        var lines = "";
        let today = new Date().toISOString().slice(0, 10);
        db.collection("log").orderBy("date","desc")
    .get()
    .then((querySnapshot) => {
        var cnt = querySnapshot.size;
        var title = "<center><h1>Aqua-Aerobic Systems Visitor Check-in/out Log (logall report)</h1><h2>Check-in/Check-out logs for " + "<label id='numcount'></label>"   + " visits(s)</h2><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br><br></center>";
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

    document.head.innerHTML = header;
    document.write("</table>");
    document.getElementsByTagName("body")[0].style.display = "none";
    //spinnow(3000);
    //setTimeout("sortByDate2(7)", 3000);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
});
    spinnow(3000);
    setTimeout("sortByDate2(7)", 3000);
    }

    
		
    var loadlogall =  function(){
        var gd = new Date();
        //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
        var gmyDate = new Date(gd).toLocaleString('en-US');   
        var gtodaysdate = gmyDate.toString()
        var Visitors = [];
    var db = firebase.firestore();
    var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}#gohome{display:none;}#report tr > *:nth-child(5){display: none;}#report tr > *:nth-child(10){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
    var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>";
    var lines = "";
    let today = new Date().toISOString().slice(0, 10);
    db.collection("log").orderBy("date","desc")
.get()
.then((querySnapshot) => {
    var cnt = querySnapshot.size;
    var title = "<center><h1>Aqua-Aerobic Systems Visitor Check-in/out Log (logall report)</h1><h2>Check-in/Check-out logs for " + "<label id='numcount'></label>"   + " visits(s)<br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small><br></h2><div id='gohome'><a href='https://aquavisitorsystem.github.io/'>Go Home</a></div><br><br></center>";
    var logo = '<a href="https://aquavisitorsystem.github.io/"><img id="logo" src="aqua.png" width="250px" alt="Go Home"></a>'
    document.write(logo);
    document.write(title);
    document.write(printnow);
    if (cnt === 0){
        var nodata = "<center><br>No visitor data found<br></center>";
        document.write(nodata);
    }else{
        document.write("<table id='report' style='font-size: small;'>  <tr>     <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortByDate2(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th style='cursor: pointer; color: red;' onclick='sortByDate2(7)'>CheckIn<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th><th>CheckOut</th><th>Edit</th>  </tr>");
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
    var datecounts = new Date(doc.data().date).toLocaleDateString("fr-CA", options);
    Visitors.push(doc.data().firstname + ' ' + doc.data().lastname + ' '  + datecounts);
    console.log("loadlogall:" + dates);
    var companylinks = "<a href='https://aquavisitorsystem.github.io/?logreport=logcompany" + "&logvalue=" + doc.data().company+ "' target='_blank'>" + doc.data().company + "</a>";
    var namelinks = "<a href='https://aquavisitorsystem.github.io/?logreport=logname" + "&logvalue=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
    var glinks = "<a href='https://aquavisitorsystem.github.io/?logreport=loguserid" + "&logvalue=" + doc.data().login + "' target='_blank'>" + doc.data().login + "</a>";   
   
  
    if ((doc.data().checkin !== "") && (doc.data().checkout !== ""))
    {
        document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td style="opacity: 0;">' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
 
    }else{
        document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
    }
     //document.getElementById("numcount").innerHTML = countUnique(Visitors);
     //   document.getElementById("numcount").setAttribute("value", countUnique(Visitors));
        // document.getElementById("numcount").innerHTML = Math.ceil(cnt / 2);
        //document.getElementById("numcount").setAttribute("value", Math.ceil((cnt / 2)));
    });

    document.head.innerHTML = header;
    document.write("</table>");
    document.getElementsByTagName("body")[0].style.display = "none";
    //const uniqueArray = [...new Set(Visitors)];
    //const uniqueSet2 = new Set(uniqueArray);
    var growCount = document.getElementById('report').rows.length;
    if (growCount > 0){
        growCount = Math.ceil((growCount - 1));
    }
   // growCount = Math.ceil(growCount / 2);
    growCount = countUnique(Visitors);
    document.getElementById("numcount").innerHTML = growCount; //uniqueSet2.size;
    document.getElementById("numcount").setAttribute("value", growCount);
})
    .catch((error) => {
        console.log("Error getting documents: ", error);
});
    spinnow(3000);
    setTimeout("sortByDate2(7)", 3000);
}
       
    var loadinactive =  function(){
        var gd = new Date();
        //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
        var gmyDate = new Date(gd).toLocaleString('en-US');   
        var gtodaysdate = gmyDate.toString()
        var cntrecdays = 0;
    var db = firebase.firestore();
    var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}a{display:none;}#report tr > *:nth-child(8){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
    var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>"; var lines = "";  var lines = "";
    var lines = "";
    var Visitors = [];
    var dates;
    let today = new Date().toISOString().slice(0, 10);
    db.collection("messages").where("remove", "==","Yes").orderBy("date","desc")
 .get()
 .then((querySnapshot) => {
     var cnt = querySnapshot.size;
    var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (inactive report)</h1><small>**InActive schedules will be removed periodically<br>If you need an InActive schedule restored please contact Chuck Konkol ext. 4574</small><h2>" + "<label id='numcount'></label>" + " InActive Visitor Schedule(s)<br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small><br></h2><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br><br></center>";
    var logo = '<a href="https://aquavisitorsystem.github.io/"><img id="logo" src="aqua.png" width="250px" alt="Go Home"></a>'
    document.write(logo);
    document.write(title);
    document.write(printnow);
    if (cnt === 0){
        var nodata = "<center><br>No visitor data found<br></center>";
        document.write(nodata);
    }else{
        // document.write("<table id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
        document.write("<table id='report' style='font-size: small;'><thead>  <tr>    <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>      <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>       <th>Email</th>       <th>Visiting</th><th>Edit</th>  </tr></thead>");
    }
    document.getElementsByTagName("body")[0].style.display = "none";
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
   // var dates = new Date(doc.data().date).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date).toLocaleTimeString("en", options2)
    console.log("loadinactive:" + dates);
  //  Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
    if (typeof doc.data().date !== 'undefined' && doc.data().date !=="") {
        dates = new Date(doc.data().date).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date).toLocaleTimeString("en", options2)
        Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
    }
    if (typeof doc.data().date2 !== 'undefined' && doc.data().date2 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date2).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date2).toLocaleTimeString("en", options2)
        Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
    }
    if (typeof doc.data().date3 !== 'undefined' && doc.data().date3 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date3).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date3).toLocaleTimeString("en", options2)
        Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
    }
    if (typeof doc.data().date4 !== 'undefined' && doc.data().date4 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date4).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date4).toLocaleTimeString("en", options2)
        Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
    }
    if (typeof doc.data().date5 !== 'undefined' && doc.data().date5 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date5).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date5).toLocaleTimeString("en", options2)
        Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
    }
    if (typeof doc.data().date6 !== 'undefined' && doc.data().date6 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date6).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date6).toLocaleTimeString("en", options2)
        Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
    }
    if (typeof doc.data().date7 !== 'undefined' && doc.data().date7 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date7).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date7).toLocaleTimeString("en", options2)
        Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
    }
    if (typeof doc.data().date8 !== 'undefined' && doc.data().date8 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date8).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date8).toLocaleTimeString("en", options2)
        Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
    }
    if (typeof doc.data().date9 !== 'undefined' && doc.data().date9 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date9).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date9).toLocaleTimeString("en", options2)
        Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
    }
    if (typeof doc.data().date10 !== 'undefined' && doc.data().date10 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date10).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date10).toLocaleTimeString("en", options2)
        Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
    }
    if (typeof doc.data().date11 !== 'undefined' && doc.data().date11 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date11).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date11).toLocaleTimeString("en", options2)
        Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
    }
    if (typeof doc.data().date12 !== 'undefined' && doc.data().date12 !=="") {
        dates = dates + "<br>" + new Date(doc.data().date12).toLocaleDateString("fr-CA", options) + ', ' + new Date(doc.data().date12).toLocaleTimeString("en", options2)
        Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
    }
    if (typeof doc.data().date13 !== 'undefined' && doc.data().date13 !=="") {
            const datea = new Date(doc.data().date13);
            const dateb = new Date(doc.data().date14);
        var date13 = addOneDay(datea).toLocaleDateString("en", options2);
        var date14 = addOneDay(dateb).toLocaleDateString("en", options2);
        console.log("date13: " + date13);
        console.log("date14: " + date14);
        if (doc.data().mon === true) {
            cntrecdays = RecCount(date13,date14,1);
        }
        if (doc.data().tue === true) {
            cntrecdays = cntrecdays + RecCount(date13,date14,2);
        }
        if (doc.data().wed === true) {
            cntrecdays = cntrecdays + RecCount(date13,date14,3);
        }
        if (doc.data().thu === true) {
            cntrecdays = cntrecdays + RecCount(date13,date14,4);
        }
        if (doc.data().fri === true) {
            cntrecdays = cntrecdays + RecCount(date13,date14,5);
        }
        
       // dates = cntrecdays + " Recurring Until: <br>" + new Date(doc.data().date14).toLocaleDateString("fr-CA", options);
        dates = "Recurring Until: <br>" + new Date(doc.data().date14).toLocaleDateString("fr-CA", options);
          
        //Visitors.push(doc.data().login + new Date(doc.data().date13).toLocaleDateString("en", options));
    }
    //  document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
    var glinks = "<a href='https://aquavisitorsystem.github.io/?userid=" + doc.data().login + "&report=active'>" + doc.data().login + "</a>";
    document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');

    });
    var count = 0;
    try {
        var table = document.getElementById("report");
        count  = table.tBodies[0].rows.length;
    } catch (error) {
        count = 0;
    }
    //let count = Visitors.length //+ cntrecdays + cntrecdays;
    //console.log("count: " +  count);
    document.getElementById("numcount").innerHTML = count;
    document.getElementById("numcount").setAttribute("value", count );
document.head.innerHTML = header;
document.write("</table>");
document.getElementsByTagName("body")[0].style.display = "none";
//spinnow(3000);
//setTimeout("sortByDate2(4)", 3000);
//setTimeout("sortTable(4)", 2000);
})
    .catch((error) => {
        console.log("Error getting documents: ", error);
});
    spinnow(3000);
    setTimeout("sortByDate2(4)", 3000);
}

    var loaddbremoved =  function(data){
        var cntrecdays = 0;
        var cnt = 0;
        var db = firebase.firestore();
        var get_login = "";
        var Visitors = [];
        try {
            get_login  = data["userid"];
        }
        catch(err) {
            document.body.innerHTML = "";
            get_login  = fldloginID;
        }

        if (get_login  === null || get_login === '') {
            alert("Enter your Network Login ID above & try again!");
        }else{
            var gd = new Date();
            //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
            var gmyDate = new Date(gd).toLocaleString('en-US');   
            var gtodaysdate = gmyDate.toString()
            var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>";
            get_login  = get_login.trim().toLowerCase();
     
            //get_login.trim().toLowerCase();
            console.log(get_login);
            //var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;}</style><script src='sorttable.js'></script></head>";
            var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}#report tr > *:nth-child(1){display: none;}#report tr > *:nth-child(9){display: none;}#home{display:none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
            var lines = "";
            let today = new Date().toISOString().slice(0, 10);
     
            db.collection("messages").where("login", "==",get_login).where("remove", "==","X").orderBy("date","desc")
       .get()
       .then((querySnapshot) => {
           cnt = querySnapshot.size;
            var msg = "<input type='button' id='btnPrint' onclick='loaddb();' value='Show All Schedules for: " + fldloginID  + "'/>";
            var goback = ' | <a href="index.html?report=removedreport">Go Back</a>';
           
            // var goback = ' | <a href="javascript:window.location=document.referrer;">Go Back</a>';
           // var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (Removed Report)</h1><h2>" + "<label id='numcount'></label>" + " Removed Visitor Schedule(s) for: <a href='https://aquavisitorsystem.github.io/?userid=" + get_login + "&report=removed'>" + get_login + "</a><br><small style='font-size: 17px;color: grey;'>(showing all future,present & past schedules for: " + get_login + ")</small><br><small style='font-size: 16px;color: blue;'>report created on " +  gtodaysdate + "</small><br></h2><div id='home'><a href='https://aquavisitorsystem.github.io/'>Go Home</a>" + goback + "<br></div><br></center>";
            var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (Removed Report)</h1><h2>" + "<label id='numcount'></label>" + " Removed Visitor Schedule(s) for: <a href='https://aquavisitorsystem.github.io/?userid=" + get_login + "&report=removed'>" + get_login + "</a><br><small style='font-size: 17px;color: grey;'>(showing all future,present & past schedules for: " + get_login + ")</small><br><small style='font-size: 16px;color: blue;'>report created on " +  gtodaysdate + "</small><br></h2><div id='home'><a href='https://aquavisitorsystem.github.io/'>Go Home</a><br></div><br></center>";
            
            document.write(title);
            
            document.write(printnow);
            if (cnt === 0){
                var nodata = "<center><br>No visitor data found<br></center>";
                document.write(nodata);
            }else{
                //document.write("<table id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th  style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th  style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
                document.write("<table id='report' style='font-size: small;'>  <thead><tr>    <th>UserID</th>    <th>First Name</th>    <th  style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th>Date/Time(s)</th><th  style='cursor: pointer; color: red;' onclick='sortTable(5)'>MeetingDate<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th><th>Email</th>       <th>Visiting</th><th>Edit</th></tr></thead>");
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
            var dates;
            if (typeof doc.data().date !== 'undefined' && doc.data().date !=="") {
                dates = new Date(doc.data().date).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date).toLocaleDateString("fr-CA", options1)
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date2 !== 'undefined' && doc.data().date2 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date2).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date2).toLocaleDateString("fr-CA", options1)
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date3 !== 'undefined' && doc.data().date3 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date3).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date3).toLocaleDateString('fr-CA',options1);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date4 !== 'undefined' && doc.data().date4 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date4).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date4).toLocaleDateString('fr-CA',options1);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date5 !== 'undefined' && doc.data().date5 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date5).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date5).toLocaleDateString('fr-CA',options1);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date6 !== 'undefined' && doc.data().date6 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date6).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date6).toLocaleDateString('fr-CA',options1);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date7 !== 'undefined' && doc.data().date7 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date7).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date7).toLocaleDateString('fr-CA',options1);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
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
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date10 !== 'undefined' && doc.data().date10 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date10).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date10).toLocaleDateString('fr-CA',options1);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date11 !== 'undefined' && doc.data().date11 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date11).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date11).toLocaleDateString('fr-CA',options1);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date12 !== 'undefined' && doc.data().date12 !=="") {
                dates = dates + "<br>" + new Date(doc.data().date12).toLocaleDateString("en", options)
                datesort = new Date(doc.data().date12).toLocaleDateString('fr-CA',options1);
                Datex.push(datesort);
                Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
            }
            if (typeof doc.data().date13 !== 'undefined' && doc.data().date13 !=="") {
                cntrecdays = 0;
                h  =  tConvert (doc.data().rectime);
                var days = "";
                const datea = new Date(doc.data().date13);
               const dateb = new Date(doc.data().date14);
                var date13 = addOneDay(datea).toLocaleDateString("en", options2);
                var date14 = addOneDay(dateb).toLocaleDateString("en", options2);
                console.log("date13: " + date13);
                console.log("date14: " + date14);
                var mdays = [];
                if (doc.data().mon === true) {
                    mdays.push(1);
                    days = "Mon";
                    cntrecdays = RecCount(date13,date14,1);
                }
                if (doc.data().tue === true) {
                    mdays.push(2);
                    if (days === ""){
                        days = "Tue";
                    }else{
                        days = days + "," + "Tue";
                    }    
                    cntrecdays = cntrecdays + RecCount(date13,date14,2);
                }
                if (doc.data().wed === true) {
                    mdays.push(3);
                    if (days === ""){
                        days = "Wed";
                    }else{
                        days = days + "," + "Wed";
                    } 
                    cntrecdays = cntrecdays + RecCount(date13,date14,3);
                }
                if (doc.data().thu === true) {
                    mdays.push(4);
                    if (days === ""){
                        days = "Thu";
                    }else{
                        days = days + "," + "Thu";
                    }   
                    cntrecdays = cntrecdays + RecCount(date13,date14,4);
                }
                if (doc.data().fri === true) {
                    mdays.push(5);
                    if (days === ""){
                        days = "Fri";
                    }else{
                        days = days + "," + "Fri";
                    }  
                    cntrecdays = cntrecdays + RecCount(date13,date14,4);
                }
            
                if (dates)
                {
                    console.log("777 dates: " + dates);
                    //dates = dates + "<hr>" + cntrecdays + " Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h
                    dates = dates + "<hr>" + "Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h
                }else{
                    console.log("888 dates:" + dates);

                    // dates = cntrecdays + " Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h
                    dates = "Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h
                }
                var todaysdate77 = new Date().toLocaleDateString("en", options2);
                var range = date14
                range = new Date(range);
                todaysdate77 = new Date(todaysdate77);
                console.log("7777 date14:" + range);
                console.log("7777 todaysdate:" + todaysdate77);
                if (range < todaysdate77){
             const dateb = new Date(doc.data().date14);
                    datesorts = addOneDay(dateb).toLocaleDateString("fr-CA", options2);
                    console.log("out of range:" + datesorts);
                    Datex.push(datesorts);
                }else{
              const date = new Date();
                 const thisistodayday = date.getDay();
                    console.log("thisistodayday" + thisistodayday);
                    console.log("mdays.includes(thisistodayday)" + mdays.includes(thisistodayday));
                    if (mdays.includes(thisistodayday)){
                        datesorts = new Date().toLocaleDateString("fr-CA", options2);
                    }else{
                        datesorts = nextDate(mdays[0]);
                    }
                    console.log("in range:" + datesorts);
                    Datex.push(datesorts);
                }
                //datesorts = new Date().toLocaleDateString("fr-CA", options2);;
                Datex.push(datesorts);
            }




            Datex.sort((a, b) => new Date(b) - new Date(a)).reverse()
            var todays = new Date().toLocaleDateString("fr-CA", options2);
            console.log("todays: " + todays);
            for(var i=0; i<Datex.length; i++){
                console.log("Datex[i]: " + Datex[i]);
                if(Datex[i] === todays){
                    datesort = Datex[i]
                    console.log("Datex[i] === todays " + datesort);
                    break;
                }else if (Datex[i] > todays){
                    datesort = Datex[i]
                    console.log("Datex[i] > todays " + datesort);
                    break;
                }else if (Datex[i] < todays){
                    datesort = Datex[i]
                    console.log("Datex[i] < todays" + datesort);
                    //break;
                }
            }

            document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
        });
        var count = 0;
        try {
            var table = document.getElementById("report");
            count  = table.tBodies[0].rows.length;
        } catch (error) {
            count = 0;
        }

        //var table = document.getElementById("report");
        //var tbodyRowCount = table.tBodies[0].rows.length;
        //let count = tbodyRowCount; //Visitors.length + cntrecdays;
        console.log("count: " +  count);
        document.getElementById("numcount").innerHTML = count;
        document.getElementById("numcount").setAttribute("value",  count);
        document.head.innerHTML = header;
        document.write("</tbody></table>");
        document.getElementsByTagName("body")[0].style.display = "none";
        //spinnow(3000);
        //setTimeout("sortByDate2(5)", 3000);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    }
    //setTimeout("sortTable(5)", 2000);
    // setTimeout("sortTable(5)", 2000);
    //sortdate
    spinnow(3000);
    setTimeout("sortByDate2(5)", 3000);
    }

    var loadremoved =  function(){
        var cntrecdays = 0;
        var db = firebase.firestore();
        var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}#gohome{display:none;}#report tr > *:nth-child(9){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
        var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>"; var lines = "";
        var RecordIDs = [];
        var cnt1;
        let today = new Date().toISOString().slice(0, 10);
        db.collection("messages").where("remove", "==","X").orderBy("date","desc")
   .get()
   .then((querySnapshot) => {
       var cnt = querySnapshot.size;
        var gd = new Date();
        var datesort;
        var Visitors = [];
        //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
        var gmyDate = new Date(gd).toLocaleString('en-US');   
        var gtodaysdate = gmyDate.toString();
        var title = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (removed)</h1><h2>" + "<label id='numcount'></label>" + " Removed Schedule(s)<br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small><br></h2><div id='gohome'><a href='https://aquavisitorsystem.github.io/'>Go Home</a></div><br><br></center>";

        document.write(title);
        document.write(printnow);

        if (cnt === 0){
            var nodata = "<center><br>No visitor data found<br></center>";
            document.write(nodata);
        }else{
            //	  document.write("<table  id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th>Date/Time</th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
            // document.write("<table  id='report' style='font-size: small;'>  <tr>    <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th>Date/Time</th>      <th>Email</th>       <th>Visiting</th><th>Edit</th>  </tr>");
            document.write("<table id='report' style='font-size: small;'>  <thead><tr>    <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th  style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th>Date/Time(s)</th><th  style='cursor: pointer; color: red;' onclick='sortByDate2(5)'>MeetingDate<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th><th>Email</th>       <th>Visiting</th><th>Edit</th></tr></thead>");
            document.write("<tbody>");
        }
        document.getElementsByTagName("body")[0].style.display = "none";
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
        var dates;
        var Datex = [];
        console.log("date2: " + doc.data().date2);
        //  var todays = new Date().toDateString();
        if (typeof doc.data().date !== 'undefined' && doc.data().date !=="") {
            dates = new Date(doc.data().date).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date).toLocaleDateString("fr-CA", options2)
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date2 !== 'undefined' && doc.data().date2 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date2).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date2).toLocaleDateString("fr-CA", options2)
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date3 !== 'undefined' && doc.data().date3 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date3).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date3).toLocaleDateString("fr-CA", options2)
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date4 !== 'undefined' && doc.data().date4 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date4).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date4).toLocaleDateString("fr-CA", options2)
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date5 !== 'undefined' && doc.data().date5 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date5).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date5).toLocaleDateString("fr-CA", options2)
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date6 !== 'undefined' && doc.data().date6 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date6).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date6).toLocaleDateString("fr-CA", options2)
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date7 !== 'undefined' && doc.data().date7 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date7).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date7).toLocaleDateString("fr-CA", options2)
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));

        }
        if (typeof doc.data().date8 !== 'undefined' && doc.data().date8 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date8).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date8).toLocaleDateString("fr-CA", options2);
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date9 !== 'undefined' && doc.data().date9 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date9).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date9).toLocaleDateString("fr-CA", options2)
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date10 !== 'undefined' && doc.data().date10 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date10).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date10).toLocaleDateString("fr-CA", options2)
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date11 !== 'undefined' && doc.data().date11 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date11).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date11).toLocaleDateString("fr-CA", options2)
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date12 !== 'undefined' && doc.data().date12 !=="") {
            dates = dates + "<br>" + new Date(doc.data().date12).toLocaleDateString("en", options)
            datesort = new Date(doc.data().date12).toLocaleDateString("fr-CA", options2);
            Datex.push(datesort);
            Visitors.push(doc.data().login + new Date(doc.data().date).toLocaleDateString("en", options));
        }
        if (typeof doc.data().date14 !== 'undefined' && doc.data().date14 !=="") {
            cntrecdays = 0;
            h  =  tConvert (doc.data().rectime);
            var days = "";
            const datea = new Date(doc.data().date13);
            const dateb = new Date(doc.data().date14);
            var date13 = addOneDay(datea).toLocaleDateString("en", options2);
            var date14 = addOneDay(dateb).toLocaleDateString("en", options2);
            console.log("date13: " + date13);
            console.log("date14: " + date14);
            var mdays = []; 
            if (doc.data().mon === true) {
                mdays.push(1);
                days = "Mon";
                cntrecdays = RecCount(date13,date14,1);
            }
            if (doc.data().tue === true) {
                mdays.push(2);
                if (days === ""){
                    days = "Tue";
                }else{
                    days = days + "," + "Tue";
                }
                cntrecdays = cntrecdays + RecCount(date13,date14,2);
            }
            if (doc.data().wed === true) {
                mdays.push(3);
                if (days === ""){
                    days = "Wed";
                }else{
                    days = days + "," + "Wed";
                } 
                cntrecdays = cntrecdays + RecCount(date13,date14,3);
            }
            if (doc.data().thu === true) {
                mdays.push(4);
                if (days === ""){
                    days = "Thu";
                }else{
                    days = days + "," + "Thu";
                }   
                cntrecdays = cntrecdays + RecCount(date13,date14,4);
            }
            if (doc.data().fri === true) {
                mdays.push(5);
                if (days === ""){
                    days = "Fri";
                }else{
                    days = days + "," + "Fri";
                }  
                cntrecdays = cntrecdays + RecCount(date13,date14,4);
            }
            if (dates)
            {
                console.log("777 dates: " + dates);
                //dates = dates + "<hr>" + cntrecdays + " Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h
                dates = dates + "<hr>" + "Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h
            }else{
                console.log("888 dates:" + dates);

                // dates = cntrecdays + " Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h
                dates = "Recurring Until: <br>" + date14 + "<br>Day(s):" + days + "<br>Time:" + h
            }
            var todaysdate77 = new Date().toLocaleDateString("en", options2);
            var range = date14
            console.log("range: " + range);
            console.log("todaysdate77:" + todaysdate77);
            range = new Date(range);
            todaysdate77 = new Date(todaysdate77);
            console.log("(range < todaysdate77):" + (range < todaysdate77));
            if (range < todaysdate77){
                const dateb = new Date(doc.data().date14);
                datesorts = addOneDay(dateb).toLocaleDateString("fr-CA", options2);
                console.log("out of range:" + datesorts);
                Datex.push(datesorts);
            }else{
                 const date = new Date();
                    const thisistodayday = date.getDay();
                console.log("thisistodayday" + thisistodayday);
                console.log("mdays.includes(thisistodayday)" + mdays.includes(thisistodayday));
                if (mdays.includes(thisistodayday)){
                    datesorts = new Date().toLocaleDateString("fr-CA", options2);
                }else{
                    datesorts = nextDate(mdays[0]);
                }
                console.log("in range:" + datesorts);
                Datex.push(datesorts);
            }
            //datesorts = new Date().toLocaleDateString("fr-CA", options2);;
            Datex.push(datesorts);
            Visitors.push(doc.data().login + new Date(doc.data().date14).toLocaleDateString("en", options2) + doc.data().rectime);
        }
        //Datex.sort((a, b) => new Date(b) - new Date(a)).reverse()
        // Datex.sort((a, b) => new Date(b) - new Date(a))
        // var todays = new Date().toLocaleDateString("fr-CA", options2);
        //  console.log("todays: " + todays);
    
        Datex.sort((a, b) => new Date(b) - new Date(a)).reverse()
        var todays = new Date().toLocaleDateString("fr-CA", options2);
        console.log("todays: " + todays);
        for(var i=0; i<Datex.length; i++){
            console.log("Datex[i]: " + Datex[i]);
            if(Datex[i] === todays){
                datesort = Datex[i]
                console.log("Datex[i] === todays " + datesort);
                break;
            }else if (Datex[i] > todays){
                datesort = Datex[i]
                console.log("Datex[i] > todays " + datesort);
                break;
            }else if (Datex[i] < todays){
                datesort = Datex[i]
                console.log("Datex[i] < todays" + datesort);
                //break;
            }
        }

        //document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
 
        var glinks = "<a href='index.html?userid=" + doc.data().login + "&report=removed'>" + doc.data().login + "</a>";
        document.write('<tr><td>' + glinks  + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + datesort + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
    });
var count = 0;
try {
    var table = document.getElementById("report");
    count  = table.tBodies[0].rows.length;
} catch (error) {
    count = 0;
}
//var table = document.getElementById("report");
//var tbodyRowCount = table.tBodies[0].rows.length;
//let count = tbodyRowCount; //Visitors.length;
    
console.log("count: " +  count);
document.getElementById("numcount").innerHTML = count ;
document.getElementById("numcount").setAttribute("value",  count );
document.head.innerHTML = header;
document.write("</tbody></table>");
document.getElementsByTagName("body")[0].style.display = "none";
//spinnow(3000);
//setTimeout("sortByDate2(5)", 3000);
})
    .catch((error) => {
        console.log("Error getting documents: ", error);
});
    console.log("arrayuserid: " +  arrayuserid);
    spinnow(3000);
    setTimeout("sortByDate2(5)", 3000);
    }



       
    var loadtoday =  function(){
        try {
            var db = firebase.firestore();
            let todaysdate = new Date();
            var count = 0;
            var lines = "";
            var today = new Date();
            var x;
            document.write("");
            var choosedate  = new Date();
          
            var name=prompt("Please choose one of the following\r\n1) Enter date to search\r\n    Example: 05/01/2024\r\n2) Click [Ok] or [Enter] key","Enter Date");
            if (name === null){
                //clear();
                //spinnow(3000);
                setTimeout("window.location.reload();", 3000);
          
                
            }else if (name!="Enter Date"){
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
            var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}#gohome{display:none;}#report tr > *:nth-child(8){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
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
    //resolve(RecordIDs);
    });
//END
    let todaysdate2 = new Date();
    //START
    db.collection("messages").where("mon", "==",true).where("remove", "==","No").get().then((querySnapshot) => {
          querySnapshot.forEach(doc => {
        console.log("mon docid:" + doc.id, ' => ', doc.data());
     if (typeof doc.data().date14 !== 'undefined' && doc.data().date14 !=="" && new Date(doc.data().date14) >= todaysdate2) {
        cnt1 = cnt1 + 1;
        RecordIDs.push( doc.id);
        console.log("mon cnt1:" + cnt1);
    }
    });
    //resolve(RecordIDs);
    });
//END

    //START
    db.collection("messages").where("tue", "==",true).where("remove", "==","No").get().then((querySnapshot) => {
         querySnapshot.forEach(doc => {
        console.log("tue docid:" + doc.id, ' => ', doc.data());
        if (typeof doc.data().date14 !== 'undefined' && doc.data().date14 !=="" && new Date(doc.data().date14) >= todaysdate2) {
            cnt1 = cnt1 + 1;
            console.log("Tue cnt1:" + cnt1);
            RecordIDs.push( doc.id);
           
    }
    });
    //resolve(RecordIDs);
    });
//END

    //START
    db.collection("messages").where("wed", "==",true).where("remove", "==","No").get().then((querySnapshot) => {
       
     querySnapshot.forEach(doc => {
        console.log("wed docid:" + doc.id, ' => ', doc.data());
    if (typeof doc.data().date14 !== 'undefined' && doc.data().date14 !=="" && new Date(doc.data().date14) >= todaysdate2) {
        cnt1 = cnt1 + 1;
        console.log("Wed cnt1:" + cnt1);
        RecordIDs.push( doc.id);
    }
    });
    //resolve(RecordIDs);
    });
//END

    //START
    db.collection("messages").where("thu", "==",true).where("remove", "==","No").get().then((querySnapshot) => {
         querySnapshot.forEach(doc => {
        console.log("thu docid:" + doc.id, ' => ', doc.data());
    if (typeof doc.data().date14 !== 'undefined' && doc.data().date14 !=="" && new Date(doc.data().date14) >= todaysdate2) {
        cnt1 = cnt1 + 1;
        console.log("Thu cnt1:" + cnt1);
        RecordIDs.push( doc.id);
    }
    });
    //resolve(RecordIDs);
    });
//END

    //START
    db.collection("messages").where("fri", "==",true).where("remove", "==","No").get().then((querySnapshot) => {
       querySnapshot.forEach(doc => {
        console.log("fri docid:" + doc.id, ' => ', doc.data());
    if (typeof doc.data().date14 !== 'undefined' && doc.data().date14 !=="" && new Date(doc.data().date14) >= todaysdate2) {
        cnt1 = cnt1 + 1;
        console.log("Fri cnt1:" + cnt1);
        RecordIDs.push( doc.id);
    }
    });
    resolve(RecordIDs);
    });
    //END
  
    }); 

    var docs;
    promise.then(values => {
        console.log("values:" + values);
    docs = values;
    docs = docs.filter(onlyUnique);
    console.log("docs:" + docs);
const chunkSize = 10;
var chunk;
var gd = new Date();
//var gmyDate = new Date(gd).toLocaleDateString('en-US');   
var gmyDate = new Date(gd).toLocaleString('en-US');   
var gtodaysdate = gmyDate.toString();


var title = "<div id='reptitle'><center><h1>Aqua-Aerobic Systems Visitor Schedule (date report)</h1><h2>" + cnt1 + " Visitor(s) for: " + name + "</h2></center></div><center><div id='gohome'><a href='https://aquavisitorsystem.github.io/'>Go Home</a></div></center><br>";         
    document.write(title);
    document.write(printnow);
    if (cnt1 === 0){
        var nodata = "<center><br>No visitor data found<br></center>";
        document.write(nodata);
    }else{
        //        document.write("<table id='report' style='font-size: small;'>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");	
        
        document.write("<table id='report' style='font-size: small;'> <thead> <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortByDate2(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>Edit</th>  </tr></thead> ");	
    }
    for (let i = 0; i < docs.length; i += chunkSize) {
        chunk = docs.slice(i, i + chunkSize);
        db.collection("messages").where("key", "in",chunk).orderBy("lastname","asc")
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
                        var options2 = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    };
                         var options3 = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    const datea = new Date(doc.data().date13);
    const dateb = new Date(doc.data().date14);

        var date13 = addOneDay(datea).toLocaleDateString("en", options2);
        var date14 = addOneDay(dateb).toLocaleDateString("en", options2);
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

        //
     dt = new Date(choosedate).toLocaleDateString("en", options2);

 var dt1 = new Date(choosedate).toLocaleDateString("en", options2);
  name = new Date(name).toLocaleDateString("en", options2)
  if (doc.data().mon === true) {
        var dt = new Date(dt1);
        var ndt = dt.getDay();
        var ggdate13 = new Date(date13).toLocaleDateString("fr-CA", options2);
        var ggdt1 = new Date().toLocaleDateString("fr-CA", options2);
        var ggdate14 = new Date(date14).toLocaleDateString("fr-CA", options2);
        var dgg = new Date();
        let daygg = dgg.getDay();
       if (ggdt1 >= ggdate13 && ggdt1 <= ggdate14 && daygg === 1){
            var ndt = dt.getDay();
           console.log("mon ndt: " + ndt);
          
   
       var h  =  tConvert (doc.data().rectime);
       dates = name + "," + h; 
    }else{
cnt1 = cnt1 - 1
    }
    }

    if (doc.data().tue === true)  {
var dt = new Date(dt1);
        var ndt = dt.getDay();
        var ggdate13 = new Date(date13).toLocaleDateString("fr-CA", options2);
        var ggdt1 = new Date().toLocaleDateString("fr-CA", options2);
        var ggdate14 = new Date(date14).toLocaleDateString("fr-CA", options2);
        var dgg = new Date();
        let daygg = dgg.getDay();
        if (ggdt1 >= ggdate13 && ggdt1 <= ggdate14 && daygg === 2){
        
           console.log("tue ndt: " + ndt);
          
     
       var h  =  tConvert (doc.data().rectime);
       dates = name + "," + h;
    }else{
cnt1 = cnt1 - 1
    }
    }

    if (doc.data().wed === true) {
 var dt = new Date(dt1);
        var ndt = dt.getDay();
        var ggdate13 = new Date(date13).toLocaleDateString("fr-CA", options2);
        var ggdt1 = new Date().toLocaleDateString("fr-CA", options2);
        var ggdate14 = new Date(date14).toLocaleDateString("fr-CA", options2);
        var dgg = new Date();
        let daygg = dgg.getDay();
        if (ggdt1 >= ggdate13 && ggdt1 <= ggdate14 && daygg  === 3){

       
           console.log("wed ndt: " + ndt);
     
       var h  =  tConvert (doc.data().rectime);
       dates = name + "," + h; 
    }else{
cnt1 = cnt1 - 1
    }
    }

    if (doc.data().thu === true) {
var dt = new Date(dt1);
        var ndt = dt.getDay();
        var ggdate13 = new Date(date13).toLocaleDateString("fr-CA", options2);
        var ggdt1 = new Date().toLocaleDateString("fr-CA", options2);
        var ggdate14 = new Date(date14).toLocaleDateString("fr-CA", options2);
        var dgg = new Date();
        let daygg = dgg.getDay();
        if (ggdt1 >= ggdate13 && ggdt1 <= ggdate14 && daygg  === 4){
        
           console.log("thu ndt: " + ndt);
   
       var h  =  tConvert (doc.data().rectime);
       dates = name + "," + h; 
    }else{
cnt1 = cnt1 - 1
    }
    }

    if (doc.data().fri === true) {
      var dt = new Date(dt1);
        var ndt = dt.getDay();
        var ggdate13 = new Date(date13).toLocaleDateString("fr-CA", options2);
        var ggdt1 = new Date().toLocaleDateString("fr-CA", options2);
        var ggdate14 = new Date(date14).toLocaleDateString("fr-CA", options2);
        var dgg = new Date();
        let daygg = dgg.getDay();
        if (ggdt1 >= ggdate13 && ggdt1 <= ggdate14 && daygg  === 5){
        
           console.log("fri ndt: " + ndt);
    
       var h  =  tConvert (doc.data().rectime);
       dates = name + "," + h; 
    }else{
cnt1 = cnt1 - 1
    }
    }
        // console.log("getday: " + name.getDay());
      console.log("cnt1: " + cnt1);
        var dt = new Date(choosedate);
          console.log("getday: " + dt.getDay());
          dt = new Date(choosedate).toLocaleDateString("en", options2);
               console.log("choosedate: " + dt);
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
            console.log("mon: " + doc.data().mon);
             console.log("tue: " + doc.data().tue);
              console.log("wed: " + doc.data().wed);
               console.log("thu: " + doc.data().thu);
                console.log("fri: " + doc.data().fri);
             console.log("date13: " + date13);
            console.log("date14: " + date14);
        // }
        //var dates = new Date(doc.data().date).toLocaleTimeString()
        //console.log("loadtodayschedule:" + dates);
        // document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
           if (dates != "Invalid Date")
    {
    var namelinks = "<a href='https://aquavisitorsystem.github.io/?lname=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
   var companylinks = "<a href='https://aquavisitorsystem.github.io/?company=" + doc.data().company + "' target='_blank'>" + doc.data().company + "</a>";
       var glinks = "<a href='https://aquavisitorsystem.github.io/?userid=" + doc.data().login + "&report=active' target='_blank'>" + doc.data().login + "</a>";
           document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
    }
    });
    
    document.getElementById("reptitle").innerHTML = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (date report)</h1><h2>" + cnt1 + " Visitor(s) for: " + name + "<br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small><br></h2></center>";
    if (cnt1 === 0){
    document.getElementById("report").innerHTML = "<center><br>No visitor data found<br></center>";
    }
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
      document.getElementsByTagName("body")[0].style.display = "none";
    });
        //spinnow(3000);
        //setTimeout("sortByDate(4)", 3000);
     document.write("</table>");
        spinnow(3000);
     setTimeout("sortByDate(4)", 3000);
    }
    catch(err) {
   // alert("Incorrect Date Format. Please try again.");
    var title = "<div id='reptitle'><center><h1>Aqua-Aerobic Systems Visitor Schedule (date report)</h1><center><br>Incorrect Date Format. Please try again.<br><br><a href='https://aquavisitorsystem.github.io/'>Go Home</a></div></center><br>";         

     //var nodata = "<center><br>Incorrect Date Format. Please try again.<br><br> <a href='https://aquavisitorsystem.github.io/'>Go Home</a><br></center>";
      document.write(title);
      
      // setTimeout("window.location.reload();", 3000);
       //setTimeout("loadtoday();", 3000);
    }
        // spinnow(3000);
    // setTimeout("sortByDate(4)", 3000);
    }
  
function tConvert (time) {
        // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
 
  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ?' AM':' PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
    console.log("time before update: " + time[0]);
    if (time[0] < 10){
       time[0] = "0" + time[0];
       console.log("time hour update: " + time[0]);
    }
    }
    var t = time.join ('');
    return t;
  //return time.join (''); // return adjusted time or original string
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
   var gd = new Date();
        //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
            var gmyDate = new Date(gd).toLocaleString('en-US');   
            var gtodaysdate = gmyDate.toString()
 var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}#gohome{display:none;}#report tr > *:nth-child(8){display: none;}#report tr > *:nth-child(9){display: none;}#report tr > *:nth-child(10){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
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
//resolve(RecordIDs);
});
//END
//START


db.collection("messages").where("mon", "==",true).where("remove", "==","No").get().then((querySnapshot) => {
  querySnapshot.forEach(doc => {
    console.log("mon docid:" + doc.id, ' => ', doc.data());
if (typeof doc.data().date14 !== 'undefined' && doc.data().date14 !=="" && new Date(doc.data().date14) >= todaysdate) {
    cnt1 = cnt1 + 1;
    console.log("Mon cnt1:" + cnt1);
    RecordIDs.push( doc.id);
}
});
//resolve(RecordIDs);
});
//END

//START
db.collection("messages").where("tue", "==",true).where("remove", "==","No").get().then((querySnapshot) => {
  querySnapshot.forEach(doc => {
    console.log("tue docid:" + doc.id, ' => ', doc.data());
if (typeof doc.data().date14 !== 'undefined' && doc.data().date14 !=="" && new Date(doc.data().date14) >= todaysdate) {
    cnt1 = cnt1 + 1;
    console.log("Tue cnt1:" + cnt1);
    RecordIDs.push( doc.id);
}
});
//resolve(RecordIDs);
});
//END

//START
db.collection("messages").where("wed", "==",true).where("remove", "==","No").get().then((querySnapshot) => {
querySnapshot.forEach(doc => {
    console.log("wed docid:" + doc.id, ' => ', doc.data());
if (typeof doc.data().date14 !== 'undefined' && doc.data().date14 !=="" && new Date(doc.data().date14) >= todaysdate) {
    cnt1 = cnt1 + 1;
    console.log("Wed cnt1:" + cnt1);
    RecordIDs.push( doc.id);
}
});
///resolve(RecordIDs);
});
//END

//START
db.collection("messages").where("thu", "==",true).where("remove", "==","No").get().then((querySnapshot) => {
 querySnapshot.forEach(doc => {
    console.log("thu docid:" + doc.id, ' => ', doc.data());
    console.log("new Date(doc.data().date14) >= todaysdate:" + new Date(doc.data().date14) >= todaysdate);
    console.log("new Date(doc.data().date14):" + new Date(doc.data().date14));
    console.log("todaysdate:" + todaysdate);
if (typeof doc.data().date14 !== 'undefined' && doc.data().date14 !=="" && new Date(doc.data().date14) >= todaysdate) {
    cnt1 = cnt1 + 1;
    console.log("thu cnt1:" + cnt1);
    RecordIDs.push( doc.id);
}
});
//resolve(RecordIDs);
});
//END

//START
db.collection("messages").where("fri", "==",true).where("remove", "==","No").get().then((querySnapshot) => {
querySnapshot.forEach(doc => {
    console.log("fri docid:" + doc.id, ' => ', doc.data());
if (typeof doc.data().date14 !== 'undefined' && doc.data().date14 !=="" && new Date(doc.data().date14) >= todaysdate) {
    cnt1 = cnt1 + 1;
    console.log("fri cnt1:" + cnt1);
    RecordIDs.push( doc.id);
}
});
resolve(RecordIDs);
});
//END
}); 

var docs;
promise.then(values => {
    console.log("values:" + values);
docs = values;
docs = docs.filter(onlyUnique);
console.log("docs:" + docs);
const chunkSize = 10;
var chunk;
var title = "<div id='reptitle'><center><h1>Aqua-Aerobic Systems Visitor Schedule (today report)</h1><h2>" + cnt1 + " Visitor(s) for: " + name + "</h2></center></div><center><div id='gohome'><a href='https://aquavisitorsystem.github.io/'>Go Home</a></div></center><br>";         
var logo = '<a href="https://aquavisitorsystem.github.io/"><img id="logo" src="aqua.png" width="250px" alt="Go Home"></a>'
document.write(logo);
document.write(title);
document.write(printnow);
if (cnt1 === 0){
    var nodata = "<center><br>No visitor data found<br></center>";
    document.write(nodata);
}else{
    document.write("<table id='report' style='font-size: small;'> <thead>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr></thead> ");	
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
                    var options2 = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
};

const datea = new Date(doc.data().date13);
const dateb = new Date(doc.data().date14);

var date13 = addOneDay(datea).toLocaleDateString("en", options2);
var date14 = addOneDay(dateb).toLocaleDateString("en", options2);
var dates = new Date(doc.data().date).toLocaleDateString("en", options)

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
 var dt1 = new Date(todays).toLocaleDateString("en", options2);
  if (doc.data().mon === true) {
        var dt = new Date(dt1);
        var ndt = dt.getDay();
        var ggdate13 = new Date(date13).toLocaleDateString("fr-CA", options2);
        var ggdt1 = new Date().toLocaleDateString("fr-CA", options2);
        var ggdate14 = new Date(date14).toLocaleDateString("fr-CA", options2);
        var dgg = new Date();
        let daygg = dgg.getDay();
       if (ggdt1 >= ggdate13 && ggdt1 <= ggdate14 && daygg === 1){
            var ndt = dt.getDay();
           console.log("mon ndt: " + ndt);
          
   
       var h  =  tConvert (doc.data().rectime);
       dates = name + "," + h; 
       dates = new Date(dates).toLocaleDateString("en", options);
}else{
cnt1 = cnt1 - 1
}
}

    if (doc.data().tue === true)  {
var dt = new Date(dt1);
        var ndt = dt.getDay();
        var ggdate13 = new Date(date13).toLocaleDateString("fr-CA", options2);
        var ggdt1 = new Date().toLocaleDateString("fr-CA", options2);
        var ggdate14 = new Date(date14).toLocaleDateString("fr-CA", options2);
        var dgg = new Date();
        let daygg = dgg.getDay();
        if (ggdt1 >= ggdate13 && ggdt1 <= ggdate14 && daygg === 2){
        
           console.log("tue ndt: " + ndt);
          
     
       var h  =  tConvert (doc.data().rectime);
       dates = name + "," + h;
              dates = new Date(dates).toLocaleDateString("en", options);
}else{
cnt1 = cnt1 - 1
}
}

    if (doc.data().wed === true) {
 var dt = new Date(dt1);
        var ndt = dt.getDay();
        var ggdate13 = new Date(date13).toLocaleDateString("fr-CA", options2);
        var ggdt1 = new Date().toLocaleDateString("fr-CA", options2);
        var ggdate14 = new Date(date14).toLocaleDateString("fr-CA", options2);
        var dgg = new Date();
        let daygg = dgg.getDay();
        if (ggdt1 >= ggdate13 && ggdt1 <= ggdate14 && daygg === 3){

       
           console.log("wed ndt: " + ndt);
     
       var h  =  tConvert (doc.data().rectime);
       dates = name + "," + h; 
              dates = new Date(dates).toLocaleDateString("en", options);
}else{
cnt1 = cnt1 - 1
}
}

    if (doc.data().thu === true) {
var dt = new Date(dt1);
        var ndt = dt.getDay();
        var ggdate13 = new Date(date13).toLocaleDateString("fr-CA", options2);
        var ggdt1 = new Date().toLocaleDateString("fr-CA", options2);
        var ggdate14 = new Date(date14).toLocaleDateString("fr-CA", options2);
        var dgg = new Date();
        let daygg = dgg.getDay();
     if (ggdt1 >= ggdate13 && ggdt1 <= ggdate14 && daygg === 4){
        
           console.log("thu ndt: " + ndt);
   
       var h  =  tConvert (doc.data().rectime);
       dates = name + "," + h; 
              dates = new Date(dates).toLocaleDateString("en", options);
}else{
cnt1 = cnt1 - 1
}
}

    if (doc.data().fri === true) {
      var dt = new Date(dt1);
        var ndt = dt.getDay();
        var ggdate13 = new Date(date13).toLocaleDateString("fr-CA", options2);
        var ggdt1 = new Date().toLocaleDateString("fr-CA", options2);
        var ggdate14 = new Date(date14).toLocaleDateString("fr-CA", options2);
        var dgg = new Date();
        let daygg = dgg.getDay();
        if (ggdt1 >= ggdate13 && ggdt1 <= ggdate14 && daygg === 5){
        
           console.log("fri ndt: " + ndt);
    
       var h  =  tConvert (doc.data().rectime);
       dates = name + "," + h; 
              dates = new Date(dates).toLocaleDateString("en", options);
}else{
cnt1 = cnt1 - 1
}
}

 console.log("cnt1: " + cnt1);
        var dt = new Date(dt1);
          console.log("getday: " + dt.getDay());
         
               console.log("today: " + dt1);
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
            console.log("mon: " + doc.data().mon);
             console.log("tue: " + doc.data().tue);
              console.log("wed: " + doc.data().wed);
               console.log("thu: " + doc.data().thu);
                console.log("fri: " + doc.data().fri);
             console.log("date13: " + date13);
            console.log("date14: " + date14);
    // }
    //var dates = new Date(doc.data().date).toLocaleTimeString()
    console.log("loadtodayschedule:" + dt);
     if (dates != "Invalid Date"){
      var namelinks = "<a href='https://aquavisitorsystem.github.io/?lname=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
   var companylinks = "<a href='https://aquavisitorsystem.github.io/?company=" + doc.data().company + "' target='_blank'>" + doc.data().company + "</a>";
     var glinks = "<a href='https://aquavisitorsystem.github.io/?userid=" + doc.data().login + "&report=active' target='_blank'>" + doc.data().login + "</a>";
     document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
}
});
var count = 0;
try {
  var table = document.getElementById("report");
count  = table.tBodies[0].rows.length;
} catch (error) {
  count = 0;
}
    //var table = document.getElementById("report");
    //var tbodyRowCount = table.tBodies[0].rows.length;
document.getElementById("reptitle").innerHTML = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (today report)</h1><h2>" + count + " Visitor(s) for: " + name + "<br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small><br></h2></center>";
    if (cnt1 === 0){
    document.getElementById("report").innerHTML = "<center><br>No visitor data found<br></center>";
}
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
 document.getElementsByTagName("body")[0].style.display = "none";
});

    // setTimeout("sortByDate(4)", 2000);
    
       document.write("</table>");
      spinnow(3000);
        setTimeout("sortByDate(4)", 3000);
}

var spinnow = function(waitseconds){
  var spinner = "<body><div id='spin'><img src='aqua.png' width='250'><center><h1 style='font-family: sans-serif;font-size:38px;font-weight: bold;'>Aqua Visitor Management System</h1><img src='spinner.gif' width='100'><p style='font-size:24px;color: blue;font-weight: bold;'>...Loading, Please Wait!</p></div></center></div></body>"
        document.write(spinner);
        sleep(waitseconds).then(() => {
        var element = document.getElementById('spin');
if (element != null && element.value != '') {
document.getElementById('spin').style.display = 'none';
}
});

}

var emailtodayschedule =  function(){
cntsend = [];
var x = 0;
    var db = firebase.firestore();
let todaysdate = new Date();
var count = 0;
var lines = "";
var today = new Date();
var x;
//document.write("");
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
 var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}a{display:none;}#report tr > *:nth-child(8){display: none;}#report tr > *:nth-child(9){display: none;}#report tr > *:nth-child(10){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
  var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>";
  var RecordIDs = [];
  let todayusers= [];
let todayusers_varto_email = [];
let todayusers_varto_name = [];
let todayusers_varto_username = [];
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
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("mon", "==",true).where("remove", "==","No").get().then((querySnapshot) => {
    console.log("mon cnt1:" + cnt1);
console.log("mon SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("mon docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END

//START
db.collection("messages").where("tue", "==",true).where("remove", "==","No").get().then((querySnapshot) => {
    console.log("mon cnt1:" + cnt1);
console.log("tue SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("tue docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END

//START
db.collection("messages").where("wed", "==",true).where("remove", "==","No").get().then((querySnapshot) => {
    console.log("wed cnt1:" + cnt1);
console.log("wed SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("wed docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
///resolve(RecordIDs);
});
//END

//START
db.collection("messages").where("thu", "==",true).where("remove", "==","No").get().then((querySnapshot) => {
    console.log("thu cnt1:" + cnt1);
console.log("thu SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("thu docid:" + doc.id, ' => ', doc.data());
RecordIDs.push( doc.id);
});
//resolve(RecordIDs);
});
//END

//START
db.collection("messages").where("fri", "==",true).where("remove", "==","No").get().then((querySnapshot) => {
    console.log("fri cnt1:" + cnt1);
console.log("fri SnapshotPromise:" + querySnapshot.size); 
cnt1 = querySnapshot.size + cnt1;
querySnapshot.forEach(doc => {
    console.log("fri docid:" + doc.id, ' => ', doc.data());
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
docs = docs.filter(onlyUnique);
console.log("docs:" + docs);
const chunkSize = 10;
var chunk;
var title = "<div id='reptitle'><center><h1>Aqua-Aerobic Systems Visitor Schedule (today report)</h1><h2>" + cnt1 + " Visitor(s) for: " + name + "</h2></center></div><center><a href='https://aquavisitorsystem.github.io/'>Go Home</a></center><br>";         
//document.write(title);
//document.write(printnow);
if (cnt1 === 0){
    var nodata = "<center><br>No visitor data found<br></center>";
    //document.write(nodata);
}else{
    //document.write("<table id='report' style='font-size: small;'> <thead>  <tr>    <th>UserID</th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr></thead> ");	
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
    // document.write(nodata);
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
                    var options2 = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
};

const datea = new Date(doc.data().date13);
const dateb = new Date(doc.data().date14);

var date13 = addOneDay(datea).toLocaleDateString("en", options2);
var date14 = addOneDay(dateb).toLocaleDateString("en", options2);
var dates = new Date(doc.data().date).toLocaleDateString("en", options)

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
 var dt1 = new Date(todays).toLocaleDateString("en", options2);
  if (doc.data().mon === true) {
        var dt = new Date(dt1);
        var ndt = dt.getDay();
       if (dt1 >= date13 && dt1 <= date14 && ndt === 1){
            var ndt = dt.getDay();
           console.log("mon ndt: " + ndt);
          
   
       var h  =  tConvert (doc.data().rectime);
       dates = name + "," + h; 
       dates = new Date(dates).toLocaleDateString("en", options);
}else{
cnt1 = cnt1 - 1
}
}

    if (doc.data().tue === true)  {
var dt = new Date(dt1);
        var ndt = dt.getDay();
        if (dt1 >= date13 && dt1 <= date14 && ndt === 2){
        
           console.log("tue ndt: " + ndt);
          
     
       var h  =  tConvert (doc.data().rectime);
       dates = name + "," + h;
              dates = new Date(dates).toLocaleDateString("en", options);
}else{
cnt1 = cnt1 - 1
}
}

    if (doc.data().wed === true) {
 var dt = new Date(dt1);
        var ndt = dt.getDay();
     if (dt1 >= date13 && dt1 <= date14 && ndt === 3){

       
           console.log("wed ndt: " + ndt);
     
       var h  =  tConvert (doc.data().rectime);
       dates = name + "," + h; 
              dates = new Date(dates).toLocaleDateString("en", options);
}else{
cnt1 = cnt1 - 1
}
}

    if (doc.data().thu === true) {
var dt = new Date(dt1);
        var ndt = dt.getDay();
     if (dt1 >= date13 && dt1 <= date14 && ndt === 4){
        
           console.log("thu ndt: " + ndt);
   
       var h  =  tConvert (doc.data().rectime);
       dates = name + "," + h; 
              dates = new Date(dates).toLocaleDateString("en", options);
}else{
cnt1 = cnt1 - 1
}
}

    if (doc.data().fri === true) {
      var dt = new Date(dt1);
        var ndt = dt.getDay();
     if (dt1 >= date13 && dt1 <= date14 && ndt === 5){
        
           console.log("fri ndt: " + ndt);
    
       var h  =  tConvert (doc.data().rectime);
       dates = name + "," + h; 
              dates = new Date(dates).toLocaleDateString("en", options);
}else{
cnt1 = cnt1 - 1
}
}

 console.log("cnt1: " + cnt1);
        var dt = new Date(dt1);
          console.log("getday: " + dt.getDay());
         
               console.log("today: " + dt1);
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
            console.log("mon: " + doc.data().mon);
             console.log("tue: " + doc.data().tue);
              console.log("wed: " + doc.data().wed);
               console.log("thu: " + doc.data().thu);
                console.log("fri: " + doc.data().fri);
             console.log("date13: " + date13);
            console.log("date14: " + date14);
    // }
    //var dates = new Date(doc.data().date).toLocaleTimeString()
    console.log("loadtodayschedule:" + dt);
     if (dates != "Invalid Date"){
      console.log("todayusers:" + doc.data().login);
     todayusers.push(doc.data().login);
     todayusers_varto_email.push(doc.data().login + '@aqua-aerobic.com');
    todayusers_varto_name.push(doc.data().message);
     todayusers_varto_username.push(doc.data().login);

    //document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().key + '">Click here</a></td></tr>');
}
});


let uniqueChars = [...new Set(todayusers)];
let uniquevarto_email = [...new Set(todayusers_varto_email)];
let uniquevarto_name = [...new Set(todayusers_varto_name)];
let uniquevarto_username = [...new Set(todayusers_varto_username)];

    //console.log(uniqueChars);
var arrayLength = uniqueChars.length;
for (var i = 0; i < arrayLength; i++) {
    console.log(uniqueChars);
    console.log(uniquevarto_email);
     console.log(uniquevarto_name);
      console.log(uniquevarto_username);
   varto_email = uniquevarto_email[i];
    varto_name = uniquevarto_name[i];
    varto_username = uniquevarto_username[i];
     senddaily();
      cntsend.push(uniquevarto_name[i]);
}


var count = 0;
try {
  var table = document.getElementById("report");
count  = table.tBodies[0].rows.length;
} catch (error) {
  count = 0;
}
    //var table = document.getElementById("report");
    //var tbodyRowCount = table.tBodies[0].rows.length;
    //document.getElementById("reptitle").innerHTML = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (today report)</h1><h2>" + count + " Visitor(s) for: " + name + "</h2></center>";
    if (cnt1 === 0){
    //document.getElementById("report").innerHTML = "<center><br>No visitor data found<br></center>";
}
    //document.head.innerHTML = header;

})
    .catch((error) => {
         console.log("Error getting documents: ", error);
        //  document.write(title);
	  var nodata = "<center><br>No visitor data found<br></center>";
	  //document.write(nodata);
      //document.head.innerHTML = header;
});
}
 //document.getElementsByTagName("body")[0].style.display = "none";
});
	 // loaditnow();
    // setTimeout("sortByDate(4)", 2000);
    
     //  document.write("</table>");
    //  setTimeout("sortTable(4)", 2000);
   //     setTimeout("sortByDate(4)", 2000);
}


function addOneDay(date) {
  date.setDate(date.getDate() + 1);
  return date;
}

var loadweekschedule =  function(){
  try {
           var db = firebase.firestore();
            var Visitors = [];
	 let todaysdate = new Date();
	 var count = 0;
	 var lines = "";
	var today = new Date();
	 var x;
   document.write("");
        var date = new Date();
   var gd = new Date();
    //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
            var gmyDate = new Date(gd).toLocaleString('en-US');   
            var gtodaysdate = gmyDate.toString();
	var start = new Date();
var end = new Date();
 var d = new Date();
var name=prompt("Please choose one of the following\r\n1) Enter end search date > Click [Ok]\r\n2) Click [Ok] for today's date","Enter Date");
    if (name!="Enter Date" && name!=null){
	  d = new Date(name);
          var enddate = new Date(name);
	  start = new Date(name);
         start.setDate(start.getDate() - 7);
         start.setHours(0,0,0,0);
        end = new Date(enddate.getTime());
         end.setHours(23,59,59,999);
        }else if (name  === null){
            clear();
            spinnow(3000);
            setTimeout("window.location.reload();", 3000);
}else{
          start.setDate(date.getDate() - 7);
         start.setHours(0,0,0,0);
        end = new Date(date.getTime());
         end.setHours(23,59,59,999);
}	
console.log("Name is:" & name)
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
         var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}#gohome{display:none;}#report tr > *:nth-child(5){display: none;}#report tr > *:nth-child(10){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
	 var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>";
    console.log("Start Date: " + start);
	console.log("End Date: " + end);
	 db.collection("log").where("date", ">=",start).where("date", "<=",end).where("remove", "==","No").orderBy("date","desc").orderBy("lastname","asc")
    .get()
    .then((querySnapshot) => {
	 console.log("Snapshot:" + querySnapshot.size); 
        var cnt = querySnapshot.size;
	 var title = "<center><h1>Aqua-Aerobic Systems Visitor Check-in/out Log (logweek report)</h1><h2>Check-in/Check-out logs for " + "<label id='numcount'></label>"  + " visit(s)<br>" + name + "<br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small><br></h2></center><center><div id='gohome'><a href='https://aquavisitorsystem.github.io/'>Go Home</a></div></center><br>";         
     var logo = '<a href="https://aquavisitorsystem.github.io/"><img id="logo" src="aqua.png" width="250px" alt="Go Home"></a>'
            document.write(logo);
	document.write(title);
	document.write(printnow);
    //document.write("<center><h3>Find your name and Tap 'Check-In'</b></center></h3>If your name is not found below, click <a href='" +  "https://ignitemeeting.github.io/?ipad=Yes"   + "'>here</a> to continue!<br><br><center>");
        if (cnt === 0){
	 var nodata = "<center><br>No visitor data found<br></center>";
	  document.write(nodata);
}else{
document.write("<table id='report' style='font-size: small;'>  <tr>     <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th>CheckIn</th><th>CheckOut</th><th>Edit</th>  </tr>");
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
var companylinks = "<a href='https://aquavisitorsystem.github.io/?logreport=logcompany" + "&logvalue=" + doc.data().company+ "' target='_blank'>" + doc.data().company + "</a>";
var namelinks = "<a href='https://aquavisitorsystem.github.io/?logreport=logname" + "&logvalue=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
var glinks = "<a href='https://aquavisitorsystem.github.io/?logreport=loguserid" + "&logvalue=" + doc.data().login + "' target='_blank'>" + doc.data().login + "</a>";
    if ((doc.data().checkin !== "") && (doc.data().checkout !== ""))
{
            document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
 
}else{
            //document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
}
         var growCount = document.getElementById('report').rows.length;
            if (growCount > 0){
                growCount = Math.ceil((growCount - 1));
        }
            document.getElementById("numcount").innerHTML = growCount; //uniqueSet2.size;
            document.getElementById("numcount").setAttribute("value", growCount);
});

// let sendingText = "https://ignitemeeting.github.io/?ipad=Yes"
document.head.innerHTML = header;
document.write("</table>");
document.getElementsByTagName("body")[0].style.display = "none";
//spinnow(3000);
//setTimeout("sortByDate2(7)", 3000);
}) 
    .catch((error) => {
        console.log("Error getting documents: ", error);
document.write(title);
var nodata = "<center><br>No visitor data found<br></center>";
document.write(nodata);
document.head.innerHTML = header;
});
spinnow(3000);
setTimeout("sortByDate2(7)", 3000);
}
    catch(err) {
        console.log("Name is:" + name)
        if (name === null){
            //clear();
            spinnow(3000);
            setTimeout("window.location.reload();", 3000);
        
        }else{
              var nodata = "<center><br>Incorrect Date Format. Please try again.<br><br> <a href='https://aquavisitorsystem.github.io/'>Go Home</a><br></center>";
    document.write(nodata);  
        }

}
}

var loadprintjobs = function() {
    var db = firebase.firestore();
    var Visitors = [];
    let todaysdate = new Date();
    var count = 0;
    var lines = "";
    var today = new Date();
    var x;
    var text = datelabelchanged;
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
    var start2 = new Date();
    var end = new Date();
    var end2 = new Date();
    var d = new Date();
    var name=text;//prompt("PrintJobs:\r\n1) The date when labels were last replaced was:\r\n" + text + "\r\n2) Click [Ok] to View Report\r\n", text);
    alert("PrintJobs:\r\n1) The date when labels were last replaced:\r\nDate: " + text + "\r\n2) Click [Ok] to View Report\r\n", text);
   // var name=prompt("Visitor Count:\r\n1) Please enter date < today\r\n(example: 01/09/2023)\r\n2) Click [Ok]\r\n","Enter Date");
    if (text!="Enter Date"){
        d = new Date(name);
        var enddate = new Date(name);
        start = new Date();
        start2  = new Date();
        start.setDate(start.getDate());
        //start.setHours(0,0,0,0);
        start.setHours(23,59,59,999);
        start2.setDate(start2.getDate());
        start2.setHours(0,0,0,0);
        end = new Date(enddate.getTime());
        end2 = new Date(enddate.getTime());
        end.setHours(0,0,0,0);
       // end.setHours(23,59,59,999);
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
    var date1 = new Date(end2);
   
    var date2 = new Date(start2);
 
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
      
    // To calculate the no. of days between two dates
    var Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
    //let sevendays = getDateXDaysAgo(7, d);
   // var smyDate = sevendays;
   // console.log("start:" + smyDate);
    name = date1.toLocaleDateString('en-US') + ' - ' + date2.toLocaleDateString('en-US');
    console.log(name);
    var  todays = new Date().toLocaleDateString('en-US');  
    var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}a{display:none;}#report tr > *:nth-child(5){display: none;}#report tr > *:nth-child(10){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
    var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>";
    console.log("Start Date: " + end);
    console.log("End Date: " + start);
    db.collection("log").where("date", ">=",end).where("date", "<=",start).where("remove", "==","No").orderBy("date","desc").orderBy("lastname","asc")
   .get()
   .then((querySnapshot) => {
       console.log("Snapshot:" + querySnapshot.size); 
    var cnt = querySnapshot.size;
    var gd = new Date();
    //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
    var gmyDate = new Date(gd).toLocaleString('en-US');   
    var gtodaysdate = gmyDate.toString();
    var title = "<center><h1>Aqua-Aerobic Systems Visitor Check-in/out Log (labels used)</h1><h2>" + "<label id='numcount'></label>"  + " labels printed over " + Difference_In_Days + " days from:<br>" + name + "<br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small><br></h2>" + "<label id='numcount2'></label>" + "</center><center><br><a href='https://aquavisitorsystem.github.io/'>Go Home</a></center><br>";         
    document.write(title);
    document.write(printnow);
    //document.write("<center><h3>Find your name and Tap 'Check-In'</b></center></h3>If your name is not found below, click <a href='" +  "https://ignitemeeting.github.io/?ipad=Yes"   + "'>here</a> to continue!<br><br><center>");
    if (cnt === 0){
        var nodata = "<center><br>No visitor data found<br></center>";
        document.write(nodata);
        document.getElementById("numcount").innerHTML = 0;
        document.getElementById("numcount").setAttribute("value", 0);
        document.getElementById("numcount2").innerHTML = "(" +  "260/260 labels remain)";
        document.getElementById("numcount2").setAttribute("value", "(" + "260/260 labels remain)");
       // document.write("<table id='report' style='font-size: small;'>  <tr>     <th style='cursor: pointer; color: red;' onclick='sortTable(0)'>UserID <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(2)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortTable(4)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Email</th>       <th>Visiting</th><th style='cursor: pointer; color: red;' onclick='sortByDate2(7)'>CheckIn<i class='fa fa-sort' style='font-size:20px;color:blue'></i></th><th>CheckOut</th><th>Edit</th>  </tr>");
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
        document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
 
    }else{
        //document.write('<tr><td>' + doc.data().login + '</td><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
    }

        document.getElementById("numcount").innerHTML = Math.ceil((cnt / 2));
        document.getElementById("numcount").setAttribute("value", Math.ceil((cnt / 2)));
        document.getElementById("numcount2").innerHTML = "(" + (260 - Math.ceil((cnt / 2)))  + "/260 labels remain)";
        document.getElementById("numcount2").setAttribute("value", "(" + (260 - Math.ceil((cnt / 2))) + "/260 labels remain)");
 

});
// let sendingText = "https://ignitemeeting.github.io/?ipad=Yes"
document.head.innerHTML = header;
document.write("</table>");
document.getElementsByTagName("body")[0].style.display = "none";
//spinnow(3000);
//setTimeout("sortByDate2(7)", 3000);
}) 
    .catch((error) => {
        console.log("Error getting documents: ", error);
document.write(title);
var nodata = "<center><br>No visitor data founds<br></center>";
document.write(nodata);
document.head.innerHTML = header;
});
spinnow(3000);
setTimeout("sortByDate2(7)", 3000);
}

function  getdateoflabels() {
    jQuery.get('labelschanged.txt', function(data) {
        //alert(data.length);
        // initialize title and body variables
        if (data.length > 3){
            datelabelchanged = data
            var text = data;
            setTimeout("loadprintjobs()", 1000);
            //setTimeout("loadprintjobs(text)", 1000);
            //loadprintjobs(text);
        }
    });
}

var loadjobsfromdate =  function(){
    try {
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
    var start2 = new Date();
    var end = new Date();
    var end2 = new Date();
    var d = new Date();
    var name=prompt("Visitor Count:\r\n1) Please enter date <= today\r\n(example: 05/01/2024)\r\n2) Click [Ok]\r\n","Enter Date");
    if (name!="Enter Date"){
        d = new Date(name);
        var enddate = new Date(name);
        start = new Date();
        start2  = new Date();
        start.setDate(start.getDate());
        //start.setHours(0,0,0,0);
        start.setHours(23,59,59,999);
        start2.setDate(start2.getDate());
        start2.setHours(0,0,0,0);
        end = new Date(enddate.getTime());
        end2 = new Date(enddate.getTime());
        end.setHours(0,0,0,0);
        // end.setHours(23,59,59,999);
    }else{
        start.setDate(date.getDate() - 7);
        start.setHours(0,0,0,0);
        end = new Date(date.getTime());
        end.setHours(23,59,59,999);
    }	
    //end new 1/16/2023
    var gd = new Date();
    //var gmyDate = new Date(gd).toLocaleDateString('en-US');   
    var gmyDate = new Date(gd).toLocaleString('en-US');   
    var gtodaysdate = gmyDate.toString();
    start = new Date(start.getTime() - (start.getTimezoneOffset() * 60000)).toISOString();
	  
    end = new Date(end.getTime() - (end.getTimezoneOffset() * 60000)).toISOString();	 
    // var d = new Date();
    var myDate = new Date(d).toLocaleDateString('en-US');   
    var date1 = new Date(end2);
   
    var date2 = new Date(start2);
 
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
      
    // To calculate the no. of days between two dates
    var Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
    //let sevendays = getDateXDaysAgo(7, d);
    // var smyDate = sevendays;
    // console.log("start:" + smyDate);
    name = date1.toLocaleDateString('en-US') + ' - ' + date2.toLocaleDateString('en-US');
    console.log(name);
    var  todays = new Date().toLocaleDateString('en-US');  
    var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 15px;} tr:nth-child(even) {  background-color: #dddddd;} @media print{input#btnPrint{display: none;}#gohome{display:none;}#report tr > *:nth-child(5){display: none;}#report tr > *:nth-child(10){display: none;}body {zoom: 80%;}@page{size: landscape;}}</style></head>";
    var printnow = "<center><input type='button' id='btnPrint' onclick='window.print();' value='Print' /></center><br>";
    console.log("Start Date: " + end);
    console.log("End Date: " + start);

    db.collection("log").where("date", ">=",end).where("date", "<=",start).where("remove", "==","No").orderBy("date","desc").orderBy("lastname","asc")
   .get()
   .then((querySnapshot) => {
       console.log("Snapshot:" + querySnapshot.size); 
    var cnt = querySnapshot.size;
    var title = "<center><h1>Aqua-Aerobic Systems Visitor Count</h1><h2>" + "<label id='numcount'></label>"  + " guests visited over " + Difference_In_Days + " days from:<br>" + name + "<br><small style='font-size: 16px;color: blue;'>report created on: " +  gtodaysdate + "</small><br></h2></center><center><div id='gohome'><a href='https://aquavisitorsystem.github.io/'>Go Home</a></div></center><br>";         
    var logo = '<a href="https://aquavisitorsystem.github.io/"><img id="logo" src="aqua.png" width="250px" alt="Go Home"></a>'
    document.write(logo);
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
    var namelinks = "<a href='https://aquavisitorsystem.github.io/?lname=" + doc.data().lastname + "' target='_blank'>" + doc.data().lastname + "</a>";
    var companylinks = "<a href='https://aquavisitorsystem.github.io/?company=" + doc.data().company + "' target='_blank'>" + doc.data().company + "</a>";
    var glinks = "<a href='https://aquavisitorsystem.github.io/?userid=" + doc.data().login + "&report=active' target='_blank'>" + doc.data().login + "</a>";
    if ((doc.data().checkin !== "") && (doc.data().checkout !== ""))
    {
        document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td style="color: transparent;">' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
 
    }else{
        document.write('<tr><td>' + glinks + '</td><td>' + doc.data().firstname + '</td><td>' + namelinks + '</td><td>' + companylinks + '</td><td>' + dates + '</td><td>' + doc.data().email + '</td><td>' + doc.data().message + '</td><td>' + doc.data().checkin + '</td><td>' + doc.data().checkout + '</td><td><a href="https://aquavisitorsystem.github.io/?id=' + doc.data().sourcekey + '">Click here</a></td></tr>');
    }
    //document.getElementById("numcount").innerHTML = Math.ceil((cnt / 2));
    //document.getElementById("numcount").setAttribute("value", Math.ceil((cnt / 2)));
    var growCount = document.getElementById('report').rows.length;
    if (growCount > 0){
        growCount = growCount - 1;
        growCount = Math.ceil((growCount / 2));
    }
    document.getElementById("numcount").innerHTML = growCount; //uniqueSet2.size;
    document.getElementById("numcount").setAttribute("value", growCount);
});

// let sendingText = "https://ignitemeeting.github.io/?ipad=Yes"
document.head.innerHTML = header;
document.write("</table>");
document.getElementsByTagName("body")[0].style.display = "none";
//spinnow(3000);
//setTimeout("sortByDate2(7)", 3000);
}) 
    .catch((error) => {
        console.log("Error getting documents: ", error);
document.write(title);
var nodata = "<center><br>No visitor data found<br></center>";
document.write(nodata);
document.head.innerHTML = header;
});
}
    catch(err) {
    var nodata = "<center><br>Incorrect Date Format. Please try again.<br><br> <a href='https://aquavisitorsystem.github.io/'>Go Home</a><br></center>";
    document.write(nodata);
    }
    spinnow(3000);
    setTimeout("sortByDate2(7)", 3000);
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
//resolve(RecordIDs);
});
//END
//START
let todaysdate2 = new Date();
var todaysday = new Date().toLocaleString('en-us', {  weekday: 'long' });
console.log("todaysday is: " + todaysday);
db.collection("messages").where("mon", "==",true).where("remove", "==","No").get().then((querySnapshot) => {
 querySnapshot.forEach(doc => {
    console.log("mon docid:" + doc.id, ' => ', doc.data());
if (typeof doc.data().date14 !== 'undefined' && doc.data().date14 !=="" && new Date(doc.data().date14) >= todaysdate2 && todaysday == "Monday") {
    cnt1 = cnt1 + 1;
    console.log("Mon cnt1:" + cnt1);
    RecordIDs.push( doc.id);
}
});
//resolve(RecordIDs);
});
//END

//START
db.collection("messages").where("tue", "==",true).where("remove", "==","No").get().then((querySnapshot) => {
querySnapshot.forEach(doc => {
    console.log("tue docid:" + doc.id, ' => ', doc.data());
if (typeof doc.data().date14 !== 'undefined' && doc.data().date14 !=="" && new Date(doc.data().date14) >= todaysdate2 && todaysday == "Tuesday") {
    cnt1 = cnt1 + 1;
    console.log("tue cnt1:" + cnt1);
    RecordIDs.push( doc.id);
}
});
//resolve(RecordIDs);
});
//END

//START
db.collection("messages").where("wed", "==",true).where("remove", "==","No").get().then((querySnapshot) => {
 querySnapshot.forEach(doc => {
    console.log("wed docid:" + doc.id, ' => ', doc.data());
if (typeof doc.data().date14 !== 'undefined' && doc.data().date14 !=="" && new Date(doc.data().date14) >= todaysdate2  && todaysday == "Wednesday") {
    cnt1 = cnt1 + 1;
    console.log("wed cnt1:" + cnt1);
    RecordIDs.push( doc.id);
}
});
///resolve(RecordIDs);
});
//END

//START
db.collection("messages").where("thu", "==",true).where("remove", "==","No").get().then((querySnapshot) => {
 querySnapshot.forEach(doc => {
    console.log("thu docid:" + doc.id, ' => ', doc.data());
if (typeof doc.data().date14 !== 'undefined' && doc.data().date14 !=="" && new Date(doc.data().date14) >= todaysdate2 && todaysday == "Thursday") {
    cnt1 = cnt1 + 1;
    console.log("thu cnt1:" + cnt1);
    RecordIDs.push( doc.id);
}
});
//resolve(RecordIDs);
});
//END
//START
db.collection("messages").where("fri", "==",true).where("remove", "==","No").get().then((querySnapshot) => {
querySnapshot.forEach(doc => {
    console.log("fri docid:" + doc.id, ' => ', doc.data());
if (typeof doc.data().date14 !== 'undefined' && doc.data().date14 !=="" && new Date(doc.data().date14) >= todaysdate2 && todaysday == "Friday") {
    cnt1 = cnt1 + 1;
    console.log("Fri cnt1:" + cnt1);
    RecordIDs.push( doc.id);
}
});
resolve(RecordIDs);
});
//END
}); 
var docs;
promise.then(values => {
    console.log("values:" + values);
docs = values;
docs = docs.filter(onlyUnique);
console.log("docs:" + docs);
const chunkSize = 10;
var chunk;
let todays = new Date().toLocaleDateString();
var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 10px;} tr:nth-child(even) {  background-color: #dddddd;}</style></head>";
//var title = "<div id='reptitle'><center><h1 style='color: #005098;margin-block-end: 0;'>Active Visitor(s) for: " + todays + "</h1></center></div>";      
var title = "<div id='reptitle'><center><h1 style='color: #005098;margin-block-end: 0;'>Our Guests for: " + todays + "</h1></center></div>";      
document.write(title);
var links = "'https://aquameeting.github.io/?ipad=Yes'";
var buttons =  '<button onclick="window.location.href=' + links + ';" style="background-color: yellow;font-weight: bold;border-color: black;font-size: xx-small;">Tap Here</button>';
//var buttons =  '<a href=' + links + ';" style="font-size: small;">tap here</a>';
//document.write("<center>**Find your schedule below and tap the <button style='background-color: yellow;font-weight: bold;border-color: black;font-size: small;'>HERE</button> button.</center> <p  style='font-size: small;'>**If schedule not found, " + buttons + "</p>"); 
document.write("<center>**Find your schedule below and tap the <button style='background-color: yellow;font-weight: bold;border-color: black;font-size: small;'>HERE</button> button.</center> <p  style='font-size: small;'>**If schedule not found, please let receptionist know.</p>"); 
console.log("Total cnt1:" + cnt1);
if (cnt1 === 0){
    var nodata = "<center><br>No visitor data found<br></center>";
    document.write(nodata);
}else{
    document.write("<table id='report' style='font-size: small;'> <thead style='background-color: azure;'>  <tr>   <th>First Name</th>    <th style='cursor: pointer; color: red;' onclick='sortTable(1)'>Last Name <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>    <th>Company</th>     <th style='cursor: pointer; color: red;' onclick='sortByDate(3)'>Date/Time <i class='fa fa-sort' style='font-size:20px;color:blue'></i></th>      <th>Visiting</th><th></th>  </tr></thead>");
}
for (let i = 0; i < docs.length; i += chunkSize) {
    chunk = docs.slice(i, i + chunkSize);
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
                    var options2 = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
};
const datea = new Date(doc.data().date13);
const dateb = new Date(doc.data().date14);

var date13 = addOneDay(datea).toLocaleDateString("en", options2);
var date14 = addOneDay(dateb).toLocaleDateString("en", options2);

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
   setTimeout("sortByDate(3)", 1000);
}

 var dt1 = new Date(todays).toLocaleDateString("en", options2);
  if (doc.data().mon === true) {
     var dt = new Date(dt1);
        var ndt = dt.getDay();
        var ggdate13 = new Date(date13).toLocaleDateString("fr-CA", options2);
        var ggdt1 = new Date().toLocaleDateString("fr-CA", options2);
        var ggdate14 = new Date(date14).toLocaleDateString("fr-CA", options2);
        var dgg = new Date();
        let daygg = dgg.getDay();
       if (ggdt1 >= ggdate13 && ggdt1 <= ggdate14 && daygg === 1){
     
           console.log("mon ndt: " + ndt);
          
   
       var h  =  tConvert (doc.data().rectime);
       dates = dt1 + ", " + h; 
      dates = new Date(dates).toLocaleDateString("en", options);
}else{
//cnt1 = cnt1 - 1
}
}

    if (doc.data().tue === true)  {
     var dt = new Date(dt1);
        var ndt = dt.getDay();
        var ggdate13 = new Date(date13).toLocaleDateString("fr-CA", options2);
        var ggdt1 = new Date().toLocaleDateString("fr-CA", options2);
        var ggdate14 = new Date(date14).toLocaleDateString("fr-CA", options2);
        var dgg = new Date();
        let daygg = dgg.getDay();
        if (ggdt1 >= ggdate13 && ggdt1 <= ggdate14 && daygg === 2){
    
           console.log("tue ndt: " + ndt);
          
     
       var h  =  tConvert (doc.data().rectime);
       dates = dt1 + ", " + h;
       dates = new Date(dates).toLocaleDateString("en", options);
}else{
//cnt1 = cnt1 - 1
}
}

    if (doc.data().wed === true) {
      var dt = new Date(dt1);
        var ndt = dt.getDay();
        var ggdate13 = new Date(date13).toLocaleDateString("fr-CA", options2);
        var ggdt1 = new Date().toLocaleDateString("fr-CA", options2);
        var ggdate14 = new Date(date14).toLocaleDateString("fr-CA", options2);
        var dgg = new Date();
        let daygg = dgg.getDay();
     if (ggdt1 >= ggdate13 && ggdt1 <= ggdate14 && daygg === 3){
      
           console.log("wed ndt: " + ndt);
     
       var h  =  tConvert (doc.data().rectime);
       dates = dt1 + ", " + h; 
       dates = new Date(dates).toLocaleDateString("en", options);
}else{
//cnt1 = cnt1 - 1
}
}

    if (doc.data().thu === true) {
     var dt = new Date(dt1);
        var ndt = dt.getDay();
        var ggdate13 = new Date(date13).toLocaleDateString("fr-CA", options2);
        var ggdt1 = new Date().toLocaleDateString("fr-CA", options2);
        var ggdate14 = new Date(date14).toLocaleDateString("fr-CA", options2);
        var dgg = new Date();
        let daygg = dgg.getDay();
     if (ggdt1 >= ggdate13 && ggdt1 <= ggdate14 && daygg === 4){
           console.log("thu ndt: " + ndt);
    
       var h  =  tConvert (doc.data().rectime);
           dates = dt1 + ", 0" + h; 
           dates = new Date(dates).toLocaleDateString("en", options);
}else{
//cnt1 = cnt1 - 1
}
}

    if (doc.data().fri === true) {
       var dt = new Date(dt1);
        var ndt = dt.getDay();
        var ggdate13 = new Date(date13).toLocaleDateString("fr-CA", options2);
        var ggdt1 = new Date().toLocaleDateString("fr-CA", options2);
        var ggdate14 = new Date(date14).toLocaleDateString("fr-CA", options2);
        var dgg = new Date();
        let daygg = dgg.getDay();
     if (ggdt1 >= ggdate13 && ggdt1 <= ggdate14 && daygg === 5){
                console.log("fri ndt: " + ndt);
    
       var h  =  tConvert (doc.data().rectime);
       dates = dt1 + ", " + h; 
       dates = new Date(dates).toLocaleDateString("en", options);
}else{
//cnt1 = cnt1 - 1
}
}

console.log("load cnt1:" + cnt1);
console.log("loaddbtoday:" + dates);
var links = "'https://aquavisitorsystem.github.io/?iPadid=" + doc.data().key + "'";
  var buttons =  '<button onclick="window.location.href=' + links + ';" style="background-color: yellow;font-weight: bold;border-color: black;font-size: medium;">HERE</button>';
if (dates != "Invalid Date"){
document.write('<tr><td>' + doc.data().firstname + '</td><td>' + doc.data().lastname + '</td><td>' + doc.data().company + '</td><td>' + dates + '</td><td>' + doc.data().message + '</td><td>' + buttons + '</td></tr>');
}
});
    // let sendingText = "https://aquameeting.github.io/?ipad=Yes"
    //document.getElementById("reptitle").innerHTML = "<center><h1>Aqua-Aerobic Systems Visitor Schedule (date report)</h1><h2>" + cnt1 + " Visitor(s) for: " + name + "</h2></center>";
    if (cnt1 === 0){
    document.getElementById("report").innerHTML = "<center><br>No visitor data found<br></center>";
}
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
   document.getElementsByTagName("body")[0].style.display = "none";
 //  spinnow(3000);
  setTimeout("sortByDate(3)", 3000);
}
       
       
       
var loaddball =  function(data){
var db = firebase.firestore();
var get_login = data["userid"];
if (get_login  === null || get_login === '') {
      alert("Enter your Network Login ID above & try again!");
}else{
get_login  = get_login.toString();
console.log(get_login);
var header = "<head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>table, td, th {  border: 1px solid #cbbbbb;  text-align: left;}table {  border-collapse: collapse;  width: 100%;}th, td {  padding: 10px;} tr:nth-child(even) {  background-color: #dddddd;}</style></head>";
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
        alert("Please do one of the following:\n1) Enter [Aqua User ID] > [Enter] key\n2) Select report from dropdown!");	  
        document.getElementById("login").focus();
    }else if (username.toLowerCase()  === 'all') {
        loaddbeverything();
    }else if (username.toLowerCase()  === 'alls') {
        loaddbeverythings();
    }else if (username.toLowerCase()  === 'date') {
       loadtoday();
       //document.getElementById("login").value = 'date report: please press the [enter] key';
    }else if (username.toLowerCase()  === 'date report: please press the [enter] key') {
        loadtoday();
    }else if (username.toLowerCase()  === 'inactive') {
        loadinactive();
    }else if (username.toLowerCase()  === 'active') {
        loaddbeverythingall();
    }else if (username.toLowerCase()  === 'today') {
        loadtodayschedule();
       // document.getElementById("login").value = 'today report: please press the [enter] key';
    }else if (username.toLowerCase()  === 'today report: please press the [enter] key') {
        loadtodayschedule();
    }else if (username.toLowerCase()  === 'name') {
        loadname();
    }else if (username.toLowerCase()  === 'company') {
        mycompany();
    }else if (username.toLowerCase()  === 'logname') {
        loadlogname();
    }else if (username.toLowerCase()  === 'logcompany') {
        loadlogcompany();
    }else if (username.toLowerCase()  === 'logall') {
        loadlogall();
    }else if (username.toLowerCase()  === 'logtoday') {
        loadlogtoday();
    }else if (username.toLowerCase()  === 'logweek') {
        loadweekschedule();
       // document.getElementById("login").value = 'logweek report: please press the [enter] key';
    }else if (username.toLowerCase()  === 'logweek report: please press the [enter] key') {
        loadweekschedule();
    }else if (username.toLowerCase()  === 'loguserid') {
        loadloguserid();
    }else if (username.toLowerCase()  === 'logdate') {
        loadlogdate();
    }else if (username.toLowerCase()  === 'restore') {
        loadremoved();
    }else if (username.toLowerCase()  === 'removeinactive') {
        removeInactiveUsers();
    }else if (username.toLowerCase()  === 'printjobs') {
        getdateoflabels();
    }else if (username.toLowerCase()  === 'count report: please press the [enter] key') {
        loadjobsfromdate();
    }else if (username.toLowerCase()  === 'count') {
        loadjobsfromdate();
       // document.getElementById("login").value = 'count report: please press the [enter] key';
    }else if (username.toLowerCase()  === 'dailyuseremails') {
        emailtodayschedule();
    }else if (username.toLowerCase()  === 'myvms') {
        loaddbactivereport();
    }else if (username.toLowerCase()  === 'userid') {
        loaduseridreport();
    }else if (username.toLowerCase()  === 'removeerror') {
        removeolderrorlogs();
    }else if (username.toLowerCase()  === 'removemessages') {
        removeoldmessages();
    }else if (username.toLowerCase()  === 'removelogs') {
        removeoldlogs();
    }else if (username.toLowerCase()  === 'activitylog') {
        //window.open('https://aquavisitorsystem.github.io/aquavisitoractivity.github.io/firestore/', '_blank').focus();
        spinnow(3000);
        //window.location.href = './activity/index.html';
        //setTimeout("window.location.href = './activity/';", 3000);
        var theTop=((screen.height/2)-(800/2))/2;
        var theLeft=(screen.width/2)-(800/2);
        var features = 'height=800,width=800,top='+theTop+',left='+theLeft+',toolbar=1,Location=0,Directories=0,Status=0,menubar=1,Scrollbars=1,Resizable=1';

        window.open("./activity/index.html", "Activity", features);
        setTimeout("window.location.reload();", 3000);
    }else{
        var data = {
            "userid": username
        }
        //loaddb(data);
        clear();
        loaddbactive(data);
    
    }
    //loadlogdate
}

//removeInactive
       
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
    var startdates = document.getElementById("date13");
    var enddates = document.getElementById("date14");
    var rectime = document.getElementById("rectime");
    var mon = document.getElementById("mon");
    var tue = document.getElementById("tue");
    var wed = document.getElementById("wed");
    var thu = document.getElementById("thu");
    var fri = document.getElementById("fri");
    var keydate = "";
    if (startdates.value != null &&  startdates.value != '')
    {
        keydate = startdates.value;
    }else{
        keydate = date.value;
    }
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
        "date13": date13.value,
        "date14": date14.value,
        "rectime": rectime.value,
        "mon": mon.checked,
        "tue": tue.checked,
        "wed": wed.checked,
        "thu": thu.checked,
        "fri": fri.checked,
        "key": fname.value.trim().toUpperCase() + lname.value.trim().toUpperCase() + keydate
    }
    let result = login.value.includes("@");
    // empty string
    if (result != true && login.value != null &&  login.value != '' && fname.value != null &&  fname.value != '' && lname.value != null &&  lname.value != '' && cname.value != null &&  cname.value != '' && email.value != null &&  email.value != ''  && msg.value != null &&  msg.value != ''   && date.value != null &&  date.value != '') {
        push_to_firebase(data);
    } else if (result === true){
        alert("Enter Aqua UserID Only. The @ symbol is not allowed.")
    } else if (startdates.value != null  && startdates.value != ''){
        push_to_firebase(data);
    } else {
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
    var date13 = document.getElementById("date13");
    var date14 = document.getElementById("date14");
    var rectime = document.getElementById("rectime");
    var mon = document.getElementById("mon");
    var tue = document.getElementById("tue");
    var wed = document.getElementById("wed");
    var thu = document.getElementById("thu");
    var fri = document.getElementById("fri");
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
        "date12": date12.value,
        "date13": date13.value,
        "date14": date14.value,
        "rectime": rectime.value,
        "mon": mon.checked,
        "tue": tue.checked,
        "wed": wed.checked,
        "thu": thu.checked,
        "fri": fri.checked
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
    document.getElementById("login").style.width = "275px";
    document.getElementById("login").style.textAlign = "right"; 
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

var clearlogheader = function(){
    document.getElementById('schedule').style.display = 'none';
    document.getElementById('getall').style.display = 'none';
    document.getElementById('help').style.display = 'none';
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
    //var visitorlist = ['today', 'myvms' , 'activitylog' , 'active', 'name', 'date', 'all', 'inactive','userid', 'count','loguserid', 'logname', 'logall', 'logtoday', 'logweek', 'logdate','printjobs'];
   // var visitorlist = ['today', 'myvms' , 'activitylog' , 'active', 'name', 'date', 'all', 'inactive','userid', 'count','loguserid', 'logname', 'logall', 'logtoday', 'logweek', 'logdate','printjobs'];
    var visitorlist = ['today','active','myvms','date','name','company','activitylog','all','count','inactive','userid','loguserid','logname','logcompany','logall','logtoday','logweek','logdate','printjobs'];
     var list = document.getElementById('loginlist');
   
     var logins = document.getElementById('login');
   
    visitorlist.forEach(function(item){
        var option = document.createElement('option');
        option.setAttribute("value", item);
        option.value = item;
        list.appendChild(option);
    });


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
    document.getElementById('loginlabel').innerText = 'Select Report';
       // document.getElementsByName('login')[0].placeholder = '[KEYWORDS] today, active, name, date, all, inactive, loguserid, logname, logall, logtoday, logweek, logdate';
    document.getElementsByName('login')[0].placeholder = '[Aqua User ID] > [Enter] key OR Select dropdown report';
    document.getElementById("login").title = 'Enter [Aqua User ID] > [Enter] key OR Select dropdown report';
    document.getElementById('emaillabel').style.display = 'none';
    document.getElementById("login").style.width = "380px";
    document.getElementById("login").addEventListener("keypress", getSchedule2);
    //logins.addEventListener("click", function() {
    //    var options = logins.querySelectorAll("option");
    //    var count = options.length;
      
    //    console.log("click logins.valueb: " + logins.value);
    //    console.log("click typeof(count)b: " + typeof(count));
    //    if(typeof(count) === "undefined" || count < 2)
    //    {
    //        console.log("click logins.valuea: " + logins.value);
    //        console.log("click typeof(count)a: " + typeof(count));
    //        if(logins.value != "")
    //        {
    //            console.log("click logins.valuec: " + logins.value);
    //            console.log("click typeof(count)c: " + typeof(count));  
    //        }
 
    //    }
    //});

    logins.addEventListener("change", function() {
        console.log("change logins.valuea: " + logins.value);
        if(logins.value != "undefined")
        {
            console.log("change logins.valueb: " + logins.value);
            document.getElementsByName('login')[0].value = logins.value;
            setTimeout("getloginname()", 1000);
            //getloginname();  
        }
        
        
    });
    document.getElementById("login").focus();
}
    
var getprompt = function(){
    alert("hello");
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
             //set_checkin(data3);	
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
    var name = myDate.toString();
    var  todays = new Date().toLocaleDateString('en-US');  
    //db.collection("messages").where("date", ">=",start).where("date", "<=",end).where("remove", "==","No").where("checkout", "==","")
    db.collection("messages").where("remove", "==","No").where("checkin", ">","").where("checkout", "==","")
    //db.collection("messages").where("remove", "==","No").where("checkout", "==","")
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
        key_checkin = doc.data().checkin;
        key_checkout = doc.data().checkout;
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
     if ((key_checkin !=null && key_checkin != '')){
            set_checkout(data3);	
            log_create();	
            //sendcheckedout();	
        }
     });
}
}) 
    .catch((error) => {
        console.log("error:" + error);
});
}

var removeInactiveUsers = function(){
    try {
        let text = "Are you sure you want to clear inactive users?\n\nClick 'OK' to clear inactive users\nClick 'Cancel' to go back!";
        if (confirm(text) == true) {
            removeInactive();
            document.getElementById("login").value = ''
            alert("Inactive Users!\nAll inactive users have been cleared!");
        } else {
            document.getElementById("login").value = ''
            alert("Cancelled!\nClearing inactive users have been has been cancelled!");
        }
    }
    catch(err) {
        var data = {
            "errormsg": "Error catch " + error
        }
        error_log_create(data);
    }
    finally {
       // setTimeout("getall()", 3000);
        //setTimeout(function(){window.location = "https://aquavisitorsystem.github.io/?report=inactive";},1000);
    }
}
var removeInactive =  function(){
        var db = firebase.firestore();
        db.collection("messages").where("remove", "==","Yes")
    .get()
    .then((querySnapshot) => {
        console.log("Snapshot:" + querySnapshot.size); 
        var cnt = querySnapshot.size;
        console.log("found:" + cnt);
        if (cnt === 0){
           // setTimeout("getall()", 3000);
        }else{
            querySnapshot.forEach((doc) => {
                var data3 = {
                    "id": doc.data().key
                }
            set_remove(data3);	
          //  setTimeout("getall()", 3000);
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

var g_logreport = urlParams.get('logreport')
console.log(g_logreport);

var g_logvalue= urlParams.get('logvalue')
console.log(g_logvalue);
	    
//loaddbtoday
	    
	    
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

// empty string
if ((checkin != null && checkin != '') &&  (keyid != null && keyid != '')) {
    console.log('string is NOT empty');	
    if (checkin === 'walkin'){
        var gdate77 = g_date;
        document.getElementById('schedule').style.display = 'none';
        document.getElementById('getall').style.display = 'none';
        document.getElementById('header').style.display = 'none';
        document.getElementById('logo').style.display = 'none';
        var data = {
            "login": 'walkin',
            "key": g_fname.trim().toUpperCase() + g_lname.trim().toUpperCase() + gdate77,
            "fname": g_fname.trim().toUpperCase(),
            "lname": g_lname.trim().toUpperCase(),
            "email": g_email.trim().toUpperCase(),
            "cname": g_cname.trim().toUpperCase(),
            "msg": g_message.trim().toUpperCase(), 
            "date": gdate77
        }
        var data1 = {
            "checkin": checkin,
            "id": g_fname.trim().toUpperCase() + g_lname.trim().toUpperCase() + gdate77
        }
        push_to_firebase(data);
        sleep(3000).then(() => {
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
console.log("g_lname: " + g_lname);
console.log("g_cname: " + g_cname);

} 
	    
if (g_today != null && g_today != '')  {
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

if ((g_cname != null) && (checkin === null || checkin === '') &&  (keyid === null || keyid === '')) {
    var data = {
        "companyname": g_cname,
    }
    clear();
    mycompanylink(data);
} else {
    console.log('string IS empty');
}  

if ((g_lname != null) && (checkin === null || checkin === '') &&  (keyid === null || keyid === '')) {
    var data = {
        "lastname": g_lname,
    }
    clear();
    loadnamelink(data);
} else {
    console.log('string IS empty');
}  

if (g_report === 'labels') {
    getdateoflabels();
} else {
    console.log('string IS empty');
}  

if (g_report === 'checkins') {
    dailycheckin();
} else {
    console.log('string IS empty');
}  

if (g_report === 'inactive') {
    loadinactive();
} else {
    console.log('string IS empty');
}  

if (g_report === 'removedreport') {
    loadremoved()
} else {
    console.log('string IS empty');
}  

if (g_report === 'checkouts') {
    dailycheckout();
} else {
    console.log('string IS empty');
}  
// }else if (username.toLowerCase()  === 'dailyuseremails') {
//emailtodayschedule();

if (g_report === 'dailyuseremails') {
    emailtodayschedule();
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

// empty string
if ((g_report === 'active') && (userid != null && userid != '')) {
    var data = {
        "userid": userid,
    }
    clear();
    loaddbactive(data);
} else {
    console.log('string IS empty');
}  

// empty string
if ((g_report === 'removed') && (userid != null && userid != '')) {
    var data = {
        "userid": userid,
    }
    clear();
    loaddbremoved(data);
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
        setTimeout(function(){window.location = "index.html?id=" + id;},500);
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

if ((g_logreport === 'loguserid') && (g_logvalue != null && g_logvalue!= '')) {
    var data = {
        "logvalue": g_logvalue
    }
    clear();
    loadloguseridlink(data);
} else {
    console.log('string IS empty');
} 

if ((g_logreport === 'logname') && (g_logvalue != null && g_logvalue!= '')) {
    var data = {
        "logvalue": g_logvalue
    }
    clear();
    loadlognamelink(data);
} else {
    console.log('string IS empty');
} 

if ((g_logreport === 'logcompany') && (g_logvalue != null && g_logvalue!= '')) {
    var data = {
        "logvalue": g_logvalue
    }
    clear();
    loadlogcompanylink(data);
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
        // console.log(error);
        document.getElementsByTagName("body")[0].style.display = "block";
        // Expected output: ReferenceError: nonExistentFunction is not defined
        // (Note: the exact output may be browser-dependent)
    } finally {
        document.getElementsByTagName("body")[0].style.display = "block";
    }
}

function convertDate(d) {
    var p = d.split("/");
    return +(p[2]+p[1]+p[0]);
}

function sortByDate(n) {
    try {
       
    console.log(n);
    //document.getElementById("report").value = "";
    //document.querySelectorAll("#report tbody").forEach(el => el.remove());
    var tbody = document.querySelector("#report tbody");
    // get trs as array for ease of use
    var rows = [].slice.call(tbody.querySelectorAll("tr"));
 
    rows.sort(function(a,b) {
        //console.log(new Date(a.cells[n].innerHTML) - new Date(b.cells[n].innerHTML));
        return new Date(a.cells[n].innerHTML) - new Date(b.cells[n].innerHTML);
       // return convertDate(a.cells[n].innerHTML) - convertDate(b.cells[n].innerHTML);
    });
  
    rows.forEach(function(v) {
        tbody.appendChild(v); // note that .appendChild() *moves* elements
        //console.log(v); 
    });

  
    } catch (error) {
        // console.log(error);
        document.getElementsByTagName("body")[0].style.display = "block";
       
    } finally {
        document.getElementsByTagName("body")[0].style.display = "block";
       

    }
  

}

function sortdates()
{
    sortTable(4)
    sortByDate2(7)
}

var dir2 = 'asc';
function sortByDate2(n) {
    try {
    //showPleaseWait() 
   // document.getElementsByTagName("BODY")[0].style.display = "block";
        console.log(n);
        var shouldSwitch;
    //document.getElementById("report").value = "";
    //document.querySelectorAll("#report tbody").forEach(el => el.remove());
    var tbody = document.querySelector("#report tbody");
    // get trs as array for ease of use
    var rows = [].slice.call(tbody.querySelectorAll("tr"));
    if (dir2 == "asc"){
 rows.sort(function(a,b) {
        console.log(new Date(b.cells[n].innerHTML) - new Date(a.cells[n].innerHTML));
        return new Date(b.cells[n].innerHTML) - new Date(a.cells[n].innerHTML);
        // return convertDate(a.cells[n].innerHTML) - convertDate(b.cells[n].innerHTML);
    });

    }else{
        rows.sort(function(a,b) {
            console.log(new Date(b.cells[n].innerHTML) - new Date(a.cells[n].innerHTML));
            return new Date(a.cells[n].innerHTML) - new Date(b.cells[n].innerHTML);
            // return convertDate(a.cells[n].innerHTML) - convertDate(b.cells[n].innerHTML);
        });

    }
   
  
    rows.forEach(function(v) {
        tbody.appendChild(v); // note that .appendChild() *moves* elements
        //console.log(v); 
    });

    if (dir2 == "asc") {
        dir2 = "desc";
    }else{
        dir2 = "asc";
    }
   
    } catch (error) {
       // console.log(error);
        document.getElementsByTagName("body")[0].style.display = "block";
    } finally {
        document.getElementsByTagName("body")[0].style.display = "block";
    }
   
}

function parseDate(input) {
    var parts = input.split('-');
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
}

function RecCount(begdate, enddate, days) {
    var start = moment(begdate, "MM-DD-YYYY"), // Sept. 1st
      end   = moment(enddate, "MM-DD-YYYY"), // Nov. 2nd
      day   = days;                    // Sunday

    var result = [];
    var current = start.clone();

    while (current.day(7 + day).isBefore(end)) {
        result.push(current.clone());
    }

    return result.length;
}

function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}

function nextDate(dayIndex) {
    var options2 = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    };
    var today = new Date();
    var x = today.setDate(today.getDate() + (dayIndex - 1 - today.getDay() + 7) % 7 + 1);
    var x = new Date(x).toLocaleDateString("fr-CA", options2)
    //  console.log(x);
    return x;
}

function titleCase(str) {
    return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}

function countTrWithTitle() {
  const rows = document.querySelectorAll('tr[title]');
    return rows.length;
}
