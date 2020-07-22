import { DocSearch, DocSearchProps, version } from '@docsearch/react';
import React, { render } from 'preact/compat';

function getHTMLElement(
  value: string | HTMLElement,
  environment: DocSearchProps['environment'] = window
): HTMLElement {
  if (typeof value === 'string') {
    return environment.document.querySelector<HTMLElement>(value)!;
  }

  return value;
}

export function docsearch(props: DocSearchProps) {
  render(
    <DocSearch
      {...props}
      transformSearchClient={(searchClient) => {
        searchClient.addAlgoliaAgent('docsearch.js', version);

        return props.transformSearchClient
          ? props.transformSearchClient(searchClient)
          : searchClient;
      }}
    />,
    getHTMLElement(props.container, props.environment)
  );
}
