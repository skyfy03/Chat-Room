export default class TextAreaHandler {
    constructor(scene) {

        this.name;
        this.socketId;

        this.renderTextArea = (textAreaElement, x, y) => {

            let width = 1650;
            let height = 800;

            //get the element
            var el = textAreaElement;

            //set the position to absolute
            el.style.position = "absolute";

            //set resize to none
            el.style.resize = "none";

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