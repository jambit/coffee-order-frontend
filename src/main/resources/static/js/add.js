$(document).ready(function () {

    // connection settings for keycloak
    var keycloak = Keycloak({
        url: 'http://keycloak:8080/auth',
        realm: 'CoffeeOrderRealm',
        clientId: 'coffee-order-frontend',
    });

    // login to keycloak if not already logged in
    keycloak.init({
        onLoad: 'login-required'
    }).success(
        function () {
            console.log('authenticated!');
            console.log('username:' + keycloak.username);
            console.log('token:' + keycloak.token);

        })
        .error(
            function () {
                console.log('tilt')
            });

    $(".successarea").hide();

    $("#send").on("click", function () {

        var data = {
            businessId: $("#drink").val(),
            quantity: $("#quantity").val()
        };

        $.ajax({
            url: "http://localhost:8082/orders",
            method: "POST",
            headers: {
                "Authorization": "Bearer " + keycloak.token
            },
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function () {
                $(".successarea").show();
                $("form").hide();
            },
            error: function () {
                console.log("POST order failed");
            }
        });
    });
});