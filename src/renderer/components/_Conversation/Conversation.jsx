import React from 'react';
import shortid from 'shortid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';

import DayDivider from '../DayDivider';
import ChatBubble from '../ChatBubble';

import { callHistory } from '../../mockData/callHistory';
import styles from './Conversation.module.scss';

const paperStyles = makeStyles(() => ({
  root: {
    padding: '8px 16px 0',
    margin: '8px',
    border: '1px solid #ccc',
    boxShadow: 'none'
  }
}));

const titleStyles = makeStyles(() => ({
  root: {
    margin: '0 0 8px 4px',
    fontWeight: 500
  }
}));

const Conversation = () => {
  // TODO: get company id from meeting
  const paperClasses = paperStyles();
  const titleClasses = titleStyles();

  return (
    <Paper className={paperClasses.root}>
      <Typography className={titleClasses.root}>NPL TRANSCRIPTS</Typography>
      <div className={styles.questionsAndResponses}>
        <div className={styles.questionsAndResponses__scrollArea}>
          {callHistory[0].previous_calls.map(call => {
            return (
              <div key={call.call_id}>
                {/* <DayDivider day={call.date} backgroundColor="white" /> */}
                {call.conversation.map((bubble, i) => {
                  return (
                    <ChatBubble
                      from={bubble.from}
                      text={bubble.text}
                      key={shortid.generate()}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Paper>
  );
};

export default Conversation;
