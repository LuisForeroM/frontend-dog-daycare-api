
new Vue({
    el: '#app',
    data: function() {
return {
        reserveDate: '',
        isAnyReserve: false,
        responseReserves: []
    };
},
    methods: {
        getPetsByReserveDate() {
            const requestData = {
                reserveDate: this.reserveDate
            };

            axios
                .get('https://arq-software-387021.ue.r.appspot.com/reserve/getPetsByReserveDate', { params: requestData })
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
        notify(petId) {
            const requestData = {
                petId
            };
            axios.post('https://arq-software-387021.ue.r.appspot.com/pet/notifyClient', requestData)
                .then(response => {
                    // Manejar la respuesta del servidor si es necesario
                    console.log(response.data);
                })
                .catch(error => {
                    // Manejar errores si los hay
                    console.error(error);
                });
        }
    }
});