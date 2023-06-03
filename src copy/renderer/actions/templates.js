import {
  setTemplates,
  setActiveTemplate,
  setLibraryBattleCards,
  setLibraryTalkTracks,
} from './builder';

import { getTemplateOrder } from '../api/services/templateOrder';
import { getBuildTemplates } from '../api/services/templates';
import { getBattleCards } from '../api/services/battleCards';
import { getTalkTracks } from '../api/services/talkTracks';
import { addActive } from '../utils/data';

// TODO: start migrating to redux tool kit
import { setBattleCards } from '../containers/Frameworks/reduxSlice/frameworksSlice';

const asyncGetTemplates = async (dispatch, state) => {
  try {
    const {
      auth: { user },
      builder: { activeTemplate },
    } = state;

    if (!user) throw new Error('user is null');

    const talkTracksRes = await getTalkTracks(user.account_id);
    const { talkTracks } = talkTracksRes.data;

    dispatch(setLibraryTalkTracks(talkTracks));

    const battleCardsRes = await getBattleCards(user.account_id);
    const { battleCards } = battleCardsRes.data;

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

    const templateOrderRes = await getTemplateOrder(user.account_id);
    debugger;
    const { templates: templateOrder } = templateOrderRes.data;
    const templatesRes = await getBuildTemplates(user.account_id);
    debugger;
    const { templates } = templatesRes.data;
    const orderedTemplates = templateOrder.map((id) => {
      return templates.find((template) => template.id === id);
    }); // .filter(ele => Boolean(ele)); // this will remove templateOrder entries not found in template list

    dispatch(setTemplates(addActive(orderedTemplates)));
    if (!activeTemplate) dispatch(setActiveTemplate(orderedTemplates[0]));

    // const success = await Promise.resolve('success');
    return;
  } catch (err) {
    throw new Error(err);
  }
};

const getTemplates = () => {
  return (dispatch, store) => {
    const state = store();
    return asyncGetTemplates(dispatch, state);
  };
};

export default getTemplates;
