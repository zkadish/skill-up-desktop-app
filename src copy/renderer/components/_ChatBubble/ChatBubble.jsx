import React from 'react';
import { string } from 'prop-types';

import styles from './ChatBubble.module.scss';

const ChatBubble = props => {
  const { text, from } = props;
  return (
    <div className={styles[`text-${from}`]}>
      <div className={styles[`text-${from}__space`]} />
      {text}
    </div>
  );
};

ChatBubble.propTypes = {
  from: string.isRequired,
  text: string.isRequired
};

export default ChatBubble;
