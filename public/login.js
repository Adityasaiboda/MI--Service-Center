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
    "http://localhost:3000/api/customers/login",
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

            window.location.href =
            "/index.html";

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