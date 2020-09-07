/* 
    Created on : 28/03/2019 22:10
    Author     : William Santos
*/

'use strict';

// HELPER FUNCTIONS

window.addEventListener ('DOMContentLoaded', () => {

    let demoText = '';

    // Elements References
    const propertiesModal = document.querySelector ('#propertiesModal');
    const demoButton = document.querySelector ('#demoButton');
    const clearFieldsButton = document.querySelector ('#clearFieldsButton');
    const showModalButton = document.querySelector ('#showModalButton');
    const closeModalButton = document.querySelector ('#closeModalButton');
    const applyPropertiesButton = document.querySelector ('#applyPropertiesButton');
    const textColorLabel = document.querySelector ('#textColorLabel');
    const textColorInput = document.querySelector ('#textColorInput');
    const fontSizeInput = document.querySelector ('#fontSizeInput');
    const letterSpacingInput = document.querySelector ('#letterSpacingInput');
    const wordSpacingInput = document.querySelector ('#wordSpacingInput');
    const fontWeightSelect = document.querySelector ('#fontWeightInput');
    const fontVariantSelect = document.querySelector ('#fontVariantSelect');
    const textAlignSelect = document.querySelector ('#textAlignSelect');
    const textDecorationSelect = document.querySelector ('#textDecorationSelect');
    const textTransformSelect = document.querySelector ('#textTransformSelect');
    const directionSelect = document.querySelector ('#directionSelect');

    // Inner Functions

    /**
     * Create a new sheet with 20 lines
     */
    function createNewSheet () {
        try  {
            const sheets = document.querySelector ('#sheets');
            const MAX_NUMBER_OF_LINES = 15;
            const sheet = document.createElement ('div');
            sheet.className = 'sheet';

            // Input date
            const dateInput = document.createElement('input');
            dateInput.type = 'date';
            dateInput.className = 'date-input';
            dateInput.valueAsDate = new Date();
            sheet.appendChild(dateInput);

            for (let i = 0; i < MAX_NUMBER_OF_LINES; i++) {
                let inputLine = document.createElement ('input');
                inputLine.type = 'text';
                inputLine.className = 'input-line';
                inputLine.maxLength = 72;
                sheet.appendChild (inputLine);
            }

            // link span
            const span = document.createElement('span');
            const link = document.createElement('a');
            span.textContent = ' Made by ';
            span.className = 'link-span';
            link.href = 'https://github.com/williamdsw';
            link.textContent = 'William Santos';
            link.target = '_blank';
            span.appendChild(link);
            sheet.appendChild(span);

            sheets.appendChild (sheet);
            inputInterations ();
            applyProperties();

            return sheet;
        } 
        catch (error) {
            console.error ('error', error);
            return null;
        }
    }

    /**
     * Default values for modal properties
     */
    function defaultProperties () {
        try {
            
            const inputLines = document.querySelectorAll('.input-line');
            if (inputLines !== null && inputLines.length !== 0) {

                // Getting values
                const firstInputLine = inputLines[0];
                const fontSize = (firstInputLine.style.fontSize !== '' ? firstInputLine.style.fontSize : '13px');
                const fontWeight = (firstInputLine.style.fontWeight !== '' ? firstInputLine.style.fontWeight : 'normal');
                const fontVariant = (firstInputLine.style.fontVariant !== '' ? firstInputLine.style.fontVariant : 'normal');
                const textColor = (firstInputLine.style.color !== '' ? firstInputLine.style.color : 'black');
                const textAlign = (firstInputLine.style.textAlign !== '' ? firstInputLine.style.textAlign : 'left');
                const textDecoration = (firstInputLine.style.textDecoration !== '' ? firstInputLine.style.textDecoration : 'none');
                const textTransform = (firstInputLine.style.textTransform !== '' ? firstInputLine.style.textTransform : 'none');
                const letterSpacing = (firstInputLine.style.letterSpacing !== '' ? firstInputLine.style.letterSpacing : '');
                const wordSpacing = (firstInputLine.style.wordSpacing !== '' ? firstInputLine.style.wordSpacing : '');
                const direction = (firstInputLine.style.direction !== '' ? firstInputLine.style.direction : 'ltr');

                // Setting values
                fontSizeInput.value = fontSize;
                fontWeightSelect.value = fontWeight;
                fontVariantSelect.value = fontVariant;
                textColorLabel.innerHTML = textColor;
                textAlignSelect.value = textAlign;
                textDecorationSelect.value = textDecoration;
                textTransformSelect.value = textTransform;
                letterSpacingInput.value = letterSpacing;
                wordSpacingInput.value = wordSpacing;
                directionSelect.value = direction;
            }
        }
        catch (error) {
            console.error ('error', error);
        }
    }

    /**
     * Defines input interations like jump line, create new sheet, etc.
     */
    function inputInterations () {
        try  {
            const inputLines = document.querySelectorAll ('.input-line');
            if (inputLines !== null) {
                inputLines.forEach (input => {

                    /* Verifies value length and maxlength 
                     * and create or jump to next line /sheet */
                    input.addEventListener ('keypress', () => {
                        const maxlength = input.getAttribute ('maxlength');
                        if (input.value.length === Number (maxlength)) {
                            if (input.nextElementSibling !== null) {
                                const otherSibling = input.nextElementSibling.nextElementSibling;
                                if (otherSibling !== null) {
                                    otherSibling.focus ();
                                }
                                else {
                                    let nextSheet = input.parentElement.nextElementSibling;
                                    if (nextSheet !== null) {
                                        const firstChild = nextSheet.children[0];
                                        if (firstChild.type === 'text') {
                                            firstChild.focus();
                                        }
                                        else {
                                            firstChild.nextElementSibling.focus();
                                        }
                                    }
                                    else  {
                                        nextSheet = createNewSheet ();
                                        if (nextSheet !== null) {
                                            const firstChild = nextSheet.children[0];
                                            if (firstChild.type === 'text') {
                                                firstChild.focus();
                                            }
                                            else {
                                                firstChild.nextElementSibling.focus();
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    });

                    /* Captures ENTER / RETURN keys, 
                     * and jump to next line / sheet or 
                     * return to previous line / sheet */
                    input.addEventListener ('keyup', function (event) 
                    {
                        // RETURN
                        if (event.keyCode === 8) {
                            if (input.value.length === 0) {
                                if (input.previousElementSibling === null || input.previousElementSibling.className !== 'input-line') {
                                    let previousParentElement = input.parentElement.previousElementSibling;
                                    if (previousParentElement !== null && previousParentElement.id !== 'modal') {
                                        const sheets = document.querySelector ('#sheets');
                                        sheets.removeChild (input.parentElement);
                                        previousParentElement.children[previousParentElement.children.length - 2].focus (); // -1 is span element
                                    }
                                }
                                else { 
                                    input.previousElementSibling.focus (); 
                                }
                            }
                        }

                        //ENTER
                        if (event.keyCode === 13) {
                            if (input.nextElementSibling === null || input.nextElementSibling.className !== 'input-line') {
                                let nextSheet = input.parentElement.nextElementSibling;
                                console.log (nextSheet);
                                if (nextSheet !== null) { // children[0] is date element
                                    if (nextSheet.children[1] !== null) {
                                        nextSheet.children[1].focus ();    
                                    }
                                }
                                else  {
                                    nextSheet = createNewSheet ();
                                    if (nextSheet !== null && nextSheet.children[1] !== null) {
                                        nextSheet.children[1].focus ();    
                                    }
                                }
                            }
                            else { 
                                input.nextElementSibling.focus (); 
                            }
                        }
                    });
                });
            }
        } 
        catch (error) {
            console.error ('error', error);
        }
    }

    /**
     * Clear all inputs
     */
    function clearLines () {
        const inputLines = document.querySelectorAll('.input-line');
        if (inputLines !== null) {
            inputLines.forEach(input => input.value = '');
        }
    }

    /**
     * Shows or hides the properties modal
     */
    function togglePropertiesModal(show) {
        propertiesModal.style.display = (show ? 'block' : 'none');
        showModalButton.style.display = (show ? 'none' : 'block');
        demoButton.style.display = (show ? 'none' : 'block');
    }

    /**
     * Apply properties for input lines based on modal values
     */
    function applyProperties ()  {
        try  {

            // Getting values
            const fontSize = fontSizeInput.value;
            const fontWeight = fontWeightSelect.value;
            const fontVariant = fontVariantSelect.value;
            const textColor = textColorInput.value;
            const textAlign = textAlignSelect.value;
            const textDecoration = textDecorationSelect.value;
            const textTransform = textTransformSelect.value;
            const letterSpacing = letterSpacingInput.value;
            const wordSpacing = wordSpacingInput.value;
            const direction = directionSelect.value;

            // Setting values
            const inputLines = document.querySelectorAll('.input-line');
            if (inputLines !== null) {
                inputLines.forEach ((input) => {
                    input.style.fontSize = fontSize;
                    input.style.fontWeight = fontWeight;
                    input.style.fontVariant = fontVariant;
                    input.style.color = textColor;
                    input.style.textAlign = textAlign;
                    input.style.textDecoration = textDecoration;
                    input.style.textTransform = textTransform;
                    input.style.letterSpacing = letterSpacing;
                    input.style.wordSpacing = wordSpacing;
                    input.style.direction = direction;
                });
            }

            togglePropertiesModal(false);
        }
        catch (error) {
            console.error ('error', error);
        }
    }

    function loadTextFile() {
        fetch('../assets/text.txt').then(response => {
            if (response.ok) {
                response.text().then(text => demoText = text);
            }
            else {
                demoText = 'Unable to get text file!';
            }
        }).catch(error => demoText = `Unable to get text file: ${error}`);
    }

    /**
     * Execute a demonstration and fill the lines
     */
    function demonstrationText () {
        let content = demoText;
        content = content.split ('.');

        const sheet = document.querySelector ('.sheet');
        if (sheet !== null) {
            let inputLines = sheet.querySelectorAll ('.input-line');
            if (inputLines !== null && inputLines.length >= content.length) {
                content.forEach((line, index) => {
                    inputLines[index].value = line;
                });
            }
        }
    }

    // Event Listeners

    demoButton.addEventListener ('click', demonstrationText);
    clearFieldsButton.addEventListener ('click', clearLines);
    showModalButton.addEventListener ('click', () => togglePropertiesModal(true));
    closeModalButton.addEventListener ('click', () => togglePropertiesModal(false));
    applyPropertiesButton.addEventListener ('click', applyProperties);
    textColorInput.addEventListener ('change', function () { 
        textColorLabel.innerHTML = this.value;
    });

    createNewSheet();
    defaultProperties ();
    loadTextFile();
});