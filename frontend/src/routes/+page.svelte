<script>
  let pageData = [{title:null, lender_user_id:null, borrower_user_id:null, amount:null, outstanding:null}]
  const getData = async () => {
    let data = await fetch("https://whoowesme-server.onrender.com/records")
    let result = await data.json()
    pageData = result
  }
  const sendData = async() => {

  }
</script>

<div class="font-albert m-16 flex flex-row justify-center text-neutral-800">
  <div class="flex flex-col items-center">
    <h1 class="w-screen pl-24 font-bold text-3xl mb-24">Home</h1>
    <form
      class="flex flex-col items-center"
      on:submit|preventDefault={sendData}
    >
      <input 
        type="text"
        name="name"
        autocomplete="off"
        placeholder="Name"
        class="ml-2 mb-6 outline-none select-none"
      />

      <label
        class="font-medium"
      >Amount:
        <input 
          type="number"
          name="amount"
          autocomplete="off"
          class="ml-2 border-2 border-neutral-200 rounded focus:border-purple-400 outline-none select-none"
        />
      </label>
      <button 
        class="bg-neutral-800 text-neutral-100 font-semibold rounded hover:bg-purple-900 mt-8 p-2"
        type="submit"
      >
        Sub
      </button>
    </form>

    <button
      class="bg-neutral-800 text-neutral-100 font-semibold rounded hover:bg-purple-900 mt-8 p-2"
      on:click={getData}
    >
      Click me!
    </button>

    {#if pageData[0].title != null}
      {#each pageData as item, i}
          <div class="shadow p-5 m-5 rounded">
            {i}: {item.title}
          </div>
      {/each}
    {/if}

  </div>
</div>