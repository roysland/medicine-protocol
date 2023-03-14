<script>
import moment from "moment";
import { createEventDispatcher } from "svelte";
import { getWeekArray } from "../../utils/dateUtils";
const weekArray = getWeekArray();
const dispatch = createEventDispatcher();
export let selectedDate = moment().format('YYYY-MM-DD');

function setSelectedDate (day) {
    dispatch('changeDate', day)
    selectedDate = day
}
</script>

<nav>
    {#each weekArray as week (week)}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="day" class:selected={week === selectedDate} on:click={() => setSelectedDate(week)}>
        <div class="day-string">{moment(week).format('ddd')}</div>
        <div class="day-num">{moment(week).format('DD')}</div>
    </div>
    {/each}
</nav>

<style lang="scss">
    nav {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: 1fr;
        grid-gap: 0.5rem;
        padding: 0.5rem;
        width: 100%;
        box-sizing: border-box;
    }
    .day {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        border-radius: 1rem;
        padding: 0.25rem 0;
        cursor: pointer;
        .day-string {
            text-transform: uppercase;
            font-weight: 600;
            font-size: 11px;
        }
        .day-num {
            font-weight: 600;
        }
    }
    .day.selected {
        @apply bg-primary-500;
        color: var(--color-white);
    }
</style>