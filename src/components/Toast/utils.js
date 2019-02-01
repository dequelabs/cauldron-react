import focusableSelector from '../../utils/focusable-selector';
import queryAll from '../../utils/query-all';

/**
 * Maps toast types to their classNames and icons
 */
export const typeMap = {
  confirmation: {
    className: 'success',
    icon: 'fa-info-circle'
  },
  caution: {
    className: 'warning',
    icon: 'fa-warning'
  },
  'action-needed': {
    className: 'error',
    icon: 'fa-minus-circle'
  }
};

export const tabIndexHandler = (reset, toast) => {
  if (reset) {
    // restore tab indicies that we clobbered
    return queryAll('[data-cached-tabindex]').forEach(el => {
      el.tabIndex = el.getAttribute('data-cached-tabindex');
    });
  }

  queryAll(focusableSelector)
    .filter(el => !toast.contains(el))
    .forEach(el => {
      el.setAttribute('data-cached-tabindex', el.tabIndex);
      el.tabIndex = -1;
    });
};
