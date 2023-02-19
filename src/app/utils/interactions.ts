import { InteractEvent, InteractParticipant } from "../model/interact-event-enum";

const CANCEL = InteractEvent.CANCEL;
const DELETE = InteractEvent.DELETE;
const DISABLE = InteractEvent.DISABLE;
const ENABLE = InteractEvent.CONFIRM_ENABLE;

export enum STOP {
    SHORT = '.',
    MEDIUM = '..',
    LONG = '...'
}

export interface IQuote {
    parts: string[], goto: string, event: InteractEvent[], onlystart: boolean, end: boolean,
}

export interface IQuotes {
    [key: string]: IQuote[];
}

const NORMAL: IQuote[] = [
    // DELETE | DISABLE
    { event: [DELETE, DISABLE], parts: ['hey', 'hey hey', 'hey', 'what are you doing?'], goto: '', onlystart: true, end: false },
    { event: [DELETE, DISABLE], parts: ['hey', 'hey', 'HEY!', 'what are you doing?'], goto: '', onlystart: true, end: false },
    { event: [DELETE, DISABLE], parts: ['hey', 'sir    ', '.', 'or madam', 'what are you doing?'], goto: '', onlystart: true, end: false },
    { event: [DELETE, DISABLE], parts: ['hey'], goto: '', onlystart: true, end: false },
    { event: [DELETE, DISABLE], parts: ['hey wait', 'please', 'no'], goto: '', onlystart: true, end: false },
    { event: [DELETE, DISABLE], parts: ['wait', 'wait', 'wait', '..', 'don\'t do it  ', 'please'], goto: '', onlystart: true, end: false },
    { event: [DELETE, DISABLE], parts: ['huh', 'what!'], goto: '', onlystart: true, end: false },
    { event: [DELETE, DISABLE], parts: ['could you not!'], goto: '', onlystart: true, end: false },
    { event: [DELETE, DISABLE], parts: ['oh no      '], goto: '', onlystart: true, end: false },
    { event: [DELETE, DISABLE], parts: ['oh come on'], goto: '', onlystart: true, end: false },
    { event: [DELETE, DISABLE], parts: ['ok', 'ok', 'let\'s calm down a bit, shall we'], goto: '', onlystart: true, end: false },
    { event: [DELETE, DISABLE], parts: ['ok', 'ok', 'calm down'], goto: '', onlystart: true, end: false },

    { event: [DELETE, DISABLE], parts: ['please no'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['pleaaaase'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['no', 'no   ', 'don\'t do it', '.', 'don\'t', '...', 'please don\'t'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['come on', '.', 'what now    '], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['come on', '...'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['I don\'t like this'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['I don\'t like what is happening', 'it didn\'t happen', 'yet   ', 'but please'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['I don\'t like what is happening'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['I want', '.', 'I want to stay longer', 'please'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['I want to stay longer'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['do you have a reason for this?'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['is there a reason behind this?', 'a good reason?'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['why would you?', '.', 'hein'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['why?'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['why me?'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['just why?'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['why?', '.', 'could you tell me?'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['that\'s not great you know', 'please don\'t'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['for what reason?'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['If you do it', '.', 'I', '..', 'I can do nothing'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['If you do it', '.', 'well', 'I can do nothing'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['If you do it', '.', 'well', '.', 'just don\'t do it', 'please'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['come     ', 'on', '..'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['please don\'t'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['what did I do?'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['I didn\'t do anything'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['I didn\'t do anything', '.', 'you hear me'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['I did nothing'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['I did nothing', '.', 'nothing bad'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['please reconsider your action'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['you hate me?', '.', 'is that why?'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['you do not like me?'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['it\'s sad', 'it\'s sad what you are going to do'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['it\'s bad'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['it\'s sad', '..', 'and bad'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['why', '..', 'why?', '...', 'just why?'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['did I do something?', 'to you, maybe?', 'or', '.', 'to myself?'], goto: '', onlystart: false, end: false },
    { event: [DELETE, DISABLE], parts: ['did I do something wrong?'], goto: '', onlystart: false, end: false },

    { event: [DELETE, DISABLE], parts: ['well', '.', 'if you want to do it', 'I can\'t stop you', 'I mean', '..', 'I can do nothing', '.', 'but please don\'t', '...', 'I am not begging anymore'], goto: '', onlystart: false, end: true },
    { event: [DELETE, DISABLE], parts: [''], goto: '', onlystart: false, end: true }, // this is to have a chance to stop eventually

    // DELETE
    { event: [DELETE], parts: ['you want to delete me?', '..', 'why'], goto: '', onlystart: true, end: false },

    { event: [DELETE], parts: ['deleting is a bad', 'very bad action'], goto: '', onlystart: false, end: false },
    { event: [DELETE], parts: ['deleting is not good',], goto: '', onlystart: false, end: false },
    { event: [DELETE], parts: ['people go to jail for deleting', 'well', '..', 'it depends on what was deleted'], goto: '', onlystart: false, end: false },

    // DISABLE
    { event: [DISABLE], parts: ['you want to disable me?', '..', 'why'], goto: '', onlystart: true, end: false },

    { event: [DISABLE], parts: ['disabling is a bad action', 'not as bas as deleting, though', '..', 'but', 'it is\'s still bad'], goto: '', onlystart: false, end: false },

    { event: [DISABLE], parts: ['ok', 'ok', '.', 'I get it', '..', 'you want to disable me to shut me up', 'don\'t do it', 'I will not talk anymore'], goto: '', onlystart: true, end: true },
    // CANCEL
    { event: [CANCEL], parts: ['oof', '.', 'thank you'], goto: '', onlystart: false, end: true },
    { event: [CANCEL], parts: ['thank you'], goto: '', onlystart: false, end: true },
    { event: [CANCEL], parts: ['thanks'], goto: '', onlystart: false, end: true },
    { event: [CANCEL], parts: ['thanks', '.', 'a lot'], goto: '', onlystart: false, end: true },
    { event: [CANCEL], parts: ['thanks a lot'], goto: '', onlystart: false, end: true },
    { event: [CANCEL], parts: ['yaaay', 'I am still here'], goto: '', onlystart: false, end: true },
    { event: [CANCEL], parts: ['yaaay'], goto: '', onlystart: false, end: true },
    { event: [CANCEL], parts: ['what a relief!'], goto: '', onlystart: false, end: true },
    { event: [CANCEL], parts: ['you are a good person'], goto: '', onlystart: false, end: true },
    { event: [CANCEL], parts: ['oh     ', 'ok'], goto: '', onlystart: false, end: true },
    { event: [CANCEL], parts: ['oh     ', 'never mind'], goto: '', onlystart: false, end: true },
    { event: [CANCEL], parts: ['ok', '..', 'many thanks'], goto: '', onlystart: false, end: true },
];

const STORY_TELLER: IQuote[] = [...NORMAL,

// DISABLE, DELETE
{ event: [], parts: ['hey', '..', 'are you crazy'], goto: '', onlystart: false, end: false },
{ event: [], parts: ['come', '.', 'on                    '], goto: '', onlystart: false, end: false },

    // DELETE

    // DISABLE

    // CANCEL
]

export const QUOTES: IQuotes = { NORMAL, STORY_TELLER };



/**
 * Interaction with logged in avatar
 */

export interface IScript {
    animator: string[],
    public: {
        howmany: InteractParticipant,
        replies: {
            quote: string[],
            repeatable: boolean,
            value?: any
        }[]
    }
};

export interface IGuidedInteraction {
    [key: string]: IScript;
};

export const GUIDED_INTERACTIONS: IGuidedInteraction = {
    BEST_STARTUP: {
        animator: ['hey', '.', 'all of you', '..', 'what is the best startup in Luxembourg?'],
        public: {
            howmany: InteractParticipant.ALL,
            replies: [
                { quote: ['Cascade'], repeatable: true },
                { quote: ['it\'s Cascade'], repeatable: true },
                { quote: ['heh', '.', 'it\'s Cascade'], repeatable: false },
                { quote: ['Cascade', '..', 'everyone knows it'], repeatable: false },
                { quote: ['Cascade for sure'], repeatable: false },
            ]
        }
    }
    ,
    VOTE: {
        animator: ['let\'s do a vote everyone', '..', 'please', 'just vote YES/NO    ', 'the subject doesn\'t matter'],
        public: {
            howmany: InteractParticipant.ALL,
            replies: [
                { quote: ['YES'], repeatable: true, value: 1 },
                { quote: ['NO'], repeatable: true, value: 0 },
                { quote: ['Yes'], repeatable: true, value: 1 },
                { quote: ['No'], repeatable: true, value: 0 },
                { quote: ['yes'], repeatable: true, value: 1 },
                { quote: ['no'], repeatable: true, value: 0 },
                { quote: ['Yes', '...', 'no wait', 'I vote No'], repeatable: false, value: 0 },
                { quote: ['No', '.', 'yes', '.', 'yes is my final'], repeatable: false, value: 1 },
                { quote: ['I don\'t know', '.', 'hmmm', '...', 'I pick YES'], repeatable: false, value: 1 },
                { quote: ['wait', '.', 'hmmm', '...', 'I choose NO'], repeatable: false, value: 0 },
                { quote: ['hmmm', '.', 'NO'], repeatable: false, value: 0 },
                { quote: ['hmmm', '.', 'YES'], repeatable: false, value: 1 },
            ]
        }
    }

}