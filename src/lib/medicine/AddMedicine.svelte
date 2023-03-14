<script>
import { XCircleIcon } from 'svelte-feather-icons'
import moment from "moment";
import db from '../../db/db.js'
import { toastStore, modalStore } from '@skeletonlabs/skeleton';
let step = 0

let form = {
    name: '',
    dose: [1, 'tablett'],
    start: moment().format('YYYY-MM-DD'),
    end: '',
    hours: [],
    frequency: '',
    maxPerDay: 1
}

const nextStep = (event) => {
    if (event.key === 'Enter') {
        step++
    }
}

const submitForm = async () => {
    console.log(form)
    const addMedicine = await db.medications.add({
        name: form.name,
        dose: form.dose[0] + ' ' + form.dose[1],
        startDate: moment(form.start).unix(),
        history: [],
        endDate: moment(form.end).unix() || moment().add(10, 'year').unix(),
        hours: form.hours,
        frequency: form.frequency,
    })
    if (addMedicine) {
        const toast = {
            message: 'Medisinen ble lagt til i listen',
            type: 'primary',
            timeout: 3000
        }
        toastStore.trigger(toast)
        modalStore.close()
    }
}
</script>
<div class="flex justify-end">
    <button class="btn-icon p-0" on:click={() => modalStore.close()}>
        <XCircleIcon />
    </button>
</div>
{#if step === 0}
<div>
    <label class="label">
        <span>Navn</span> 
        <input bind:value={form.name} class="input" type="text" placeholder="Navn på medisin" on:keypress={nextStep} required>
    </label>
    
    <label class="label">
        <span>Dose</span>
        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <input class="input" type="text" placeholder="Dose" bind:value={form.dose[0]}>
        <select class="select bg-primary-100" bind:value={form.dose[1]}>
            <option>tablett</option>
            <option>mg</option>
            <option>ml</option>
            <option>g</option>
        </select>
    </div>
    </label>
    <label class="label">
        <span>Startdato</span>
        <input class="input" type="date" placeholder="Startdato" required bind:value={form.start}>
    </label>
    
    <label class="label">
        <span>Sluttdato</span>
        <input class="input" type="date" placeholder="Slutt (valgfritt)" bind:value={form.end}>
    </label>
    <div class="flex justify-end">
        <button class="btn btn-primary" on:click={() => step++} on:keypress={nextStep}>Neste</button>
    </div>
</div>
{/if}

{#if step === 1}
<p>Hvor ofte skal du ta medisinen? </p>
<label class="label">
    <span>Når på dagen? (velg flere hvis nødvendig)</span>
    <select class="select" size="5" multiple bind:value={form.hours}>
        <option value="morgen">Morgen</option>
        <option value="formiddag">Formiddag</option>
        <option value="ettermiddag">Ettermiddag</option>
        <option value="kveld">Kveld</option>
        <option value="ved behov">Ved behov</option>
    </select>
</label>
{#if form.hours.includes('ved behov')}
<label class="label">
    <span>Maks per dag:</span> 
    <input bind:value={form.maxPerDay} class="input" type="number" placeholder="Opptil x tabletter hver dag">
</label>
{/if}
<label class="label">
    <span>Gjenta hver</span>
    <select class="select" bind:value={form.frequency}>
        <option value="dag">dag</option>
        <option value="annenhver dag">annenhver dag</option>
        <option value="uke">uke</option>
        <option value="måned">måned</option>
        <option value="ved behov">Ved behov</option>
    </select>

</label>
<div class="flex justify-end">
    <button class="btn btn-primary" on:click={() => step++} on:keypress={nextStep}>Neste</button>
</div>
{/if}
{#if step === 2}
<p>
    Du skal ta {form.dose[0]} {form.dose[1]} <strong>{form.name}</strong> {form.hours.join(', ')} hver {form.frequency}.
</p>
<p>Stemmer dette?</p>
<div class="flex justify-betwen">
    <button class="btn btn-primary" on:click={() => step = 0}>Nei. (gå tilbake)</button>
    <button class="btn variant-filled-primary" on:click={ submitForm }>Lagre</button>
</div>
{/if}
<style lang="postcss">

</style>