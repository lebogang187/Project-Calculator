class Calculator {                                                                                      // stores the previous and current data
    constructor(previousOperandTextElement, currentOperandTextElement) {                                // displays or sets previous and current text(numbers)
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {                                                                                           // clear function, clears the screen when you click the AC button
        this.currentOperand = ''
        this.previousOperand = ''
        this.operator = undefined
    }

    delete() {                                                                                          // delete function, deletes or removes a single number or operator when you click the DEL button
        this.currentOperand = this.currentOperand.toString().slice(0, -1)                               // takes the last number and chops it off(deletes/slices)
    }

    appendNumber(number) {                                                                              // this function appends or adds a number to the screen
        if(number === '.' && this.currentOperand.includes('.')) return                                  // checks if period is used and when used prevents it from being reused in the same operation
        this.currentOperand = this.currentOperand.toString() + number.toString()                        // converts numbers to string so that it can be added i.e 55 instead of 5+5
    }

    selectOperator(operator) {                                                                          // this function selects the particular operator the user chooses
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operator = operator
        this.previousOperand = this.currentOperand                                                      
        this.currentOperand = ''                                                                        // sets currentOperand to empty string
    }

    compute() {                                                                                         // computes a single value that needs to be displayed on the calculator
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return                                                        // checks if user entered a number before clicking = and if not it wont return anything
        switch(this.operator) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operator = undefined
        this.previousOperand = ''
    }

    updateDisplay() {                                                                                   // updates the values that needs to be displayed in the output
        this.currentOperandTextElement.innerText = this.currentOperand
        if(this.operator != null){
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operator}`      // displays the previous number and operator
        }
        else{
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('.numberBtn')
const operationButtons = document.querySelectorAll('#operator')
const equalButton = document.querySelector('#equalBtn')
const clearButton = document.querySelector('#clearBtn')
const deleteButton = document.querySelector('.deleteBtn')
const decimalButton = document.querySelector('#period')
const previousOperandTextElement = document.querySelector('.previousNum')
const currentOperandTextElement = document.querySelector('.currentNum')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {                                                                       // added eventListener for each button when user clicks on a number, it displays the text of the number and updates the display
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {                 
    button.addEventListener('click', () => {
        calculator.selectOperator(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', _button => {                                                      // prefixed all eventListener buttons with an underscore(_) declaration correctness 
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', _button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', _button => {
    calculator.delete()
    calculator.updateDisplay()
})