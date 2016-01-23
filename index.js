import React from 'react';

export default function render(blocks, sources, keyPrefix) {
  return blocks.map((block, i) => {
    const Block = sources[block.type] || sources.Unknown;
    return <Block {...block.props} key={`${keyPrefix}-${i}`} />;
  });
}
