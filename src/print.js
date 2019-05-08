import {sum} from './assets/js/tool';

export default function printMe() {
    const res = sum(2, 6);
    console.log('I get called from print.js! ' + res);
}