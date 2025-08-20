import { type PartialKeys, type VirtualizerOptions, useVirtualizer } from '@tanstack/react-virtual';

export function useVirtualRow<TScrollElement extends Element, TItemElement extends Element>(
  options: PartialKeys<
    VirtualizerOptions<TScrollElement, TItemElement>,
    'observeElementRect' | 'observeElementOffset' | 'scrollToFn'
  >,
) {
  return useVirtualizer(options);
}
