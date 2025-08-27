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

    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    // Login handler
    document.getElementById('loginform').addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const message = document.getElementById('message');
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                message.textContent = '✅ Login successful!';
                message.style.color = "green";
                window.location.href = 'project.html';
            })
            .catch((error) => {
                message.textContent = "❌ " + error.message;
                message.style.color = "red";
            });
    });

    // Signup handler (move this inside DOMContentLoaded)
    document.getElementById('signup').addEventListener('click', function () {
        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const message = document.getElementById('message');
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                message.textContent = '✅ Account created successfully!';
                message.style.color = "green";
                window.location.href = 'project.html';
            })
            .catch((error) => {
                message.textContent = "❌ " + error.message;
                message.style.color = "red";
            });
    });
});
