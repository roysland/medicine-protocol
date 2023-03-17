<script>
import db from '../db/db';
import { modalStore, SlideToggle, toastStore } from '@skeletonlabs/skeleton';
    import { liveQuery } from 'dexie';
const deleteDatabase = async () => {
    const res = await db.delete();
    window.location.reload()
};
let plugins = liveQuery(() => db.plugins.toArray());
console.log(plugins)
function enablePlugin (e, plugin) {
    console.log(e.target.checked)
    db.plugins.update(plugin.id, {enabled: e.target.checked})
}

function triggerNotification () {
    let message = {
        message: 'Sjekk telefonen.'
    }
    if (!("Notification") in window) {
        message.message = 'Dette nettleseren støtter ikke notifikasjoner.'
    } else if (Notification.permission === "granted") {
        const notification = new Notification('Dette er en test')
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                const notification = new Notification('Dette er en test')
            }
        })
    }

    toastStore.trigger(message)
}

function triggerConfirm() {
	const confirm = {
		type: 'confirm',
		title: 'Vennligst bekreft',
		body: 'Alt vil bli slettet og kan ikke gjenopprettes. Er du sikker på at du vil slette alt innhold?',
		// TRUE if confirm pressed, FALSE if cancel pressed
		response: async (r) => {
            if (r) {
                await deleteDatabase();
            }
        },
		// Optionally override the button text
		buttonTextCancel: 'Cancel',
		buttonTextConfirm: 'Confirm',
	};
	modalStore.trigger(confirm);
}
</script>
{#if $plugins}
<ul class="list">
    {#each $plugins as plugin}
        <li>
            <span class="badge bg-primary-500">🔌</span>
            <span class="flex-auto">
                {plugin.name}
            </span>
            <div>
                <SlideToggle active="bg-primary-500" size="sm" name="slider-label" checked={plugin.enabled} on:change={(e) => enablePlugin(e, plugin)}></SlideToggle>
            </div>
        </li>
    {/each}
    <li>
        <span class="badge bg-primary-500">💀</span>
        <span class="flex-auto">
            Test påminnelser
        </span>
        <div>
            <button class="btn variant-filled-primary" on:click={triggerNotification}>Send pushmelding</button>
        </div>
    </li>
    <li>
        <span class="badge bg-primary-500">💀</span>
        <span class="flex-auto">
            Slett alt innhold
        </span>
        <div>
            <button class="btn variant-filled-primary" on:click={triggerConfirm}>Slett</button>
        </div>
    </li>
</ul>
{/if}