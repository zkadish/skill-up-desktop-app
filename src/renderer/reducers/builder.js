import * as actionTypes from '../actions/actionTypes';
import { alphabetizeLabel, uuid } from '../utils/data';

const initialState = {
  activeTemplate: null,
  activeBlock: null,
  activeElement: null,
  activeBattleCard: null, // ???
  activeBattleCardTalkTrack: null,
  activeTalkTrack: null, // shouldn't this be activeBattleCardTalkTrack???
  activeLibraryBattleCard: null,
  activeLibraryTalkTrack: null,
  templates: [],
  blocks: [],
  elements: [],
  talkTracks: [],
  filteredTalkTracks: [],
  battleCards: [],
  filteredBattleCards: [],
};

const builder = (state = initialState, action) => {
  switch (action.type) {
    // TEMPLATES
    case actionTypes.SET_TEMPLATES: {
      return {
        ...state,
        templates: action.templates,
      };
    }
    case actionTypes.SET_TEMPLATE: {
      return {
        ...state,
        templates: [...state.templates, action.template],
      };
    }
    case actionTypes.REMOVE_TEMPLATE: {
      const templates = [...state.templates];
      const blocks = { ...state.blocks };
      const elements = { ...state.elements };

      const index = templates.findIndex((template) => {
        return template.id === action.template.id;
      });

      templates.splice(index, 1);
      delete blocks[action.template.id];
      delete elements[action.template.id];

      if (action.template.id === state.activeTemplate?.id) {
        return {
          ...state,
          activeTemplate: null,
          activeBlock: null,
          activeElement: null,
          activeBattleCardTalkTrack: null,
          templates: [...templates],
          blocks: { ...blocks },
          elements: { ...elements },
        };
      }

      return {
        ...state,
        templates: [...templates],
        blocks: { ...blocks },
        elements: { ...elements },
      };
    }
    case actionTypes.SET_ACTIVE_TEMPLATE: {
      const templates = state.templates.map((t) => {
        const template = { ...t };
        if (template.id === action.template.id) {
          template.active = true;
          return template;
        }
        template.active = false;
        return template;
      });

      return {
        ...state,
        activeTemplate: { ...action.template },
        templates: [...templates],
      };
    }
    case actionTypes.SET_TEMPLATE_NAME: {
      const { templates } = state;
      const foundTemplate = templates.find(
        (t) => t.id === state.activeTemplate.id
      );

      foundTemplate.label = action.template.label;

      return {
        ...state,
        templates: [...templates],
      };
    }
    case actionTypes.ADD_FRAMEWORK_TEMPLATE: {
      // const { blocks, label } = action.frameworkTemplate;
      // const serialized = serialize(label);

      // // create the template - should this be in the component?
      // const newTemplate = {
      //   id: uuid(),
      //   label: serialized,
      //   active: false,
      //   blocks,
      // };

      return {
        ...state,
        templates: [action.newTemplate, ...state.templates],
      };
    }
    // BLOCKS
    case actionTypes.SET_BLOCKS: {
      const templates = state.templates.map((t) => ({ ...t }));
      const activeTemplate = templates.find(
        (t) => t.id === state.activeTemplate.id
      );
      activeTemplate.blocks = action.blocks;

      return {
        ...state,
        templates,
        activeTemplate,
      };
    }
    case actionTypes.SET_BLOCK: {
      const templates = state.templates.map((t) => ({ ...t }));
      const activeTemplate = templates.find(
        (t) => t.id === state.activeTemplate.id
      );
      const blocks = activeTemplate.blocks.map((b) => ({ ...b }));
      // If the user hasn't messed with the order of default blocks then insert mew blocks under the attendees block.
      // NOTE: if this condition changes you need to change how blocks are inserted into the templates.blocks in
      // the data base as well Framework service post block in blocks.js line 36
      if (
        blocks.length >= 2 &&
        blocks[0].type === 'pre-call' &&
        blocks[1].type === 'attendees'
      ) {
        activeTemplate.blocks.splice(2, 0, action.block);
      } else {
        activeTemplate.blocks = [...blocks, action.block];
      }

      return {
        ...state,
        templates,
        activeTemplate,
      };
    }
    case actionTypes.REMOVE_BLOCK: {
      const templates = state.templates.map((t) => ({ ...t }));
      const activeTemplate = templates.find(
        (t) => t.id === state.activeTemplate.id
      );
      const blocks = activeTemplate.blocks.filter(
        (b) => b.id !== action.block.id
      );
      activeTemplate.blocks = blocks;

      if (action.block.id === state.activeBlock?.id) {
        return {
          ...state,
          templates,
          activeTemplate,
          activeBlock: null,
        };
      }

      return {
        ...state,
        templates,
        activeTemplate,
      };
    }
    case actionTypes.SET_ACTIVE_BLOCK: {
      const templates = state.templates.map((t) => ({ ...t }));
      const activeTemplate = templates.find(
        (t) => t.id === state.activeTemplate.id
      );
      const blocks = activeTemplate.blocks.map((b) => {
        const block = { ...b };
        if (block.id === action.block.id) {
          block.active = true;
          return block;
        }
        block.active = false;
        return block;
      });
      activeTemplate.blocks = blocks;

      return {
        ...state,
        templates,
        activeTemplate,
        activeBlock: action.block,
      };
    }
    case actionTypes.SET_BLOCK_NAME: {
      const templates = state.templates.map((t) => ({ ...t }));
      const activeTemplate = templates.find(
        (t) => t.id === state.activeTemplate.id
      );
      const blocks = activeTemplate.blocks.map((b) => ({ ...b }));
      const activeBlock = blocks.find((b) => b.id === state.activeBlock.id);
      activeBlock.label = action.block.label;

      activeTemplate.blocks = blocks;

      return {
        ...state,
        templates,
        activeTemplate,
        activeBlock,
      };
    }
    case actionTypes.SET_BLOCK_TYPE: {
      const { type } = action.block;
      const templates = state.templates.map((t) => ({ ...t }));
      const activeTemplate = templates.find(
        (t) => t.id === state.activeTemplate.id
      );
      const blocks = activeTemplate.blocks.map((b) => ({ ...b }));
      const activeBlock = blocks.find((b) => b.id === state.activeBlock.id);

      // TODO: warn user that they will lose the created elements under this block if they change the type
      // and that the action is un-doable
      if (type === 'actions' || type === 'battle-cards') {
        activeBlock.elements = [];
      }
      if (type === 'notes') {
        activeBlock.elements = [
          {
            id: uuid(),
            label: 'notes',
            type: 'notes-field',
            value: '',
          },
        ];
      }
      if (type === 'attendees') {
        activeBlock.elements = [{}];
      }

      activeBlock.type = type;
      activeTemplate.blocks = blocks;

      return {
        ...state,
        templates,
        activeTemplate,
        activeBlock,
      };
    }
    // ELEMENTS
    case actionTypes.SET_ELEMENTS: {
      const templates = state.templates.map((t) => ({ ...t }));
      const activeTemplate = templates.find(
        (t) => t.id === state.activeTemplate.id
      );
      const activeBlock = activeTemplate.blocks.find(
        (b) => b.id === state.activeBlock.id
      );
      activeBlock.elements = action.elements;

      return {
        ...state,
        templates,
        activeTemplate,
        activeBlock: { ...activeBlock },
      };
    }
    case actionTypes.SET_ELEMENT: {
      const templates = state.templates.map((t) => ({ ...t }));
      const activeTemplate = templates.find(
        (t) => t.id === state.activeTemplate.id
      );
      const activeBlock = activeTemplate.blocks.find(
        (b) => b.id === state.activeBlock.id
      );
      const activeBlockElements = activeBlock.elements.map((e) => ({ ...e }));

      activeBlock.elements = [...activeBlockElements, action.element];

      return {
        ...state,
        templates,
        activeTemplate,
        activeBlock,
      };
    }
    case actionTypes.REMOVE_ELEMENT: {
      const templates = state.templates.map((t) => ({ ...t }));
      const activeTemplate = templates.find(
        (t) => t.id === state.activeTemplate.id
      );
      const activeBlock = activeTemplate.blocks.find(
        (b) => b.id === state.activeBlock.id
      );
      const elements = activeBlock.elements.filter(
        (e) => e.id !== action.element.id
      );
      activeBlock.elements = elements;

      if (action.element.id === state.activeElement?.id) {
        return {
          ...state,
          templates,
          activeTemplate,
          activeBlock,
          activeElement: null,
        };
      }

      return {
        ...state,
        templates,
        activeTemplate,
        activeBlock,
      };
    }
    case actionTypes.SET_ACTIVE_ELEMENT: {
      const templates = state.templates.map((t) => ({ ...t }));
      const activeTemplate = templates.find(
        (t) => t.id === state.activeTemplate.id
      );
      const activeBlock = activeTemplate.blocks.find(
        (b) => b.id === state.activeBlock.id
      );
      const elements = activeBlock.elements.map((e) => {
        if (e.id === action.element.id) {
          e.active = true;
          return e;
        }
        e.active = false;
        return e;
      });
      activeBlock.elements = elements;

      return {
        ...state,
        templates,
        activeTemplate,
        activeBlock,
        activeElement: action.element,
      };
    }
    case actionTypes.SET_ELEMENT_NAME: {
      const templates = state.templates.map((t) => ({ ...t }));
      const activeTemplate = templates.find(
        (t) => t.id === state.activeTemplate.id
      );
      const activeBlock = activeTemplate.blocks.find(
        (b) => b.id === state.activeBlock.id
      );
      const elements = activeBlock.elements.filter((e) => ({ ...e }));
      const activeElement = elements.find(
        (e) => e.id === state.activeElement.id
      );

      if (action.element.type === 'talk-track') {
        activeElement.value = action.element.value;
      }
      activeElement.label = action.element.label;

      activeBlock.elements = elements;

      return {
        ...state,
        templates,
        activeTemplate,
        activeBlock,
        activeElement,
      };
    }
    case actionTypes.SET_ELEMENT_TYPE: {
      const { type } = action.element;
      const templates = state.templates.map((t) => ({ ...t }));
      const activeTemplate = templates.find(
        (t) => t.id === state.activeTemplate.id
      );
      const blocks = activeTemplate.blocks.map((b) => ({ ...b }));
      const activeBlock = blocks.find((b) => b.id === state.activeBlock.id);
      const elements = activeBlock.elements.map((e) => ({ ...e }));
      const activeElement = elements.find(
        (e) => e.id === state.activeElement.id
      );

      activeElement.type = type;
      activeTemplate.blocks = blocks;
      activeBlock.elements = elements;

      return {
        ...state,
        templates,
        activeTemplate,
        activeBlock,
        activeElement,
      };
    }

    // BATTLE CARDS
    case actionTypes.SET_ACTIVE_BATTLE_CARD: {
      const templates = state.templates.map((t) => ({ ...t }));
      const activeTemplate = templates.find(
        (t) => t.id === state.activeTemplate.id
      );
      const activeBlock = activeTemplate.blocks.find(
        (b) => b.id === state.activeBlock.id
      );
      const battleCards = activeBlock.elements.map((e) => {
        if (e.id === action.battleCard.id) {
          e.active = true;
          return e;
        }
        e.active = false;
        return e;
      });
      activeBlock.elements = battleCards;

      return {
        ...state,
        templates,
        activeTemplate,
        activeBlock,
        activeBattleCard: action.battleCard,
      };
    }
    case actionTypes.REMOVE_BATTLE_CARD: {
      const templates = state.templates.map((t) => ({ ...t }));
      const activeTemplate = templates.find(
        (t) => t.id === state.activeTemplate.id
      );
      const blocks = activeTemplate.blocks.map((b) => ({ ...b }));
      const activeBlock = blocks.find((b) => b.id === state.activeBlock.id);
      const battleCards = activeBlock.elements
        .map((e) => ({ ...e }))
        .filter((e) => e.library_id !== action.battleCard.library_id);

      activeTemplate.blocks = blocks;
      activeBlock.elements = battleCards;

      if (action.battleCard.id === state.activeBattleCard?.id) {
        return {
          ...state,
          templates,
          activeTemplate,
          activeBlock,
          activeBattleCard: null,
        };
      }

      return {
        ...state,
        templates: [...templates],
        activeTemplate: { ...activeTemplate },
        activeBlock: { ...activeBlock },
      };
    }

    // BATTLE CARD TALK TRACKS
    case actionTypes.SET_BATTLE_CARD_TALK_TRACKS: {
      // update every instance of the activeBattleCard with new talkTracks
      const templates = state.templates.map((t) => {
        const template = { ...t };
        const blocks = template.blocks.map((b) => {
          const block = { ...b };
          if (block.type === 'battle-cards') {
            const elements = block.elements.map((e) => {
              const element = { ...e };
              if (element.id === state.activeBattleCard.id) {
                element['talk-tracks'] = action.talkTracks;
              }
              return element;
            });
            block.elements = elements;
          }
          return block;
        });
        template.blocks = blocks;
        return template;
      });

      const activeTemplate = templates.find(
        (t) => t.id === state.activeTemplate.id
      );
      const blocks = activeTemplate.blocks.map((b) => ({ ...b }));
      const activeBlock = blocks.find((b) => b.id === state.activeBlock.id);
      const activeBlockBattleCards = activeBlock.elements.map((e) => ({
        ...e,
      }));
      const activeBattleCard = activeBlockBattleCards.find(
        (b) => b.id === state.activeBattleCard.id
      );
      activeBattleCard['talk-tracks'] = [...action.talkTracks];

      const battleCards = state.battleCards.map((b) => ({ ...b }));
      const battleCard = battleCards.find(
        (b) => b.library_id === state.activeBattleCard.library_id
      );
      battleCard['talk-tracks'] = [...action.talkTracks];

      const filteredBattleCards = state.filteredBattleCards.map((b) => ({
        ...b,
      }));
      const filteredBattleCard = filteredBattleCards.find(
        (b) => b.library_id === state.activeBattleCard.library_id
      );
      filteredBattleCard['talk-tracks'] = [...action.talkTracks];

      return {
        ...state,
        templates,
        activeTemplate,
        activeBlock,
        activeBattleCard,
        battleCards,
        filteredBattleCards,
      };
    }
    case actionTypes.SET_BATTLE_CARD_TALK_TRACK: {
      // update every instance of the activeBattleCard with a new talk track
      const templates = state.templates.map((t) => {
        const template = { ...t };
        const blocks = template.blocks.map((b) => {
          const block = { ...b };
          if (block.type === 'battle-cards') {
            const elements = block.elements.map((e) => {
              const element = { ...e };
              if (element.id === state.activeBattleCard.id) {
                element['talk-tracks'] = [
                  action.talkTrack,
                  ...element['talk-tracks'],
                ];
              }
              return element;
            });
            block.elements = elements;
          }
          return block;
        });
        template.blocks = blocks;
        return template;
      });

      const battleCards = [...state.battleCards];
      const activeBattleCard = battleCards.find(
        (b) => b.id === state.activeBattleCard.id
      );
      activeBattleCard['talk-tracks'] = [
        action.talkTrack,
        ...activeBattleCard['talk-tracks'],
      ];

      return {
        ...state,
        templates,
        battleCards,
        activeBattleCard,
      };
    }
    case actionTypes.REMOVE_BATTLE_CARD_TALK_TRACK: {
      // remove every instance of the talk track except the one in the talk track library
      const templates = state.templates.map((t) => {
        const template = { ...t };
        const blocks = template.blocks.map((b) => {
          const block = { ...b };
          if (block.type === 'battle-cards') {
            const elements = block.elements
              .map((e) => {
                const element = { ...e };
                if (element.id === state.activeBattleCard?.id) {
                  element['talk-tracks'] = element['talk-tracks'].filter(
                    (tr) => tr.id !== action.talkTrack.id
                  );
                }
                return element;
              })
              .filter((tr) => tr.id !== action.talkTrack.id);
            block.elements = elements;
          }
          return block;
        });
        template.blocks = blocks;
        return template;
      });

      const battleCards = state.battleCards.map((b) => {
        const battleCard = { ...b };
        battleCard['talk-tracks'] = b['talk-tracks'].filter(
          (t) => t.id !== action.talkTrack.id
        );
        return battleCard;
      });

      const activeTemplate = templates.find(
        (t) => t.id === state.activeTemplate?.id
      );

      const activeBlock = activeTemplate?.blocks.find(
        (b) => b.id === state.activeBlock?.id
      );

      const activeBattleCard = activeBlock?.elements.find(
        (e) => e.id === state.activeBattleCard?.id
      );

      const activeLibraryBattleCard = battleCards.find(
        (b) => b.id === state.activeLibraryBattleCard?.id
      );

      if (action.talkTrack.id === state.activeBattleCardTalkTrack?.id) {
        return {
          ...state,
          templates,
          battleCards,
          activeTemplate: activeTemplate || [],
          activeBlock: activeBlock || [],
          activeBattleCard: activeBattleCard || [],
          activeLibraryBattleCard: activeLibraryBattleCard || [],
          activeBattleCardTalkTrack: null,
        };
      }

      return {
        ...state,
        templates,
        battleCards,
        activeTemplate: activeTemplate || [],
        activeBlock: activeBlock || [],
        activeBattleCard: activeBattleCard || [],
        activeLibraryBattleCard: activeLibraryBattleCard || [],
      };
    }
    case actionTypes.SET_ACTIVE_BATTLE_CARD_TALK_TRACK: {
      // TODO: remove after a little while of testing and updating
      const templates = state.templates.map((t) => ({ ...t }));
      const activeTemplate = templates.find(
        (t) => t.id === state.activeTemplate.id
      );
      const activeBlock = activeTemplate.blocks.find(
        (b) => b.id === state.activeBlock.id
      );
      const activeBlockBattleCards = activeBlock.elements.map((e) => ({
        ...e,
      }));
      const activeBattleCard = activeBlockBattleCards.find(
        (b) => b.id === state.activeBattleCard.id
      );
      const activeBattleCardTalkTracks = activeBattleCard['talk-tracks'].map(
        (t) => {
          const talkTrack = { ...t };
          if (talkTrack.id === action.talkTrack.id) {
            talkTrack.active = true;
            return talkTrack;
          }
          talkTrack.active = false;
          return talkTrack;
        }
      );

      activeBlock.elements = activeBlockBattleCards;
      activeBattleCard['talk-tracks'] = activeBattleCardTalkTracks;

      return {
        ...state,
        templates,
        activeTemplate,
        activeBlock,
        activeBattleCard,
        activeBattleCardTalkTrack: { ...action.talkTrack },
      };
    }
    case actionTypes.SET_BATTLE_CARD_TALK_TRACK_NAME: {
      const templates = state.templates.map((t) => ({ ...t }));
      const activeTemplate = templates.find(
        (t) => t.id === state.activeTemplate.id
      );
      const activeBlock = activeTemplate.blocks.find(
        (b) => b.id === state.activeBlock.id
      );
      const activeBlockBattleCards = activeBlock.elements.map((e) => ({
        ...e,
      }));
      const activeBattleCard = activeBlockBattleCards.find(
        (b) => b.id === state.activeBattleCard.id
      );
      const activeBattleCardTalkTracks = activeBattleCard['talk-tracks'].map(
        (t) => ({ ...t })
      );
      const activeBattleCardTalkTrack = activeBattleCardTalkTracks.find(
        (t) => t.id === state.activeBattleCardTalkTrack.id
      );

      activeBattleCardTalkTrack.value = action.talkTrack.value;
      activeBlock.elements = activeBlockBattleCards;
      activeBattleCard['talk-tracks'] = activeBattleCardTalkTracks;

      return {
        ...state,
        templates,
        activeTemplate,
        activeBattleCard,
      };
    }

    // TALK TRACKS
    case actionTypes.SET_TALK_TRACK: {
      // TODO: is this being used?
      // TODO: look into using the activeBlock obj
      const activeBlock = [
        ...state.elements[state.activeTemplate.id][state.activeBlock.id],
        action.battleCard.id,
      ];

      return {
        ...state,
        elements: {
          ...state.elements,
          [state.activeTemplate.id]: {
            ...state.elements[state.activeTemplate.id],
            [state.activeBlock.id]: [...activeBlock],
          },
        },
      };
    }
    case actionTypes.REMOVE_TALK_TRACK: {
      // TODO: is this being used?
      const battleCards =
        state.elements[state.activeTemplate.id][state.activeBlock.id];
      const index = battleCards.findIndex((battleCard) => {
        return battleCard === action.battleCard;
      });

      if (index > -1) battleCards.splice(index, 1);

      if (action.battleCard === state.activeBattleCard?.id) {
        return {
          ...state,
          activeBattleCard: null,
          elements: {
            ...state.elements,
            [state.activeTemplate.id]: {
              ...state.elements[state.activeTemplate.id],
              [state.activeBlock.id]: [...battleCards],
            },
          },
        };
      }
      return {
        ...state,
        elements: {
          ...state.elements,
          [state.activeTemplate.id]: {
            ...state.elements[state.activeTemplate.id],
            [state.activeBlock.id]: [...battleCards],
          },
        },
      };
    }
    // BATTLE CARD LIBRARY
    case actionTypes.SET_LIBRARY_BATTLE_CARDS: {
      return {
        ...state,
        battleCards: action.battleCards.sort(alphabetizeLabel),
        filteredBattleCards: action.battleCards.sort(alphabetizeLabel),
      };
    }
    case actionTypes.SET_LIBRARY_BATTLE_CARD: {
      const { battleCards, filteredBattleCards } = state;
      const { battleCard } = action;
      return {
        ...state,
        battleCards: [...battleCards, battleCard].sort(alphabetizeLabel),
        filteredBattleCards: [...filteredBattleCards, battleCard].sort(
          alphabetizeLabel
        ),
      };
    }
    case actionTypes.SET_ACTIVE_LIBRARY_BATTLE_CARD: {
      const battleCards = state.battleCards.map((b) => {
        const battleCard = { ...b };
        if (battleCard.id === action.battleCard.id) {
          battleCard.active = true;
          return battleCard;
        }
        battleCard.active = false;
        return battleCard;
      });

      const filteredBattleCards = state.filteredBattleCards.map((b) => {
        const filteredBattleCard = { ...b };
        if (filteredBattleCard.id === action.battleCard.id) {
          filteredBattleCard.active = true;
          return filteredBattleCard;
        }
        filteredBattleCard.active = false;
        return filteredBattleCard;
      });

      return {
        ...state,
        activeLibraryBattleCard: { ...action.battleCard },
        // activeBattleCard: { ...action.battleCard },
        battleCards: [...battleCards],
        filteredBattleCards: [...filteredBattleCards],
      };
    }
    case actionTypes.SET_ACTIVE_LIBRARY_BATTLE_CARD_TALK_TRACK: {
      const battleCards = state.battleCards.map((b) => ({ ...b }));
      const activeLibraryBattleCard = battleCards.find((b) => {
        return b.id === state.activeLibraryBattleCard.id;
      });

      const filteredBattleCards = state.filteredBattleCards.map((b) => ({
        ...b,
      }));
      const activeFilteredLibraryBattleCard = filteredBattleCards.find((b) => {
        return b.id === state.activeLibraryBattleCard.id;
      });

      // const activeLibraryBattleCard = { ...state.activeLibraryBattleCard };
      const talkTracks = activeLibraryBattleCard['talk-tracks'].map((tt) => {
        const talkTrack = { ...tt };
        if (talkTrack.id === action.talkTrack.id) {
          talkTrack.active = true;
          return talkTrack;
        }
        talkTrack.active = false;
        return talkTrack;
      });
      activeLibraryBattleCard['talk-tracks'] = talkTracks;
      activeFilteredLibraryBattleCard['talk-tracks'] = talkTracks;

      return {
        ...state,
        battleCards: [...battleCards],
        filteredBattleCards: [...filteredBattleCards],
        activeLibraryBattleCard,
      };
    }
    case actionTypes.ADD_LIBRARY_BATTLE_CARD: {
      const templates = state.templates.map((t) => ({ ...t }));
      const activeTemplate = templates.find(
        (t) => t.id === state.activeTemplate.id
      );
      const blocks = activeTemplate.blocks.map((b) => ({ ...b }));
      const activeBlock = blocks.find((b) => b.id === state.activeBlock.id);
      const activeBlockBattleCards = activeBlock.elements.map((e) => ({
        ...e,
      }));

      activeTemplate.blocks = blocks;
      activeBlock.elements = [...activeBlockBattleCards, action.battleCard];

      return {
        ...state,
        templates,
        activeTemplate,
        activeBlock,
      };
    }
    case actionTypes.SET_LIBRARY_BATTLE_CARD_NAME: {
      const templates = state.templates.map((t) => {
        const template = { ...t };
        const blocks = template.blocks.map((b) => {
          const block = { ...b };
          const elements = block.elements.map((e) => {
            const element = { ...e };
            if (element.library_id === action.battleCard.library_id) {
              element.label = action.battleCard.label;
            }
            return element;
          });

          block.elements = elements;
          return block;
        });

        template.blocks = blocks;
        return template;
      });

      const activeBlock = { ...state.activeBlock };
      const battleCards = [...state.battleCards];
      const filteredBattleCards = [...state.filteredBattleCards];

      const foundElement = activeBlock?.elements.find(
        (e) => e.library_id === action.battleCard.library_id
      );
      if (foundElement) foundElement.label = action.battleCard.label;

      const foundBattleCard = battleCards.find(
        (b) => b.library_id === action.battleCard.library_id
      );
      foundBattleCard.label = action.battleCard.label;

      const foundFilteredBattleCard = filteredBattleCards.find(
        (f) => f.library_id === action.battleCard.library_id
      );
      foundFilteredBattleCard.label = action.battleCard.label;

      return {
        ...state,
        templates,
        activeBlock: activeBlock ? { ...activeBlock } : null,
        battleCards,
        filteredBattleCards,
      };
    }
    case actionTypes.REMOVE_LIBRARY_BATTLE_CARD: {
      const templates = state.templates.map((t) => {
        const template = { ...t };
        const blocks = template.blocks.map((b) => {
          const block = { ...b };
          const elements = block.elements.filter((e) => {
            // const element = { ...e };
            // if (element.library_id === action.battleCard.library_id) {
            //   element.label = action.battleCard.label;
            // }
            return e.library_id !== action.battleCard.library_id;
          });

          block.elements = elements;
          return block;
        });

        template.blocks = blocks;
        return template;
      });

      const { activeBlock } = state;

      activeBlock.elements = activeBlock.elements.filter((e) => {
        return e.id !== action.battleCard.id;
      });
      const battleCards = state.battleCards.filter((b) => {
        return b.id !== action.battleCard.id;
      });

      // battleCards.splice(index, 1);

      if (action.battleCard.id === state.activeBattleCard?.id) {
        return {
          ...state,
          templates,
          activeBattleCard: null,
          activeBlock: { ...activeBlock },
          battleCards: [...battleCards],
        };
      }

      return {
        ...state,
        templates,
        activeBlock: { ...activeBlock },
        battleCards: [...battleCards],
      };
    }

    case actionTypes.SET_FILTERED_LIBRARY_BATTLE_CARDS: {
      return {
        ...state,
        filteredBattleCards: [...action.battleCards],
      };
    }

    // TALK TRACK LIBRARY
    case actionTypes.SET_LIBRARY_TALK_TRACKS: {
      return {
        ...state,
        talkTracks: action.talkTracks.sort(alphabetizeLabel),
        filteredTalkTracks: action.talkTracks.sort(alphabetizeLabel),
      };
    }

    // case actionTypes.ALPHABETIZE_LIBRARY_TALK_TRACKS: {
    //   return {
    //     ...state,
    //     talkTracks: [...state.talkTracks].sort(alphabetizeLabel),
    //     filteredTalkTracks: [...state.talkTracks].sort(alphabetizeLabel),
    //   };
    // }

    case actionTypes.SET_LIBRARY_TALK_TRACK: {
      const { talkTracks, filteredTalkTracks } = state;
      const { talkTrack } = action;

      return {
        ...state,
        talkTracks: [...talkTracks, talkTrack].sort(alphabetizeLabel),
        filteredTalkTracks: [...filteredTalkTracks, talkTrack].sort(
          alphabetizeLabel
        ),
      };
    }

    case actionTypes.SET_ACTIVE_LIBRARY_TALK_TRACK: {
      const talkTracks = state.talkTracks.map((t) => {
        const talkTrack = { ...t };
        if (talkTrack.id === action.talkTrack.id) {
          talkTrack.active = true;
          return talkTrack;
        }
        talkTrack.active = false;
        return talkTrack;
      });

      const filteredTalkTracks = state.filteredTalkTracks.map((t) => {
        const filteredTalkTrack = { ...t };
        if (filteredTalkTrack.id === action.talkTrack.id) {
          filteredTalkTrack.active = true;
          return filteredTalkTrack;
        }
        filteredTalkTrack.active = false;
        return filteredTalkTrack;
      });

      return {
        ...state,
        activeLibraryTalkTrack: { ...action.talkTrack },
        talkTracks: [...talkTracks],
        filteredTalkTracks: [...filteredTalkTracks],
      };
    }

    case actionTypes.SET_LIBRARY_TALK_TRACK_NAME: {
      debugger
      // update every instance of the activeLibraryTalkTrack
      const templates = state.templates.map((t) => {
        const template = { ...t };
        const blocks = template.blocks.map((b) => {
          const block = { ...b };
          if (block.type === 'battle-cards') {
            const elements = block.elements.map((e) => {
              const element = { ...e };
              const talkTracks = element['talk-tracks'].map((tr) => {
                const talkTrack = { ...tr };
                if (talkTrack.id === action.talkTrack.id) {
                  talkTrack.value = action.talkTrack.value;
                }
                return talkTrack;
              });
              element['talk-tracks'] = talkTracks;
              return element;
            });
            block.elements = elements;
            return block;
          }
          const elements = block.elements.map((e) => {
            const element = { ...e };
            if (
              element.type === 'talk-track' &&
              element.id === action.talkTrack.id
            ) {
              element.value = action.talkTrack.value;
            }
            return element;
          });
          block.elements = elements;
          return block;
        });
        template.blocks = blocks;
        return template;
      });

      const activeTemplate = templates?.find(
        (t) => t.id === state.activeTemplate?.id
      );

      const activeBlock = activeTemplate?.blocks.find(
        (b) => b.id === state.activeBlock?.id
      );
      const activeElement = activeBlock?.elements.find(
        (e) => e.id === state.activeBattleCard?.id
      );

      if (activeElement?.type === 'battle-card') {
        const talkTrack = activeElement['talk-tracks'].find(
          (t) => t.id === action.talkTrack.id
        );
        talkTrack.label = action.talkTrack.label;
        talkTrack.value = action.talkTrack.value;
      }

      const talkTracks = state.talkTracks.map((t) => ({ ...t }));
      const foundTalkTrack = talkTracks.find(
        (t) => t.id === action.talkTrack.id
      );
      foundTalkTrack.label = action.talkTrack.label;
      foundTalkTrack.value = action.talkTrack.value;

      const filteredTalkTracks = state.filteredTalkTracks.map((t) => ({
        ...t,
      }));
      const foundFiltered = filteredTalkTracks.find(
        (t) => t.id === action.talkTrack.id
      );
      foundFiltered.label = action.talkTrack.label;
      foundFiltered.value = action.talkTrack.value;

      const battleCards = state.battleCards.map((b) => {
        const battleCard = { ...b };
        const talkTrack = battleCard['talk-tracks'].find(
          (tt) => tt.id === action.talkTrack.id
        );
        if (talkTrack) {
          talkTrack.label = action.talkTrack.label;
          talkTrack.value = action.talkTrack.value;
        }
        return battleCard;
      });
      const filteredBattleCards = state.filteredBattleCards.map((b) => {
        const filteredBattleCard = { ...b };
        const talkTrack = filteredBattleCard['talk-tracks'].find(
          (tt) => tt.id === action.talkTrack.id
        );
        if (talkTrack) {
          talkTrack.label = action.talkTrack.label;
          talkTrack.value = action.talkTrack.value;
        }
        return filteredBattleCard;
      });

      const activeLibraryBattleCard = { ...state.activeLibraryBattleCard };
      const tracks = activeLibraryBattleCard['talk-tracks'].map((tt) => {
        const track = { ...tt };
        if (track.id === action.talkTrack.id) {
          track.label = action.talkTrack.label;
          track.value = action.talkTrack.value;
        }
        return track;
      });
      activeLibraryBattleCard['talk-tracks'] = tracks;

      return {
        ...state,
        templates,
        activeTemplate,
        activeBattleCard: activeElement,
        talkTracks: talkTracks.sort(alphabetizeLabel),
        filteredTalkTracks: filteredTalkTracks.sort(alphabetizeLabel),
        battleCards,
        filteredBattleCards,
        activeLibraryBattleCard,
      };
    }

    /**
     * Adds a library talk track to a battle card
     * TODO: add library talk track to block as element
     */
    case actionTypes.ADD_LIBRARY_TALK_TRACK: {
      // update every instance of activeLibraryBattleCard with a talk track
      const templates = state.templates.map((t) => {
        const template = { ...t };
        const blocks = template.blocks.map((b) => {
          const block = { ...b };
          if (block.type === 'battle-cards') {
            const elements = block.elements.map((e) => {
              const element = { ...e };
              if (
                element.id === state.activeBattleCard?.id ||
                element.id === state.activeLibraryBattleCard?.id
              ) {
                element['talk-tracks'] = [
                  ...element['talk-tracks'],
                  action.talkTrack,
                ];
              }
              return element;
            });
            block.elements = elements;
          }
          return block;
        });
        template.blocks = blocks;
        return template;
      });

      const battleCards = state.battleCards.map((b) => {
        const battleCard = { ...b };
        battleCard['talk-tracks'] = b['talk-tracks'].map((t) => ({ ...t }));

        if (
          battleCard.id === state.activeBattleCard?.id ||
          battleCard.id === state.activeLibraryBattleCard?.id
        ) {
          battleCard['talk-tracks'] = [
            ...battleCard['talk-tracks'],
            action.talkTrack,
          ];
        }
        return battleCard;
      });

      const activeTemplate = templates.find(
        (t) => t.id === state.activeTemplate.id
      );

      const activeBlock = activeTemplate?.blocks?.find(
        (b) => b.id === state.activeBlock?.id
      );

      const activeBattleCard = activeBlock?.elements?.find(
        (e) => e.id === state.activeBattleCard?.id
      );

      const activeLibraryBattleCard = battleCards.find(
        (b) => b.id === state.activeLibraryBattleCard?.id
      );

      return {
        ...state,
        templates,
        battleCards,
        activeTemplate,
        activeBlock: activeBlock || [],
        activeBattleCard: activeBattleCard || [],
        activeLibraryBattleCard: activeLibraryBattleCard || [],
      };
    }

    case actionTypes.REMOVE_LIBRARY_TALK_TRACK: {
      // re every instance of the talkTrack from all templates
      // from elements and battle cards
      const templates = state.templates.map((t) => {
        const template = { ...t };
        const blocks = template.blocks.map((b) => {
          const block = { ...b };
          if (block.type === 'battle-cards') {
            const elements = block.elements.map((e) => {
              const element = { ...e };
              const talkTracks = element['talk-tracks'].filter((tr) => {
                return tr.id !== action.talkTrack.id;
              });
              element['talk-tracks'] = talkTracks;
              return element;
            });
            block.elements = elements;
            return block;
          }
          const elements = block.elements.filter((e) => {
            return e.id !== action.talkTrack.id;
          });
          block.elements = elements;
          return block;
        });
        template.blocks = blocks;
        return template;
      });

      const battleCards = state.battleCards.map((b) => {
        const battleCard = { ...b };
        battleCard['talk-tracks'] = b['talk-tracks'].filter(
          (t) => t.id !== action.talkTrack.id
        );
        return battleCard;
      });

      const talkTracks = state.talkTracks.filter(
        (t) => t.id !== action.talkTrack.id
      );

      const activeTemplate = templates.find(
        (t) => t.id === state.activeTemplate?.id
      );

      const activeBlock = activeTemplate?.blocks.find(
        (b) => b.id === state.activeBlock?.id
      );

      const activeBattleCard = activeBlock?.elements?.find(
        (e) => e.id === state.activeBattleCard?.id
      );

      const activeLibraryBattleCard = battleCards.find(
        (b) => b.id === state.activeLibraryBattleCard?.id
      );

      const filteredTalkTracks = state.filteredTalkTracks
        .filter((b) => {
          return b.id !== action.talkTrack?.id;
        })
        .sort(alphabetizeLabel);

      if (action.talkTrack.id === state.activeTalkTrack?.id) {
        return {
          ...state,
          templates,
          battleCards,
          talkTracks,
          activeTemplate: activeTemplate || [],
          activeBlock: activeBlock || [],
          activeBattleCard: activeBattleCard || [],
          activeLibraryBattleCard: activeLibraryBattleCard || [],
          activeTalkTrack: null,
          filteredTalkTracks,
        };
      }

      return {
        ...state,
        templates,
        battleCards,
        talkTracks,
        activeTemplate: activeTemplate || [],
        activeBlock: activeBlock || [],
        activeBattleCard: activeBattleCard || [],
        activeLibraryBattleCard: activeLibraryBattleCard || [],
        filteredTalkTracks,
      };
    }

    case actionTypes.SET_FILTERED_LIBRARY_TALK_TRACKS: {
      return {
        ...state,
        filteredTalkTracks: [...action.talkTracks.sort(alphabetizeLabel)],
      };
    }

    default:
      return state;
  }
};

export default builder;
