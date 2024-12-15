export default class EnterTextHandler {
    constructor(scene) {

        this.name;
        this.socketId;

        this.renderEnterText = (enterTextElement, x, y) => {

            let width = 550;
            let height = 25;

            //get the element
            var el = enterTextElement;

            //set the position to absolute
            el.style.position = "absolute";

            //get the width of the element
            var w = el.style.width;
            //convert to a number
            w = this.toNum(w);
            w = width;

            //get the height
            var h = el.style.height;
            //convert to a number
            h = this.toNum(h);
            h = height;

            //set the positions
            el.style.top = y + "px";
            el.style.left = x + "px";

            //set the width and height
            el.style.width = w + "px";
            el.style.height = h + "px";

            return el;
        }

    }

    //changes 100px to 100
    toNum(s) {
        s = s.replace("px", "");
        s = parseInt(s);
        return s;
    }

}