import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js'
import { getFirestore, collection, addDoc, doc, setDoc, updateDoc} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js'
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js'

  const firebaseConfig = {
  apiKey: "AIzaSyCRkfhPULJP3gdkPvfCs96bmnNpzJr3m4Y",
  authDomain: "sunlightly-2a739.firebaseapp.com",
  projectId: "sunlightly-2a739",
  storageBucket: "sunlightly-2a739.appspot.com",
  messagingSenderId: "130278659080",
  appId: "1:130278659080:web:a4f406c6369a2716d62dbd",
  measurementId: "G-5VKCJRK2RF"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp)
            
  const auth = getAuth(firebaseApp)
  onAuthStateChanged(auth, user => {
    if (user != null){
      console.log("user logged in")
      appView.loggedIn(user.email, user.uid)
    }else {
      console.log("no user signed in")
    }
  })
  

var appView = new Vue({
  el: '#app',
  data: {
    login_email: "",
    login_password: "",
    login_class: "",
    user_id: "",
    sign_up_class: "hidden",
    main_screen_class: "hidden",
    plant_selection_class: "hidden",
    activity_selection_class: "hidden",
    new_email: "",
    new_password: "",
    new_confirm_password: "",
    added_sunlight: 0,
    activities: [
      ["Sports", ["Play Basketball", "Play Soccer", "Play Tennis"]],
      ["Hiking", ["Visit Birds Hill Nature Area", "Walk the Ann Arbor Ramble Trail", "Hike the Saginaw Forest Loop"]],
      ["Touring", ["Visit the University of Michigan Museum of Art", "Eat at Zingerman's Delicatessen", "Visit the Ann Arbor Hands-On Museum"]],
      ["Wellness", ["Meditate Outside", "Hang Out with a Friend Outside", "Go Birdwatching"]]
    ],
    plants: [
      ["Rose", ["images/flower.png", "images/flower.png", "images/flower.png", "images/flower.png", "images/flower.png"]],
      ["Daffodil", ["images/flower.png", "images/flower.png", "images/flower.png", "images/flower.png", "images/flower.png"]],
      ["Daisy", ["images/flower.png", "images/flower.png", "images/flower.png", "images/flower.png", "images/flower.png"]],
      ["Dandelion", ["images/flower.png", "images/flower.png", "images/flower.png", "images/flower.png", "images/flower.png"]]
    ],
    temp_plant: {
      name: "",
      images: [],
      growth: 0,
      activity: "",
      bonuses: [],
    },
    active_plants: [
      {name: "Empty", images: [], growth: 0, activity: "", bonuses: [], added_value: 0, current_bonus: ""},
      {name: "Empty", images: [], growth: 0, activity: "", bonuses: [], added_value: 0, current_bonus: ""},
      {name: "Empty", images: [], growth: 0, activity: "", bonuses: [], added_value: 0, current_bonus: ""}
    ]
  },
  methods: {
    updateUserPlantData: function(){
      const userRef = doc(db, "users", this.user_id);
        updateDoc(userRef, {
            plantGrowth: this.active_plants
        });

    },
    loggedIn: function(email, uid){
      this.login_email = email;
      this.user_id = uid;
      this.login_class = "hidden";
      this.main_screen_class = ""; 
    },
    sendLogin:function() {
      signInWithEmailAndPassword(auth, this.login_email, this.login_password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
          this.login_class = "hidden";
          this.main_screen_class = "";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });      
    },
    redirectSignUp:function() {
      this.login_class = "hidden";
      this.sign_up_class = "";
    },
    sendSignUp:function() {
      if (this.new_password != this.new_confirm_password) {
        alert("Password fields must match");
      } else {

        createUserWithEmailAndPassword(auth, this.new_email, this.new_password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            this.sign_up_class = "hidden";
            this.main_screen_class = "";
            setDoc(doc(db, "users", user.uid), {
              email: this.new_email,
              uid: user.uid,
              plantGrowth: this.active_plants
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });      
      }
    },
    logOut: function() {
      this.login_class = "";
      this.main_screen_class = "hidden";
      this.active_plants = [
        {name: "Empty", images: [], growth: 0, activity: "", bonuses: [], added_value: 0, current_bonus: ""},
        {name: "Empty", images: [], growth: 0, activity: "", bonuses: [], added_value: 0, current_bonus: ""},
        {name: "Empty", images: [], growth: 0, activity: "", bonuses: [], added_value: 0, current_bonus: ""}
      ];
      signOut(auth).then(() => {
        resetFields()
      }).catch((error) => {
        console.log(error)
      });
    },
    resetFields: function(){
      this.login_email = ""
      this.login_password = ""
      this.new_password = ""
      this.new_confirm_password = ""
      this.new_email = ""
    },
    addPlant: function() {
      this.temp_plant = {};
      this.main_screen_class = "hidden";
      this.plant_selection_class = "";
    },
    removePlant: function(plant_index) {
      Vue.set(this.active_plants, plant_index, {name: "Empty", images: [], growth: 0, activity: "", bonuses: [], added_value: 0, current_bonus: ""})
    },
    selectActivity: function(plant_index) {
      this.temp_plant.name = this.plants[plant_index][0];
      this.temp_plant.images = this.plants[plant_index][1];
      this.temp_plant.growth = 0;
      this.plant_selection_class = "hidden";
      this.activity_selection_class = "";
    },
    redirectMainScreen: function(activity_index) {
      this.temp_plant.activity = this.activities[activity_index][0];
      this.temp_plant.bonuses = this.activities[activity_index][1];
      this.temp_plant.current_bonus = this.temp_plant.bonuses[Math.floor(Math.random()*this.temp_plant.bonuses.length)];
      this.added_value = 0;
      for (let i = 0; i < 3; i++) {
        if (this.active_plants[i].name === "Empty") {
          Vue.set(this.active_plants, i, this.temp_plant);
          break;
        }
      }
      this.activity_selection_class = "hidden";
      this.main_screen_class = "";
    },
    addSunlight: function() {
      if (!isNaN(this.added_sunlight))
      {
        for (let i = 0; i < 3; i++) {
          if (this.active_plants[i].name != "Empty") {
            let plant_copy = Object.assign({}, this.active_plants[i]);
            plant_copy.growth = Math.min(parseInt(plant_copy.growth) + (parseInt(this.added_sunlight) * 5), 100);
            Vue.set(this.active_plants, i, plant_copy);
          }
        }
      }
    },
    addWater: function(plant_index) {
      if (!isNaN(this.active_plants[plant_index].added_value)) {
        let plant_copy = Object.assign({}, this.active_plants[plant_index]);
        plant_copy.growth = Math.min(parseInt(plant_copy.growth) + parseInt(plant_copy.added_value) * 10, 100);
        Vue.set(this.active_plants, plant_index, plant_copy);
        this.updateUserPlantData()
      }
    },
    addBonus: function(plant_index) {
      new_bonus = this.active_plants[plant_index].bonuses[Math.floor(Math.random()*this.active_plants[plant_index].bonuses.length)];
      let plant_copy = Object.assign({}, this.active_plants[plant_index]);
      plant_copy.current_bonus = new_bonus;
      plant_copy.growth = Math.min(parseInt(plant_copy.growth) + 30, 100);
      Vue.set(this.active_plants, plant_index, plant_copy);
    },
    bindImage: function(plant_index) {
      if (this.active_plants[plant_index].name != "Empty") {
        return this.active_plants[plant_index].images[Math.floor(4 * (this.active_plants[plant_index].growth / 100.0))];
      } else {
        return "";
      }
    },
  }
})
