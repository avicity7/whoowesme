<script>
  let pageData = [{title:null, lender_user_id:null, borrower_user_id:null, amount:null, outstanding:null}]
  let name = '',
    amount = 0
  let fetching = false
  let sending = false
  const getData = async () => {
    fetching = true
    let data = await fetch("https://whoowesme-server.onrender.com/records")
    let result = await data.json()
    pageData = result.results
    fetching = !fetching
  }
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

    <button
      class="bg-neutral-800 text-neutral-100 font-semibold rounded hover:bg-purple-900 mt-8 p-2"
      on:click={getData}
    >
      {#if fetching}
        Loading...
      {:else}
        Get records
      {/if}
    </button>

    {#if pageData[0].title != null}
      {#each pageData as item}
          <div class="shadow p-5 m-5 rounded">
            <p class="text-lg font-semibold">{item.title}</p>
            <p class="text-md text-purple-600">${item.amount}</p>
          </div>
      {/each}
    {/if}

  </div>
</div>