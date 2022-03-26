import { appendConfigString } from './appendConfigString.js';

// An object containing the available tags as keys w/ text description as value.
const s_TAGS = {
   'wc-doc-stat-block': 'Document Stat Block'
}

export class PluginWC
{
   /**
    * @param {import('tinymce').Editor}  editor -
    */
   constructor(editor)
   {
      // Register a custom toolbar menu button to insert web component tags.
      // https://www.tiny.cloud/docs/ui-components/typesoftoolbarbuttons/#menubutton
      editor.ui.registry.addMenuButton('typhonjs-wc', {
         icon: 'embed-page',
         tooltip: 'Insert Web Component',
         fetch: (callback) => {
            // Add menu items to insert web component tag at the location of the cursor.
            const items = Object.keys(s_TAGS).map((tag) => {
               return {
                  type: 'menuitem',
                  text: s_TAGS[tag],
                  onAction: () => editor.insertContent(`<${tag}>&nbsp;</${tag}>`)
               }
            });
            callback(items);
         }
      });

      // Append tags to `extended_valid_elements` and `custom_elements` TinyMCE settings.
      for (const tag in s_TAGS)
      {
         editor.settings.extended_valid_elements = appendConfigString(editor.settings.extended_valid_elements,
          `${tag}[*]`);

         editor.settings.custom_elements = appendConfigString(editor.settings.custom_elements, `${tag}`);
      }

      // Get the iframe window object and the iframes document object and initialize it with Foundry globals and
      // load the web components.
      editor.on('init', () =>
      {
         // https://www.tiny.cloud/docs/api/tinymce/tinymce.editor/#getwin
         // https://www.tiny.cloud/docs/api/tinymce/tinymce.editor/#getdoc
         const win = editor.getWin();
         const doc = editor.getDoc();

         // Assign Foundry globals from parent to TinyMCE iFrame.
         win.foundry = globalThis.foundry;
         win.game = globalThis.game;
         win.ui = globalThis.ui;
         win.Hooks = globalThis.Hooks;
         win.fromUuid = globalThis.fromUuid;

         // Add web components to TinyMCE iFrame.
         const script = doc.createElement('script');
         script.type = 'module';
         script.src = '/modules/typhonjs-webcomponent/dist/typhonjs-webcomponent.js';
         doc.head.append(script);
      });

      // The preinit event is fired after the editor is loaded but before the content is loaded.
      // Add node filters to add / remove the `active` and `contenteditable` attributes.
      // https://www.tiny.cloud/docs/advanced/events/#editorcoreevents
      editor.on('preinit', () => {
         const tags = Object.keys(s_TAGS).join(',');

         // During the creation of the web component we set the contenteditable attribute to false making it behave
         // like a noneditable but selectable element inside TinyMCE.
         editor.parser.addNodeFilter(tags, (nodes) =>
         {
            for (const node of nodes)
            {
               node.attr('active', 'true');
               node.attr('contenteditable', 'false')
            }
         });

         // On serialization remove `active` and `contenteditable` attributes.
         // Serialization occurs on "save", view sourcecode and preview, etc.
         // https://www.tiny.cloud/docs/api/tinymce.dom/tinymce.dom.serializer/#addnodefilter
         editor.serializer.addNodeFilter(tags, (nodes) => {
            for (const node of nodes)
            {
               if (!!node.attr('active')) { node.attr('active', null); }
               if (!!node.attr('contenteditable')) { node.attr('contenteditable', null); }
            }
         });
      });
   }

   getMetadata()
   {
      return {
         name: 'TyphonJS Web Components',
         url: 'https://github.com/typhonjs-fvtt/typhonjs-webcomponent'
      };
   }
}

export default () =>
{
   tinymce.PluginManager.add('typhonjs-wc', PluginWC);
};