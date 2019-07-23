import { Children, isValidElement, cloneElement } from 'react';

/*
 * Recursively walks React element tree removing any id props for descendant nodes
 */
function recursivelyRemoveIds(element) {
  const walker = element => {
    if (!isValidElement(element)) {
      return element;
    }

    return cloneElement(
      element,
      {
        // we can't remove attributes, but react treats undefined/null as "absent"
        id: null
      },
      Children.map(element.props.children, childElement => walker(childElement))
    );
  };

  return walker(element);
}

export default recursivelyRemoveIds;
