<script>
    import MedicineList from "../lib/medicine/MedicineList.svelte";
    import AddMedicine from "../lib/medicine/AddMedicine.svelte";
    import { AppBar, modalStore } from "@skeletonlabs/skeleton";
    import { ArrowLeftIcon, PlusSquareIcon } from "svelte-feather-icons";
    import { push } from "svelte-spa-router";

    const openForm = () => {
        const d = {
            type: "component",
            component: {
                ref: AddMedicine,
                slot: null,
            },
        };
        modalStore.trigger(d);
    };
</script>
<AppBar>
    <svelte:fragment slot="lead">
        <button on:click={() => push("#/")}>
            <ArrowLeftIcon />
        </button>
    </svelte:fragment>
	Medisiner
	<svelte:fragment slot="trail">
        <button on:click={openForm}><PlusSquareIcon /></button></svelte:fragment>
</AppBar>

<MedicineList></MedicineList>