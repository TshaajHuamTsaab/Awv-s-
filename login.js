    const firebase = window.firebase;
document.addEventListener('DOMContentLoaded', function () {
    const firebaseConfig = {
        apiKey: "AIzaSyAn-xqPFj6TDd0kUspsQctfilRDO7cJdrE",
        authDomain: "login-f27f1.firebaseapp.com",
        projectId: "login-f27f1",
        storageBucket: "login-f27f1.appspot.com",
        messagingSenderId: "184211109394",
        appId: "1:184211109394:web:59d4aaae0e2ac50e3f8acb",
        measurementId: "G-SCF6303WH6"
    };

    // Modular Firebase v9+ syntax
    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    
    document.getElementById('loginform').addEventListener('submit', function (event) {
        event.preventDefault(); // prevent refresh

        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const message = document.getElementById('message');

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                // Show project content and hide login form
                message.textContent = '✅ Login successful!';
                message.style.color = "green";
                // Redirect to your project page or show project content
                window.location.href = 'project.html';
            }) 
            .catch((error) => {
                message.textContent = "❌ " + error.message;
                message.style.color = "red";
            });
    });
});