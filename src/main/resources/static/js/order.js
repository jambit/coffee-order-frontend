$(document).ready(function() {

    // connection settings for keycloak
    var keycloak = Keycloak({
        url: 'http://keycloak:8080/auth',
        realm: 'CoffeeOrderRealm',
        clientId: 'coffee-order-frontend'
    });

    var refresh = function() {

        $("#content").empty();

        // login to keycloak if not already logged in
        keycloak.init({ onLoad: 'login-required'
        }).success(
            function(){
                console.log('authenticated!');
                getEntries();
            })
            .error(
                function(){
                    console.log('error');
                });
    };

    var getEntries = function(){
        console.log('token:' + keycloak.token);

        $.ajax({
            url:"http://localhost:8082/orders",
            method:"GET",
            headers: {
                "Authorization": "Bearer " + keycloak.token
            },
            success:function(data) {
                for(var i=0; i<data.length; i++) {

                    var tr = $("<tr />");
                    var td1 = $("<td />").text(data[i].businessId);
                    var td2 = $("<td />").text(data[i].quantity);
                    var td3 = $("<td />").text(data[i].totalPrice + " €");

                    tr.append(td1);
                    tr.append(td2);
                    tr.append(td3);

                    $("#content").append(tr);
                }
            },
            error:function() {
                console.log("GET order failed");
            }
        });
    };

    refresh();
    $("#refresh").off("click").on("click", refresh);
});
