<svelte:options tag="wc-doc-stat-block" />

<script>
   import { TJSDocument }              from '@typhonjs-fvtt/runtime/svelte/store';
   import { getUUIDFromDataTransfer }  from '@typhonjs-fvtt/runtime/svelte/util';

   export let active = 'false';
   export let uuid = void 0; // 'Actor.TVRkiUOF8iTUFDsV';

   const document = new TJSDocument();

   $:
   {
      console.log(`!!!! DSB - uuid: ${uuid}`);
      document.setFromUUID(uuid);
   }

   $:
   {
      console.log(`!!!! DSB - active: ${active}`);
   }

   function onDrop(event)
   {
      if (active !== 'true')
      {
         console.log(`! DSB - onDrop - !active - aborting drop`);
         return;
      }

      console.log(`! DSB - onDrop`);

      if (event.dataTransfer.types) {
         for (let i = 0; i < event.dataTransfer.types.length; i++) {
            console.log(`! DSB - onDrop - dataTransfer type: ${event.dataTransfer.types[i]}`);
         }
      }

      console.log(`! DSB - onDrop - data transfer: `, event.dataTransfer.getData('text/plain'));

      uuid = getUUIDFromDataTransfer(JSON.parse(event.dataTransfer.getData('text/plain')));
   }

   function dragEnter(event)
   {
      if (event.dataTransfer.types) {
         for (let i = 0; i < event.dataTransfer.types.length; i++) {
            console.log(`! DSB - dragEnter - dataTransfer type: ${event.dataTransfer.types[i]}`);
         }
      }

      console.log(`!DSB - dragEnter - data transfer: `, event.dataTransfer.getData('text/plain'));
   }

   function mouseUp(event)
   {
      console.log(`!DSB - mouseUp`);
   }
</script>

<div class=container on:drop={onDrop}
     on:click={() => console.log('! DSB - click')}
     on:dragenter={dragEnter}
     on:mouseup={mouseUp}
>
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
