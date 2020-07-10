
function showBoard(board, toggleBoard) {
    document.getElementById("h1BoardName").innerHTML = board.name;
    window.history.pushState("", board.name, `/?bid=${board.id}`);
    localStorage.setItem('board', JSON.stringify(board));
    (board.drawings || []).forEach(message => {
        drawFromStream(message);
    });
    if (toggleBoard)
        toggleModal();
}

(() => {
    const boardId = getBoardIdFromURL('bid');
    if (boardId == null) {
        openModalPopup('Create a new board', 'Add a new board name', 'Submit!', () => {
            if (document.getElementById('modal-heading').innerHTML === 'Create a new board') {
                const boardName = document.getElementById('modal-textbox').value;
                if (boardName) {
                    const uuid = uuidv4();
                    const boards = JSON.parse(localStorage.getItem('boards') || '[]');
                    const board = { 'name': boardName, 'id': uuid };
                    boards.push(board);
                    ws.send(getMessageForServer(MESSAGE_TYPE.BOARD_ADDED, board));
                    showBoard(board, true);
                }
            }
        })
    } else {
        delay(function () {
            ws.send(getMessageForServer(MESSAGE_TYPE.BOARD_GET, { bid: boardId }));
        }, 500);
    }
})();