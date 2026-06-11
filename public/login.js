function login(){

    const username =
    document.getElementById(
        "username"
    ).value;

    const password =
    document.getElementById(
        "password"
    ).value;

    fetch(
    "/api/customers/login",
    {

        method:"POST",

        headers:{
            "Content-Type":
            "application/json"
        },

        body:JSON.stringify({

            username,
            password

        })

    })

    .then(response =>
        response.json()
    )

    .then(data => {

        if(data.success){

            localStorage.setItem(
                "role",
                data.role
            );

            window.location.href = "/dashboard.html";

        }
        else{

            document
            .getElementById(
                "message"
            )
            .innerHTML =
            "Invalid Login";

        }

    });

}