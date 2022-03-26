import SettingsShim  from './SettingShim.js';
import openTestApp   from './openTestApp.js';

import PluginWC      from './plugin/Plugin.js';

// Initialize TinyMCE WC plugin.
PluginWC();

Hooks.on('init', () => game.settings.registerMenu('trl-demo-webcomponent', 'config', {
   name: 'Click to open:',
   label: 'Web Component Test',
   icon: 'fas fa-palette',
   type: SettingsShim,
   restricted: false
}));

Hooks.on('TRL.Demo.WCTest.Open', openTestApp);