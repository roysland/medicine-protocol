<script>
    import moment from 'moment';
    import { onMount } from 'svelte';
import db from '../../db/db';

const getMedicineHistory = async () => {
    const res = await db.medications.toArray();
    const history = []
    let count = 0
    res.forEach((med) => {
        med.history.forEach((h) => {
            h.id = count++
            history.push(h)
        })
    })
    history.sort((a, b) => {
        return b.date - a.date
    })
    console.log(history)
    return history;
};
let medicineHistory = []
onMount(async () => {
    const res = await getMedicineHistory();
    medicineHistory = res
})

</script>
<p>Historikk</p>
<dl class="list-dl">
    {#each medicineHistory as med}
	<div>
		<span class="badge bg-primary-500">💀</span>
		<span class="flex-auto">
			<dt>{med.medicine.name}</dt>
			<dd>{moment(med.date * 1000).format('MMMM Do YYYY, h:mm:ss')}</dd>
		</span>
	</div>
    {/each}
</dl>
