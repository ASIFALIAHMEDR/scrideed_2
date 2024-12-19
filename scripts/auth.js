// auth.js

// Firebase configuration - Replace with your config
const firebaseConfig = {
    apiKey: "AIzaSyDs8LgmOqK0gWPC5UROvqy__2Q8rsVIa0k",
    authDomain: "scrideedlogin.firebaseapp.com",
    projectId: "scrideedlogin",
    storageBucket: "scrideedlogin.firebasestorage.app",
    messagingSenderId: "250991819646",
    appId: "1:250991819646:web:2b95a1f7b0c3bfeb3dd12f",
    measurementId: "G-ZV1780RJ0Q"
  };
  
  // Initialize Firebase
  import { initializeApp } from 'firebase/app';
  import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut 
  } from 'firebase/auth';
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  
  // Google Sign In
  export const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Update UI after successful login
      updateUIOnAuth(user);
      return user;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      showError(error.message);
    }
  };
  
  // Sign Out
  export const handleSignOut = async () => {
    try {
      await signOut(auth);
      updateUIOnAuth(null);
    } catch (error) {
      console.error("Error signing out:", error);
      showError(error.message);
    }
  };
  
  // Auth State Observer
  onAuthStateChanged(auth, (user) => {
    updateUIOnAuth(user);
  });
  
  // UI Updates
  function updateUIOnAuth(user) {
    const loginBtn = document.getElementById('loginBtn');
    const userProfile = document.getElementById('userProfile');
    const userAvatar = document.getElementById('userAvatar');
    const userName = document.getElementById('userName');
  
    if (user) {
      // User is signed in
      loginBtn.style.display = 'none';
      userProfile.style.display = 'flex';
      userAvatar.src = user.photoURL || 'default-avatar.png';
      userName.textContent = user.displayName;
    } else {
      // User is signed out
      loginBtn.style.display = 'block';
      userProfile.style.display = 'none';
    }
  }
  
  // Error Handling
  function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }