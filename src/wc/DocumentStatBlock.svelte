<svelte:options tag="wc-doc-stat-block" />

<script>
   import { TJSDocument }              from '@typhonjs-fvtt/runtime/svelte/store';
   import { getUUIDFromDataTransfer }  from '@typhonjs-fvtt/runtime/svelte/util';

   export let uuid = void 0;

   const document = new TJSDocument();
   $: document.setFromUUID(uuid);

   function onDrop(event)
   {
      uuid = getUUIDFromDataTransfer(JSON.parse(event.dataTransfer.getData('text/plain')));
   }
</script>

<div class=container on:drop|preventDefault={onDrop}>
{#if $document}
   <img src={$document.data.img} alt="doc"> name: {$document.data.name}
{:else}
   Empty Document Stat Block
{/if}
</div>

<style>
   img {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      border: 2px solid rgba(0, 0, 0, 0.2);
      max-height: 50px;
      max-width: 50px;
   }

   div.container {
      background: rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      border-radius: 10px;
      border: 2px solid rgba(0, 0, 0, 0.2);
      padding: 4px;
      margin-top: auto;
   }
</style>
