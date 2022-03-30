![trl-demo-webcomponent](https://i.imgur.com/9pRifIs.jpg)

[![TyphonJS Discord](https://img.shields.io/discord/737953117999726592?label=TyphonJS%20Discord)](https://discord.gg/mnbgN8f)
[![Twitch](https://img.shields.io/twitch/status/typhonrt?style=social)](https://www.twitch.tv/typhonrt)
[![Code Style](https://img.shields.io/badge/code%20style-allman-yellowgreen.svg?style=flat)](https://en.wikipedia.org/wiki/Indent_style#Allman_style)
[![License](https://img.shields.io/badge/license-MIT-yellowgreen.svg?style=flat)](https://github.com/typhonjs-fvtt-demo/trl-demo-webcomponent/blob/main/LICENSE)

Provides a demo reactive web component made with [TyphonJS Runtime Library](https://github.com/typhonjs-fvtt-lib/typhonjs) 
& [Svelte](https://svelte.dev/) to show the viability of web components on [Foundry VTT](https://foundryvtt.com/).

Presently while modern browsers support web components, and it is possible to use them in most areas of the Foundry GUI 
the goal of this example is to show how useful they are in user content areas such as journal entries and the chat log. 
Foundry VTT sanitizes user data in journal entries and the chat log that will remove any web component. Please see the
demo video below for a sneak peek of using web components with TinyMCE from the new quest log.

There are several useful example implementation points that are non-obvious when attempting to integrate WC w/ TinyMCE
on Foundry. The main WC shows an excellent example of using the reactive document wrapper: `TJSDocument`.

## Snapshot:
![trl-demo-webcomponent](https://i.imgur.com/0u8eI9J.gif)

## Video Demo:
[![trl-webcomponent-video](https://i.ytimg.com/vi/HMOCgGZFi0A/hqdefault.jpg)](https://www.youtube.com/watch?v=HMOCgGZFi0A)

## About:
Getting started with a new library or development methodology can be difficult. This demo module
provides a web component made with Svelte and various aspects that are provided with the TyphonJS Runtime
Library. Please stop by the [![TyphonJS Discord](https://img.shields.io/discord/737953117999726592?label=TyphonJS)](https://discord.gg/mnbgN8f)
Discord server to ask any questions.

## Installation:
1. Fork this repo if you'd like to make your own web component or directly clone this repo to try things out following 
   step two below. This repo is a demo repo, so use
   [template-svelte-esm](https://github.com/typhonjs-fvtt-demo/template-svelte-esm) for a bare-bones starter repo to 
   create your own new TRL based module.
3. Use WebStorm or VSCode to clone this repo into the Foundry VTT data / modules directory (make sure to keep the name
   `trl-demo-webcomponent` as the folder installed in your module directory as this is the `name` used in `module.json`).
4. Open in your IDE and proceed to run `npm install`
5. Run the NPM script `build` or for constant development `build-watch` (this builds and bundles the module to
   `./dist`.)
6. Restart Foundry VTT. This is necessary for Foundry to load the new module.
7. You should now have a new module installed `TRL Web Component Demo` visible in your modules list.
8. Launch a game / world of your choice.
9. Enable `TRL Web Component Demo` under `Manage Modules`.
10. On reload you can open the test application from the module configuration options.

Note: The TinyMCE integration / plugin will not presently work in stock Foundry journal entries due to server side 
sanitation of user content. 

## Direct Foundry Install Link:
You may also install this demo module directly with the following link by pasting it into `manifest URL` field in the
`add-on modules / install module` screen:
https://github.com/typhonjs-fvtt-demo/trl-demo-webcomponent/releases/latest/download/module.json

## What Is Happening Here?
TRL / Svelte allows building reactive web components (WC) that can easily hook into Foundry document data.

This WC is a basic implementation of a "document stat block" providing a compact reactive view of document data
assigned by Foundry UUID that can be embedded in most areas of a GUI as a standalone component. Drag & drop support
of document data is supported.

When run against the `dnd5e` system actor documents will include `AC` in addition to name. The fallback for all other 
documents / game systems shows any image & name of the document. 

There is a basic test application seen in the snapshot above that is accessible from the module configuration options 
or running a macro script with `Hooks.call('TRL.Demo.WCTest.Open');` 

A TinyMCE plugin to load and control the WC is available in `./src/config/plugin/Plugin.js`. It is automatically 
available when this module is loaded and can be dropped into a TinyMCE editor configuration object by using 
`typhonjs-wc` as the plugin name. Please see the video for a demo that shows usage with the new quest log. Alas, 
Foundry VTT by default currently sanitizes user content, so it is not possible to use web components in stock journal 
entries or the chat log. However, in the quest log TinyMCE is more fully controlled, so a demo is possible of how this 
WC works when integrated with TinyMCE.

WC Usage: 
```
<wc-doc-stat-block uuid="~string~" active="~string~: true|false" />

Attributes:
uuid - A string that is a Foundry document UUID.
active - A string that enables document drag & drop when 'true'.
```

The TinyMCE integration manages setting the active attribute when in edit mode and removes it when saved. This prevents
users from dropping / changing the document when in viewing mode. 

## Caveats:

Svelte is great, but web component support is alas a second class citizen insofar that there are currently several rough 
edges in configuration from the coding and Rollup / bundling angles. The Svelte maintainers are not so keen on web 
components so improvements have not really been coming into the current Svelte version 3 library. There definitely seems
to be growing interest in better web component support in Svelte and IMHO is a very powerful option to create reactive 
web components.

Overview from Svelte API docs:
https://svelte.dev/docs#run-time-custom-element-api

Some of the main problems can be understood in this issue:
https://github.com/sveltejs/svelte/issues/3594

The "best" example of a workaround configuration to embed child non-WC Svelte components in WC Svelte components. The
issue is adding the styles from non-WC components to the shadow root of the WC component. No guarantees if this repo is 
up-to-date, but shows a possible workaround though a bit hacky: https://github.com/redradix/svelte-custom-element-template

A somewhat recent blog post on WC w/ Svelte though it has a focus on Svelte Kit:

https://www.colorglare.com/svelte-components-as-web-components-b400d1253504

This demo repo has some drawbacks, but from a configuration angle takes a "least" hacky approach insofar that child 
Svelte components in `./src/wc/statblock/internal` are also web components, but used as Svelte Components in the main 
WC `./src/wc/statblock/DocumentStatBlock.svelte`. The work around here is that the main WC due to using a shadow root 
must contain any styles accessed by the child components. This is not necessarily a recommended approach. 

The config / test application and TinyMCE plugin are separately bundled from the WC bundle.

This codebase is relatively simple and shows the flexibility of `TJSDocument` from TRL which is a reactive wrapper 
around Foundry documents. The edge cases / tricky implementation details are worked out, but a full breakdown would be 
lengthy. This demo serves as a starting point for those interested in making reactive web components for Foundry as no 
others exist. 

## About the TyphonJS Runtime Library:
The TyphonJS Runtime Library (TRL) brings an exciting new library resource for all Foundry VTT developers to build
advanced modules and game systems using Svelte. A Svelte UI component library built for Foundry and extensions to the
core Foundry UI / Application framework make it easy to create declarative Svelte based UIs in a method familiar to
Foundry VTT developers. The core UI component framework contains reactive "application shells" that provide an enhanced
ability to control your UI / window experience including intro and outro transitions along with support key UI elements
like context menus and a new backward compatible and API compliant Dialog component that features a modal dialog option.

TRL is innovative as it delivers a runtime library module for Foundry that packages up the runtime in a way that
can be shared across any number of modules / game systems utilizing it thereby saving a lot of space in any given
module or game system. Optionally, it is possible to also bundle TRL directly into your module or game system. TRL
is both a Foundry library module and a NPM package providing the development dependency utilized while creating your
module / system. 
