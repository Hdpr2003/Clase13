const firebaseConfig = {
    apiKey: "AIzaSyAVSdUkSS8b0S20Y2gs4dXKEIYELvlvQ3g",
    authDomain: "paginaweb24-8970a.firebaseapp.com",
    projectId: "paginaweb24-8970a",
    storageBucket: "paginaweb24-8970a.appspot.com",
    messagingSenderId: "447997673235",
    appId: "1:447997673235:web:8e64d3d9ab561d5566a4e6",
    measurementId: "G-85PXENMC5B"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

//llamando al DOM
const btnRegistrar = document.getElementById('btnRegistrar')
const btnIniciar = document.getElementById('btnIniciarSesion')
const formulario = document.getElementById("formulario")
let contenidoweb = document.getElementById("contenidoweb")
const btnFacebook = document.getElementById('btnFacebook')
const btnGoogle = document.getElementById('btnGoogle')



/*funcion registrar*/
btnRegistrar.addEventListener('click', () => {
    let email = document.getElementById('Registrar').value;
    let password = document.getElementById('Password').value;
    console.log(email);
    console.log(password);
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            cargarJSON();
            var user = userCredential.user;
            console.log("Inicio de sesion correcto")
            formulario.classList.replace('mostrar', 'ocultar');
            contenidoDeLaWeb.classList.replace('ocultar', 'mostrar');
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Error al iniciar sesion")
            alert(errorMessage);
            // ..
        });
})


//funcion iniciar sesion
btnIniciarSesion.addEventListener('click', () => {
    let email = document.getElementById('Registrar').value;
    let password = document.getElementById('Password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            cargarJSON();
            var user = userCredential.user;
            formulario.classList.replace('mostrar', 'ocultar');
            contenidoweb.classList.replace('ocultar', 'mostrar');
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        d});
})

//funcion cerrar sesion
btnCerrarSesion.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("ha cerrado sesion correctamente");
        formulario.classList.replace('ocultar', 'mostrar');
        contenidoweb.classList.replace('mostrar', 'ocultar');
    }).catch((error) => {
        // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    });
})


//funcion escucha si el usuario esta activo o inactivo
firebase.auth().onAuthStateChanged((user) => {
    if (user) {

        var uid = user.uid;
        formulario.classList.replace('mostrar', 'ocultar'),
            contenidoweb.classList.replace('ocultar', 'mostrar');
        console.log("Tu sesion esta activa")
        cargarJSON();
        // ...
    } else {
        formulario.classList.replace('ocultar', 'mostrar'),
            contenidoDeLaWeb.classList.replace('mostrar', 'ocultar');

    }
});
//funcion Google

btnGoogle.addEventListener('click', () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            cargarJSON();
            console.log("Se inicio sesion correctamente")
            var user = result.user;
        }).catch((error) => {
            console.log("No se pudo iniciar sesion");
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
})

//funcion Facebook

btnFacebook.addEventListener('click', () => {
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            console.log("Inicio de sesion correcto")
            var user = result.user;
        })
        .catch((error) => {
            console.log("Inicio de sesion incorrecto")
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });


})
// funcion jalar datos de json
function cargarJSON() {
    fetch("data1.json")
        .then(function (res) {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            let html = '';
            data.forEach((productos) => {
                html += `
<div class="producto">
<p>  ${productos.nombre} </p>
<img src="${productos.img}" width="50px" class="imgProducto">

<strong> .${productos.puesto} </strong>
`;
            })
            document.getElementById('resultado').innerHTML = html;
        })
}

//Funcion Publicar o Agregar datos 
btnPublicar.addEventListener('click',()=>{
    db.collection("comentarios").add({
        titulo: txtTitulo =document.getElementById('txtTitulo').value,
        descripcion:txtDescripcion = document.getElementById('txtDescripcion').value
    })
    .then((docRef)=>{
        console.log("Se guardo tu comentario correctamente");
        alert("Se guardo tu comentario correctamente");
        //imprimirComentariosEnPantalla();//
    })
    .catch((error)=>{
        console.error("Error al enivar tu comentario",error);
    });
})
//imprimir datos de firestore en pantalla//