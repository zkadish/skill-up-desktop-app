const classes = {
  root: {
    padding: '16px',
    width: '50%',
    minWidth: '320px',
    border: '1px solid #ccc',
    boxShadow: 'none',
    overflow: 'auto',
  },
  textField: {
    margin: '10px 0',
    width: 'calc(100% - 144px)',
    '& .MuiFormLabel-root': {
      width: 'calc(100% - 28px)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
};

export default classes;
