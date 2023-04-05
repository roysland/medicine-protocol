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
</AppBar>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 m-4">
<div class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-primary-500 px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
    <div class="flex-shrink-0">
        <PlusSquareIcon class="text-primary-50" />
    </div>
    <div class="min-w-0 flex-1">
    <button on:click={openForm} class="focus:outline-none">
        <span class="absolute inset-0" aria-hidden="true"></span>
        <p class="font-medium text-primary-50">Legg til medisiner</p>
    </button>
    </div>
</div>

<!-- More people... -->
</div>

<MedicineList></MedicineList>