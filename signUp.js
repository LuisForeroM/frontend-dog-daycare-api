
new Vue({
    el: '#app',
    data: function() {
return {
      nameClient: '',
      documentClient: null,
      addressClient: '',
      emailClient: ''
    };
},
    methods: {
      saveClient() {
        
        const requestData = {
          nameClient: this.nameClient,
          documentClient: this.documentClient,
          addressClient: this.addressClient,
          emailClient: this.emailClient
        };

        axios.post('https://arq-software-387021.ue.r.appspot.com/client/saveClient', requestData)
          .then(response => {
            console.log(response.data);
            alert("Client successfully saved");
            this.redireccionar()
          })
          .catch(error => {
            console.error(error);
            alert("Error saving customer");
          });
      },
      redireccionar() {
      window.location.href = 'login.html'
      }
    }
  });