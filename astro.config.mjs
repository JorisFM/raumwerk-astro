import { defineConfig } from 'astro/config';
import editableRegions from '@cloudcannon/editable-regions/astro-integration';

// https://astro.build/config
export default defineConfig({
  site: 'https://raumwerk-potsdam.de',
  integrations: [editableRegions()],
});
