import { Children, isValidElement, cloneElement } from 'react';

/*
 * Recursively walks React element tree removing any id props for descendant nodes
 */
function recursivelyRemoveIds(element: JSX.Element) {
  const walker = (element: JSX.Element): React.ReactElement<any> => {
    if (!isValidElement(element)) {
      return element;
    }

    return cloneElement(
      element,
      {
        // we can't remove attributes, but react treats undefined/null as "absent"
        id: null
      } as object,
      Children.map((element.props as any).children, childElement =>
        walker(childElement)
      )
    ) as React.ReactElement<any>;
  };

  return Array.isArray(element)
    ? Children.map(element, walker)
    : walker(element);
}

export default recursivelyRemoveIds;
