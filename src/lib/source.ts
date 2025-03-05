import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { iconMap } from './icons';
import { createElement } from 'react';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) return;
    
    const Icon = iconMap[icon];
    return createElement(Icon, { className: "h-5 w-5" });
  }
});
