const rows = 30;
const cols = 50;
const grid = document.getElementById("grid");

let field=[];
let go = false;

for(let i=0; i<rows; i++)
{
    const row = []
    for(let j=0;j<cols; j++)
    {
        console.log("HERE");
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => {
            cell.classList.toggle("alive");
        });
        grid.appendChild(cell);
        row.push(cell);
    }
    field.push(row);
}

function getNextState()
{
    let newState=[];
    for (let i = 0; i < rows; i++) {
        newState[i]=[];
        for(let j=0; j<cols; j++)
        {
            const alive = field[i][j].classList.contains("alive");
            let count = 0;
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) 
                {
                    if (x === 0 && y === 0) 
                        continue;

                    const ni = i + x, nj = j + y;
                    if (ni >= 0 && ni < rows && nj >= 0 && nj < cols) 
                    {
                        if (field[ni][nj].classList.contains("alive")) 
                            count++;
                    }
                }
            }
            newState[i][j] = alive? count===2 || count===3 : count===3;
        }
    }
    return newState;
}

function updateGrid(newState) 
{
    for (let i = 0; i < rows; i++) 
    {
        for (let j = 0; j < cols; j++) 
            field[i][j].classList.toggle("alive", newState[i][j]);
    }
}

function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startGame()
{
    go = true;
    while(go)
    {
        const next = getNextState();
        updateGrid(next);
        await sleep(150);
    }
}

function stopGame()
{
    go = false;
}

function clearGrid()
{
    for (let row of field)
        for(let cell of row)
                cell.classList.remove("alive");
}


// Attach button handlers
document.getElementById("start").addEventListener("click", startGame);
document.getElementById("stop").addEventListener("click", stopGame);
document.getElementById("clear").addEventListener("click", clearGrid);