<!-- Svelte option to indicate this component is a web component -->
<svelte:options tag="wc-doc-stat-block" />

<script>
   import { get_current_component }    from 'svelte/internal';

   import { TJSDocument }              from '@typhonjs-fvtt/runtime/svelte/store';
   import { getUUIDFromDataTransfer }  from '@typhonjs-fvtt/runtime/svelte/util';

   import { getStatBlock }             from './internal/getStatBlock.js';
   import EmptyStatBlock               from './internal/EmptyStatBlock.svelte';

   // Store the component reference to access the shadow root / host element.
   const component = get_current_component();

   // Defines the external attributes that are available for this web component.
   export let active = 'false';
   export let uuid = void 0;

   // Create a document wrapper that is updated with changes to the `uuid` attribute.
   const doc = new TJSDocument();

   // Reactive statement that waits for result of setting document from UUID and if the lookup resolves successfully
   // then set the `uuid` attribute on the shadow root host element. This allows `uuid` to be serialized by TinyMCE.
   $: doc.setFromUUID(uuid).then((success) =>
   {
      if (success) { component.shadowRoot.host.setAttribute('uuid', uuid); }
   });

   /**
    * Handles parsing the drop event and sets the new `uuid` or undefined.
    *
    * @param {DragEvent}   event -
    */
   function onDrop(event)
   {
      // `active` tag must be `true` to handle drop events. The TinyMCE plugin sets this attribute when in edit mode.
      // It may also be manually set in tag markup or by `setAttribute` on the element.
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
     on:dragover|preventDefault={()=>null}> <!-- Necessary for drop handling in iframes -->

   <!-- When the document changes retrieve the new child component to render document contents. -->
   <svelte:component this={$doc ? getStatBlock($doc) : EmptyStatBlock} doc={$doc}/>

   <!-- Hack to get the CSS used in child components to take -->
   <span class="content img" style="display:none"></span>
</div>

<style>
   /* Provides the styles for this component and child components. */

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
