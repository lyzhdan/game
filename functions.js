class PlaceNode{
    constructor(placeV){
        this.placeV=placeV;
        this.blocker=false;
        this.next=null;
        this.prev=null;
    }
}

class PlaceList{
    constructor(){
        this.head=null;
    }
    append(placeV, blocker){
        let newPlace=new PlaceNode(placeV, blocker);
        if(!this.head){
            this.head=newPlace;
            return;
        }
        let curr=this.head;
        while(curr.next){
            curr=curr.next;
        }
        curr.next=newPlace;
    }

    delete(){
        while(this.head){
            let curr=this.head;
            while(curr.next){
                curr=curr.next;
            }
            while(this.head){
                curr.prev.next=null;
                curr=curr.prev;
            }
            
        }
    }
}

let listOfPlaces=new PlaceList;

places.forEach(place=> {
    listOfPlaces.append(place, null);
})

function getCenter(el) {
    let rect = el.getBoundingClientRect();
    let centerX = rect.left + rect.width / 2;
    let centerY = rect.top + rect.height / 2;
    return [centerX, centerY];
}

function compare(tile, places, maxdist=60) {
    const [tx, ty] = getCenter(tile);
    let best = null;
    let bestDist = maxdist;
    let curr=places.head;
    while(curr){
        if(curr.blocker===true){
            curr=curr.next;
            continue;
        }
        const [px, py] = getCenter(curr.placeV);
        const dist = Math.hypot(px - tx, py - ty);
        if (dist < bestDist) {
            bestDist = dist;
            best = curr;
            curr.blocker=true;
        }
        curr=curr.next;
    }
    return best;
}

function move(tile){
    let activeTile = null;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;
    let currentNode=null;
    let originNode=null;
    tile.style.zIndex=1000;
    
    tile.addEventListener("mousedown", function (event) {
    e.preventDefault();
    activeTile = tile; 

    startX = event.clientX;
    startY = event.clientY;
  
    const computedStyle = window.getComputedStyle(activeTile);
    initialLeft = parseInt(computedStyle.left) || 100;
    initialTop = parseInt(computedStyle.top) || 100;

    activeTile.style.cursor = "grabbing";

    originNode = currentNode;
    if (currentNode) {
        currentNode.occupied = false;  
        currentNode = null;
    }
    
    });
    document.addEventListener("mousemove", function(event){
        if (!activeTile) return;

        const dx = event.clientX - startX;
        const dy = event.clientY - startY;

        activeTile.style.left = (initialLeft + dx) + "px";
        activeTile.style.top = (initialTop + dy) + "px";
    });
    document.addEventListener("mouseup", function(){
        if (activeTile) {
            activeTile.style.cursor = "grab";
            activeTile = null;

            const best = compare(tile, listOfPlaces);
            if (best) {
            const [tx, ty] = getCenter(tile);
            const [px, py] = getCenter(best);
            const cs = getComputedStyle(tile);
            tile.style.left = (parseFloat(cs.left) + px - tx) + "px";
            tile.style.top = (parseFloat(cs.top) + py - ty) + "px";
        }
        else{
            tile.style.left = initialLeft + "px";
            tile.style.top = initialTop + "px";
        }
        }
    });
}

function pattern(random, tile, counter){
    switch(random){
        case 1:
            tile.style.backgroundImage="url(fire.png)";
            counter++;
            break;
        case 2:
            tile.style.backgroundImage="url(water.png)";
            counter++;
            break;
        case 3:
            tile.style.backgroundImage="url(wind.png)";
            counter++;
            break;
        case 4:
            tile.style.backgroundImage="url(earth.png)";
            counter++;
            break;
        case 5:

            break;
        default:
            console.log("something is wrong...");
    }
}
