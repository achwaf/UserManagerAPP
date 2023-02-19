import { InteractEvent } from "../model/interact-event-enum";

export enum STOP{
    SHORT='.',
    MEDIUM='..',
    LONG='...'
}

export interface IQuote {
    parts: string[], goto: string, event?:InteractEvent, onlystart: boolean, end: boolean, 
}

export interface IQuotes {
    [key: string]: IQuote[];
}
export const QUOTES: IQuotes = {

    NORMAL: [
        { parts: ['hey','hey hey','hey', 'what are you doing?'], goto: '', onlystart: false, end: true },
        { parts: ['hey','hey','HEY!', 'what are you doing?'], goto: '', onlystart: false, end: true },
        { parts: ['hey','sir or madam','please', 'what are you doing?'], goto: '', onlystart: false, end: true },
        { parts: ['hey wait','please','no'], goto: '', onlystart: false, end: true },
        { parts: ['could you not!'], goto: '', onlystart: true, end: false },
        { parts: ['please no'], goto: '', onlystart: false, end: false },
        { parts: ['come on','.','what\'s now'], goto: '', onlystart: false, end: false },
        { parts: ['come on','...'], goto: '', onlystart: false, end: false },
        { parts: ['I don\'t like this'], goto: '', onlystart: false, end: false },
        { parts: ['I want','.','I want to stay longer','please'], goto: '', onlystart: false, end: false },
        { parts: ['If you do it','.','I','..','I can\'t do nothing'], goto: '', onlystart: false, end: false },
        { parts: ['come','..','on','..'], goto: '', onlystart: false, end: false },
        { parts: ['please don\'t'], goto: '', onlystart: false, end: false },
        { parts: ['please don\'t'], goto: '', onlystart: false, end: false },
        { parts: ['you want to delete me?','..','what','.','what did I do?'], goto: '', onlystart: false, end: false },
        { parts: ['why','..','why?','...','just why?'], goto: '', onlystart: false, end: false },
        { parts: ['but','.','did I do something?','to you, maybe?','or','..','to myself?'], goto: '', onlystart: false, end: false },
        { parts: ['ok','ok','ok', 'let\'s calm a bit down, shall we'], goto: '', onlystart: false, end: false },
    ],
    SOCIALLY_POOR: [
        { parts: ['hey', '...','are you crazy'], goto: '', onlystart: false, end: false },
        { parts: ['come come come come','...'], goto: '', onlystart: false, end: false },
    ]





}
