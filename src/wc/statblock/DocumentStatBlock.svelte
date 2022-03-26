<svelte:options tag="wc-doc-stat-block" />

<script>
   import { get_current_component }    from 'svelte/internal';

   import { TJSDocument }              from '@typhonjs-fvtt/runtime/svelte/store';
   import { getUUIDFromDataTransfer }  from '@typhonjs-fvtt/runtime/svelte/util';

   import { getStatBlock }             from './internal/getStatBlock.js';
   import EmptyStatBlock               from './internal/EmptyStatBlock.svelte';

   // Store the component reference to access the shadow root / host element.
   const component = get_current_component();

   export let active = 'false';
   export let uuid = void 0;

   const doc = new TJSDocument();

   let statBlock;

   // Wait for result of setting document from UUID and if the lookup resolves successfully then set the `uuid`
   // attribute on the shadow root host element. This allows `uuid` to be serialized by TinyMCE.
   $: doc.setFromUUID(uuid).then((success) =>
   {
      if (success) { component.shadowRoot.host.setAttribute('uuid', uuid); }
   });

   $: statBlock = $doc ? getStatBlock($doc) : EmptyStatBlock;

   function onDrop(event)
   {
      // `active` tag must be `true` to handle drop events. The TinyMCE plugin sets this attribute when in edit mode.
      if (active !== 'true') { return; }

      try
      {
         uuid = getUUIDFromDataTransfer(JSON.parse(event.dataTransfer.getData('text/plain')));
      }
      catch (err) { /**/ }
   }
</script>

<div class=container
     on:drop|preventDefault|stopPropagation={onDrop}
     on:dragover|preventDefault={()=>null}>

   <svelte:component this={statBlock} doc={$doc}/>

   <!-- Hack to get the CSS used in child components to take -->
   <span class="content img" style="display:none"></span>
</div>

<style>
   div.container {
      background: rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      border-radius: 10px;
      border: 2px solid rgba(0, 0, 0, 0.2);
      padding: 0.25em;
      margin-top: auto;
   }

   .content {
      margin-left: 0.5em;
   }

   .img {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      border: 2px solid rgba(0, 0, 0, 0.2);
      max-height: 50px;
      max-width: 50px;
   }
</style>
