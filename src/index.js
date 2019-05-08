import _ from 'lodash';
import './assets/style/style.scss';
import Img from './assets/images/bg.jpeg';
import printMe from './print.js';
import {sum} from './assets/js/tool';

function component() {
    var element = document.createElement('div');
    element.className = 'hello';

    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = _.join(['Hello', 'webpack is working'], ' ');

    var btn = document.createElement('button');
    btn.innerHTML = 'click';
    btn.onclick = printMe;

    element.appendChild(btn);

    var myImg = new Image();
    myImg.src = Img;

    element.appendChild(myImg);

    return element;
}
  
document.body.appendChild(component());
printMe();
sum(1, 2);

if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!');
        printMe();
    });
}