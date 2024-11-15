function inputValue(value)
{
    document.getElementById('display').innerText += value;
}

function clearDisplay()
{
    document.getElementById('display').innerText = '';
}

function deleteLast()
{
    const display = document.getElementById('display');
    display.innerText = display.innerText.slice(0, -1);
}

function calculateResult()
{
    const display = document.getElementById('display');
    try 
    {
        display.innerText = eval(display.innerText);
    } 
    catch 
    {
        display.innerText = 'Error';
    }
}
