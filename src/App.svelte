<script>
import { Router, routes } from './router.js'
import { toastStore, Modal, Drawer, Toast, modalStore } from '@skeletonlabs/skeleton';
import { onMount } from 'svelte';
import db from './db/db.js';
import BottomNav from './lib/BottomNav.svelte';
import moment from 'moment'
const isWebView = navigator.userAgent.includes('WebView') || navigator.userAgent.includes('wv)');
let webViewWarningDismissed = false

let showNotificationDialog = false;
if (Notification.permission !== 'granted') {
    showNotificationDialog = true;
}

function allowNotifications() {
    // Request permission for notifications
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        // If permission is granted, register the service worker and set up the notification schedules
        registerServiceWorker();
      }
    });
  }

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service worker registered:', registration);
        })
        .catch(error => {
          console.error('Service worker registration failed:', error);
        });
    }
  }

onMount(() => {
    if (Notification.permission !== 'granted') {
      const confirm = {
        type: 'confirm',
        title: 'Tillat varsler',
        body: 'Du må tillate varsler for å få påminnelser om medisiner',
        response: (r) => {
          if (r) {
            allowNotifications();
          }
        }
    }
    modalStore.trigger(confirm);
    } else {
      registerServiceWorker();
    }
  });
</script>
{#if isWebView}
<aside class="alert variant-ghost-warning"><p class="alert-message">Du har åpnet applikasjonen i Webview. {navigator.userAgent}</p> <a href="{window.location.href}" target="_blank" rel="noreferrer" class="btn variant-filled-warning">Åpne i nettleser</a></aside>
{/if}
<main><Router {routes} /></main>
<BottomNav></BottomNav>
<Modal />
<Drawer />
<Toast />