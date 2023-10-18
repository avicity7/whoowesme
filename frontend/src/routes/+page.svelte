<script>
  let pageData = [{loanTitle:null, borrower:null, lenders:[null], lendAmounts:[null]}]
  const getData = async () => {
    let data = await fetch("https://13.212.100.69:5000/getLoanLedger")
    let result = await data.json()
    pageData = result
  }
</script>

<div class="font-albert m-16 flex flex-row justify-center text-neutral-800">
  <div class="flex flex-col items-center">
    <h1 class="w-screen pl-24 font-bold text-3xl mb-24">Home</h1>
    <form
      class="flex flex-col items-center"
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
    </form>

    <button
      class="bg-neutral-800 text-neutral-100 font-semibold rounded hover:bg-purple-900 mt-8 p-2"
      on:click={getData}
    >
      Click me!
    </button>

    {#if pageData[0].loanTitle != null}
      {#each pageData as item, i}
          <div class="shadow p-5 m-5 rounded">
            {i}: {item.loanTitle}
          </div>
      {/each}
    {/if}

  </div>
</div>