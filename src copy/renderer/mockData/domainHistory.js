/* eslint-disable */
import { getTodayOffSet } from '../utils/time';

const domainHistory = {
  rockettech: [
    {
      id: 'bvuZSSjexj68DrzRuwf5iG',
      domain_id: 'rockettech',
      status: 'string',
      summary: 'RocketTech & Cues.ai - Demo',
      description: 'string',
      dateObj: getTodayOffSet(-1).dateObj,
      start: {
        date: getTodayOffSet(-1).date,
        dateTime: '12:00pm'
      },
      end: {
        date: getTodayOffSet(-1).date,
        dateTime: '12:30pm'
      },
      attendees: [
        {
          email: 'john.doe@rockettech.com',
          displayName: 'John Doe',
          responseStatus: 'yes'
        },
        {
          email: 'mary.smith@rockettech.com',
          displayName: 'Mary Smith',
          responseStatus: 'yes'
        },
        {
          email: 'milton.edwards@rockettech.com',
          displayName: 'Milton Edwards',
          responseStatus: 'no'
        }
      ],
      frameworkTemplate: {
        blocks: [
          { id: 'attendees', label: 'ATTENDEES', active: false },
          { id: 'company-research', label: 'COMPANY RESEARCH', active: false },
          { id: 'contact-research', label: 'CONTACT RESEARCH', active: false },
          { id: 'talk-track', abel: 'TALK TRACK', type: 'talk-track', active: false },
          { id: 'discovery', label: 'DISCOVERY', active: false },
          { id: 'in-call-actions', label: 'IN CALL ACTIONS', active: false },
          { id: 'actions', label: 'ACTIONS', active: false },
          { id: 'notes', label: 'NOTES', active: false }
        ],
        elements: {
          actions: [
            {id: 'connect-on-linkedin', label: 'Connect on LinkedIn', type: 'action-item', value: true, active: false},
            {id: 'send-documentation', label: 'Send documentation', type: 'action-item', value: true, active: false}
          ],
          attendees: [
            {email: 'john.doe@rockettech.com', displayName: 'John Doe', responseStatus: 'yes'},
            {email: 'mary.smith@rockettech.com', displayName: 'Mary Smith', responseStatus: 'yes'},
            {email: 'milton.edwards@rockettech.com', displayName: 'Milton Edwards', responseStatus: 'no'}
          ],
          'company-research': [
            {id: 'company-name', label: 'Company Name', type: 'research-field', value: 'Discover', active: false},
            {id: 'competitors', label: 'Competitors', type: 'research-field', value: 'Master Card, Visa', active: false},
            {id: 'value-proposition', label: 'Value Proposition', type: 'research-field', value: 'Sales Coach', active: false},
            {id: 'industry', label: 'Industry', type: 'research-field', value: 'Finance', active: false},
            {id: 'current-events', label: 'Current Events', type: 'research-field', value: 'stock price is high', active: false},
            {id: 'icp', label: 'ICP', type: 'research-field', value: '???', active: false}
          ],
          'contact-research': [
            {id: 'contact-name', label: 'Contact Name', type: 'research-field', value: 'John Doe', active: false},
            {id: 'contact-title', label: 'Contact Title', type: 'research-field', value: 'Director of Sales', active: false},
            {id: 'company-tenure', label: 'Company Tenure', type: 'research-field', value: '10 years', active: false},
            {id: 'industry-tenure', label: 'Industry Tenure', type: 'research-field', value: '20 years', active: false},
            {id: 'reports-to', label: 'Reports to', type: 'research-field', value: 'CFO', active: false},
            {id: 'team-member', label: 'Team Member', type: 'research-field', value: 'Mary Smith', active: false}
          ],
          'talk-track': [
            {
              id: 'this-is-what-a-talk-track-looks-like',
              label: 'This is what a talk track looks like..',
              type: 'talk-track',
              value: '',
              active: false
            },
            {
              id: 'this-is-what-a-talk-track-looks-like-this-and-this-talk-track-has-wrapping-text',
              label: 'This is what a talk track looks like this. And this talk track has wrapping text.',
              type: 'talk-track',
              value: '',
              active: false
            },
            {
              id: 'this-is-what-a-talk-track-looks-like-this-is-a-wrapping-talk-track.',
              label: 'This is what a talk track looks like this is a wrapping talk track. And this is a really long talk track. At least a little bit longer then the others.',
              type: 'talk-track',
              value: '',
              active: false
            }
          ],
          discovery: [
            {id: 'how-many-reps-are-on-the-discovery-org-team', type: 'question-answer', label: 'How many reps are on the Discovery org team?', value: '500', active: false},
            {id: 'what-will-the-makeup-of-the-team-look-like-one-year-from-now', type: 'question-answer', label: 'What will the makeup of the team look like one year from now?', value: 'Half of the staff will be new hires.', active: false},
            {id: 'how-much-time-do-you-and-your-managers-spend-coaching-reps', type: 'question-answer', label: 'How much time do you and your managers spend coaching reps?', value: '20 hours per week', active: false}
          ],
          'in-call-actions': [
            {id: 'ask-about-one-on-one-demo', label: 'Ask about one on one demo', type: 'check-list', value: true, active: false},
            {id: 'ask-if-they-are-open-to-a-trial-period', label: 'Ask if they are open to a trial period', type: 'check-list', value: true, active: false},
            {id: 'ask-about-timeline-to-purchase', label: 'Ask about timeline to purchase', type: 'check-list', value: true, active: false}
          ],
          notes: [
            {id: 'note-1', label: '', type: 'note-field', value: 'They know they need a product to support sales staff!'},
            {id: 'note-2', label: '', type: 'note-field', value: 'They tried a few solutions but nothing has seems to catch on!'}
          ]
        },
        id: 'starter-call',
        locked: true
      }
    },
    {
      id: 'bvuZSSjexj68DrzRuwf5iG-2',
      domain_id: 'rockettech',
      status: 'string',
      summary: 'RocketTech & Cues.ai - Demo',
      description: 'string',
      dateObj: getTodayOffSet(-1).dateObj,
      start: {
        date: getTodayOffSet(-1).date,
        dateTime: '12:00pm'
      },
      end: {
        date: getTodayOffSet(-1).date,
        dateTime: '12:30pm'
      },
      attendees: [
        {
          email: 'john.doe@rockettech.com',
          displayName: 'John Doe',
          responseStatus: 'yes'
        },
        {
          email: 'mary.smith@rockettech.com',
          displayName: 'Mary Smith',
          responseStatus: 'yes'
        },
        {
          email: 'milton.edwards@rockettech.com',
          displayName: 'Milton Edwards',
          responseStatus: 'no'
        }
      ],
      frameworkTemplate: {
        blocks: [
          { id: 'attendees', label: 'ATTENDEES', active: false },
          { id: 'company-research', label: 'COMPANY RESEARCH', active: false },
          { id: 'contact-research', label: 'CONTACT RESEARCH', active: false },
          { id: 'talk-track', abel: 'TALK TRACK', type: 'talk-track', active: false },
          { id: 'discovery', label: 'DISCOVERY', active: false },
          { id: 'in-call-actions', label: 'IN CALL ACTIONS', active: false },
          { id: 'actions', label: 'ACTIONS', active: false },
          { id: 'notes', label: 'NOTES', active: false }
        ],
        elements: {
          actions: [
            {id: 'connect-on-linkedin', label: 'Connect on LinkedIn', type: 'action-item', value: true, active: false},
            {id: 'send-documentation', label: 'Send documentation', type: 'action-item', value: true, active: false}
          ],
          attendees: [
            {email: 'john.doe@rockettech.com', displayName: 'John Doe', responseStatus: 'yes'},
            {email: 'mary.smith@rockettech.com', displayName: 'Mary Smith', responseStatus: 'yes'},
            {email: 'milton.edwards@rockettech.com', displayName: 'Milton Edwards', responseStatus: 'no'}
          ],
          'company-research': [
            {id: 'company-name', label: 'Company Name', type: 'research-field', value: 'Discover', active: false},
            {id: 'competitors', label: 'Competitors', type: 'research-field', value: 'Master Card, Visa', active: false},
            {id: 'value-proposition', label: 'Value Proposition', type: 'research-field', value: 'Sales Coach', active: false},
            {id: 'industry', label: 'Industry', type: 'research-field', value: 'Finance', active: false},
            {id: 'current-events', label: 'Current Events', type: 'research-field', value: 'stock price is high', active: false},
            {id: 'icp', label: 'ICP', type: 'research-field', value: '???', active: false}
          ],
          'contact-research': [
            {id: 'contact-name', label: 'Contact Name', type: 'research-field', value: 'John Doe', active: false},
            {id: 'contact-title', label: 'Contact Title', type: 'research-field', value: 'Director of Sales', active: false},
            {id: 'company-tenure', label: 'Company Tenure', type: 'research-field', value: '10 years', active: false},
            {id: 'industry-tenure', label: 'Industry Tenure', type: 'research-field', value: '20 years', active: false},
            {id: 'reports-to', label: 'Reports to', type: 'research-field', value: 'CFO', active: false},
            {id: 'team-member', label: 'Team Member', type: 'research-field', value: 'Mary Smith', active: false}
          ],
          'talk-track': [
            {
              id: 'this-is-what-a-talk-track-looks-like',
              label: 'This is what a talk track looks like..',
              type: 'talk-track',
              value: '',
              active: false
            },
            {
              id: 'this-is-what-a-talk-track-looks-like-this-and-this-talk-track-has-wrapping-text',
              label: 'This is what a talk track looks like this. And this talk track has wrapping text.',
              type: 'talk-track',
              value: '',
              active: false
            },
            {
              id: 'this-is-what-a-talk-track-looks-like-this-is-a-wrapping-talk-track.',
              label: 'This is what a talk track looks like this is a wrapping talk track. And this is a really long talk track. At least a little bit longer then the others.',
              type: 'talk-track',
              value: '',
              active: false
            }
          ],
          discovery: [
            {id: 'how-many-reps-are-on-the-discovery-org-team', type: 'question-answer', label: 'How many reps are on the Discovery org team?', value: '500', active: false},
            {id: 'what-will-the-makeup-of-the-team-look-like-one-year-from-now', type: 'question-answer', label: 'What will the makeup of the team look like one year from now?', value: 'Half of the staff will be new hires.', active: false},
            {id: 'how-much-time-do-you-and-your-managers-spend-coaching-reps', type: 'question-answer', label: 'How much time do you and your managers spend coaching reps?', value: '20 hours per week', active: false}
          ],
          'in-call-actions': [
            {id: 'ask-about-one-on-one-demo', label: 'Ask about one on one demo', type: 'check-list', value: true, active: false},
            {id: 'ask-if-they-are-open-to-a-trial-period', label: 'Ask if they are open to a trial period', type: 'check-list', value: true, active: false},
            {id: 'ask-about-timeline-to-purchase', label: 'Ask about timeline to purchase', type: 'check-list', value: true, active: false}
          ],
          notes: [
            {id: 'note-1', label: '', type: 'note-field', value: 'They know they need a product to support sales staff!'},
            {id: 'note-2', label: '', type: 'note-field', value: 'They tried a few solutions but nothing has seems to catch on!'}
          ]
        },
        id: 'starter-call',
        locked: true
      }
    },
    {
      id: 'bvuZSSjexj68DrzRuwf5iG-3',
      domain_id: 'rockettech',
      status: 'string',
      summary: 'RocketTech & Cues.ai - Demo',
      description: 'string',
      dateObj: getTodayOffSet(-1).dateObj,
      start: {
        date: getTodayOffSet(-1).date,
        dateTime: '12:00pm'
      },
      end: {
        date: getTodayOffSet(-1).date,
        dateTime: '12:30pm'
      },
      attendees: [
        {
          email: 'john.doe@rockettech.com',
          displayName: 'John Doe',
          responseStatus: 'yes'
        },
        {
          email: 'mary.smith@rockettech.com',
          displayName: 'Mary Smith',
          responseStatus: 'yes'
        },
        {
          email: 'milton.edwards@rockettech.com',
          displayName: 'Milton Edwards',
          responseStatus: 'no'
        }
      ],
      frameworkTemplate: {
        blocks: [
          { id: 'attendees', label: 'ATTENDEES', active: false },
          { id: 'company-research', label: 'COMPANY RESEARCH', active: false },
          { id: 'contact-research', label: 'CONTACT RESEARCH', active: false },
          { id: 'talk-track', abel: 'TALK TRACK', type: 'talk-track', active: false },
          { id: 'discovery', label: 'DISCOVERY', active: false },
          { id: 'in-call-actions', label: 'IN CALL ACTIONS', active: false },
          { id: 'actions', label: 'ACTIONS', active: false },
          { id: 'notes', label: 'NOTES', active: false }
        ],
        elements: {
          actions: [
            {id: 'connect-on-linkedin', label: 'Connect on LinkedIn', type: 'action-item', value: true, active: false},
            {id: 'send-documentation', label: 'Send documentation', type: 'action-item', value: true, active: false}
          ],
          attendees: [
            {email: 'john.doe@rockettech.com', displayName: 'John Doe', responseStatus: 'yes'},
            {email: 'mary.smith@rockettech.com', displayName: 'Mary Smith', responseStatus: 'yes'},
            {email: 'milton.edwards@rockettech.com', displayName: 'Milton Edwards', responseStatus: 'no'}
          ],
          'company-research': [
            {id: 'company-name', label: 'Company Name', type: 'research-field', value: 'Discover', active: false},
            {id: 'competitors', label: 'Competitors', type: 'research-field', value: 'Master Card, Visa', active: false},
            {id: 'value-proposition', label: 'Value Proposition', type: 'research-field', value: 'Sales Coach', active: false},
            {id: 'industry', label: 'Industry', type: 'research-field', value: 'Finance', active: false},
            {id: 'current-events', label: 'Current Events', type: 'research-field', value: 'stock price is high', active: false},
            {id: 'icp', label: 'ICP', type: 'research-field', value: '???', active: false}
          ],
          'contact-research': [
            {id: 'contact-name', label: 'Contact Name', type: 'research-field', value: 'John Doe', active: false},
            {id: 'contact-title', label: 'Contact Title', type: 'research-field', value: 'Director of Sales', active: false},
            {id: 'company-tenure', label: 'Company Tenure', type: 'research-field', value: '10 years', active: false},
            {id: 'industry-tenure', label: 'Industry Tenure', type: 'research-field', value: '20 years', active: false},
            {id: 'reports-to', label: 'Reports to', type: 'research-field', value: 'CFO', active: false},
            {id: 'team-member', label: 'Team Member', type: 'research-field', value: 'Mary Smith', active: false}
          ],
          'talk-track': [
            {
              id: 'this-is-what-a-talk-track-looks-like',
              label: 'This is what a talk track looks like..',
              type: 'talk-track',
              value: '',
              active: false
            },
            {
              id: 'this-is-what-a-talk-track-looks-like-this-and-this-talk-track-has-wrapping-text',
              label: 'This is what a talk track looks like this. And this talk track has wrapping text.',
              type: 'talk-track',
              value: '',
              active: false
            },
            {
              id: 'this-is-what-a-talk-track-looks-like-this-is-a-wrapping-talk-track.',
              label: 'This is what a talk track looks like this is a wrapping talk track. And this is a really long talk track. At least a little bit longer then the others.',
              type: 'talk-track',
              value: '',
              active: false
            }
          ],
          discovery: [
            {id: 'how-many-reps-are-on-the-discovery-org-team', type: 'question-answer', label: 'How many reps are on the Discovery org team?', value: '500', active: false},
            {id: 'what-will-the-makeup-of-the-team-look-like-one-year-from-now', type: 'question-answer', label: 'What will the makeup of the team look like one year from now?', value: 'Half of the staff will be new hires.', active: false},
            {id: 'how-much-time-do-you-and-your-managers-spend-coaching-reps', type: 'question-answer', label: 'How much time do you and your managers spend coaching reps?', value: '20 hours per week', active: false}
          ],
          'in-call-actions': [
            {id: 'ask-about-one-on-one-demo', label: 'Ask about one on one demo', type: 'check-list', value: true, active: false},
            {id: 'ask-if-they-are-open-to-a-trial-period', label: 'Ask if they are open to a trial period', type: 'check-list', value: true, active: false},
            {id: 'ask-about-timeline-to-purchase', label: 'Ask about timeline to purchase', type: 'check-list', value: true, active: false}
          ],
          notes: [
            {id: 'note-1', label: '', type: 'note-field', value: 'They know they need a product to support sales staff!'},
            {id: 'note-2', label: '', type: 'note-field', value: 'They tried a few solutions but nothing has seems to catch on!'}
          ]
        },
        id: 'starter-call',
        locked: true
      }
    },
  ],
  bytecode: [],
  initech: [],
  tritechnology: [],
  acme: [],
  travelers: []
};

export { domainHistory };
