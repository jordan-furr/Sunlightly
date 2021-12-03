import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js'
import { getFirestore, doc, setDoc, updateDoc, getDoc} from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js'
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
      appView.loggedIn(user.email, user.uid)
    }else {
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
    stats_class: "hidden",
    new_email: "",
    new_password: "",
    new_confirm_password: "",
    added_sunlight: 0,
    activities: [
      ["Sports", ["Play Basketball", "Play Soccer", "Play Tennis"]],
      ["Hiking", ["Visit Birds Hill Nature Area", "Walk the Ann Arbor Ramble Trail", "Hike the Saginaw Forest Loop"]],
      ["Touring", ["Visit the University of Michigan Museum of Art", "Eat at Zingerman's Delicatessen", "Visit the Ann Arbor Hands-On Museum"]],
      ["Wellness", ["Meditate Outside", "Hang Out with a Friend Outside", "Go Birdwatching"]],
      ["Adventure", ["Play Paintballl at Futureball", "Zipline at Winchell Park", "Go Rockclimbing at Planet Rock"]],
      ["Social", ["Talk with a Friend While Walking", "Hang a Hammock with a Friend", "Go to a Umich Football Game"]]
    ],
    plants: [
      ["Marigold", ["images/plants/marigold/marigold0.png", "images/plants/marigold/marigold1.png", "images/plants/marigold/marigold2.png", "images/plants/marigold/marigold3.png", "images/plants/marigold/marigold4.png", "images/plants/marigold/marigold-icon.png"]],
      ["Sunflower", ["images/plants/sunflower/sunflower0.png", "images/plants/sunflower/sunflower1.png", "images/plants/sunflower/sunflower2.png", "images/plants/sunflower/sunflower3.png", "images/plants/sunflower/sunflower4.png", "images/plants/sunflower/sunflower-icon.png"]],
      ["Daisy", ["images/plants/daisy/daisy0.png", "images/plants/daisy/daisy1.png", "images/plants/daisy/daisy2.png", "images/plants/daisy/daisy3.png", "images/plants/daisy/daisy4.png", "images/plants/daisy/daisy-icon.png"]],
      ["Piranha", ["images/plants/piranha/piranha0.png", "images/plants/piranha/piranha1.png", "images/plants/piranha/piranha2.png", "images/plants/piranha/piranha3.png", "images/plants/piranha/piranha4.png", "images/plants/piranha/piranha-icon.png"]],
      ["Peashooter", ["images/plants/peashooter/peashooter0.png", "images/plants/peashooter/peashooter1.png", "images/plants/peashooter/peashooter2.png", "images/plants/peashooter/peashooter3.png", "images/plants/peashooter/peashooter4.png", "images/plants/peashooter/peashooter-icon.png"]]
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
    async loggedIn(email, uid){
      this.login_email = email;
      this.user_id = uid;
      this.login_class = "hidden";
      this.main_screen_class = "";

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        var data = docSnap.data();
        this.active_plants = data["plantGrowth"];
      }

    },
    sendLogin:function() {
      signInWithEmailAndPassword(auth, this.login_email, this.login_password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
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
        this.resetFields()
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
      let num_plants = 0;
      for (let i = 0; i < 3; i++) {
        if (this.active_plants[i].name != "Empty") {
          num_plants += 1;
        }
      }
      if (num_plants < 3) {
        this.temp_plant = {};
        this.main_screen_class = "hidden";
        this.plant_selection_class = "";
        this.updateUserPlantData();
      } else {
        alert("All Flowerpots Full");
      }
    },
    removePlant: function(plant_index) {
      Vue.set(this.active_plants, plant_index, {name: "Empty", images: [], growth: 0, activity: "", bonuses: [], added_value: 0, current_bonus: ""})
      this.updateUserPlantData()
    },
    selectActivity: function(plant_index) {
      this.temp_plant.name = this.plants[plant_index][0];
      this.temp_plant.images = this.plants[plant_index][1];
      this.temp_plant.growth = 0;
      this.plant_selection_class = "hidden";
      this.activity_selection_class = "";
      this.updateUserPlantData()
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
      this.updateUserPlantData()
    },
    addSunlight: function() {
      if (!isNaN(this.added_sunlight))
      {
        for (let i = 0; i < 3; i++) {
          if (this.active_plants[i].name != "Empty") {
            let plant_copy = Object.assign({}, this.active_plants[i]);
            plant_copy.growth = Math.min(parseInt(plant_copy.growth) + (parseInt(this.added_sunlight) * 5), 100);
            Vue.set(this.active_plants, i, plant_copy);
            this.updateUserPlantData()
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
      let new_bonus = this.active_plants[plant_index].bonuses[Math.floor(Math.random()*this.active_plants[plant_index].bonuses.length)];
      let plant_copy = Object.assign({}, this.active_plants[plant_index]);
      plant_copy.current_bonus = new_bonus;
      plant_copy.growth = Math.min(parseInt(plant_copy.growth) + 30, 100);
      Vue.set(this.active_plants, plant_index, plant_copy);
      this.updateUserPlantData()
    },
    bindImage: function(plant_index) {
      if (this.active_plants[plant_index].name != "Empty") {
        this.updateUserPlantData()
        return this.active_plants[plant_index].images[Math.floor(4 * (this.active_plants[plant_index].growth / 100.0))];
      } else {
        return "";
      }
    },
    openStats: function() {
        this.main_screen_class = "hidden";
        this.stats_class = "";
	},
    closeStats: function() {
        this.main_screen_class = "";
        this.stats_class = "hidden";
	}
  }
})
