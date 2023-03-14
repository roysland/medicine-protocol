<script>
    import moment from "moment";
    import { liveQuery } from "dexie";
    import db from "../../db/db";
    import AddMedicine from "./AddMedicine.svelte";
    import { ListBox, ListBoxItem, modalStore } from "@skeletonlabs/skeleton";
    import MedicineHistory from "./MedicineHistory.svelte";
    let medicines = liveQuery(() => db.medications
        .where("endDate")
        .aboveOrEqual(moment().unix())
        .toArray()
    );
    let checkedMedicines = [];

    const deleteSelected = async () => {
        await db.medications.bulkDelete(checkedMedicines);
        checkedMedicines = [];
    }
    
</script>
<p>Dine medisiner</p>
<div class="card variant-glass p-4 space-y-4">
{#if $medicines}
    <ListBox multiple>
        {#each $medicines as med}
            <ListBoxItem bind:group={checkedMedicines} name={med.name} value={med.id}>
                <div><strong>{med.name}</strong> - <small>{med.dose} {med.hours.join(', ')}. Gjenta {med.frequency}.</small></div>
            </ListBoxItem>
        {/each}
    </ListBox>
{/if}
</div>
{#if checkedMedicines.length > 0}
    <div class="flex justify-end fixed bottom-16 left-0 right-0 z-[999]">
        <button class="btn variant-filled-primary m-4" on:click={() => deleteSelected()}>Slett {checkedMedicines.length} medisiner</button>
    </div>

{/if}

<MedicineHistory></MedicineHistory>