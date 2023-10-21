<script lang="ts">
  export let item = {record_id: 0, title:null, lender_user_id:null, borrower_user_id:null, amount:null, outstanding:null}
  export let data = {result: null, url: '' as RequestInfo}
  import DeleteOutline from 'svelte-material-icons/DeleteOutline.svelte'
  import PencilOutline from 'svelte-material-icons/PencilOutline.svelte'
  import { getContext } from 'svelte';

  let deleting = false,
  editing = false, 
  sending = false

  const getData: Function = getContext('getData')
  let completed: Boolean = getContext('completed')

  const deleteRecord = async(id: Number) => {
    deleting = !deleting
    const response = await fetch(data.url+'/records', {
			method: 'DELETE',
			body: JSON.stringify({id}),
			headers: {
				'content-type': 'application/json'
			}
		});
    await getData() 
    deleting = !deleting
  }

  const sendData = async() => {
    sending = true
    const response = await fetch(data.url+'/records', {
			method: 'PUT',
			body: JSON.stringify(item),
			headers: {
				'content-type': 'application/json'
			}
		});
    await getData()
    sending = !sending
    editing = !editing
  }
</script>

<div class="border-b-2 border-neutral-200 p-5 flex flex-col w-[75%] md:w-[25%]">
  {#if !deleting}
    {#if editing}
    <form
      autocomplete="off"
      class="flex flex-col items-center align-center justify-center"
      on:submit|preventDefault={sendData}
    >
      <div class="mb-6">
        <label
          class="font-medium"
        >Name:
          <input 
            type="text"
            name="name"
            class="p-1 ml-2 border-2 border-neutral-200 rounded focus:border-purple-400 outline-none select-none"
            bind:value={item.title}
          />
      </div>
      <div>
        <label
          class="font-medium"
        >Amount:
          <input 
            type="number"
            name="amount"
            step="0.01"
            class="p-1 ml-2 border-2 border-neutral-200 rounded focus:border-purple-400 outline-none select-none"
            bind:value={item.amount}
          />
        </label>
      </div>

      <button 
        class="bg-neutral-800 text-neutral-100 font-semibold rounded hover:bg-purple-900 mt-8 p-2"
        type="submit"
      >
        {#if sending}
          Saving...
        {:else}
          Save
        {/if}
      </button>
    </form>
    {:else}
    <div class="flex flex-row items-center justify-between">
      <p class="text-lg font-semibold mr-2">{item.title}</p>
      <div>
        <button on:click={() => {editing = true}}>
          <PencilOutline class="text-neutral-500 hover:text-purple-600" size={20}/>
        </button>
        <button on:click={() => {deleteRecord(item.record_id)}}>
          <DeleteOutline class="text-neutral-500 hover:text-red-400" size={20}/>
        </button>
      </div>
    </div>
    <p class="text-md text-purple-600">${item.amount}</p>
    {/if}
    {:else}
    <div class="flex flex-row items-center justify-center">
      Deleting...
    </div>
  {/if}
</div>