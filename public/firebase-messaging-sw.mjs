// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyC1hhkamu-4EnfTLb8ssZhP8va2XJpFh6k",
  authDomain: "job-assured.firebaseapp.com",
  projectId: "job-assured",
  storageBucket: "job-assured.firebasestorage.app",
  messagingSenderId: "859328095469",
  appId: "1:859328095469:web:8284b3a0461b3d19efd8e4",
  measurementId: "G-MYKMRT7F50",
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  //   const notificationTitle = payload.notification.title;
  //   const notificationOptions = {
  //     body: payload.notification.body,
  //     icon: "./logo.png",
  //   };
  //   self.registration.showNotification(notificationTitle, notificationOptions);
});
