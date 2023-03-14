<script>
    import { liveQuery } from 'dexie';
    import { onMount } from 'svelte';
import db from '../db/db';

const plugins = liveQuery(async () => {
    const res = await db.plugins.toArray();
    return res.filter((p) => p.enabled).map((p) => p.name);
});

</script>

<nav>
    <a href="#/" class="bottom-item no-underline">📘</a>
    {#if $plugins && $plugins.includes('Protokoll')}
    <a href="#/about" class="bottom-item no-underline">🧬</a>
    {/if}
    <a href="#/medication" class="bottom-item no-underline">💊</a>
    {#if $plugins && $plugins.includes('Avføring')}
    <a href="#/feces" class="bottom-item no-underline">💩</a>
    {/if}

    <a href="#/settings" class="bottom-item">⚙️</a>
</nav>

<style lang="postcss">
    nav {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 10;
        right: 0;
        height: 4rem;
        background-color: #fff;
        display: flex;
        justify-content: space-around;
    }
    .bottom-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--color-primary);
        font-size: 24px;
        font-weight: 600;
        text-decoration: none !important;

    }
</style>