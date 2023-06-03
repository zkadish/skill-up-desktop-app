import { alpha } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';

export const outLinedInputStyles = makeStyles(() => ({
  root: {
    margin: '0',
    height: '36px',
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, .1)',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, .75)'
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, .75)',
        borderWidth: '1px'
      }
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 1)'
    }
  }
}));

export const questionAnswerStyles = makeStyles(() => ({
  container: {
    padding: '6px 0'
  },
  root: {
    margin: '4px 0 0',
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, .1)',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, .75)'
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, .75)',
        borderWidth: '1px'
      }
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 1)'
    }
  }
}));

export const addCircleIconStyles = makeStyles(() => ({
  root: {
    padding: '6px',
    margin: '0 -12px 0 4px'
  },
  icon: {
    color: '#fff'
  }
}));

export const formControlStyles = makeStyles(() => ({
  root: {
    width: 'calc(100% + 11px)',
    margin: '0 0 0 -11px'
  }
}));

export const attendeeStyles = makeStyles({
  green: {
    color: scss.SUCCESS_PRIMARY
  },
  orange: {
    color: 'orange'
  },
  red: {
    color: 'red'
  },
  iconButton: {
    margin: '0 -12px 0 0',
    color: 'inherit'
  }
});

export const textFieldStyles = makeStyles(() => ({
  root: {
    margin: '6px 0',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, .5)'
    },
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, .5)'
      }
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, .5)'
      }
    },
    '& .MuiInputBase-root': {
      color: '#fff'
    },
    '& .MuiFormLabel-root': {
      width: 'calc(100% - 28px)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: 'rgba(255, 255, 255, .5)'
    }
  }
}));

export const searchStyles = makeStyles(theme => ({
  search: {
    alignSelf: 'center',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha('#000', 0.15),
    '&:hover': {
      backgroundColor: alpha('#000', 0.25)
    },
    marginLeft: 0,
    width: '100%',
    height: '35px'
  },
  searchIcon: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    display: 'flex',
    padding: theme.spacing(0, 1),
    height: '100%',
    pointerEvents: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255, 255, 255, 0.4)'
  },
  cancelIcon: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '& .MuiIconButton-root': {
      padding: '6px',
      color: 'rgba(255, 255, 255, 1)'
    }
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 5, 1, 2),
    width: '100%',
    '&::placeholder': {
      color: 'white'
    },
    transition: theme.transitions.create('width'),
    color: 'white'
  }
}));

export const menuItemStyles = makeStyles({
  root: {
    display: 'block',
    padding: '8px',
    textOverflow: 'ellipsis'
  }
});
