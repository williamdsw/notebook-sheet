/* 
    Created on : 28/03/2019 22:10
    Author     : William Santos
*/

"use strict";

//------------------------------------------------------------------------------------------//
// FIELDS

let modal = document.getElementById ("modal");
let btnDemo = document.getElementById ("btn_demo");
let btnClear = document.getElementById ("btn_clear");
let btnModal = document.getElementById ("btn_modal");
let btnClose = document.getElementById ("btn_close");
let btnApply = document.getElementById ("btn_apply");
let lblTextColor = document.getElementById ("lbl_text_color");
let txtTextColor = document.getElementById ("txt_text_color");
let txtFontSize = document.getElementById ("txt_font_size");
let txtLetterSpacing = document.getElementById ("txt_letter_spacing");
let txtWordSpacing = document.getElementById ("txt_word_spacing");
let slcFontWeight = document.getElementById ("slc_font_weight");
let slcFontVariant = document.getElementById ("slc_font_variant");
let slcTextAlign = document.getElementById ("slc_text_align");
let slcTextDecoration = document.getElementById ("slc_text_decoration");
let slcTextTransform = document.getElementById ("slc_text_transform");
let slcDirection = document.getElementById ("slc_direction");

//------------------------------------------------------------------------------------------//
// HELPER FUNCTIONS

window.addEventListener ("load", function () 
{
    defaultProperties ();

    // EVENTS
    btnDemo.addEventListener ("click", demonstrationText);
    btnClear.addEventListener ("click", function () 
    { 
        document.querySelectorAll (".input-line").forEach ((element) =>
        {
            element.value = "";
        });
    });

    btnModal.addEventListener ("click", function () 
    { 
        modal.style.display = "block";
        this.style.display = "none";
        btnDemo.style.display = "none";
    });

    btnClose.addEventListener ("click", function () 
    { 
        modal.style.display = "none";
        btnModal.style.display = "block";
        btnDemo.style.display = "block";
    });

    txtTextColor.addEventListener ("change", function () 
    { 
        lblTextColor.innerHTML = this.value;
    });

    btnApply.addEventListener ("click", applyProperties);

    inputInterations ();
});

/**
 * Default values for modal properties
 */
function defaultProperties () 
{
    try
    {
        // Getting values
        let inputLine = document.getElementsByClassName("input-line")[0];
        let fontSize = (inputLine.style.fontSize !== "" ? inputLine.style.fontSize : "13px");
        let fontWeight = (inputLine.style.fontWeight !== "" ? inputLine.style.fontWeight : "normal");
        let fontVariant = (inputLine.style.fontVariant !== "" ? inputLine.style.fontVariant : "normal");
        let textColor = (inputLine.style.color !== "" ? inputLine.style.color : "black");
        let textAlign = (inputLine.style.textAlign !== "" ? inputLine.style.textAlign : "left");
        let textDecoration = (inputLine.style.textDecoration !== "" ? inputLine.style.textDecoration : "none");
        let textTransform = (inputLine.style.textTransform !== "" ? inputLine.style.textTransform : "none");
        let letterSpacing = (inputLine.style.letterSpacing !== "" ? inputLine.style.letterSpacing : "");
        let wordSpacing = (inputLine.style.wordSpacing !== "" ? inputLine.style.wordSpacing : "");
        let direction = (inputLine.style.direction !== "" ? inputLine.style.direction : "ltr");

        // Setting values
        txtFontSize.value = fontSize;
        slcFontWeight.value = fontWeight;
        slcFontVariant.value = fontVariant;
        lblTextColor.innerHTML = textColor;
        slcTextAlign.value = textAlign;
        slcTextDecoration.value = textDecoration;
        slcTextTransform.value = textTransform;
        txtLetterSpacing.value = letterSpacing;
        txtWordSpacing.value = wordSpacing;
        slcDirection.value = direction;
    }
    catch (error) 
    {
        console.log (error);
    }
}

/**
 * Apply properties for input lines based on modal values
 */
function applyProperties () 
{
    try 
    {
        // Getting values
        let fontSize = txtFontSize.value;
        let fontWeight = slcFontWeight.value;
        let fontVariant = slcFontVariant.value;
        let textColor = txtTextColor.value;
        let textAlign = slcTextAlign.value;
        let textDecoration = slcTextDecoration.value;
        let textTransform = slcTextTransform.value;
        let letterSpacing = txtLetterSpacing.value;
        let wordSpacing = txtWordSpacing.value;
        let direction = slcDirection.value;

        // Set values
        document.querySelectorAll (".input-line").forEach ((element) =>
        {
            element.style.fontSize = fontSize;
            element.style.fontWeight = fontWeight;
            element.style.fontVariant = fontVariant;
            element.style.color = textColor;
            element.style.textAlign = textAlign;
            element.style.textDecoration = textDecoration;
            element.style.textTransform = textTransform;
            element.style.letterSpacing = letterSpacing;
            element.style.wordSpacing = wordSpacing;
            element.style.direction = direction;
        });

        // Close modal
        modal.style.display = "none";
        btnModal.style.display = "block";
        btnDemo.style.display = "block";
    }
    catch (error) 
    {
        console.log (error);
    }
}

