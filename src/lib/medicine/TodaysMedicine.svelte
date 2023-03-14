<script>
    import { PlusCircleIcon } from "svelte-feather-icons";
    import AddMedicine from "./AddMedicine.svelte";
    import { Modal, modalStore, toastStore } from "@skeletonlabs/skeleton";
    import { liveQuery } from "dexie";
    import db from "../../db/db.js";
    import moment from "moment";

    export let day;
    let dayPeriods = ["Morgen", "Formiddag", "Ettermiddag", "Kveld", "ved behov"];

    let medicinesToday = null
    $: medicinesToday = liveQuery(async () => {
        const todayUnix = moment(day).unix();
        const res = await db.medications
            .where("startDate")
            .belowOrEqual(todayUnix)
            .and((med) => med.endDate === null || med.endDate >= todayUnix)
            .and((med) => {
                if (med.frequency === "annenhver dag") {
                    const start = moment(med.startDate).diff(moment(day), "days");
                    const isDueToday = start % 2 === 0;
                    if (isDueToday) {
                        return med;
                    }
                } else if (med.frequency === "uke") {
                    const currentDayOfWeek = moment(day).day();
                    const dayOfWeekToTake = moment(med.startDate).day();
                    if (currentDayOfWeek === dayOfWeekToTake) {
                        return med;
                    }
                } else if (med.frequency === "måned") {
                    const currentDayOfMonth = moment(day).date();
                    const dayOfMonthToTake = moment(med.startDate).date();
                    if (currentDayOfMonth === dayOfMonthToTake) {
                        return med;
                    }
                } else {
                    return med;
                }
            })
            .and((med) => {
                med.taken = [];
                if (med.history.length > 0) {
                    const taken = med.history
                        .filter((m) => {
                            const isToday = moment
                                .unix(m.date)
                                .isSame(moment(day), "day");
                            return isToday;
                        })
                        .map((m) => m.period);
                    med.taken = taken;
                }
                return med;
            })
            .toArray();
        return res;
    });
    let showDrawer = false;
    let formPeriod = null;
    const openForm = (period) => {
        formPeriod = period;
        const d = {
            type: "component",
            component: {
                ref: AddMedicine,
                slot: null,
            },
        };
        modalStore.trigger(d);
    };

    const addToHistory = async (med, period) => {
        if (moment(day).isSame(moment(), 'day')) {
            const history = med.history;
            med.taken = [...med.taken, period.toLowerCase()];
            history.push({
                date: moment().unix(),
                medicine: med,
                period: period.toLowerCase(),
            });
            await db.medications.update(med.id, { history });
        } else {
            toastStore.trigger({
                message: "Du kan kun legge til medisiner for dagens dato",
            })
        }
    };

</script>
{#if $medicinesToday}
<div class="todaysmedicine">
    {#each dayPeriods as period}
        {#if $medicinesToday.some((m) => m.hours.includes(period.toLowerCase()))}
        <div class="period-title {period}">
            <span>{period}</span>
        </div>
        {/if}
        
        <div class="mb-2">
            {#each $medicinesToday as medicine}
                {#if medicine.hours.includes(period.toLowerCase())}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div
                        class="btn {medicine.frequency} mr-2 select-none {medicine.taken.includes( period.toLowerCase() ) ? 'selected' : ''}"
                        on:click={() => addToHistory(medicine, period)}
                    >
                        {medicine.name}
                    </div>
                {/if}
                {/each}
            </div>
        
    {/each}
</div>
{/if}
<button on:click={() => console.log($medicinesToday)}>Log</button>

<style lang="scss">
    .todaysmedicine {
        padding: 0.5rem;
        width: 100%;
        box-sizing: border-box;
    }
    .period-title {
        font-size: 15px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 0.5rem;
        color: var(--color-muted);
        display: flex;
        align-items: center;
        background-color: rgb(var(--color-primary-400) / .2);
        padding: 0.5rem;
        span {
            flex: 1;
        }
        &.ved.behov {
            background-color: rgb(var(--color-secondary-400) / .2);
        }
    }

    .btn {
        background-color: rgb(var(--color-primary-500) / .2);
        &.selected {
            --tw-bg-opacity: 1;
            background-color: rgb(var(--color-primary-500) / var(--tw-bg-opacity));
            color: rgb(var(--on-primary));
        }
        &.ved.behov {
            --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
            --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
            box-shadow: var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000);
            --tw-ring-inset: inset;
            --tw-ring-opacity: 1;
            background-color: transparent;
            --tw-ring-color: rgb(var(--color-secondary-500) / var(--tw-ring-opacity));
            &.selected {
                --tw-bg-opacity: 1;
                background-color: rgb(var(--color-secondary-500) / var(--tw-bg-opacity));
                color: rgb(var(--on-secondary));
            }
        }
    }
</style>
