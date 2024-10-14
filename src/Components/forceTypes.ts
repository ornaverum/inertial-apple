
type VectorArrow = {
    id: number,
    gridCenter: number,
    cellSize: number,
    snapToGrid: boolean,
    pos0: {x: number, y: number},
    pos1: {x: number, y: number},
    stroke: string,
};

type TaoItem = {
    id: number,
    symbol: string,
    type: string,
    agent: string,
    object: string,
    color: string,
};

type Force = {
    id: number,
    symbol: string,
    type: string,
    agent: string,
    object: string,
    components: {
        x: number,
        y: number,
    },
    color: string;
    draggable: boolean;
    editText: boolean;
};

type Pt = {
    x: number,
    y: number,
};





	


   