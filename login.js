
new Vue({
  el: '#app',
  data: function() {
return {
      documentClient: null,
      responsePets: [],
      responseReserves: [],
      responseMessage: '',
      showTable: false,
      showAddDog: false,
      showModal: false,
      isAnyDogAssociated: false,
      clientId: null,
      petName: "",
      isAnyReserve: false,
      showModal2: false,
      petId: null,
      reserveDate: ''
  };
},
  methods: {
      methodGroup() {
          
          this.getClientIdByDocument();
      },
      getClientPets() {
          const requestData = {
              documentClient: this.documentClient
          };

          axios
              .get('https://arq-software-387021.ue.r.appspot.com/client/getPetsByDocument', { params: requestData })
              .then(response => {
                  const data = response.data;

                  if (Array.isArray(data)) {
                      // Pets found
                      this.responsePets = data;
                      this.showTable = true;
                       
                      
                      console.log("lenght:" + data.length)
                      if (data.length === 0) {
                          this.isAnyDogAssociated = false;
                      } else if (data.length > 0) {
                          this.isAnyDogAssociated = true;
                      }

                      if (data.length < 2) {
                          this.showAddDog = true;
                      } else {
                          this.showAddDog = false;
                      }
                  } else {
                      // No pets found
                      this.responseMessage = 'Error: No pets found for the given document';
                      this.responsePets = [];
                      this.responseReserves = [];
                      this.showTable = false;
                      alert(this.responseMessage);
                  }
              })
              .catch(error => {
                  console.error(error);
                  this.responseMessage = 'Error: Failed to fetch pet data';
                  this.responsePets = [];
                  this.responseReserves = [];
                  this.showTable = false;
                  alert(this.responseMessage);
              });
      },
      getReservesByClient() {
          const requestData = {
              documentClient: this.documentClient
          };

          axios
              .get('https://arq-software-387021.ue.r.appspot.com/client/getReservesByClient', { params: requestData })
              .then(response => {

                  const data = response.data;
                  console.log(data)
                  if (Array.isArray(data)) {
                      if (data.length === 0) {
                          this.isAnyReserve = false;
                      } else if (data.length > 0) {
                          this.isAnyReserve = true;
                      }
                      this.responseReserves = data;
                  } else {
                      // No reserves found
                      this.responseReserves = [];
                  }
              })
              .catch(error => {
                  console.error(error);
                  this.responseReserves = [];
              });
      },

      getClientIdByDocument() {
          const requestData = {
              documentClient: this.documentClient
          };

          axios
              .get('https://arq-software-387021.ue.r.appspot.com/client/getIdByDocument', { params: requestData })
              .then(response => {
                  this.clientId = response.data;
                  this.getClientPets();
                  this.getReservesByClient();
              })
              .catch(error => {
                  console.error(error);
                  alert('Please sign up first ');
              });
      },

      saveReserve() {
          const requestData = {
              pet: {
                  petId: this.petId
              },
              reserveDate: this.reserveDate
          };

          axios.post('https://arq-software-387021.ue.r.appspot.com/reserve/saveReserve', requestData)
              .then(response => {
                  console.log(response.data);
                  alert("Reservation successfully saved");
                  this.closeModal2()
                  this.getReservesByClient()
              })
              .catch(error => {
                  console.error(error);
                  alert("Error saving the reservation");
              });
      }, openModal() {
          this.showModal = true;

      },

      closeModal() {

          this.showModal = false;

      },
      openModal2(petId) {
          this.showModal2 = true;
          this.petId = petId
      },

      closeModal2() {

          this.showModal2 = false;

      },

      savePet() {
          const requestData = {
              petName: this.petName,
              client: {
                  clientId: this.clientId
              }
          };

          axios.post('https://arq-software-387021.ue.r.appspot.com/pet/savePet', requestData)
              .then(response => {
                  console.log(response.data);
                  this.getClientPets();
              })
              .catch(error => {
                  console.error(error);
                  alert("Error when storing the pet");
              });
      },

  }
});