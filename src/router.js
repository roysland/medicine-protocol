import Router from 'svelte-spa-router'
import Home from './routes/Home.svelte'
import About from './routes/About.svelte'
import Medication from './routes/Medication.svelte'
import Settings__SvelteComponent_ from './routes/Settings.svelte'
const routes = {
    '/': Home,
    '/about': About,
    '/medication': Medication,
    '/settings': Settings__SvelteComponent_
}

export {
    Router, routes
}