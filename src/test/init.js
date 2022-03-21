import SettingsShim  from './SettingShim.js';
import openTestApp   from './openTestApp.js';

Hooks.on('init', () =>
{
   game.settings.registerMenu('typhonjs-webcomponent', 'config', {
      name: 'Click to open:',
      label: 'Web Component Test',
      icon: 'fas fa-palette',
      type: SettingsShim,
      restricted: false
   });
});

Hooks.on('TyphonJS.WCTest.Open', () =>
{
   openTestApp();
});
