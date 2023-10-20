<script lang="ts">
  import "../app.css"
	import { Avatar } from 'flowbite-svelte'

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics'
	import { page } from "$app/stores";

	inject({ mode: dev ? 'development' : 'production' });

	let image_uri:string = $page.data.session?.user?.image as string
</script>

<nav class="p-6 text-lg bg-neutral-800 font-albert">
	<div class="flex flex-row justify-between">
		<div>
			<a href="/" class="mr-6 font-black text-neutral-100">whoowesme.</a>
			<a href="/" class="mr-6 font-medium text-neutral-100 hover:text-purple-300">home</a>
			<a href="/about" class="mr-6 font-medium text-neutral-100 hover:text-purple-300">about</a>
		</div>
		{#if $page.data.session}
		<a href="/profile" class="flex">
			<Avatar size="sm" src={image_uri} />
		</a>
		{:else}
		<a href="/profile" class="flex">
			<Avatar size="sm" class="bg-gray-400 text-neutral-100"></Avatar>
		</a>
		{/if}
	</div>
</nav>

<slot />