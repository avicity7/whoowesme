<script lang="ts">
  import RecordCard from "../components/recordCard.svelte";
  import { setContext } from 'svelte';
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { Spinner } from "flowbite-svelte";

  export let data
  let pageData = [{record_id: 0, title:null, lender_user_id:null, borrower_user_id:null, amount:null, outstanding:null}],
  sum = 0,
  name = '',
  amount = '',
  sending = false,
  loading = true
  
  const getData = () => {
    return new Promise(async (resolve) => {
      let response = await fetch(data.url+`/records?lender_email=${$page.data.session?.user?.email}`)
      let result = await response.json()
      pageData = result.results
      sum = result.sum
      loading = false
      resolve(true)
    })
  }

  setContext('getData', getData)

  const sendData = async() => {
    sending = true
    await fetch(data.url+'/records', {
      method: 'POST',
      body: JSON.stringify({title:name, lender_email: $page.data.session?.user?.email, borrower_email:'', amount, outstanding:true}),
      headers: {
        'content-type': 'application/json'
      }
    });
    await getData()
    sending = false
    name = '',
    amount = ''
  }

  onMount(() => {
    getData()
  })
</script>
<div class="font-albert text-neutral-800 mb-10">
{#if loading}
  <h1 class="w-full pt-12 pl-6 md:pl-24 font-bold text-3xl mb-12">Home</h1>
  <div class="flex w-full h-[32rem] items-center justify-center">
    <Spinner color='purple'/>
  </div>
{:else}
  <div class="flex flex-col items-center">
    <h1 class="w-full pt-12 pl-6 md:pl-24 font-bold text-3xl mb-12">Home</h1>
    <h2 class="text-2xl mb-2 font-semibold">You are owed</h2>
    <h3 class="text-2xl mb-16 font-semibold text-purple-500">${sum}</h3>
    <h2 class="text-2xl mb-6 font-medium">New Record</h2>
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

    <h2 class="text-2xl mt-16 mb-6 font-medium">Records</h2>
    {#each pageData as item}
        <RecordCard {item} url={data.url}/>
    {/each}

  </div>
  {/if}
</div>