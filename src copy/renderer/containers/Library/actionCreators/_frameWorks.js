import {
  setTemplates,
  setActiveTemplate,
  setBlocks,
  setElements,
  setLibraryBattleCards,
  setLibraryTalkTracks
} from '../../../actions/builder';

import { getTemplates } from '../../../api/services/templates';
import { getBlocks } from '../../../api/services/blocks';
import { getElements } from '../../../api/services/elements';
import { getBattleCards } from '../../../api/services/battleCards';
import { getTalkTracks } from '../../../api/services/talkTracks';
import { addActive } from '../../../utils/data';

const asyncFrameworks = async (dispatch, history) => {
  let res = null;
  try {
    res = await getTemplates();
    if (res.status !== 200) {
      res.error = 'Templates request failed.';
      throw res;
    }
    dispatch(setTemplates(addActive(res.templates)));
    dispatch(setActiveTemplate(res.templates[0]));
    // debugger

    // res = await getBlocks();
    // if (res.status !== 200) {
    //   res.error = 'Blocks request failed.';
    //   throw res;
    // }
    // dispatch(setBlocks(addActive(res.blocks)));

    // res = await getElements();
    // if (res.status !== 200) {
    //   res.error = 'Elements request failed.';
    //   throw res;
    // }
    // dispatch(setElements(addActive(res.elements)));

    res = await getBattleCards();
    debugger
    if (res.status !== 200) {
      res.error = 'Battle card request failed.';
      throw res;
    }
    dispatch(setLibraryBattleCards(res.data.battleCards));

    res = await getTalkTracks();
    if (res.status !== 200) {
      res.error = 'Talk track request failed.';
      throw res;
    }
    dispatch(setLibraryTalkTracks(res.talkTracks));

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getFrameworks = history => {
  return dispatch => {
    return asyncFrameworks(dispatch, history);
  };
};
