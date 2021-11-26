var appView = new Vue({
  el: '#app',
  data: {
    login_username: "",
    login_password: "",
    login_class: "",
    sign_up_class: "hidden",
    main_screen_class: "hidden",
    plant_selection_class: "hidden",
    activity_selection_class: "hidden",
    new_username: "",
    new_password: "",
    new_confirm_password: "",
    plant_1_progress_value: 0,
    plant_1_add_progress_value: 0,
    plant_1_level: 1,
    plant_2_progress_value: 0,
    plant_2_add_progress_value: 0,
    plant_2_level: 1,
    plant_3_progress_value: 0,
    plant_3_add_progress_value: 0,
    plant_3_level: 1,
  },
  methods: {
    sendLogin:function() {
      console.log(this.login_username);
      console.log(this.login_password);
      this.login_class = "hidden";
      this.main_screen_class = "";
    },
    redirectSignUp:function() {
      this.login_class = "hidden";
      this.sign_up_class = "";
    },
    sendSignUp:function() {
      if (this.new_password != this.new_confirm_password) {
        alert("Password fields must match");
      } else {
        this.sign_up_class = "hidden";
        this.main_screen_class = "";
      }
    },
    logOut: function() {
      this.login_class = "";
      this.main_screen_class = "hidden";
    },
    addPlant: function() {
      this.main_screen_class = "hidden";
      this.plant_selection_class = "";
    },
    selectActivity: function() {
      this.plant_selection_class = "hidden";
      this.activity_selection_class = "";
    },
    redirectMainScreen: function() {
      this.activity_selection_class = "hidden";
      this.main_screen_class = "";
    },
    addProgressPlant1: function() {
      this.plant_1_progress_value += parseInt(this.plant_1_add_progress_value) * 10;
      if (this.plant_1_progress_value >= 100) {
        this.plant_1_progress_value = this.plant_1_progress_value % 100;
        this.plant_1_level++;
      }
      console.log(this.plant_1_progress_value);
      console.log("Plant 1: level " + this.plant_1_level);
    },
    addProgressPlant2: function() {
      this.plant_2_progress_value += parseInt(this.plant_2_add_progress_value) * 10;
      if (this.plant_2_progress_value >= 100) {
        this.plant_2_progress_value = this.plant_2_progress_value % 100;
        this.plant_2_level++;
      }
      console.log(this.plant_2_progress_value);
      console.log("Plant 2: level " + this.plant_2_level);
    },
    addProgressPlant3: function() {
      this.plant_3_progress_value += parseInt(this.plant_3_add_progress_value) * 10;
      if (this.plant_3_progress_value >= 100) {
        this.plant_3_progress_value = this.plant_3_progress_value % 100;
        this.plant_3_level++;
      }
      console.log(this.plant_3_progress_value);
      console.log("Plant 3: level " + this.plant_3_level);
    },
  }
})
