<script lang="ts">
  export let item = {record_id: 0, title:null, lender_user_id:null, borrower_user_id:null, amount:null, outstanding:null}
  export let data = {result: null, url: '' as RequestInfo}
  import DeleteOutline from 'svelte-material-icons/DeleteOutline.svelte'
  import { getContext } from 'svelte';

  let deleting = false

  const getData: Function = getContext('getData')
  const deleteRecord = async(id: Number) => {
    deleting = !deleting
    const response = await fetch(data.url, {
			method: 'DELETE',
			body: JSON.stringify({id}),
			headers: {
				'content-type': 'application/json'
			}
		});
    getData()
    setTimeout(() => deleting = !deleting, 500) // Change this in the future!
  }
</script>

<div class="shadow p-5 m-5 rounded flex flex-col w-[75%] md:w-[25%]">
  {#if !deleting}
    <div class="flex flex-row items-center justify-between">
      <p class="text-lg font-semibold mr-2">{item.title}</p>
      <button on:click={() => {deleteRecord(item.record_id)}}>
        <DeleteOutline class="text-neutral-500 hover:text-red-400" size={20}/>
      </button>
    </div>
    <p class="text-md text-purple-600">${item.amount}</p>
    {:else}
    <div class="flex flex-row items-center justify-center">
      Deleting...
    </div>
  {/if}
</div>