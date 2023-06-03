interface CallEventType {
  account_id: string;
  attendees: [
    {
      displayName: string;
      email: string;
      responseStatus: string;
    }
  ];
  corporate_id: string;
  dateObj: string;
  description: string;
  domain_id: string;
  end: {
    date: string;
    dataTime: string;
  };
  frameworkTemplate: object;
  id: string;
  start: {
    date: string;
    dataTime: string;
  };
  status: string;
  summary: string;
  __v: number;
  _id: string;
}
