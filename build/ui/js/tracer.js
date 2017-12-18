const taskEditor = CodeMirror.fromTextArea(document.getElementById("task"), {
    lineNumbers: true,
    mode: 'text/x-python',
    theme: 'dracula',
    scrollbarStyle: "simple",
    readOnly: true
});

let taskEditorResizeHandler = () =>
    taskEditor.setSize(
        taskEditor.display.lastWrapWidth,
        Math.max(550, taskEditor.lineCount() * taskEditor.defaultTextHeight() + 10)
    );

taskEditorResizeHandler();

taskEditor.on('change', taskEditorResizeHandler);

taskEditor.setValue(`def gcd(x, y):
    if x < 0:
        x = -x
    if y < 0:
        y = -y
    if x == 0:
        return y
    while y != 0:
        rem = x % y
        x = y
        y = rem
    return x`);

const userInput = CodeMirror.fromTextArea(document.getElementById("input"), {
    lineNumbers: false,
    mode: 'text/x-python',
    theme: 'dracula',
    scrollbarStyle: "simple"
});

let userInputResizeHandler = () =>
    userInput.setSize(
        userInput.display.lastWrapWidth,
        Math.max(420, userInput.lineCount() * userInput.defaultTextHeight() + 10)
    );

userInputResizeHandler();

userInput.on('change', userInputResizeHandler);

function verifyTask() {
    
}