<svelte:options tag="wc-doc-stat-block" />

<script>
   import { get_current_component }    from 'svelte/internal';
   import { TJSDocument }              from '@typhonjs-fvtt/runtime/svelte/store';
   import { getUUIDFromDataTransfer }  from '@typhonjs-fvtt/runtime/svelte/util';

   // Store the component reference to access the shadow root / host element.
   const component = get_current_component();

   export let active = 'false';
   export let uuid = void 0;

   const doc = new TJSDocument();

   $:
   {
      console.log(`!!!! DSB - uuid: ${uuid}`);

      // Wait for result of setting document from UUID and if the lookup resolves successfully then set the `uuid`
      // attribute on the shadow root host element. This allows `uuid` to be serialized by TinyMCE.
      doc.setFromUUID(uuid).then((success) =>
      {
         if (success) { component.shadowRoot.host.setAttribute('uuid', uuid); }
      });
   }

   // TODO - remove: testing
   // $:
   // {
   //    console.log(`!!!! DSB - active: ${active}`);
   //
   //    if (active === 'true')
   //    {
   //       console.log(`!!!! DSB - active is true setting UUID`);
   //
   //       setTimeout(() =>
   //       {
   //          uuid = 'Actor.TVRkiUOF8iTUFDsV';
   //       }, 3000);
   //    }
   // }

   function onDrop(event)
   {
      // `active` tag must be set to `true` to handle drop events. The TinyMCE plugin sets this attribute when in
      // edit mode.
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
{#if $doc}
   <img src={$doc.data.img} alt="doc"> name: {$doc.data.name}
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
