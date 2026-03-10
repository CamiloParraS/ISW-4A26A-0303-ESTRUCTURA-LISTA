"use strict";
const title = document.getElementById("title");
const btn = document.getElementById("btn");
btn?.addEventListener("click", () => {
    if (title)
        title.textContent = "You clicked the button!";
});
//# sourceMappingURL=index.js.map