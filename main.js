import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold.greenBright("/$$$$$$$$ /$$                    /$$$$$$$$$                       /$$$$$$$$$                                                               "));
console.log(chalk.bold.greenBright("|__  $$__/|__/                   |__  $$__/                       |__  $$__/                       "));
console.log(chalk.bold.greenBright("   | $$    /$$   /$$$$$$$          | $$  /$$$$$$   /$$$$$$$         | $$  /$$$$$$    /$$$$$$\      "));
console.log(chalk.bold.greenBright("   | $$   | $$  /$$_____/          | $$ |____  $$ /$$_____/         | $$ /$$__  $$  /$$_____/      "));
console.log(chalk.bold.greenBright("   | $$   | $$ | $$                | $$  /$$$$$$$| $$               | $$| $$  \  $$| $$$$$$$/      "));
console.log(chalk.bold.greenBright("   | $$   | $$ | $$                | $$ /$$__  $$| $$               | $$| $$  |  $$| $$            "));
console.log(chalk.bold.greenBright("   | $$   | $$ |  $$$$$$$          | $$ | $$$$$$$|  $$$$$$$$        | $$|  $$$$$$$/|  $$$$$$$       "));
console.log(chalk.bold.greenBright("   |__/   |__/  \_______/          |__/  \_______/ \_______/        |__/ \_______/  \_______/                             "));
console.log("\n");
console.log(chalk.bold.cyanBright("************************************************************************************************"));
console.log("\n");
const board = [];
let indexNum;
function createBoard(board) {
    board.push([' ', ' ', ' ']);
    board.push([' ', ' ', ' ']); //these empty string replaces with a symbol like 'X' and '0' when the player makes a move.
    board.push([' ', ' ', ' ']);
}
function boardDraw(board) {
    console.log(chalk.bold.cyanBright('   _________________'));
    console.log(chalk.bold.cyanBright('  |     |     |     |'));
    console.log(chalk.bold.cyanBright(`  |  ${board[0][0]}  |  ${board[0][1]}  |  ${board[0][2]}  |`));
    console.log(chalk.bold.cyanBright('  |_________________|'));
    console.log(chalk.bold.cyanBright('  |     |     |     |'));
    console.log(chalk.bold.cyanBright(`  |  ${board[1][0]}  |  ${board[1][1]}  |  ${board[1][2]}  |`));
    console.log(chalk.bold.cyanBright('  |_________________|'));
    console.log(chalk.bold.cyanBright('  |     |     |     |'));
    console.log(chalk.bold.cyanBright(`  |  ${board[2][0]}  |  ${board[2][1]}  |  ${board[2][2]}  |`));
    console.log(chalk.bold.cyanBright('  |_________________|'));
}
async function user(board, player) {
    const put = await inquirer.prompt([{
            name: "index",
            type: "input",
            message: chalk.bold.yellowBright("Select index number of board from 1 to 9"),
            validate: (input) => {
                const indexNum = parseInt(input);
                return (indexNum >= 1 && indexNum <= 9) ? true : "Please enter a number between 1 and 9.";
            },
        }]);
    const indexNum = parseInt(put.index) - 1; // Adjust for 0-based array indexing
    const row = Math.floor(indexNum / 3);
    const col = indexNum % 3;
    if (board[row][col] === ' ') {
        board[row][col] = player;
    }
    else {
        console.log(chalk.bold.magentaBright("\n Box already filled. Please choose another."));
        await user(board, player); // Let the user try again if the box is filled
    }
}
function winnerCheck(board, player) {
    if (
    //horizontal line winner
    (board[0][0] === player && board[0][1] === player && board[0][2] === player) ||
        (board[1][0] === player && board[1][1] === player && board[1][2] === player) ||
        (board[2][0] === player && board[2][1] === player && board[2][2] === player) ||
        //vertical line winner
        (board[0][0] === player && board[1][0] === player && board[2][0] === player) ||
        (board[0][1] === player && board[1][1] === player && board[2][1] === player) ||
        (board[0][2] === player && board[1][2] === player && board[2][2] === player) ||
        //diagonal line winner
        (board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
        (board[0][2] === player && board[1][1] === player && board[2][0] === player)) {
        console.log(chalk.bold.greenBright(`Result: ${player} has won the match!`));
        return true;
    }
    else {
        return false;
    }
}
//Calling all the functions:
async function playGame() {
    createBoard(board); //board ky parts ka function hai
    boardDraw(board); //pura board print hoga yahn pr
    let player = "X"; //yahn pr yahn ko X say denote kia hai
    let winner = false; //yahn say loop start hua hai
    while (!winner) {
        await user(board, player); //then yahn sy player sy input laingy or board mai print krwayengy
        if (winnerCheck(board, player)) {
            winner = true;
        }
        else {
            boardDraw(board); // Redraw the board here, before switching players
            if (boardIsFull(board)) {
                console.log(chalk.bold.yellowBright("It's a draw!"));
                break;
            }
            player = (player === "X") ? "0" : "X"; // Switch players after each valid move
        }
    }
    if (winner) {
        console.log(chalk.bold.greenBright(`Congratulations! ${player} has won the match`));
    }
    else {
        console.log(chalk.bold.yellowBright("It's a draw!"));
    }
}
;
function boardIsFull(board) {
    for (let row of board) {
        for (let cell of row) {
            if (cell === ' ') {
                return false;
            }
        }
    }
    return true;
}
playGame();
