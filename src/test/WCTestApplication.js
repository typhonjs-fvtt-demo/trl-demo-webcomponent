import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import WCTestAppShell         from './WCTestAppShell.svelte';

export default class WCTestApplication extends SvelteApplication
{
   /**
    * @inheritDoc
    */
   constructor(options = {}) { super(options); }

   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/Application.html#options
    */
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'typhonjs-webcomponent-test',
         resizable: true,
         minimizable: true,
         width: 500,
         height: 320,
         title: 'TyphonJS Web Components',

         svelte: {
            class: WCTestAppShell,
            target: document.body
         }
      });
   }
}