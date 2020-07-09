let modal = document.querySelector(".modal");
let closeButton = document.querySelector(".close-button");

function toggleModal() {
    setModalDetails('', '', '');
    modal.classList.toggle("show-modal");
}

closeButton.addEventListener("click", toggleModal);
document.getElementById("modal-action-button").addEventListener("click", modalActionClicked);

function getBoardIdFromURL() {
    return new URLSearchParams(window.location.search).get('bid');
}

function loadorGetBoardDetails() {
    let boardId = getBoardIdFromURL();
    if (boardId) {
        const boards = JSON.parse(localStorage.getItem('boards') || []);
        const board = boards.filter(x => x.id === boardId);
        if (board && board.length == 1) {
            setBoard(board[0]);
            toggleModal();
            return;
        }
    }
    setModalDetails('Create a new board', 'Add a new board name', 'Submit!');
}

function setModalDetails(heading, placeHolderText, buttonText) {
    document.getElementById('modal-heading').innerHTML = heading;
    document.getElementById('modal-textbox').placeholder = placeHolderText;
    document.getElementById('modal-action-button').innerHTML = buttonText;
}

function modalActionClicked() {
    if (document.getElementById('modal-heading').innerHTML === 'Create a new board') {
        const boardName = document.getElementById('modal-textbox').value;
        if (boardName) {
            const uuid = uuidv4();
            const boards = JSON.parse(localStorage.getItem('boards') || []);
            const board = { 'name': boardName, 'id': uuid };
            boards.push(board);
            localStorage.setItem('boards', JSON.stringify(boards));
            setBoard(board);
            toggleModal();
        }
    }
}

function setBoard(board) {
    document.getElementById("h1BoardName").innerHTML = board.name;
    window.history.pushState("object or string", board.name, `/?bid=${board.id}`);
}

(function () {
    toggleModal();
    loadorGetBoardDetails();
})();
