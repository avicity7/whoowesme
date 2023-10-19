<script lang="ts">
  import RecordCard from "../components/recordCard.svelte";
  import { setContext } from 'svelte';
  
  export let data
  let pageData = data.result
  let name = '',
    amount = ''
  let sending = false

  const getData = async () => {
    let response = await fetch(data.url)
    let result = await response.json()
    pageData = result.results
  }
  setContext('getData', getData)

  const sendData = async() => {
    sending = true
    const response = await fetch('https://whoowesme-server.onrender.com/records', {
			method: 'POST',
			body: JSON.stringify({title:name, lender_user_id: 0, borrower_user_id:0, amount, outstanding:true}),
			headers: {
				'content-type': 'application/json'
			}
		});
    getData()
    sending = !sending
  }
</script>

<div class="font-albert text-neutral-800">
  <div class="flex flex-col items-center">
    <h1 class="w-screen pt-12 pl-6 md:pl-24 font-bold text-3xl mb-24">Home</h1>
    <form
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
            autocomplete="off"
            class="p-1 ml-2 border-2 border-neutral-200 rounded focus:border-purple-400 outline-none select-none"
            bind:value={name}
          />
      </div>
      <div>
        <label
          class="font-medium ml-10 mr-10"
        >Amount:
          <input 
            type="number"
            name="amount"
            step="0.01"
            autocomplete="off"
            class="p-1 ml-2 border-2 border-neutral-200 rounded focus:border-purple-400 outline-none select-none"
            bind:value={amount}
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

    {#each pageData as item}
        <RecordCard {item} {data}/>
    {/each}

  </div>
</div>