/**
 * Defines input interations like jump line, create new sheet, etc.
 */
function inputInterations ()
{
    try 
    {
        let inputs = document.querySelectorAll (".input-line");

        inputs.forEach ((element, index) => 
        {
            /// Verifies value length and maxlength and create or jump to next line /sheet
            element.addEventListener ("keypress", function () 
            {
                let maxlength = element.getAttribute ("maxlength");
                if (element.value.length === Number (maxlength)) 
                {
                    if (element.nextElementSibling !== null)
                    {
                        element.nextElementSibling.focus ();
                    }
                    else 
                    {
                        let nextSheet = element.parentElement.nextElementSibling;
                        if (nextSheet !== null)
                        {
                            nextSheet.children[0].focus ();
                        }
                        else 
                        {
                            nextSheet = createNewSheet ();
                            nextSheet.children[0].focus ();
                        }
                    }
                }
            });

            // Captures ENTER / RETURN keys, and jump to next line / sheet or return to previous line / sheet
            element.addEventListener ("keyup", function (event) 
            {
                // RETURN
                if (event.keyCode === 8)
                {
                    if (element.value.length === 0)
                    {
                        if (element.previousElementSibling === null || element.previousElementSibling.className !== "input-line")
                        {
                            let previousParentElement = element.parentElement.previousElementSibling;
                            if (previousParentElement !== null && previousParentElement.id !== "modal")
                            {
                                document.querySelector ("#sheets").removeChild (element.parentElement);
                                previousParentElement.children[previousParentElement.children.length - 1].focus ();
                            }
                        }
                        else { element.previousElementSibling.focus (); }
                    }
                }

                //ENTER
                if (event.keyCode === 13)
                {
                    if (element.nextElementSibling === null || element.nextElementSibling.className !== "input-line")
                    {
                        let nextSheet = element.parentElement.nextElementSibling;
                        console.log (nextSheet);
                        if (nextSheet !== null)
                        {
                            if (nextSheet.children[0] !== null)
                            {
                                nextSheet.children[0].focus ();    
                            }
                        }
                        else 
                        {
                            nextSheet = createNewSheet ();
                            if (nextSheet.children[0] !== null)
                            {
                                nextSheet.children[0].focus ();    
                            }
                        }
                    }
                    else { element.nextElementSibling.focus (); }
                }
            });
        });
    } 
    catch (error) 
    {
        console.log (error);
    }
}

/**
 * Create a new sheet with 20 lines
 */
function createNewSheet ()
{
    try 
    {
        const MAX_NUMBER_OF_LINES = 20;
        let div = document.createElement ("div");
        div.className = "sheet";

        for (let i = 0; i < MAX_NUMBER_OF_LINES; i++)
        {
            let input = document.createElement ("input");
            input.type = "text";
            input.className = "input-line";
            input.maxLength = 72;
            div.appendChild (input);
        }

        document.querySelector ("#sheets").appendChild (div);
        inputInterations ();

        return div;
    } 
    catch (error) 
    {
        console.log (error);
    }
}

/**
 * Execute a demonstration and fill the lines
 */
function demonstrationText ()
{
    let content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit." + 
                  "Nunc eget tempus urna." + 
                  "Vivamus elit ex, dignissim nec nulla id." + 
                  "Egestas facilisis leo." + 
                  "Ut tempor bibendum eros, ac aliquet mi cursus at." + 
                  "Fusce hendrerit tellus nec turpis tempor." + 
                  "Non ultricies ante finibus." + 
                  "Fusce quis velit sem." + 
                  "Ut a dignissim felis." + 
                  "Suspendisse pretium molestie eros ac sodales." + 
                  "Sed erat nisi, faucibus sed bibendum eget." + 
                  "Dictum non ligula." + 
                  "Mauris ut lacus consequat, pellentesque nulla sit amet." + 
                  "Rutrum dolor." + 
                  "Pellentesque habitant morbi tristique senectus et netus." + 
                  "Et malesuada fames ac turpis egestas.";

    content = content.split (".");

    let sheet = document.querySelector (".sheet");
    let inputs = sheet.querySelectorAll (".input-line");
    for (let index = 0; index < content.length; index++)
    {
        inputs[index].value = content[index];
    }
}