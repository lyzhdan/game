const tiles = document.querySelectorAll('.tile');
const places=document.querySelectorAll('.place');
let countf=0, countwa=0, countwi=0, counte=0, countb=0; 

class TileNode{
    constructor(tileV){
        this.tileV=tileV;
        this.type=function giveType(random, tile, counter){
        switch(random){
            case 1:
                if(counter)
                tile.style.backgroundImage="url(fire.png)";
                counter++;
                return "fire";
            case 2:
                tile.style.backgroundImage="url(water.png)";
                counter++;
                return "water";
            case 3:
                tile.style.backgroundImage="url(wind.png)";
                counter++;
                return "wind";
            case 4:
                tile.style.backgroundImage="url(earth.png)";
                counter++;
                return "earth";
            case 5:
                tile.style.background_color="blue";
                return "blue";
            default:
                console.log("something is wrong...");
            }
        };
        this.next=null;
        this.prev=null;
    }
 

}

class TileList{
    constructor(){
        this.head=null;
    }
    append(tileV){
        let newTile=new TileNode(tileV);
        if(!this.head){
            this.head=newTile;
            return;
        }
        let curr=this.head;
        while(curr.next){
            curr=curr.next;
        }
        curr.next=newTile;
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

class PlaceNode{
    constructor(place){
        this.place=place;
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
let listOfTiles=new TileList;

places.forEach(place=> {
    listOfPlaces.append(place, null);
});

tiles.forEach(tile =>{
    let rand=giveType(Math.floor(Math.random()*5));
    if(rand==1){
        TileList.append(tile);
    }
    else if(rand==2){
        TileList.append(rand, tile, countwa);
    }
    else if(rand==3){
        TileList.append(rand, tile, countwi);
    }
    else if(rand==4){
        TileList.append(rand, tile, counter);
    }
    else if(rand==5){
        TileList.append(rand, tile, countb);
    }
    
    move(tile);
});
