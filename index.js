import React from 'react';

export default function render(blocks, sources, keyPrefix) {
  if (blocks && typeof blocks.map === 'function') {
    return blocks.map((block, i) => {
      try {
        const Block = sources[block.type] || sources.Unknown;
        return <Block {...block.props} key={`${keyPrefix}-${i}`} />;
      } catch(err) {
        const givenProps = Object.keys(block.props)
          .map(key => <span key={key}>`${key}: ${block.props[key]}`</span>).join('\n');

        return (
          <div style={style.error}>
            <div>We couldn't render your block {block.type}.</div>
            <div>You gave it these props:</div>
            <div>{JSON.stringify(givenProps)}</div>

            <div>This is what failed:</div>
            <div>{err.message}</div>
            <div>{err.stack}</div>
          </div>
        );
      }
    });
  } else {
    return (
      <div style={style.error}>
        <div>We couldn't render your blocks.</div>
        <div>{`Make sure "blocks" use square brackets [] instead of curly braces {} or anything else.`}</div>
      </div>
    );
  }
}

const style = {
  error: {
    backgroundColor: '#ff5959',
    color: 'white',
    fontSize: 12,
    padding: 20
  }
}
