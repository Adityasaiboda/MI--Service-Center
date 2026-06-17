import { auth, db }
from "./firebase-config.js";

import {
signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
doc,
getDoc
}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

window.login = async function(){

```
const email =
document.getElementById(
    "username"
).value;

const password =
document.getElementById(
    "password"
).value;

try{

    const userCredential =
    await signInWithEmailAndPassword(
        auth,
        email,
        password
    );

    const user =
    userCredential.user;

    const userDoc =
    await getDoc(
        doc(
            db,
            "users",
            user.email
        )
    );

    if(userDoc.exists()){

        const role =
        userDoc.data().role;

        localStorage.setItem(
            "role",
            role
        );

        localStorage.setItem(
            "email",
            user.email
        );

        window.location.href =
        "/dashboard.html";

    }

}
catch(error){

    document.getElementById(
        "message"
    ).innerHTML =
    error.message;

}
```

};
