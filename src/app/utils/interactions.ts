import { InteractEvent } from "../model/interact-event-enum";

export enum STOP{
    SHORT='.',
    MEDIUM='..',
    LONG='...'
}

export interface IQuote {
    'parts': string[], 'goto': string, event?:InteractEvent, 'onlystart': boolean, 'end': boolean, 
}

export interface IQuotes {
    [key: string]: IQuote[];
}
export const QUOTES: IQuotes = {

    'NORMAL': [
        { 'parts': ['hey','hey','hey', 'what are you doing?'], 'goto': '', 'onlystart': false, 'end': false },
        { 'parts': ['ok','look','hey', 'let\'s calm a bit down, shall we'], 'goto': '', 'onlystart': false, 'end': false },
    ],
    'SOCIALLY_POOR': [
        { 'parts': ['hey', 'what are you doing?'], 'goto': '', 'onlystart': false, 'end': false },
    ]





}
