import React from 'react';

export default function render(blocks, sources, keyPrefix) {
  return blocks.map((block, i) => {
    try {
      const Block = sources[block.type] || sources.Unknown;
      return <Block {...block.props} key={`${keyPrefix}-${i}`} />;
    } catch(err) {
      const givenProps = Object.keys(block.props)
        .map(key => <span key={key}>`${key}: ${block.props[key]}`</span>).join('\n');

      return (
        <div style={style.error}>
          We couldn't render your block {block.type}.
          You gave it these props:
          ${givenProps}

          This is what failed:
          {err.message}
          {err.stack}
        </div>
      );
    }
  });
}

const style = {
  error: {
    backgroundColor: '#ff5959',
    color: 'white',
    fontSize: 12
  }
}
