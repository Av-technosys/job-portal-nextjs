import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage as fireBaseOnMessage,
  MessagePayload,
  deleteToken,
} from "firebase/messaging";
import { useMutation } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { CommonAllDataType, MutationConfig, StoreFCMTokenInput } from "@/types";
import { api } from "@/helper";

export const StoreFCMToken = ({
  data,
}: {
  data: StoreFCMTokenInput;
}): Promise<CommonAllDataType> => {
  return api.post(`${apiConstantsURL.profile.storeFCMToken}`, data);
};

type UseStoreFCMTokenOptions = {
  mutationConfig?: MutationConfig<typeof StoreFCMToken>;
};

export const useStoreFCMToken = ({
  mutationConfig,
}: UseStoreFCMTokenOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: StoreFCMToken,
  });
};

const firebaseConfig = {
  apiKey: "AIzaSyC1hhkamu-4EnfTLb8ssZhP8va2XJpFh6k",
  authDomain: "job-assured.firebaseapp.com",
  projectId: "job-assured",
  storageBucket: "job-assured.firebasestorage.app",
  messagingSenderId: "859328095469",
  appId: "1:859328095469:web:8284b3a0461b3d19efd8e4",
  measurementId: "G-MYKMRT7F50",
};

export const firebase = initializeApp(firebaseConfig);

let messaging: any = null;

if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  try {
    messaging = getMessaging(firebase);
  } catch (error) {
    console.error("Firebase Messaging is not supported in this browser/environment", error);
  }
}

export const useFirebaseNotification = () => {
  const storeFCMToken = useStoreFCMToken();

  async function requestPermission() {
    if (messaging && typeof window !== "undefined" && "serviceWorker" in navigator) {
      try {
        navigator.serviceWorker
          .register("/firebase-messaging-sw.js", {
            scope: "/",
          })
          .then(function (registration) {
            if (Notification.permission === "denied") {
              console.warn("Notification permission was denied.");
              return;
            }

            getToken(messaging, {
              vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY, // "BKRYg-N8aEaYDhP_vP3FO81SKMQe09h_EbsCb19ieQpE-LYir4J-FKHHJznCR-1VodiK3q8qZfU7oCtcWayjGNw"
              serviceWorkerRegistration: registration,
            })
              .then((token: string) => {
                storeFCMToken.mutate({
                  data: {
                    fcm_token: token,
                  },
                });
              })
              .catch((err) => {
                console.error("Firebase getToken error (permission might be blocked):", err);
              });
              
            registration.update();
          })
          .catch((err) => {
            console.error(err, "error in registering service worker");
          });
      } catch (error) {
        console.error("Permission denied or error occurred", error);
      }
    }
  }

  function onMessage(cb: (payload: MessagePayload) => void) {
    if (!messaging) {
      return () => { };
    }
    return fireBaseOnMessage(messaging, cb);
  }

  function deleteFCMToken() {
    if (!messaging) {
      return Promise.resolve(false);
    }
    return deleteToken(messaging);
  }

  return {
    requestPermission,
    onMessage,
    deleteFCMToken,
  };
};