import './App.css';
const logo = document.querySelector('[data-logo]');

document.addEventListener('keydown', e => {
  const input = e.target;
  const key = e.key;
  if (!isConnectedInput(input)) return;

  switch (key) {
    case 'ArrowLeft': {
      if (input.selectionStart === 0 && input.selectionEnd === 0) {
        const prev = input.previousElementSibling;
        prev.focus();
        prev.selectionStart = prev.value.length - 1;
        prev.selectionEnd = prev.value.length - 1;
        e.preventDefault();
      }
      break;
    }
    case 'ArrowRight': {
      if (
        input.selectionStart === input.value.length &&
        input.selectionEnd === input.value.length
      ) {
        const next = input.nextElementSibling;
        next.focus();
        next.selectionStart = 1;
        next.selectionEnd = 1;
        e.preventDefault();
      }
      break;
    }
    case 'Delete': {
      if (
        input.selectionStart === input.value.length &&
        input.selectionEnd === input.value.length
      ) {
        const next = input.nextElementSibling;
        next.value = next.value.substring(1, next.value.length);
        next.focus();
        next.selectionStart = 0;
        next.selectionEnd = 0;
        e.preventDefault();
      }
      break;
    }
    case 'Backspace': {
      if (input.selectionStart === 0 && input.selectionEnd === 0) {
        const prev = input.previousElementSibling;
        prev.value = prev.value.substring(0, prev.value.length - 1);
        prev.focus();
        prev.selectionStart = prev.value.length;
        prev.selectionEnd = prev.value.length;
        e.preventDefault();
      }
      break;
    }
    default: {
      if (e.ctrlKey || e.altKey) return;
      if (key.length > 1) return;
      if (key.match(/^[^0-9]$/)) return e.preventDefault();
      e.preventDefault();
      onInputChange(input, key);
    }
  }
});

document.addEventListener('paste', e => {
  const input = e.target;
  const data = e.clipboardData.getData('text');

  if (!isConnectedInput(input)) return;
  if (!data.match(/^[0-9]+$/)) return e.preventDefault();

  e.preventDefault();
  onInputChange(input, data);
});

function onInputChange(input, newValue) {
  const start = input.selectionStart;
  const end = input.selectionEnd;
  updateInputValue(input, newValue, start, end);
  focusInput(input, newValue.length + start);
  const firstFour = input
    .closest('[data-connected-inputs]')
    .querySelector('input').value;
  if (firstFour.startsWith('4')) {
    logo.src = 'visa.svg';
  } else if (firstFour.startsWith('5')) {
    logo.src = 'mastercard.svg';
  }
}

function updateInputValue(input, extraValue, start = 0, end = 0) {
  const newValue = `${input.value.substring(
    0,
    start
  )}${extraValue}${input.value.substring(end, 4)}`;
  input.value = newValue.substring(0, 4);
  if (newValue > 4) {
    const next = input.nextElementSibling;
    if (next == null) return;
    updateInputValue(next, newValue.substring(4));
  }
}

function focusInput(input, dataLength) {
  let addedChars = dataLength;
  let currentInput = input;
  while (addedChars > 4 && currentInput.nextElementSibling != null) {
    addedChars -= 4;
    currentInput = currentInput.nextElementSibling;
  }
  if (addedChars > 4) addedChars = 4;
  currentInput.focus();
  currentInput.selectionStart = addedChars;
  currentInput.selectionEnd = addedChars;
}

function isConnectedInput(input) {
  const parent = input.closest('[data-connected-inputs]');
  return input.matches('input') && parent != null;
}

function App() {
  const expirationSelect = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i < currentYear + 10; i++) {
    const option = { value: i, label: i };
    expirationSelect?.push(option);
  }

  return (
    <form className="credit-card">
      <div className="front">
        <div className="card-data-row">
          <div className="brand-name">WAZIMU Bank</div>
          <img src="visa.svg" data-logo className="logo" id="logo" alt="logo" />
        </div>
        <fieldset className="form-group">
          <legend>Card Number</legend>
          <label htmlFor="cc-1">Card Number</label>
          <div
            data-connected-inputs
            className="cc-inputs horizontal-input-stack"
          >
            <input
              type="tel"
              maxLength={4}
              aria-label="Credit Card First 4 Digits"
              id="cc-1"
              required
              pattern="[0-9]{4}"
            />
            <input
              type="tel"
              maxLength={4}
              aria-label="Credit Card Second 4 Digits"
              required
              pattern="[0-9]{4}"
            />
            <input
              type="tel"
              maxLength={4}
              aria-label="Credit Card Third 4 Digits"
              required
              pattern="[0-9]{4}"
            />
            <input
              type="tel"
              maxLength={4}
              aria-label="Credit Card Last 4 Digits"
              required
              pattern="[0-9]{4}"
            />
          </div>
        </fieldset>
        <div className="input-row">
          <div className="form-group name-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" required />
          </div>
          <fieldset className="form-group">
            <legend>Expiration</legend>
            <label htmlFor="expiration-month">Expiration</label>
            <div className="horizontal-input-stack">
              <select
                id="expiration-month"
                aria-label="Expiration Month"
                required
              >
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select
                id="expiration-year"
                aria-label="Expiration Year"
                required
                data-expiration-year
              >
                {expirationSelect.map(({ value, label }) => (
                  <option key={label} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
        </div>
      </div>
      <div className="back">
        <div className="stripe"></div>
        <div className="form-group cvc-group">
          <label htmlFor="cvc">CVC</label>
          <input
            type="password"
            className="cvc-input"
            maxLength={3}
            id="cvc"
            required
          />
        </div>
      </div>
    </form>
  );
}

export default App;
