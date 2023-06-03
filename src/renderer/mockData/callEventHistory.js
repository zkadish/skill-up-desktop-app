/* eslint-disable */
import { getTodayOffSet } from '../utils/time';

const callEventHistory = [
  {
    id: 'bvuZSSjexj68DrzRuwf5iG',
    domain_id: 'rockettech',
    status: 'string',
    summary: 'RocketTech & SkillUp - Discovery Call',
    description: 'string',
    start: {
      dateTime: getTodayOffSet(-5).date,
      time: '12:00pm'
    },
    end: {
      dateTime: getTodayOffSet(-5).date,
      time: '12:30pm'
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
      id: 'ssf8QgSn11DYvxs6EiVVPB',
      label: 'Inbound Discovery*',
      locked: true,
      blocks: [
        {
          id: 'wHYzEjzZ2i4cRMeKwPCmrJ',
          label: 'Pre-call Action Items',
          type: 'pre-call',
          active: false,
          elements: [
            {id: 'woNki6R6xA65uR8X6xRrsS', label: 'Send agenda/soft reminder email', type: 'check-list', value: true, active: false},
            {id: '4QTjEzVeaTStPgEQ2RW8aW', label: 'Connect on LinkedIn', type: 'check-list', value: true, active: false},
          ]
        },
        {
          id: 'vd74B3tj8wbsG5d23Y5svz',
          label: 'Attendees',
          type: 'attendees',
          active: false,
          elements: [
            {email: 'john.doe@rockettech.com', displayName: 'John Doe', responseStatus: 'yes'},
            {email: 'mary.smith@rockettech.com', displayName: 'Mary Smith', responseStatus: 'yes'},
            {email: 'milton.edwards@rockettech.com', displayName: 'Milton Edwards', responseStatus: 'no'}
          ]
        },
        {
          id: 'bDd99QkjYnTEhfiMBCeDNY',
          label: 'Pre-call Company Research',
          type: 'default',
          active: false,
          elements: [
            {id: '4oYDoxWZuBwJaHoZDYyBmf', label: 'Company Name', type: 'research-field', value: 'Discover', active: false},
            {id: 'o2s8E4NZ82Ff4nF8WRAviW', label: 'Industry', type: 'research-field', value: 'Finance', active: false},
            {id: 'ff51NyxpFGekkjmgtyq6qt', label: 'Current Event', type: 'research-field', value: 'Master Card, Visa', active: false},
            {id: 'kXx6eMvdyp5d7wLShuywuM', label: 'Number of reps on sales team', type: 'research-field', value: 'Sales Coach', active: false},
            {id: 'vJD75WPVVZnwkuMmyYVKK2', label: 'Techstack', type: 'research-field', value: 'stock price is high', active: false},
          ]
        },
        {
          id: 'gTzMVNiNo7C2LEQKX898vK',
          label: 'Pre-call Contact Research',
          type: 'default',
          active: false,
          elements: [
            {id: 'pibUu99ATWN6nNCnELC8EK', label: 'Name', type: 'research-field', value: 'John Doe', active: false},
            {id: 'cfshzHFm2RzWJfxAtcn3d3', label: 'Title', type: 'research-field', value: 'Director of Sales', active: false},
            {id: 'eaaapEW4uVXsY55cgx4ytR', label: 'Persona pain points', type: 'research-field', value: '10 years', active: false},
            {id: '2jRyKGNPbqhj5qT5fAZG4X', label: 'Other members of their team to involve later?', type: 'research-field', value: '20 years', active: false},
          ]
        },
        {
          id: 'hiYQ6RGK9KWSzWmYy4fLu3',
          label: 'Agenda',type: 'default',
          type: 'talk-track',
          active: false,
          elements: [
            {id: 'x6jJbr1okk37e45sbqgkXU', label: 'Time check', type: 'check-list', value: false, active: false},
            {id: 'v2ZLZpAMHy7P6TFUTicc2s', label: 'Discuss what prompted your interest', type: 'check-list', value: false, active: false},
            {id: 'syCaSFiDQb3duWRNNdZ8eK', label: 'I can share more about SkillUp', type: 'check-list', value: false, active: false},
            {id: 'kuCKpNki6uEEc918zD2AN7', label: 'If there is a fit, we talk next steps', type: 'check-list', value: false, active: false}
          ]
        },
        {
          id: 'seFwPWBiLCq41sEr8AgdJK',
          label: 'Discovery 1',
          type: 'default',
          active: false,
          elements: [
            {id: '8NqoTj8UkeqhWzTwpTb5fS', label: `Other sales leaders come to us because they have a problem with low or inconsistent quota attainment across their team. I'd be curious to learn, what prompted your interest in SkillUp?`, type: 'question-answer', value: '', active: false},
            {id: '8wB85Q5gytqQJCPjZQ4RTy', label: `How long has that been a challenge for you?`, type: 'question-answer', value: '', active: false},
            {id: '8jdbQeFBvq9XkZcFR3h2vu', label: `We typically find low quota attainment stems from not having a proven sales framework for reps to use or little time spent coaching reps so they can adopt it. Specific to your sales process, what do you feel is preventing your team from hitting quota?`, type: 'question-answer', value: '', active: false},
            {id: 'k1L8MPTE6EH9ZTYfVT3Ko8', label: `What kinds of things have you tried or implemented already to address this?`, type: 'question-answer', value: '', active: false},
            {id: '7YtKFvfcBNM5zXuie6LJDX', label: `Coaching? How and how much time does a manager spend/week with a rep coaching?`, type: 'question-answer', value: '', active: false},
            {id: 't4yKL1BHnnY8zUDxPnA98U', label: `Why weren't those attempts successful?`, type: 'question-answer', value: '', active: false},
            {id: 'v17BWEXov6amDuL87zWvF6', label: `Can you help me understand the makeup of the team (#reps/managers/etc)?`, type: 'question-answer', value: '', active: false}
          ]
        },
        {
          id: 'gFV2HJYKfAVU9J726kAB8P',
          label: 'Value Proposition',
          type: 'talk-track',
          active: false,
          elements: [
            {id: 'dbQiUS7B4qQPpf5bvVvcME', label: `Coaching reps is hard. Not only is it a different skill set, but setting the time aside is challenging. Did you know on average 47% of sales managers spend less than 30 minutes coaching per week?`, type: 'talk-track', active: false},
            {id: 'awifKFEBVCDu22znhNtFoP', label: `Not only is coaching hard, but reps forget 60% of coaching after just one week.`, type: 'talk-track', active: false},
            {id: '7qPnzYt1fJsjZwT8JEJcNg', label: `That's why we lead with an always on approach that is incorporated to a reps daily workflow on every deal. We guide your reps as if you were there before, during, and after their sales calls.`, type: 'talk-track', active: false},
            {id: '5YSh4J5PaaneKNptCpbQkW', label: `This approach has a big impact because studies show that companies who coach reps regularly generate 17% more revenue.`, type: 'talk-track', active: false},
            {id: '2fUf4hHRZ7LVJPbPaNyDAZ', label: `Increased quota attainment is the benefit we talk about the most, but there are others like improved deal visibility, forecast accuracy, and new rep onboarding. Do you see room for improvement in any of those areas?`, type: 'question-answer', value: '', active: false}
          ]
        },
        {
          id: 'fdDWUQUP8CqnC9K61bnidd',
          label: 'Discovery 2',
          type: 'default',
          active: false,
          elements: [
            {id: 'mGKJbmTLqgFoVxpuUfJHBW', label: `How do you think your team would react to having this guidance and support to improve their ability to hit quota?`, type: 'question-answer', value: '', active: false},
            {id: 'xqLNg65Kwymoq3Z1GTC3bx', label: `You have lot's of priorities. Where would you say this sits on your overall priority list?`, type: 'question-answer', value: '', active: false},
            {id: 'cnfKFj6VaB5SxxAC9Skcj', label: `Being such a high priority, when are you hoping to have a solution in place by?`, type: 'question-answer', value: '', active: false},
            {id: 'mwXx1u2bDSzVZwixECZdoe', label: `I'm curious, is there a particular reason we're shooting for that date?`, type: 'question-answer', value: '', active: false},
            {id: 'sLzBdBv8cJKntQUTEs98VV', label: `So I can best support your evaluation and decision, can you walk me through how you will decide which solution is best?`, type: 'question-answer', value: '', active: false}
          ]
        },
        {
          id: 'jnoTxR8vM7kjpJFAPkY8kS',
          label: 'Next Steps',
          type: 'talk-track',
          active: false,
          elements: [
            {id: '2ijNBREbiqiwSDiMW4GX5S', label: `We have done solid work today and there is seemingly a good fit. Normally from here we line up deeper demo with a few more colleagues from your side who are involved in the decision. Can we go ahead and get that scheduled now?`, type: 'talk-track', active: false}
          ]
        },
        {
          id: 'ezeVQY6yfSPsXqd8vXn8yw',
          label: 'Actions',
          type: 'actions',
          active: false,
          elements: [
            {id: 'ovwvF9GhCEo4je5DrDFmUd', label: 'Connect on LinkedIn', type: 'action-item', value: true, active: false},
            {id: '7GQXnwmbqsZHGgr1XYmxek', label: 'Send documentation', type: 'action-item', value: true, active: false}
          ]
        },
        {
          id: 'nhwkpLGgNd3tsi8h8PC2KM',
          label: 'Notes',
          type: 'notes',
          active: false,
          elements: [
            {id: 'db4GXW7tfUT3jmmZkzbd5y', label: 'note-1', type: 'notes-field', value: 'They know they need a product to support sales staff!'},
            {id: 'q1ovYFyCtwM1Vho5otd7xf', label: 'note-2', type: 'notes-field', value: 'They tried a few solutions but nothing has seems to catch on!'},
            {id: 'ktwuJbp4o1U2fqwUtzBEZv', label: 'note-3', type: 'notes-field', value: 'They know they need a product to support sales staff!\n\nThey tried a few solutions but nothing has seems to catch on!'},
          ]
        },
        {
          id: '8nzwZfMBucFNcx4qt1T937',
          label: 'Battle Cards',
          type: 'battle-cards',
          active: false,
          elements: []
        },
        {
          id: '9k2BGvpUbe6znmurNFjBXy',
          label: 'Post-call Action Item',
          type: 'post-call',
          active: false,
          elements: [
            {id: 'pUfbJBNGq3kL8A5ZdgZWQR', label: `Send followup email summary & resources`, type: 'check-list', value: true, active: false},
            {id: '7JBCzbhDgRLEBLLPL5x5Tw', label: `Update Opportunity Details`, type: 'check-list', value: true, active: false},
            {id: 'bQfxg8xkSXBYKSMsZgQBSA', label: `Add notes to CRM`, type: 'check-list', value: true, active: false}
          ]
        }
      ],
    }
  },
  {
    id: '7zZQUuXJZjS8YkeWH9PY78',
    domain_id: 'bytecode',
    status: 'string',
    summary: 'ByteCode & SkillUp - Discovery call',
    description: 'string',
    start: {
      dateTime: getTodayOffSet(-5).date,
      time: '1:00pm'
    },
    end: {
      dateTime: getTodayOffSet(-5).date,
      time: '1:30pm'
    },
    attendees: [
      {
        email: 'john.doe@bytecode.com',
        displayName: 'John Doe',
        responseStatus: 'maybe'
      },
      {
        email: 'mary.smith@bytecode.com',
        displayName: 'Mary Smith',
        responseStatus: 'no'
      },
      {
        email: 'milton.edwards@bytecode.com',
        displayName: 'Milton Edwards',
        responseStatus: 'yes'
      }
    ],
    frameworkTemplate: {
      id: '8QdPAuQMZhii8R3U1NZgdr',
      label: 'Inbound Call*',
      locked: true,
      blocks: [
        {
          id: 'wztH51yHGEFjAjwoLGA2yu',
          label: 'Pre-call Action Items',
          type: 'pre-call',
          active: false,
          elements: [
            {id: '34hzZcUbZYWosriSpoRQsq', label: 'Send agenda/soft reminder email', type: 'check-list', value: true, active: false},
            {id: '6NtTzCQe7YG334kBDrDunz', label: `Fill in the 'validate research' information`, type: 'check-list', value: true, active: false},
          ]
        },
        {
          id: 'qb65iirKSZvuv7momcAHkx',
          label: 'Attendees',
          type: 'attendees',
          active: false,
          elements: [
            {email: 'john.doe@bytecode.com', displayName: 'John Doe', responseStatus: 'maybe'},
            {email: 'mary.smith@bytecode.com', displayName: 'Mary Smith', responseStatus: 'no'},
            {email: 'milton.edwards@bytecode.com', displayName: 'Milton Edwards', responseStatus: 'yes'}
          ]
        },
        {
          id: '2NnHS94YoeavxRNHS9qYby',
          label: 'Pre-call Company Research',
          type: 'default',
          active: false,
          elements: [
            {id: '3sNWwhrHgHe55V55YErhPn', label: 'Company Name', type: 'research-field', value: 'HUB SPOT', active: false},
            {id: '54MSW8NDTEcLLgfVJXyFt2', label: 'Industry', type: 'research-field', value: 'business communication', active: false},
            {id: '8ZMuNKi7BrLiES9M19QJnh', label: 'Current Event', type: 'research-field', value: 'Make more money by having better trained reps', active: false},
            {id: '3iHsXk2upQfcz5YpEEamdZ', label: 'Number of reps on sales team', type: 'research-field', value: 'Customer management', active: false},
            {id: 'fG5pYJX28f6iY8PkPEqHLu', label: 'Techstack', type: 'research-field', value: 'CronoVirus', active: false},
          ]
        },
        {
          id: 'dm5jT9zUMMpfLsSXPzibJc',
          label: 'Pre-call Contact Research',
          type: 'default',
          active: false,
          elements: [
            {id: 'hqjNrHyfv1RCxyXdoMbhqf', label: 'Name', type: 'research-field', value: 'Milton Edwards', active: false},
            {id: 'qH7CLYVN55qnTC3iqL5LQd', label: 'Title', type: 'research-field', value: 'Account Manager', active: false},
            {id: 'pQhRqeSAoYRA81ufFrEbVG', label: 'Persona pain points', type: 'research-field', value: 'has been there one year', active: false},
            {id: '8Gf3a6UiWwtkYT8Nu17cZ7', label: 'Other members of their team to involve later?', type: 'research-field', value: '40 years of experience', active: false},
          ]
        },
        {
          id: 'ootTs3Atwo2mzmiyC8J554',
          label: 'Agenda',
          type: 'default',
          active: false,
          elements: [
            {id: 'jDiHXad96p9HBmDipVgXPj', label: 'Time check', type: 'check-list', value: false, active: false},
            {id: 'jBFCy6Jttn7qiyo2k5VzFm', label: `Share why we reached out and see if you're experiencing the common challenges we help with`, type: 'check-list', value: false, active: false},
            {id: 'uKe83Brw17fdWeN6sX83uG', label: 'Provide an overview on how we can help', type: 'check-list', value: false, active: false},
            {id: 'ennrYwuLdmVaKgSJKMChFw', label: 'If it make sense, talk next steps', type: 'check-list', value: false, active: false},
            {id: 'ng5qU2NLrE1BwXZusuwpft', label: 'Fair? Anything you want to add?', type: 'check-list', value: false, active: false}
          ]
        },
        {
          id: 'f3v3tPwMhLckjQjNT7KxYS',
          label: 'Validate',
          type: 'talk-track',
          active: false,
          elements: [
            {id: 'fgmJ7zH6pVZsJubYN9RWr1', label: `While researching companies similar to our success customers, we found you. We noticed the team has grown by X% in the last 6 months and estimate a manager to rep ratio of X:Y. We also found the team is located remote with a few open sales reqs on the careers page showing room for more growth to come. How did we do at scoping the landscape over there?`, type: 'talk-track', active: false},
            {id: 'mkggpvBjrCitBM2oQdyiF2', label: `Normally these types of things are leading indicators showing our solution makes sense. Fast growing companies often have resource contraints and scaling a remote team is a challenge in and of itself.`, type: 'talk-track', active: false},
            {id: 'nV72cnAM1etPpdkno2VJa2', label: `Other sales leaders we work with experience long new rep ramp times, poor adoption of the sales methodology, and low quota attainment. Are you challenged in any of these or perhaps other areas?`, type: 'question-answer', value: '', active: false}
          ]
        },

        {
          id: 'nG4dPViaTzPQ9SB1KcgwMr',
          label: 'Discovery 1',
          type: 'default',
          active: false,
          elements: [
            {id: '3pi39cXDM5wp8TvbV8N7PM', label: `How long has that been a challenge?`, type: 'question-answer', value: '', active: false},
            {id: '4eAveTDeaTWMskm4bhWwZt', label: `What do you think is the main cause of it?`, type: 'question-answer', value: '', active: false},
            {id: '3K22yWY161b1aHPijY1zRt', label: `What do you feel is the biggest impacted by not addressing the challenge?`, type: 'question-answer', value: '', active: false},
            {id: '5cDQQBDZDSAw4Jpap6Cm4M', label: `What have you tried to address it?`, type: 'question-answer', value: '', active: false},
            {id: 'sb6caahrWx67cDJjHao8ay', label: `What sort of tools and trainings have you implemented?`, type: 'question-answer', value: '', active: false}
          ]
        },
        {
          id: 'xmDjTFXnuqz9Ywbn6TfS58',
          label: 'Value Proposition',
          type: 'talk-track',
          active: false,
          elements: [
            {id: '5YA3Nyoh3GuMuK4xS56LBK', label: `Coaching reps is hard. Not only is it a different skill set, but setting the time aside is challenging. Did you know on average 47% of sales managers spend less than 30 minutes coaching per week?`, type: 'talk-track', active: false},
            {id: 'wSGMDogpGCdPDvvFEMYzUd', label: `Not only is coaching hard, but reps forget 60% of coaching after just one week.`, type: 'talk-track', active: false},
            {id: '8G19PfcYpM4zMkCeFQLyZR', label: `That's why we lead with an always on approach that is incorporated to a reps daily workflow on every deal. We guide your reps as if you were there before, during, and after their sales calls.`, type: 'talk-track', active: false},
            {id: 'hoxkpQqhYrr4aoXnoJg8dD', label: `This approach has a big impact because studies show that companies who coach reps reguraily generate 17% more revenue.`, type: 'talk-track', active: false},
            {id: '2cE6hh8jspxkRvi2xtwLH5', label: `Increased quota attainment is the benefit we talk about the most, but there are others like improved deal visibility, forecast accuarcy, and new rep onboarding. Do you see room for improvement in any of those areas?`, type: 'question-answer', value: '', active: false}
          ]
        },
        {
          id: 'cz27YpC9FeqCpCkS1gbPgb',
          label: 'Discovery 2',
          type: 'default',
          active: false,
          elements: [
            {id: 'rZ1iMFKxUtA15ox3hazvFP', label: `How do you think your team would react to having this guidance and support to improve their ability to hit quota?`, type: 'question-answer', value: '', active: false},
            {id: 'wXN3sQSGUMX7YDJmEDpgC4', label: `I know we contacted you and this may not have been on your immediate priority list, but how important would you say this is for you to get figured out?`, type: 'question-answer', value: '', active: false},
            {id: 'nc7Kfv8C3grzu5ifnuKcm3', label: `Being such a high priority, when are you looking to have a solution in place by?`, type: 'question-answer', value: '', active: false},
            {id: 'xfWD6sKiXTVWRiH5riUyeW', label: `I'm curious, is there a particular reason for that timeline?`, type: 'question-answer', value: '', active: false},
            {id: 'ffDx4Pb2mWRhNp5x6LsmtG', label: `How have you evaluated solutions like ours in the past?`, type: 'question-answer', value: '', active: false}
          ]
        },
        {
          id: '6D78kKpg7Ae9HsL3beEc49',
          label: 'Next Steps',
          type: 'talk-track',
          active: false,
          elements: [
            {id: 'Jdnfon2SwrVNjLztfSVTW', label: `Normally, if there is a good fit, we set up a deeper dialog with a demo specific to your use case, would that make sense for us?`, type: 'talk-track', active: false},
            {id: 'wnLrRJwh3vHgDy47eKwWiv', label: `I noticed a few members on your team like__,___, normally we involve people like them in the process. Do you have access to their calendars so we can include them on the next call?`, type: 'talk-track', active: false},
            {id: 'b4tPy3WXmP46rvFRjUccYN', label: `What has the process looked like in the past for you to evaluate, decide, and secure budget for a tool like ours?`, type: 'question-answer', value: '', active: false}
          ]
        },

        {
          id: '9Adtn3A3JB6TBkhQNdcrsQ',
          label: 'ACTIONS',
          type: 'actions',
          active: false,
          elements: [
            {id: 'nAxXZ8QcPG57bJRQRNuqWy', label: 'Connect on LinkedIn', type: 'action-item', value: true, active: false},
            {id: 'jCX2Ef6oD1kYYZYKJyE5YB', label: 'Send documentation', type: 'action-item', value: true, active: false}
          ]
        },
        {
          id: 'tNFevXaNpUdLP7LZXYYKG6',
          label: 'NOTES',
          type: 'notes',
          active: false,
          elements: [
            {id: 'vWRK9UbHDN2THkudDeWdwT', label: 'note-1', type: 'notes-field', value: 'They know they need a product to support sales staff!\n\nThey tried a few solutions but nothing has seems to catch on!'},
            {id: 'qfTSsq7FfrD2BRKH2Tu7sz', label: 'note-2', type: 'notes-field', value: 'They know they need a product to support sales staff!'},
            {id: 'kVUFVpJKpQ3ZDEt6xJkAyY', label: 'note-3', type: 'notes-field', value: 'They tried a few solutions but nothing has seems to catch on!'},
          ]
        },
        {
          id: 'rLhgsXsasJwxymbSXHHCLT',
          label: 'Battle Cards',
          type: 'battle-cards',
          active: false,
          elements: []
        },
        {
          id: 'tHnNK9a6FbdsY3i8TmPW62',
          label: 'Post-call Action Item',
          type: 'post-call',
          active: false,
          elements: [
            {id: 'i1MvgXtnng7dTPm5Mz8EXd', label: `Send followup email summary & resources`, type: 'check-list', value: false, active: false},
            {id: '4aEztyCcBfxRUEvHdGXspx', label: `Connect on LinkedIn`, type: 'check-list', value: false, active: false},
            {id: 'fivEhky3Hmuxq1x5iXaZjS', label: `Overline Executive Sponsor email?`, type: 'check-list', value: false, active: false}
          ]
        }
      ],
    }
  }
];

export { callEventHistory };
