import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, onValue, set, get, update } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD65v43qmcaGURds43l-lg8BrNCYtJ_x6A",
  authDomain: "mysmarthouse-2759d.firebaseapp.com",
  databaseURL: "https://mysmarthouse-2759d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mysmarthouse-2759d",
  storageBucket: "mysmarthouse-2759d.firebasestorage.app",
  messagingSenderId: "57616406863",
  appId: "1:57616406863:web:ba7cf22b2f9ced60960d3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function getData() {
    const dbRef = ref(database, "SmartPlug");
    onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
            const status = snapshot.val();
            
            
            // Get the HTML element to update
            const StateID = document.getElementById("StateID");
            const LastUpdatedID = document.getElementById("LastUpdatedID");
            const Button = document.getElementById("Button");
            
            
            if (status.State == true) {
        
            StateID.innerText = "On";
            StateID.style.color = "green";
            LastUpdatedID.innerHTML = status.LastModified;
            

            Button.style.backgroundColor = "#E50000";
            Button.style.border = "#A10000";
            Button.style.weight = "bolder";
            Button.innerHTML = "Close";
            
        } else if (status.State == false) {

            StateID.innerText = "Off";
            StateID.style.color = "#E50000";
            LastUpdatedID.innerHTML = status.LastModified;
            

            Button.style.backgroundColor = "#09AB03";
            Button.style.border = "#026A02";
            Button.style.weight = "bolder";
            Button.innerHTML = "Open";
        }
        }
    });
}

function updateFirebase() {
    const plugStateRef = ref(database, "SmartPlug/State");
    const lastUpdatedRef = ref(database, "SmartPlug/LastModified");

    // Get current state from UI
    let currentState = document.getElementById("StateID").innerText;
    let newState;
    if (currentState=="On") {
        newState = false;
    } else if (currentState=="Off") {
        newState = true;
    }
    let newTimestamp = new Date().toLocaleString();

    // 🔄 Update Firebase
    set(plugStateRef,newState);
    set(lastUpdatedRef,newTimestamp);
}

document.addEventListener("DOMContentLoaded", () => {
    getData();
    const Button = document.getElementById("Button");
    Button.addEventListener("click", updateFirebase);
    

})