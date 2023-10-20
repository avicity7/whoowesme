<script>
  import { signIn, signOut } from '@auth/sveltekit/client'
  import { Avatar } from 'flowbite-svelte';
  import { page } from '$app/stores';

</script>

<div class="font-albert max-w-xl text-neutral-800">
{#if $page.data.session}
  <h1 class="w-screen pt-12 pl-6 md:pl-24 font-bold text-3xl mb-24">Profile</h1>
  <div class="ml-6 mr-6 md:mr-0 md:ml-24 flex flex-col">
    <Avatar size="lg" class="bg-purple-400 text-neutral-100 text-2xl">{$page.data.session?.user?.name?.charAt(0)}</Avatar>
    <h2 class="text-xl font-semibold mt-6">{$page.data.session?.user?.name}</h2>
    <h3 class="text-md mt-2">{$page.data.session?.user?.email}</h3>

    <button 
      class="mt-6 p-1 w-[20%] bg-red-700 hover:bg-red-800 rounded text-neutral-100"
      on:click={() => signOut()}
    >
      <div>
        Sign Out
      </div>
    </button>
  </div>
  {:else}
  <h1 class="w-screen pt-12 pl-6 md:pl-24 font-bold text-3xl mb-24">Sign in</h1>
  <button 
      class="ml-6 md:ml-24 mt-6 w-[40%] bg-neutral-700 hover:bg-purple-900 rounded text-neutral-100"
      on:click={() => signIn('google', { callbackUrl: '/profile' })}
    >
      <div>
        Sign in with Google
      </div>
    </button>
  {/if}
</div>