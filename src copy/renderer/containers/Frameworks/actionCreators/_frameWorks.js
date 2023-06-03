import {
  setTemplates,
  setActiveTemplate,
  // setBlocks,
  // setElements,
  setLibraryBattleCards,
  setLibraryTalkTracks,
} from '../../../actions/builder';

import { getTemplateOrder } from '../../../api/services/templateOrder';
import { getBuildTemplates } from '../../../api/services/templates';
// import { getBlocks } from '../../../api/services/blocks';
// import { getElements } from '../../../api/services/elements';
import { getBattleCards } from '../../../api/services/battleCards';
import { getTalkTracks } from '../../../api/services/talkTracks';
import { addActive } from '../../../utils/data';

// TODO: migrate all old redux actions and the builder reducer
// to the frameworksSlice
import {
  setBattleCards,
  // setTemplates as setFrameworksTemplates,
  // setTalkTracks,
} from '../reduxSlice/frameworksSlice';

const asyncFrameworks = async (dispatch, state) => {
  const {
    auth: { user },
    builder: { activeTemplate },
  } = state;
  try {
    const talkTracks = await getTalkTracks(user.account_id);
    dispatch(setLibraryTalkTracks(talkTracks));

    const response = await getBattleCards(user.account_id);
    const { battleCards } = response.data;
    debugger

    for (let i = 0; i < battleCards.length; i += 1) {
      battleCards[i]['talk-tracks'] = battleCards[i]['talk-tracks'].map(
        (talkTrackId) => {
          const talkTrack = talkTracks.find((t) => t.id === talkTrackId);
          talkTrack.container_id = battleCards[i].id;
          return talkTrack;
        }
      );
    }

    dispatch(setLibraryBattleCards(battleCards)); // this set the battle card library
    dispatch(setBattleCards(battleCards)); // this set battle cards in react toolkit

    const templateOrder = await getTemplateOrder(user.account_id);
    const templates = await getBuildTemplates(user.account_id);

    const orderedTemplates = templateOrder.map((id) => {
      return templates.find((template) => template.id === id);
    }); // .filter(ele => Boolean(ele)); // this will remove templateOrder entries not found in template list

    dispatch(setTemplates(addActive(orderedTemplates)));
    if (!activeTemplate) {
      dispatch(setActiveTemplate(orderedTemplates[0]));
    }

    return await Promise.resolve('success');
  } catch (err) {
    return Promise.reject(err);
  }
};

const getFrameworks = () => {
  return (dispatch, store) => {
    const state = store();
    return asyncFrameworks(dispatch, state);
  };
};

export default getFrameworks;
