import React from 'react';

export default function render(blocks, sources, keyPrefix) {
  if (blocks && typeof blocks.map === 'function') {
    return blocks.map((instance, i) => {
      try {
        // TODO remove once we've fully migrated block instead of type
        const block = instance.block || instance.type;

        const Block = sources[block] || sources.Unknown;
        return <Block {...instance.props} key={`${keyPrefix}-${i}`} _block={block} />;
      } catch(err) {
        const givenProps = Object.keys(instance.props)
          .map(key => <span key={key}>`${key}: ${instance.props[key]}`</span>).join('\n');

        return (
          <div style={style.error}>
            <div>We couldn't render your block {block}.</div>
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
