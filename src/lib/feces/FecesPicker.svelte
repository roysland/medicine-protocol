<script>
import { stools } from '../../db/stoolIndex.js'
import db from '../../db/db.js'
import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

</script>

<ListBox>
    {#each stools as stool}
        <ListBoxItem value={stool.id}>{stool.name}</ListBoxItem>
    {/each}
</ListBox>