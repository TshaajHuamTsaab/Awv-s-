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

    // Get DOM elements
const createBtn = document.getElementById("createBtn");
const emailInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

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

    // Handle Create Account
createBtn.addEventListener("click", function() {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        message.textContent = "❌ Please enter email and password!";
        message.style.color = "red";
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

                // After the project is created successfully
const selectedProjectData = {
    id: 1, // unique project id
    title: "Project 1",
    description: "This is the first project."
};

// Save it in localStorage
localStorage.setItem("currentProject", JSON.stringify(selectedProjectData));

// Redirect to project.html
window.location.href = "project.html";

            message.textContent = `✅ Account created for: ${user.email}`;
            message.style.color = "green";
            // Redirect to project page
            window.location.href = 'project.html';
        })
        .catch((error) => {
            message.textContent = "❌ " + error.message;
            message.style.color = "red";
        });
    });

});