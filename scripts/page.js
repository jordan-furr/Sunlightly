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
    }
  }
})
