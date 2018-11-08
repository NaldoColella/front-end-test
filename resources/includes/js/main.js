var main = new Vue({
    el: '#main',
    data: {
        couponList: {
            id: 3,
            title: 'black friday',
            discount: 35
        },
        selectedCoupon: 0,
        shippingPrice: 0,
        product: {
            id: 1321,
            title: 'vestido floral',
            price: 100,
            image: 'https://res-5.cloudinary.com/enjoei/image/upload/c_fill,fl_lossy.progressive,h_398,q_70,w_375/qzancxcixtocajlrgztv.jpg'
        },
        total: 0,
        json: '',
        obj: {},
        success: {
            text: 'enviaremos atualizações sobre o pedido para o seu email',
            title: 'compra confirmada'
        },
        cancel: {
            text: 'o pedido não foi enviado e você não será cobrado',
            title: 'compra cancelada'
        },
        modal: {
            text: '',
            title: ''
        },
        modalOpened: false

    },
    beforeMount: function(){
        this.getCheckout(this.selectedCoupon);
    },
    computed: {
        selectedCouponValue: function(){
            return this.couponList.find(x => x.id === this.selectedCoupon).discount;
        }
    },
    methods: {
        getCheckout: function(selectedCoupon) {
            const Http = new XMLHttpRequest();
            var url='http://localhost:3000/api/checkouts/6544';
            if(selectedCoupon && selectedCoupon != 0){
                url = url + "?couponId=" + selectedCoupon;
            }
            Http.open("GET", url);
            Http.send(null);
            Http.onreadystatechange=(e)=>{
                this.mountData(Http.responseText);
            }
        },
        postCheckout: function(selectedCoupon){
            const Http = new XMLHttpRequest();
            var url='http://localhost:3000/api/checkouts/6544';
            if(selectedCoupon && selectedCoupon != 0){
                url = url + "?couponId=" + selectedCoupon;
            }
            Http.open("POST", url);
            Http.send(null);
            Http.onreadystatechange=(e)=>{
                response = JSON.parse(Http.responseText);
                
                if(response.status == "success"){
                    this.modal = this.success;
                    this.modalOpened = true;
                }
            }
        },
        mountData: function(json){
            this.obj = JSON.parse(json);
            this.product = this.obj.product;
            this.couponList = this.obj.checkout.availableCoupons;
            this.shippingPrice = this.obj.checkout.shippingPrice;
            this.total = this.obj.checkout.totalPrice;
        },
        localeString: function(value){
            return (value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        },
        updateCheckout: function(){
            this.getCheckout(this.selectedCoupon);
        },
        cancelCheckout: function(){
            this.modal = this.cancel;
            this.modalOpened = true;
        }
    }
})