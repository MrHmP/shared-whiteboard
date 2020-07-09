function loadOrGetBoardDetails() {
    let boardId = getBoardIdFromURL('bid');
    if (boardId) {
        const boards = JSON.parse(localStorage.getItem('boards') || []);
        const board = boards.filter(x => x.id === boardId);
        if (board && board.length == 1) {
            setBoard(board[0]);
            toggleModal();
            return;
        }
    } else {
        openModalPopup('Create a new board', 'Add a new board name', 'Submit!', () => {
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
        })
    }
}

function setBoard(board) {
    document.getElementById("h1BoardName").innerHTML = board.name;
    window.history.pushState("", board.name, `/?bid=${board.id}`);
}

(() => {
    loadOrGetBoardDetails();
})();