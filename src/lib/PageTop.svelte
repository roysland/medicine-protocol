<script>
    export let label = "Page Title";
    import { AppBar } from '@skeletonlabs/skeleton';
    import { push } from "svelte-spa-router";
    import { ArrowLeftIcon } from 'svelte-feather-icons'
</script>
<AppBar>
    <svelte:fragment slot="lead">
        <button on:click={() => push("#/")}>
            <ArrowLeftIcon />
        </button>
    </svelte:fragment>
	{label}
	<svelte:fragment slot="trail">(actions)</svelte:fragment>
</AppBar>
