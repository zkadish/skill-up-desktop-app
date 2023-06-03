// This is being used by the conversation components, they are not currently being used
// This file is a mocked phone conversation
export const callHistory = {
  // company_id or domain based on company email domain
  0: {
    call_history_id: 0,
    company_name: 'RocketTech',
    companyId: 0,
    previous_calls: [
      {
        call_id: 0,
        date: 'Tuesday, March 4',
        dateTime: '12:00pm',
        conversation: [
          {
            from: 'you',
            contact_id: 0,
            text:
              "Hello I hope you're having a good day. I'm calling to tell you about a new product called Cues. It's a framework that you're sales team can use to guid them through B to B sales of your product."
          },
          {
            from: 'them',
            contact_id: 1,
            text: 'This sounds interesting, can you tell me more about it?'
          },
          {
            from: 'you',
            contact_id: 0,
            text:
              'Sure the Cues frame work is a real time guide which runs along side of the sales call and prompts the agent with questions and direction.'
          },
          {
            from: 'them',
            contact_id: 1,
            text:
              'So Cues follows the conversation between the customer and the agent and tells my sales agents what questions to ask?'
          },
          {
            from: 'you',
            contact_id: 0,
            text:
              'Yes it gives conversational suggestions based on what the sales agent and customer have previously discussed.'
          },
          {
            from: 'them',
            contact_id: 1,
            text:
              'Wow this sounds to good to be true. How does it know what to suggest?'
          },
          {
            from: 'you',
            contact_id: 0,
            text: 'Yes and No. Let me explain.'
          },
          {
            from: 'them',
            contact_id: 1,
            text:
              'How does it work? Is it some kind of artificial intelligence?'
          },
          {
            from: 'you',
            contact_id: 0,
            text:
              'Yes, its a combination of a preprogrammed call frame work you set up and an artificial intelligence working together to guid the sales rep through the life cycle of the sales call.'
          },
          {
            from: 'them',
            contact_id: 1,
            text:
              'This sounds really interesting, but I have another call coming in can you give me you phone number so I can call you back?'
          },
          {
            from: 'you',
            contact_id: 0,
            text: 'are you ready?'
          },
          {
            from: 'them',
            contact_id: 1,
            text: 'Yes go ahead.'
          },
          {
            from: 'you',
            contact_id: 0,
            text: '000 000 0000 what is a good time for me to call you back?'
          },
          {
            from: 'them',
            contact_id: 1,
            text: "Let's see tomorrow and 1:30 pm."
          },
          {
            from: 'you',
            contact_id: 0,
            text: 'Great talk to you then.'
          }
        ]
      }
    ]
  }
};

export default callHistory;
